export type AddressType = `0x${string}`;

export function shortenAddress(address: AddressType) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
