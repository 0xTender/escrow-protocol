import { FC } from "react";
import { useAccount, useContractReads } from "wagmi";
import { TetherABI, WrappedEtherABI } from "@root/core";
import { getAddress } from "@app/utils/web3";
import { isAddress } from "viem";
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
} from "./ui/form";

const formSchema = z.object({
  initiatorToken: z.string().refine(
    (e) => {
      return isAddress(e);
    },
    {
      message: "Invalid address",
    }
  ),
});

export const Home: FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      initiatorToken: "",
    },
  });

  const { address } = useAccount();

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
    <div>
      <h1>Create an agreement</h1>
      <Form {...form}>
        <form onSubmit={(e) => e.preventDefault()}>
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
                </FormItem>
              );
            }}
            name="initiatorToken"
            control={form.control}
          ></FormField>
          {/* <Label htmlFor="initiator-token">Initiator Token</Label>
            <Input id="initiator-token" placeholder="Initiator Token" />
          </div>
          <div className="">
            <Label htmlFor="initiator-amount">Initiator Amount</Label>
            <Input id="initiator-amount" placeholder="Initiator Amount" />
          </div>
          <Button type="submit">Create Agreement</Button> */}
        </form>
      </Form>
    </div>
  );
};
