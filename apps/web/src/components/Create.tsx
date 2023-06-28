import { FC, useState } from "react";
import {
  useAccount,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { EscrowABI, TetherABI, WrappedEtherABI } from "@root/core";
import { getAddress } from "@app/utils/web3";
import { Input } from "@app/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { encodeAbiParameters } from "viem";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { swapERC20FormSchema } from "@app/hooks/interactions/useSwapERC20";

export const Create: FC = () => {
  const form = useForm<z.infer<typeof swapERC20FormSchema>>({
    resolver: zodResolver(swapERC20FormSchema),
    defaultValues: {},
  });

  const { address } = useAccount();

  const { writeAsync } = useContractWrite({
    address: getAddress("Escrow"),
    abi: EscrowABI,
    functionName: "beginEscrow",
  });

  useContractReads({
    enabled: !!address,
    contracts: [
      {
        abi: TetherABI,
        address: getAddress("Tether"),
        functionName: "balanceOf",
        args: [address!],
      },
      {
        abi: WrappedEtherABI,
        address: getAddress("WrappedEther"),
        functionName: "balanceOf",
        args: [address!],
      },
    ],
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an agreement</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          className="space-y-8"
          onSubmit={form.handleSubmit((data) => {
            console.log(data);

            writeAsync({
              args: [
                getAddress("SwapERC20Extension"),
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
          })}
        >
          <CardContent>
            <FormField
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Counter Party</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter exchange with this signatory: 0x..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter exchange with this signatory
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
              name="counterParty"
              control={form.control}
            ></FormField>

            <FormField
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Initiator Token</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Token you will send for exchange: 0x....."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Token you will send for exchange
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
              name="initiatorToken"
              control={form.control}
            ></FormField>
            <FormField
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Initiator Amount</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Amount of token you will send for exchange: 0.0"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Amount of token you will send for exchange
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
              name="initiatorAmount"
              control={form.control}
            ></FormField>

            <FormField
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Counter Token</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Token you will get from counter party"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Token you will get.</FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
              name="counterToken"
              control={form.control}
            ></FormField>
            <FormField
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Counter Amount</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Amount of token you will get in exchange: 0.0"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Amount of token you will get in exchange
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
              name="counterAmount"
              control={form.control}
            ></FormField>
          </CardContent>
          <CardFooter>
            <Button type="submit">Create Agreement</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
