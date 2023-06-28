import { type ClassValue, clsx } from "clsx";
import { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export type FCC<T = {}> = FC<PropsWithChildren<T>>;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
