import { Badge } from "@app/components/ui/badge";
import { Button } from "@app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@app/components/ui/card";
import { EscrowState, getValueForEscrowState } from "@app/types";
import { api } from "@app/utils/api";
import { getContractAddress, shortenAddress } from "@app/utils/web3";
import { EscrowABI } from "@root/core";
import { ExternalLink } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { formatEther, parseEther } from "viem";
import { useAccount, useContractRead } from "wagmi";

type StateMachine =
  | "pre-approve"
  | "approve"
  | "watch-approve-tx"
  | "pre-complete"
  | "complete"
  | "watch-complete-tx"
  | "expired"
  | "none"
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

  const { data: escrowState } = useContractRead({
    abi: EscrowABI,
    address: getContractAddress("Escrow"),
    functionName: "escrowState",
    args: [BigInt(data?.details.A_escrowId ?? 0)],
    enabled: !!data?.details.A_escrowId,
  });

  console.log(escrowState);

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
                        setState("pre-approve");
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
      </Card>
    </div>
  );
};

export default PurchaseEscrowPage;
