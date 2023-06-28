import {
  isAddr,
  isEtherWithGreaterThanZero,
  AddressType,
  zAddr,
} from "@app/utils/web3";
import { useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import * as z from "zod";
import { ERC20ABI } from "@app/utils/interfaces/IERC20ABI";
import { getAddress } from "viem";

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

export const useSwapERC20 = () => {
  const [data, setData] = useState<z.infer<typeof swapERC20FormSchema>>();
  const { address } = useAccount();

  useContractRead({
    address: (data?.initiatorToken as any) ?? "0x",
    abi: ERC20ABI,
    functionName: "allowance",
    enabled:
      !!data?.initiatorToken && getAddress("Escrow") !== "0x" && !!address,
    args: [address!, getAddress("Escrow")!],
  });

  return { setSwapData: setData };
};
