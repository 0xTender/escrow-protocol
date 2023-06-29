import { ExchangeType } from "@app/types";
import { type AddressType } from "@app/utils/web3";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { ERC20ABI } from "@app/utils/interfaces/IERC20ABI";
import { useEffect, useState } from "react";
import { parseEther } from "viem";
import { ERC721ABI } from "@app/utils/interfaces/IERC721ABI";

export const useAllowance = ({
  allowanceType,
  tokenAddress,
  spenderAddress,
  amount,
  setError,
}: {
  tokenAddress: AddressType;
  allowanceType: "ERC20" | "ERC721" | ExchangeType;
  spenderAddress: AddressType;
  amount: string;
  setError: (data: string) => void;
}) => {
  console.log({ allowanceType, tokenAddress, spenderAddress, amount });
  const [hash, setHash] = useState<AddressType>();

  const { address } = useAccount();
  const [state, setState] = useState<
    | "none"
    | "pre-read-allowance"
    | "read-allowance"
    | "complete"
    | "pre-approve"
    | "approve"
    | "watch-approve-tx"
  >();

  const { data: ERC20Allowance } = useContractRead({
    address: tokenAddress,
    enabled:
      (allowanceType === "ERC20" || allowanceType === ExchangeType.ERC20) &&
      state === "pre-read-allowance" &&
      address !== undefined &&
      spenderAddress !== "0x",
    abi: ERC20ABI,
    onSuccess: () => {
      setState("read-allowance");
    },
    functionName: "allowance",
    args: [address ?? "0x", spenderAddress],
  });

  const { data: ERC721Allowance } = useContractRead({
    address: tokenAddress,
    enabled:
      (allowanceType === "ERC721" || allowanceType === ExchangeType.ERC721) &&
      state === "pre-read-allowance" &&
      address !== undefined &&
      spenderAddress !== "0x",
    abi: ERC721ABI,
    onSuccess: () => {
      setState("read-allowance");
    },
    functionName: "isApprovedForAll",
    args: [address ?? "0x", spenderAddress],
  });

  const { write: approveERC20 } = useContractWrite({
    address: tokenAddress,
    abi: ERC20ABI,
    functionName: "approve",
    args: [spenderAddress, parseEther(amount)],
    onSettled: (data, error) => {
      if (error) {
        console.log(error);
        setError(error.message);
        return;
      }
      if (data) {
        setHash(data.hash);
        setState("watch-approve-tx");
      }
    },
  });

  const { write: approveERC721 } = useContractWrite({
    address: tokenAddress,
    abi: ERC721ABI,
    functionName: "setApprovalForAll",
    args: [spenderAddress, true],
    onSettled: (data, error) => {
      if (error) {
        console.log(error);
        setError(error.message);
        return;
      }
      if (data) {
        setHash(data.hash);
        setState("watch-approve-tx");
      }
    },
  });

  useWaitForTransaction({
    hash,
    enabled: state === "watch-approve-tx" && hash !== undefined,
    onSettled(data, error) {
      if (error) {
        console.log(error);
        setError(error.message);
        return;
      }
      if (data) {
        setState("complete");
      }
    },
  });

  useEffect(() => {
    if (state === "none" || state === "pre-read-allowance") {
      return;
    }

    if (state === "read-allowance") {
      if (allowanceType === "ERC20" || allowanceType === ExchangeType.ERC20) {
        if (ERC20Allowance && ERC20Allowance >= parseEther(amount)) {
          setState("complete");
        } else {
          setState("pre-approve");
        }
      } else if (
        allowanceType === "ERC721" ||
        allowanceType === ExchangeType.ERC721
      ) {
        if (ERC721Allowance && ERC721Allowance === true) {
          setState("complete");
        } else {
          setState("pre-approve");
        }
      }
    }

    if (state === "pre-approve") {
      if (allowanceType === "ERC20" || allowanceType === ExchangeType.ERC20) {
        approveERC20();
      } else if (
        allowanceType === "ERC721" ||
        allowanceType === ExchangeType.ERC721
      ) {
        approveERC721();
      }
      setState("approve");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return {
    init: () => setState("pre-read-allowance"),
    state,
  };
};
