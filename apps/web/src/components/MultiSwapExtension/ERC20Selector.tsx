import { ExchangeNames, ExchangeType } from "@app/types";
import { api } from "@app/utils/api";
import { useEffect, type FC } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export const TokenSelector: FC<{
  values:
    | { token: "initiatorToken"; amount: "initiatorAmount" }
    | { token: "counterToken"; amount: "counterAmount" };
  exchange: ExchangeType;
  placeholder: string;
  label: string;
}> = ({ values, exchange, placeholder, label }) => {
  const { data } = api.token.fetchTokens.useQuery(
    {
      exchange: ExchangeNames[exchange] ?? "ERC20",
    },
    {
      enabled: ExchangeNames[exchange] !== undefined,
    }
  );

  return (
    <>
      {exchange === ExchangeType.ERC20 && (
        <>
          <FormField
            name={values.token}
            render={({ field }) => {
              field.onChange = (e) => {
                console.log(e);
              };
              return (
                <FormItem className="pb-3 leading-tight">
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    <Input placeholder={placeholder} {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage></FormMessage>
                </FormItem>
              );
            }}
          ></FormField>
        </>
      )}
    </>
  );
};
