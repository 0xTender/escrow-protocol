import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useFormContext } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const CounterAmount: FC<{
  setActiveStep: Dispatch<SetStateAction<number>>;
}> = ({ setActiveStep }) => {
  const { watch, formState, setFocus } = useFormContext();
  const form = watch();
  useEffect(() => {
    setFocus("counterAmount");
  }, []);
  return (
    <>
      <FormField
        render={({ field }) => {
          return (
            <FormItem className="pb-3 leading-tight">
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
                  disabled={formState.errors.counterToken !== undefined}
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
        name="counterAmount"
        control={form.control}
      ></FormField>
    </>
  );
};
