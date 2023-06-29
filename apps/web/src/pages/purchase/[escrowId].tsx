import { Badge } from "@app/components/ui/badge";
import { Button } from "@app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@app/components/ui/card";
import { EscrowState, getValueForEscrowState } from "@app/types";
import { api } from "@app/utils/api";
import { ERC20ABI } from "@app/utils/interfaces/IERC20ABI";
import {
  AddressType,
  getContractAddress,
  shortenAddress,
} from "@app/utils/web3";
import { EscrowABI } from "@root/core";
import { ExternalLink } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { encodeAbiParameters, formatEther, parseEther } from "viem";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

type StateMachine =
  | "pre-read-allowance"
  | "read-allowance"
  | "pre-approve"
  | "approve"
  | "watch-approve-tx"
  //
  | "pre-complete-escrow"
  | "complete-escrow"
  | "watch-complete-tx"
  | "expired"
  | "none"
  //
  | "pre-cancel"
  | "cancel"
  | "watch-cancel-tx";

const getColor = (status: number) => {
  switch (status) {
    case EscrowState.BEGUN:
      return "dark:bg-green-500 bg-green-400 hover:bg-green-500";
    case EscrowState.CANCELLED:
      return "dark:bg-red-500 bg-red-400 hover:bg-red-400";
    case EscrowState.COMPLETED:
      return "dark:bg-blue-500 bg-blue-400 hover:bg-blue-400";
    default:
      return "dark:bg-gray-500 bg-gray-400";
  }
};

