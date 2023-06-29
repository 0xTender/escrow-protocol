import { ExchangeNames, ExchangeType } from "@app/types";
import { api } from "@app/utils/api";
import { useEffect, type FC, useState, ChangeEvent } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { multiSwapFormSchema } from "@app/components/MultiSwapExtension/MultiSwapForm";
import { z } from "zod";
import { useFormContext } from "react-hook-form";
import { AddressType } from "@app/utils/web3";
import { Badge } from "../ui/badge";
import { Button } from "@app/components/ui/button";

export const TokenSelector: FC<{
  values:
    | { token: "initiatorToken"; amount: "initiatorAmount" }
    | { token: "counterToken"; amount: "counterAmount" };
  token: { placeholder: string; label: string; description: string };
  amount: { placeholder: string; label: string; description: string };
  exchange: ExchangeType;
}> = ({ values, exchange, token, amount }) => {
  const { data } = api.token.fetchTokens.useQuery(
    {
      exchange: ExchangeNames[exchange] ?? "ERC20",
    },
    {
      enabled: ExchangeNames[exchange] !== undefined,
    }
  );
  const { setValue } = useFormContext<z.infer<typeof multiSwapFormSchema>>();

  return (
    <span>
      {data && (
        <div className="flex gap-x-4 p-4 text-xs">
          Select from these:{" "}
          {data.map((token, idx) => {
            return (
              <Badge
                className="cursor-pointer rounded-none bg-background text-foreground"
                onClick={() =>
                  setValue(values.token, token.address as AddressType)
                }
                key={idx}
              >
                {token.name}
              </Badge>
            );
          })}
        </div>
      )}
      <FormField<z.infer<typeof multiSwapFormSchema>, typeof values.token>
        name={values.token}
        render={({ field }) => {
          return (
            <FormItem className="pb-3 leading-tight">
              <FormLabel>{token.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={token.placeholder}
                  {...field}
                  value={field.value}
                />
              </FormControl>
              <FormDescription>{token.description}</FormDescription>
              <FormMessage></FormMessage>
            </FormItem>
          );
        }}
      ></FormField>
      <FormField<z.infer<typeof multiSwapFormSchema>, typeof values.amount>
        name={values.amount}
        render={({ field }) => {
          return (
            <FormItem className="pb-3 leading-tight">
              <FormLabel>{amount.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={amount.placeholder}
                  {...field}
                  value={field.value}
                />
              </FormControl>
              <FormDescription>{amount.description}</FormDescription>
              <FormMessage></FormMessage>
            </FormItem>
          );
        }}
      ></FormField>
    </span>
  );
};
