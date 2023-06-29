import { FC } from "react";
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

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  swapERC20FormSchema,
  useSwapERC20Create,
} from "@app/hooks/interactions/useSwapERC20";
import { cn } from "@app/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";

export const Create2: FC = () => {
  const form = useForm<z.infer<typeof swapERC20FormSchema>>({
    resolver: zodResolver(swapERC20FormSchema),
    defaultValues: {},
  });

  const { setSwapData } = useSwapERC20Create();

  return (
    <Card className="dark:rounded-xl dark:bg-[#1B1B1B]">
      <CardHeader>
        <CardTitle>Create an agreement</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          className="space-y-8"
          onSubmit={form.handleSubmit((data) => {
            setSwapData(data);
          })}
        >
          <CardContent>
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
                  </FormItem>
                );
              }}
              name="counterParty"
              control={form.control}
            ></FormField>

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
                  </FormItem>
                );
              }}
              name="initiatorToken"
              control={form.control}
            ></FormField>
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
                  </FormItem>
                );
              }}
              name="initiatorAmount"
              control={form.control}
            ></FormField>

            <FormField
              render={({ field }) => {
                return (
                  <FormItem className="pb-3 leading-tight">
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
                  </FormItem>
                );
              }}
              name="counterAmount"
              control={form.control}
            ></FormField>

            {/*  */}
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col">
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
          </CardContent>
          <CardFooter>
            <Button type="submit">Create Agreement</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
