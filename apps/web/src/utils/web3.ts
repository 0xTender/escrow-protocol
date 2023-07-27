import { addresses } from "@root/core";
import { env } from "@app/env.mjs";
import { isAddress, parseEther } from "viem";
import { z } from "zod";

export type AddressType = `0x${string}`;

export function shortenAddress(address: string | AddressType) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export const getContractAddress: (
  name: keyof (typeof addresses)[keyof typeof addresses]
) => `0x${string}` = (name) => {
  const chainId: string = env.NEXT_PUBLIC_CHAIN_ID.toString();
  const parsedChainId = z.enum(["1337", "1663"]).parse(chainId);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const chainAddresses = addresses[parsedChainId];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const returnAddress = z.custom<AddressType>().parse(chainAddresses[name]);
  return returnAddress;
};

export const zAddr = [
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (val: any) => {
    if (typeof val === "string" && val.startsWith("0x") && isAddress(val)) {
      return true;
    }
    return false;
  },
  {
    message: "Invalid address. Please provide a valid address.",
  },
] as const;

export const isAddr = [
  (e: string) => {
    return isAddress(e);
  },
  {
    message: "Invalid address. Please provide a valid address.",
  },
] as const;

export const isEtherWithGreaterThanZero = (
  e: string,
  greaterThanZero = true
) => {
  try {
    const x = parseEther(e);
    if (greaterThanZero && x === 0n) {
      return false;
    }
    return true;
  } catch (_) {
    return false;
  }
};
