import { addresses } from "@root/core";
import { env } from "@app/env.mjs";
import { isAddress, parseEther } from "viem";

export type AddressType = `0x${string}`;

export function shortenAddress(address: AddressType) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export const getAddress = (
  name: keyof (typeof addresses)[keyof typeof addresses]
) => {
  return (addresses as any)[env.NEXT_PUBLIC_CHAIN_ID.toString()][name];
};

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
    let x = parseEther(e);
    if (greaterThanZero && x === 0n) {
      return false;
    }
    return true;
  } catch (_) {
    return false;
  }
};
