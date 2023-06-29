import { type ClassValue, clsx } from "clsx";
import type { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export type FCC<T = object> = FC<PropsWithChildren<T>>;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
