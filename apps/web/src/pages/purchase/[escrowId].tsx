/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Badge } from "@app/components/ui/badge";
import { Button } from "@app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@app/components/ui/card";
import { EscrowState, getValueForEscrowState } from "@app/types";
import { api } from "@app/utils/api";
import { ERC20ABI } from "@app/utils/interfaces/IERC20ABI";
import { type AddressType, getContractAddress } from "@app/utils/web3";
import { EscrowABI } from "@root/core";
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
import { EscrowDetailsCard } from "@app/components/EscrowDetailsCard";
import { useAllowance } from "@app/hooks/useAllowance";

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
  | "watch-cancel-tx"
  // multi
  | "multi";

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

  console.log(escrowState);

  const [hash, setHash] = useState<AddressType>();

  const { data: counterAllowance } = useContractRead({
    address: (data?.details.A_counterToken as AddressType) ?? "0x",
    abi: ERC20ABI,
    functionName: "allowance",
    enabled:
      !!data?.details.A_counterToken &&
      getContractAddress("Escrow") !== "0x" &&
      !!address &&
      state === "pre-read-allowance",
    args: [address ?? "0x", getContractAddress("SwapERC20Extension") ?? "0x"],
    onSuccess: () => {
      setState("read-allowance");
    },
  });

  const { write: approve } = useContractWrite({
    address: (data?.details.A_counterToken as AddressType) ?? "0x",
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
            getContractAddress("SwapERC20Extension") ?? "0x",
            BigInt(data.details.A_counterAmount),
          ],
        });
      } catch (err) {
        console.error(err);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, data]);

  useWaitForTransaction({
    hash: hash ?? "0x",
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
    hash: hash ?? "0x",
    enabled: hash !== undefined && state === "watch-complete-tx",
    onSuccess: () => {
      if (state === "watch-complete-tx") {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const { init: initMultiAllowance, state: allowanceState } = useAllowance({
    tokenAddress: (data?.details.A_counterToken as AddressType) ?? "0x",
    enabled: data?.extensionName === "MultiSwapExtension",
    allowanceType:
      data?.extensionName === "MultiSwapExtension"
        ? data?.details?.A_counterExchange === "0"
          ? "ERC20"
          : "ERC721"
        : "ERC20",
    amount:
      (data?.extensionName === "MultiSwapExtension" &&
      data?.details?.A_counterExchange === "0"
        ? formatEther(BigInt(data?.details?.A_counterAmount ?? "0"))
        : data?.details?.A_counterAmount) ?? "0",
    spenderAddress: getContractAddress("MultiSwapExtension") ?? "0x",
    setError: (error) => {
      setError(error);
    },
  });

  useEffect(() => {
    console.log({ state, allowanceState });
    if (allowanceState === "complete" && state === "multi") {
      setState("pre-complete-escrow");
    }
  }, [allowanceState, state]);

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (data?.extensionName === "MultiSwapExtension" && counter === 0) {
      setState("multi");
      setCounter(1);
    }
  }, [data, counter]);

  return (
    <div>
      <Head>
        <title>Escrow Protocol - Purchase Agreements - 0xTender</title>
        <meta name="description" content="Escrow Protocol - 0xTender" />
        <link rel="icon" href="/logo.png" />
      </Head>{" "}
      <Card className="dark:rounded-xl dark:bg-[#1B1B1B]">
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
          <CardContent className="grid gap-2 md:grid-cols-2">
            <EscrowDetailsCard pageType="purchase" data={data} />

            {escrowState && (
              <div className="flex gap-2">
                {escrowState[0] === EscrowState.BEGUN && (
                  <Button
                    onClick={() => {
                      if (
                        state === "none" &&
                        data.extensionName === "SwapERC20Extension"
                      ) {
                        setState("pre-read-allowance");
                      }

                      if (
                        state === "multi" &&
                        data.extensionName === "MultiSwapExtension"
                      ) {
                        initMultiAllowance();
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
