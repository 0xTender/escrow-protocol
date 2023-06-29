import { ExchangeNames, type ExchangeType } from "@app/types";
import { useState, type FC } from "react";
import { Badge } from "../ui/badge";
import { z } from "zod";
import {
  type AddressType,
  zAddr,
  isEtherWithGreaterThanZero,
  getContractAddress,
} from "@app/utils/web3";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { MultiSwapStepper } from "./MultiSwapStepper";
import { useAllowance } from "@app/hooks/useAllowance";

export const multiSwapFormSchema = z.object({
  counterParty: z.custom<AddressType>(...zAddr),
  initiatorToken: z.custom<AddressType>(...zAddr),
  initiatorAmount: z.string().min(1).refine(isEtherWithGreaterThanZero, {
    message:
      "Invalid amount. Please provide a valid amount in the unit ether and greater than zero.",
  }),
  counterToken: z.custom<AddressType>(...zAddr),
  counterAmount: z.string().refine(isEtherWithGreaterThanZero, {
    message:
      "Invalid amount. Please provide a valid amount in the unit ether and greater than zero",
  }),
  deadline: z.date({
    required_error: "A deadline is required.",
  }),
  initiatorExchange: z.custom<ExchangeType>(),
  counterExchange: z.custom<ExchangeType>(),
});

export const MultiSwapForm: FC<{
  initiatorExchange: ExchangeType;
  counterExchange: ExchangeType;
  setError: (error: string) => void;
}> = ({ initiatorExchange, counterExchange, setError }) => {
  const form = useForm<z.infer<typeof multiSwapFormSchema>>({
    resolver: zodResolver(multiSwapFormSchema),
    defaultValues: {
      initiatorExchange,
      counterExchange,
    },
    mode: "all",
  });
  const [activeStep, setActiveStep] = useState(0);

  const { init, state: allowanceState } = useAllowance({
    allowanceType: initiatorExchange,
    amount: form.watch("initiatorAmount") ?? "0",
    spenderAddress: getContractAddress("SwapERC20Extension") ?? "0x",
    tokenAddress: form.watch("initiatorToken") ?? "0x",
    setError: (error) => {
      setError(error);
    },
  });
  console.log(allowanceState);

  return (
    <>
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-row gap-x-2">
          <span>
            <Badge className="rounded-full font-mono" variant={"from"}>
              Send:{ExchangeNames[initiatorExchange]}
            </Badge>
          </span>
          <span>
            <Badge className="rounded-full font-mono" variant={"to"}>
              Receive:{ExchangeNames[counterExchange]}
            </Badge>
          </span>
        </div>
        <FormProvider {...form}>
          <Form {...form}>
            <form
              className="space-y-8"
              onSubmit={(e) => {
                void form.handleSubmit((data) => {
                  console.log(data);
                  if (allowanceState !== "none") {
                    setError("");
                    init();
                  }
                })(e);
              }}
            >
              <MultiSwapStepper
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            </form>
          </Form>
        </FormProvider>
      </div>
    </>
  );
};
