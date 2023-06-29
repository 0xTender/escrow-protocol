import { type Dispatch, type FC, type SetStateAction } from "react";

import { Card, CardContent, CardHeader, Gradient } from "./ui/card";

import { CounterParty } from "./CreateStepper/CounterParty";
import { InitiatorToken } from "./CreateStepper/InitiatorToken";
import { InitiatorAmount } from "./CreateStepper/InitiatorAmount";
import { CounterToken } from "./CreateStepper/CounterToken";
import { CounterAmount } from "./CreateStepper/CounterAmount";
import { Deadline } from "./CreateStepper/Deadline";
import Link from "next/link";

export const FormStepper: FC<{
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
  return (
    <>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-4 p-8  md:justify-normal">
        <Link href={"/create/SwapERC20Extension"}>
          <Card className="w-64 cursor-pointer rounded-none dark:rounded-xl dark:bg-[#1B1B1B] sm:w-80 md:w-60">
            <CardHeader>
              <div className="h-16 w-16 font-bold italic">
                <Gradient>ERC20</Gradient>
              </div>
            </CardHeader>
            <CardContent>
              <div className="pr-4 font-mono text-sm font-medium">
                SwapERC20
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href={"/create/MultiSwapExtension"}>
          <Card className="w-64 cursor-pointer rounded-none dark:rounded-xl dark:bg-[#1B1B1B] sm:w-80 md:w-60">
            <CardHeader className="flex-row justify-between">
              <div className="h-16  w-16 font-bold italic">
                <Gradient>Multi</Gradient>
              </div>
            </CardHeader>
            <CardContent>
              <div className="pr-4 font-mono text-sm font-medium">
                MultiSwap
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </>
  );
};
