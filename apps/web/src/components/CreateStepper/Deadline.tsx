/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type Dispatch, type FC, type SetStateAction, useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@app/utils";

export const Deadline: FC<{
  setActiveStep: Dispatch<SetStateAction<number>>;
}> = ({}) => {
  const { watch, setFocus } = useFormContext();
  const form = watch();
  useEffect(() => {
    setFocus("deadline");
  }, [setFocus]);
  return (
    <>
      <FormField
        control={form.control}
        name="deadline"
        render={({ field }) => {
          return (
            <FormItem className="flex w-full flex-col">
              <FormLabel>Deadline</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange as any}
                    handleChange={field.onChange as any}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          );
        }}
      ></FormField>
    </>
  );
};
