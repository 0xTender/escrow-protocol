import { type z } from "zod";
import { type multiSwapFormSchema } from "@app/components/MultiSwapExtension/MultiSwapForm";
import { useEffect, useState } from "react";
import { getContractAddress, type AddressType } from "@app/utils/web3";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { ExchangeType } from "@app/types";
import { EscrowABI } from "@root/core";
import { encodeAbiParameters, parseEther } from "viem";

export const useBeginEscrow = ({
  data,
  setError,
}: {
  data?: z.infer<typeof multiSwapFormSchema>;
  setError: (data: string) => void;
}) => {
  const [state, setState] = useState<
    | "pre-begin-escrow"
    | "begin-escrow"
    | "none"
    | "watch-escrow-tx"
    | "complete"
    | "error"
  >("none");

  const [hash, setHash] = useState<AddressType>();

  const { address } = useAccount();

  const { write: beginEscrow } = useContractWrite({
    address: getContractAddress("Escrow"),
    abi: EscrowABI,
    functionName: "beginEscrow",
    onSettled: (data, error) => {
      if (error) {
        console.error(error);
        setError(error.message);
        setState("error");
        return;
      }
      if (data) {
        setState("watch-escrow-tx");
        setHash(data.hash);
      }
    },
  });

  useWaitForTransaction({
    hash,
    onSettled: (data, error) => {
      if (error) {
        console.error(error);
        setState("error");

        setError(error.message);
        return;
      }
      if (data) {
        setState("complete");
      }
    },
  });

  useEffect(() => {
    console.log("inside effect");
    console.log({ beginEscrow, address, data, state });

    if (data !== undefined && state === "pre-begin-escrow") {
      try {
        setState("begin-escrow");

        try {
          void beginEscrow({
            args: [
              getContractAddress("MultiSwapExtension"),
              encodeAbiParameters(
                [
                  { type: "address" },
                  { type: "address" },
                  { type: "address" },
                  { type: "uint256" },
                  { type: "address" },
                  { type: "uint256" },
                  { type: "uint256" },
                  { type: "uint8" },
                  { type: "uint8" },
                ],
                [
                  address ?? "0x",
                  data.counterParty,
                  data.initiatorToken,
                  data.initiatorExchange === ExchangeType.ERC20
                    ? parseEther(data.initiatorAmount)
                    : BigInt(data.initiatorAmount),
                  data.counterToken,
                  data.counterExchange === ExchangeType.ERC20
                    ? parseEther(data.counterAmount)
                    : BigInt(data.counterAmount),
                  BigInt(Math.floor(data.deadline.getTime() / 1000)),
                  data.initiatorExchange,
                  data.counterExchange,
                ]
              ),
            ],
          });
        } catch (err) {
          console.error(err);
        }
      } catch (err) {
        setState("error");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return {
    beginEscrow: () => {
      setState("pre-begin-escrow");
    },
    state,
    beginEscrowFunction: () => {
      setState("begin-escrow");
      beginEscrow();
    },
  };
};
