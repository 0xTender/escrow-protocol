/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
import {
  type AddressType,
  getContractAddress,
  shortenAddress,
} from "@app/utils/web3";
import { EscrowABI } from "@root/core";
import { ExternalLink } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { type FC, useEffect, useState } from "react";
import { encodeAbiParameters, formatEther } from "viem";
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
  const [isExpired, setIsExpired] = useState(false);
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
      setIsExpired(true);
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
    hash: hash ?? "0x",
    enabled: hash !== undefined && state === "watch-cancel-tx",
    onSuccess: () => {
      if (state === "watch-cancel-tx") {
        setState("none");
        void refetchEscrowState();
      }
    },
    onError(error) {
      console.log(error);
      setError(error.message);
      setState("none");
    },
  });

  useEffect(() => {
    if (!data?.details) {
      return;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <div>
      <Head>
        <title>Escrow Protocol - Purchase Agreements - 0xTender</title>
        <meta name="description" content="Escrow Protocol - 0xTender" />
        <link rel="icon" href="/logo.png" />
      </Head>{" "}
      <Card className="dark:rounded-xl dark:bg-[#1B1B1B]">
        <CardHeader>
          <CardTitle className="text-md">
            Extension: {data?.extensionName && <>{data.extensionName}</>}
          </CardTitle>
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
          <CardContent className="grid gap-2 md:grid-cols-2">
            <div className="flex items-center space-x-2">
              <div>
                Initiator:{" "}
                <span className="text-slate-500 dark:text-slate-400">You</span>
              </div>

              <ExternalLink className="h-4 cursor-pointer" />
            </div>
            <div>
              Counter:{" "}
              <span className="text-slate-500 dark:text-slate-400">
                {shortenAddress(data.details.A_initiator)}{" "}
              </span>
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
                {(escrowState[0] === EscrowState.BEGUN && isExpired) ||
                  (escrowState[1] ===
                    getContractAddress("MultiSwapExtension") && (
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
                  ))}
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
