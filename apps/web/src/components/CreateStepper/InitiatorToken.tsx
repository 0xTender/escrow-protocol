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

export const InitiatorToken: FC<{
  setActiveStep: Dispatch<SetStateAction<number>>;
}> = ({ setActiveStep }) => {
  const { watch, formState, setFocus } = useFormContext();
  const form = watch();
  useEffect(() => {
    setFocus("initiatorToken");
  }, [setFocus]);
  return (
    <>
      <FormField
        render={({ field }) => {
          return (
            <FormItem className="pb-3 leading-tight">
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
                  tabIndex={0}
                  disabled={formState.errors.initiatorToken !== undefined}
                  onClick={() => {
                    if (formState.errors.initiatorToken === undefined) {
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
        name="initiatorToken"
        control={form.control}
      ></FormField>
    </>
  );
};
