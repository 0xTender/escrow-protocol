/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type Dispatch, type FC, type SetStateAction, useEffect } from "react";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const InitiatorAmount: FC<{
  setActiveStep: Dispatch<SetStateAction<number>>;
}> = ({ setActiveStep }) => {
  const { watch, formState, setFocus } = useFormContext();
  const form = watch();
  useEffect(() => {
    setFocus("initiatorAmount");
  }, [setFocus]);
  return (
    <>
      <FormField
        render={({ field }) => {
          return (
            <FormItem className="pb-3 leading-tight">
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
              <div className="flex gap-2">
                <Button
                  tabIndex={-1}
                  onClick={() => {
                    setActiveStep((s) => s - 1);
                  }}
                >
                  Prev
                </Button>
                <Button
                  disabled={formState.errors.initiatorAmount !== undefined}
                  onClick={() => {
                    if (formState.errors.initiatorAmount === undefined) {
                      setActiveStep((s) => s + 1);
                    }
                  }}
                >
                  Next
                </Button>
              </div>
            </FormItem>
          );
        }}
        name="initiatorAmount"
        control={form.control}
      ></FormField>
    </>
  );
};
