import {
  swapERC20FormSchema,
  useSwapERC20Create,
} from "@app/hooks/interactions/useSwapERC20";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { z } from "zod";
import { Form } from "./ui/form";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { CounterParty } from "./CreateStepper/CounterParty";
import { InitiatorToken } from "./CreateStepper/InitiatorToken";
import { InitiatorAmount } from "./CreateStepper/InitiatorAmount";
import { CounterToken } from "./CreateStepper/CounterToken";
import { CounterAmount } from "./CreateStepper/CounterAmount";
import { Deadline } from "./CreateStepper/Deadline";
import { Button } from "./ui/button";

const FormStepper: FC<{
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
}> = ({ activeStep, setActiveStep }) => {
  switch (activeStep) {
    case 0:
      return <CounterParty setActiveStep={setActiveStep} />;

    case 1:
      return <InitiatorToken setActiveStep={setActiveStep} />;

    case 2:
      return <InitiatorAmount setActiveStep={setActiveStep} />;

    case 3:
      return <CounterToken setActiveStep={setActiveStep} />;

    case 4:
      return <CounterAmount setActiveStep={setActiveStep} />;

    case 5:
      return <Deadline setActiveStep={setActiveStep} />;

    default:
      return <></>;
  }
};

export const Create: FC = () => {
  const form = useForm<z.infer<typeof swapERC20FormSchema>>({
    resolver: zodResolver(swapERC20FormSchema),
    defaultValues: {},
    mode: "all",
  });
  const [activeStep, setActiveStep] = useState(0);

  const { setSwapData, error, initSwap } = useSwapERC20Create();

  return (
    <>
      <Card className="py-4 dark:rounded-xl dark:bg-[#1B1B1B]">
        <CardHeader>
          <CardTitle className="text-center">Create an agreement</CardTitle>
        </CardHeader>
        <FormProvider {...form}>
          <Form {...form}>
            <form
              className="space-y-8"
              onSubmit={(e) => {
                form.handleSubmit((data) => {
                  console.log(data);

                  if (activeStep === 5) {
                    setSwapData(data);
                    initSwap();
                  }
                })(e);
              }}
            >
              <CardContent className="mx-auto py-2 sm:max-w-[80%]">
                <FormStepper
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                />
                {activeStep === 5 && (
                  <div className="pt-4">
                    <Button type="submit">Submit</Button>
                  </div>
                )}
                <div className="py-2">Page {activeStep + 1} / Page 6</div>
                <div></div>
              </CardContent>
            </form>
          </Form>
        </FormProvider>
        {error && (
          <CardFooter className="mx-auto break-words break-all sm:max-w-[80%]">
            <div className="hyphens-auto text-red-400">
              {error?.split("\n").slice(-2)?.[0] ?? error}
            </div>
          </CardFooter>
        )}
      </Card>
    </>
  );
};
