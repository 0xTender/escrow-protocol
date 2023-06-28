import {
  isAddr,
  isEtherWithGreaterThanZero,
  AddressType,
  zAddr,
} from "@app/utils/web3";
import { useEffect, useState } from "react";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import * as z from "zod";
import { ERC20ABI } from "@app/utils/interfaces/IERC20ABI";
import { getContractAddress } from "@app/utils/web3";
import { encodeAbiParameters, parseEther } from "viem";
import { EscrowABI } from "@root/core";

export const swapERC20FormSchema = z.object({
  counterParty: z.custom<AddressType>(...zAddr),
  initiatorToken: z.custom<AddressType>(...zAddr),
  initiatorAmount: z.string().min(1).refine(isEtherWithGreaterThanZero, {
    message:
      "Invalid amount. Please provide a valid amount in the unit ether and greater than zero.",
  }),
  counterToken: z.custom<AddressType>(...zAddr),
  counterAmount: z.string().refine(isEtherWithGreaterThanZero, {
    message:
      "Invalid amount. Please provide a valid amount in the unit ether and greater than zero",
  }),
});

type MachineState =
  | "none"
  | "pre-read-allowance"
  | "read-allowance"
  | "pre-begin-escrow"
  | "pre-approve"
  | "watch-approve-tx"
  | "watch-begin-escrow-tx"
  | "completed";

export const useSwapERC20 = () => {
  const [data, setData] = useState<z.infer<typeof swapERC20FormSchema>>();
  const [state, setState] = useState<MachineState>();
  const { address } = useAccount();

  const [hash, setHash] = useState<AddressType>();

  const {
    data: initiatorAllowance,
    isFetching: isFetchingAllowance,
    isFetched: isFetchedAllowance,
  } = useContractRead({
    address: data?.initiatorToken ?? "0x",
    abi: ERC20ABI,
    functionName: "allowance",
    enabled:
      !!data?.initiatorToken &&
      getContractAddress("Escrow") !== "0x" &&
      !!address &&
      state === "pre-read-allowance",
    args: [address!, getContractAddress("SwapERC20Extension")!],
    onSuccess: () => {
      setState("read-allowance");
    },
  });

  const { writeAsync: approve } = useContractWrite({
    address: data?.initiatorToken ?? "0x",
    abi: ERC20ABI,
    functionName: "approve",
    onSettled: (data, error) => {
      if (error) {
        console.error(error);
        return;
      }

      if (data) {
        setState("watch-approve-tx");
        setHash(data.hash);
      }
    },
  });

  const { writeAsync: beginEscrow } = useContractWrite({
    address: getContractAddress("Escrow")!,
    abi: EscrowABI,
    functionName: "beginEscrow",
    onSettled: (data, error) => {
      if (error) {
        console.error(error);
        return;
      }

      if (data) {
        setState("watch-begin-escrow-tx");
        setHash(data.hash);
      }
    },
  });

  useWaitForTransaction({
    hash: hash!,
    enabled: hash !== undefined && state === "watch-approve-tx",
    onSuccess: () => {
      setState("pre-begin-escrow");
    },
  });

  useWaitForTransaction({
    hash: hash!,
    enabled: hash !== undefined && state === "watch-begin-escrow-tx",
    onSuccess: () => {
      setState("completed");
    },
  });

  useEffect(() => {
    if (initiatorAllowance !== undefined) {
      setState("read-allowance");
    }
  }, [initiatorAllowance]);

  useEffect(() => {
    if (data && state === "pre-approve") {
      void approve({
        args: [
          getContractAddress("SwapERC20Extension")!,
          parseEther(data.initiatorAmount),
        ],
      });
    }
  }, [state, data]);

  useEffect(() => {
    if (data) {
      setState("pre-read-allowance");
    }
  }, [data]);

  /// state machine
  useEffect(() => {
    if (!data) {
      return;
    }

    if (state === "none") {
      setState("pre-read-allowance");
    }

    if (state === "read-allowance") {
      if (
        initiatorAllowance &&
        initiatorAllowance >= parseEther(data.initiatorAmount)
      ) {
        setState("pre-begin-escrow");
      } else {
        setState("pre-approve");
      }
    }

    if (state === "pre-begin-escrow") {
      void beginEscrow({
        args: [
          getContractAddress("SwapERC20Extension"),
          encodeAbiParameters(
            [
              { type: "address" },
              { type: "address" },
              { type: "address" },
              { type: "uint256" },
              { type: "address" },
              { type: "uint256" },
              { type: "uint256" },
            ],
            [
              address!,
              data.counterParty,
              data.initiatorToken,
              data.initiatorAmount,
              data.counterToken,
              data.counterAmount,
              Date.now(),
            ]
          ),
        ],
      });
    }
  }, [state, data]);

  console.log({ data, state });

  return {
    setSwapData: setData,
    isFetchingAllowance,
    isFetchedAllowance,
    initiatorAllowance,
  };
};
