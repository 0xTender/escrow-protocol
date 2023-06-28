import { addresses } from "@root/core";
import { env } from "@app/env.mjs";

export type AddressType = `0x${string}`;

export function shortenAddress(address: AddressType) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export const getAddress = (
  name: keyof (typeof addresses)[keyof typeof addresses]
) => {
  return (addresses as any)[env.NEXT_PUBLIC_CHAIN_ID.toString()][name];
};
