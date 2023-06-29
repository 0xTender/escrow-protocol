import { type Dispatch, type SetStateAction, type FC } from "react";
import { useFormContext } from "react-hook-form";
import type { multiSwapFormSchema } from "./MultiSwapForm";
import type { z } from "zod";
import { TokenSelector } from "./ERC20Selector";

export const MultiSwapStepper: FC<{
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
}> = ({ activeStep }) => {
  const { watch } = useFormContext<z.infer<typeof multiSwapFormSchema>>();
  const form = watch();

  return (
    <>
      {activeStep === 0 && (
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
              description: "Token amount you will send.",
              placeholder: "0.0",
            }}
          ></TokenSelector>
        </>
      )}
    </>
  );
};
