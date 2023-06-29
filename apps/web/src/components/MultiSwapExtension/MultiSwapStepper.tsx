import { type Dispatch, type SetStateAction, type FC } from "react";
import { useFormContext } from "react-hook-form";
import type { multiSwapFormSchema } from "./MultiSwapForm";
import type { z } from "zod";
import { TokenSelector } from "./ERC20Selector";

export const MultiSwapStepper: FC<{
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
}> = ({ activeStep }) => {
  const { watch, formState } =
    useFormContext<z.infer<typeof multiSwapFormSchema>>();
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
            label={"Token you will send."}
            placeholder={"0.0"}
          ></TokenSelector>
        </>
      )}
    </>
  );
};
