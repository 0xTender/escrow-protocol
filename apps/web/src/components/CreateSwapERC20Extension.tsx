import {
  swapERC20FormSchema,
  useSwapERC20Create,
} from "@app/hooks/interactions/useSwapERC20";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { type z } from "zod";
import { Form } from "./ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { FormStepper } from "./Create";

export const CreateSwapERC20Extension: FC = () => {
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
                void form.handleSubmit((data) => {
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
