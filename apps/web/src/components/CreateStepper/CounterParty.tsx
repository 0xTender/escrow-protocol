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

export const CounterParty: FC<{
  setActiveStep: Dispatch<SetStateAction<number>>;
}> = ({ setActiveStep }) => {
  const { watch, formState, setFocus } = useFormContext();
  const form = watch();
  useEffect(() => {
    setFocus("counterParty");
  }, []);
  return (
    <>
      <FormField
        render={({ field }) => {
          return (
            <FormItem className="pb-3 leading-tight">
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

              <Button
                disabled={formState.errors.counterParty !== undefined}
                onClick={() => {
                  if (formState.errors.counterParty === undefined) {
                    setActiveStep((s) => s + 1);
                  }
                }}
              >
                Next
              </Button>
            </FormItem>
          );
        }}
        name="counterParty"
        control={form.control}
      ></FormField>
    </>
  );
};