const PurchaseEscrowPage: FC = () => {
  const [state, setState] = useState<StateMachine>("none");
  const router = useRouter();
  const { escrowId: escrowIdQuery } = router.query;
  const [escrowId, setEscrowId] = useState<string>();

  const [error, setError] = useState<string>();

  useEffect(() => {
    setEscrowId(escrowIdQuery as string);
  }, [setEscrowId, escrowIdQuery]);

  const { data } = api.escrow.details.useQuery(
    {
      escrowId: escrowId as string,
    },
    {
      enabled: !!escrowId,
    }
  );

  const { address } = useAccount();
  useEffect(() => {
    if (!data || !address) {
      return;
    }
    if (parseInt(data.details.A_deadline) * 1000 < Date.now()) {
      setState("expired");
      return;
    }
  }, [address, data, state]);

  const { data: escrowState, refetch: refetchEscrowState } = useContractRead({
    abi: EscrowABI,
    address: getContractAddress("Escrow"),
    functionName: "escrowState",
    args: [BigInt(data?.details.A_escrowId ?? 0)],
    enabled: !!data?.details.A_escrowId,
  });

  const [hash, setHash] = useState<AddressType>();

  const { data: counterAllowance } = useContractRead({
    address: (data?.details.A_counterToken as any) ?? "0x",
    abi: ERC20ABI,
    functionName: "allowance",
    enabled:
      !!data?.details.A_counterToken &&
      getContractAddress("Escrow") !== "0x" &&
      !!address &&
      state === "pre-read-allowance",
    args: [address!, getContractAddress("SwapERC20Extension")!],
    onSuccess: () => {
      setState("read-allowance");
    },
  });

  const { write: approve } = useContractWrite({
    address: (data?.details.A_counterToken as any) ?? "0x",
    abi: ERC20ABI,
    functionName: "approve",
    onSettled: (data, error) => {
      if (error) {
        console.error(error);
        setError(error.message);
        setState("none");
        return;
      }

      if (data) {
        setState("watch-approve-tx");
        setHash(data.hash);
      }
    },
  });

  useEffect(() => {
    if (state !== "pre-approve" || data === undefined) {
      return;
    }
    if (state === "pre-approve") {
      setState("approve");

      try {
        void approve({
          args: [
            getContractAddress("SwapERC20Extension")!,
            BigInt(data.details.A_counterAmount),
          ],
        });
      } catch (err) {
        console.error(err);
      }
    }
  }, [state, data]);

  useWaitForTransaction({
    hash: hash!,
    enabled: hash !== undefined && state === "watch-approve-tx",
    onSuccess: () => {
      if (state === "watch-approve-tx") {
        setState("pre-complete-escrow");
      }
    },
    onError(error) {
      console.log(error);
      setError(error.message);
      setState("none");
    },
  });

  const { write: completeEscrow } = useContractWrite({
    address: getContractAddress("Escrow"),
    abi: EscrowABI,
    functionName: "completeEscrow",
    onSettled: (data, error) => {
      if (error) {
        console.error(error);
        setError(error.message);
        setState("none");
        return;
      }

      if (data) {
        setState("watch-complete-tx");
        setHash(data.hash);
      }
    },
  });

  useWaitForTransaction({
    hash: hash!,
    enabled: hash !== undefined && state === "watch-complete-tx",
    onSuccess: () => {
      if (state === "watch-complete-tx") {
        setState("none");
        refetchEscrowState();
      }
    },
    onError(error) {
      console.log(error);
      setError(error.message);
      setState("none");
    },
  });

  const { write: cancelEscrow } = useContractWrite({
    address: getContractAddress("Escrow"),
    abi: EscrowABI,
    functionName: "cancelEscrow",
    onSettled: (data, error) => {
      if (error) {
        console.error(error);
        setError(error.message);
        setState("none");
        return;
      }

      if (data) {
        setState("watch-cancel-tx");
        setHash(data.hash);
      }
    },
  });

  useWaitForTransaction({
    hash: hash!,
    enabled: hash !== undefined && state === "watch-cancel-tx",
    onSuccess: () => {
      if (state === "watch-cancel-tx") {
        setState("none");
        refetchEscrowState();
      }
    },
    onError(error) {
      console.log(error);
      setError(error.message);
      setState("none");
    },
  });

  useEffect(() => {
    if (state !== "pre-complete-escrow" || data === undefined) {
      return;
    }
    if (state === "pre-complete-escrow") {
      setState("complete-escrow");

      try {
        void completeEscrow({
          args: [
            BigInt(data.details.A_escrowId),
            encodeAbiParameters(
              [{ type: "uint256" }],
              [BigInt(data.details.A_escrowId)]
            ),
          ],
        });
      } catch (err) {
        console.error(err);
      }
    }
  }, [state, data]);

  useEffect(() => {
    if (!data?.details) {
      return;
    }

    if (state === "read-allowance") {
      if (
        counterAllowance &&
        counterAllowance >= BigInt(data.details.A_counterAmount)
      ) {
        setState("pre-complete-escrow");
      } else {
        setState("pre-approve");
      }
    }

    if (state === "pre-cancel") {
      try {
        void cancelEscrow({
          args: [
            BigInt(data.details.A_escrowId),
            encodeAbiParameters(
              [{ type: "uint256" }],
              [BigInt(data.details.A_escrowId)]
            ),
          ],
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [state]);

  return (
    <div>
      <Head>
        <title>Escrow Protocol - Purchase Agreements - 0xTender</title>
        <meta name="description" content="Escrow Protocol - 0xTender" />
        <link rel="icon" href="/logo.png" />
      </Head>{" "}
      <Card>
        <CardHeader>
          <CardDescription className="flex gap-x-2">
            Agreement Id: {data && escrowId}
            {state === "expired" ? (
              <Badge className="rounded-full bg-red-400 hover:bg-red-400">
                Expired
              </Badge>
            ) : (
              escrowState && (
                <Badge className={`rounded-full ${getColor(escrowState[0])}`}>
                  {getValueForEscrowState(escrowState[0])}
                </Badge>
              )
            )}
          </CardDescription>
        </CardHeader>
        {data?.details && (
          <CardContent className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <div>
                Initiator:{" "}
                <span className="text-slate-500 dark:text-slate-400">
                  {shortenAddress(data.details.A_initiator)}{" "}
                </span>
              </div>

              <ExternalLink className="h-4 cursor-pointer" />
            </div>
            <div>
              Counter:{" "}
              <span className="text-slate-500 dark:text-slate-400">You</span>
            </div>
            <div className="flex items-center space-x-2">
              <div>
                Token Offered:{" "}
                <span className="text-slate-500 dark:text-slate-400">
                  {shortenAddress(data.details.A_initiatorToken)}{" "}
                </span>
              </div>

              <ExternalLink className="h-4 cursor-pointer" />
            </div>
            <div>
              Token Amount Offered:{" "}
              <span className="text-slate-500 dark:text-slate-400">
                {formatEther(BigInt(data.details.A_initiatorAmount)).toString()}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div>
                Token Requested:{" "}
                <span className="text-slate-500 dark:text-slate-400">
                  {shortenAddress(data.details.A_counterToken)}{" "}
                </span>
              </div>
              <ExternalLink className="h-4 cursor-pointer" />
            </div>
            <div>
              Token Amount Requested:{" "}
              <span className="text-slate-500 dark:text-slate-400">
                {formatEther(BigInt(data.details.A_counterAmount)).toString()}
              </span>
            </div>

            {escrowState && (
              <div className="flex gap-2">
                {escrowState[0] === EscrowState.BEGUN && (
                  <Button
                    onClick={() => {
                      if (state === "none") {
                        setState("pre-read-allowance");
                      }
                    }}
                  >
                    Accept
                  </Button>
                )}
                {escrowState[0] === EscrowState.BEGUN && (
                  <Button
                    variant="destructive"
                    onClick={() => {
                      if (state === "none") {
                        setState("pre-cancel");
                      }
                    }}
                  >
                    Reject
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        )}
        {error && (
          <CardFooter className="max-w-full break-words break-all">
            <div className="hyphens-auto text-red-400">
              {error?.split("\n").slice(-2)?.[0] ?? error}
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default PurchaseEscrowPage;
