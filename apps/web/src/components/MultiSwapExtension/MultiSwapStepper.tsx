import { type Dispatch, type SetStateAction, type FC, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import type { multiSwapFormSchema } from "./MultiSwapForm";
import type { z } from "zod";
import { TokenSelector } from "./ERC20Selector";
import { Button } from "@app/components/ui/button";
import { CounterParty } from "@app/components/CreateStepper/CounterParty";
import { Deadline } from "@app/components/CreateStepper/Deadline";

export const MultiSwapStepper: FC<{
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
}> = ({ activeStep, setActiveStep }) => {
  const { watch, formState, setFocus } =
    useFormContext<z.infer<typeof multiSwapFormSchema>>();
  const form = watch();

  useEffect(() => {
    if (activeStep === 0) {
      setFocus("counterParty");
    }
    if (activeStep === 1) {
      setFocus("initiatorToken");
    }
    if (activeStep === 3) {
      setFocus("counterToken");
    }
  }, [activeStep, setFocus]);

  console.log(form);

  return (
    <>
      {activeStep === 0 && (
        <div>
          <div className="flex w-full gap-2">
            <CounterParty setActiveStep={setActiveStep}></CounterParty>
          </div>
        </div>
      )}
      {activeStep === 1 && (
        <>
          <TokenSelector
            values={{
              amount: "initiatorAmount",
              token: "initiatorToken",
            }}
            exchange={form.initiatorExchange}
            token={{
              label: "Initiator Token",
              description: "Token you will send.",
              placeholder: "0x...",
            }}
            amount={{
              label: "Initiator Amount",
              description: "Token amount/id you will send.",
              placeholder: "0",
            }}
          ></TokenSelector>
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
              disabled={
                formState.errors.initiatorAmount !== undefined &&
                formState.errors.initiatorToken !== undefined
              }
              onClick={() => {
                if (
                  formState.errors.initiatorAmount === undefined &&
                  formState.errors.initiatorToken === undefined
                ) {
                  setActiveStep((s) => s + 1);
                }
              }}
            >
              Next
            </Button>
          </div>
        </>
      )}

      {activeStep === 2 && (
        <>
          <TokenSelector
            values={{
              amount: "counterAmount",
              token: "counterToken",
            }}
            exchange={form.counterExchange}
            token={{
              label: "Counter Token",
              description: "Token you will receive.",
              placeholder: "0x...",
            }}
            amount={{
              label: "Counter Amount",
              description: "Token amount/id you will receive.",
              placeholder: "0",
            }}
          ></TokenSelector>
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
              disabled={
                formState.errors.initiatorAmount !== undefined &&
                formState.errors.initiatorToken !== undefined
              }
              onClick={() => {
                if (
                  formState.errors.initiatorAmount === undefined &&
                  formState.errors.initiatorToken === undefined
                ) {
                  setActiveStep((s) => s + 1);
                }
              }}
            >
              Next
            </Button>
          </div>
        </>
      )}

      {activeStep === 3 && (
        <>
          <Deadline setActiveStep={setActiveStep}></Deadline>
          <Button type="submit">Submit</Button>
        </>
      )}
    </>
  );
};
