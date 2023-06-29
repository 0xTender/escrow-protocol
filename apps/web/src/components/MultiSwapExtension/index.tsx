import React, { useState, type FC, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Gradient } from "../ui/gradient";
import { ExchangeNames, ExchangeType } from "@app/types";
import { cn } from "@app/utils";
import { MultiSwapForm } from "./MultiSwapForm";
import { MoveLeft } from "lucide-react";

const InnerCard: FC<
  {
    initiatorExchange: ExchangeType;
    counterExchange: ExchangeType;
  } & React.HTMLAttributes<HTMLDivElement>
> = ({ initiatorExchange, counterExchange, ...props }) => {
  return (
    <Card
      className={cn(
        "min-w-[16rem] cursor-pointer rounded-none dark:rounded-xl dark:bg-[#1B1B1B] md:w-[32%]",
        props.className
      )}
      {...props}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 font-mono">
        <div className="h-16 w-16 font-bold">
          <Gradient className="rounded-xl dark:rounded-none" variant={"from"}>
            {ExchangeNames[initiatorExchange]}
          </Gradient>
          <div className="pt-2 text-center text-xs font-thin"> Send</div>
        </div>
        <div className="h-16 w-16 font-bold">
          <Gradient className="rounded-xl dark:rounded-none" variant={"to"}>
            {ExchangeNames[counterExchange]}
          </Gradient>
          <div className="pt-2 text-center text-xs font-thin">Receive</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="pr-4 pt-4 font-mono text-sm font-medium">
          Swap {ExchangeNames[initiatorExchange]} for{" "}
          {ExchangeNames[counterExchange]}
        </div>
      </CardContent>
    </Card>
  );
};

export const MultiSwapExtension: FC = () => {
  const [exchanges, setExchanges] = useState<{
    initiatorExchange: ExchangeType;
    counterExchange: ExchangeType;
  }>();

  const [error, setError] = useState<string>();

  useEffect(() => {
    setError(undefined);
  }, [exchanges]);

  return (
    <>
      <Card className="py-4 dark:rounded-xl dark:bg-[#1B1B1B]">
        <CardHeader>
          <CardTitle className="text-center font-thin uppercase tracking-widest">
            Select from multitude of options
          </CardTitle>
          <CardDescription className="text-center">
            You can select from ERC20, ERC721 and more.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {exchanges ? (
            <>
              <div
                className="flex cursor-pointer items-center space-x-2 pb-4 font-mono text-xs"
                onClick={() => setExchanges(undefined)}
              >
                <MoveLeft></MoveLeft>
                <div>Go Back</div>
              </div>
              <MultiSwapForm
                setError={(error: string) => setError(error)}
                {...exchanges}
              ></MultiSwapForm>
            </>
          ) : (
            <>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-8 p-8  md:justify-normal">
                <InnerCard
                  onClick={() => {
                    setExchanges({
                      initiatorExchange: ExchangeType.ERC20,
                      counterExchange: ExchangeType.ERC20,
                    });
                  }}
                  initiatorExchange={ExchangeType.ERC20}
                  counterExchange={ExchangeType.ERC20}
                />

                <InnerCard
                  onClick={() => {
                    setExchanges({
                      initiatorExchange: ExchangeType.ERC20,
                      counterExchange: ExchangeType.ERC721,
                    });
                  }}
                  initiatorExchange={ExchangeType.ERC20}
                  counterExchange={ExchangeType.ERC721}
                />

                <InnerCard
                  onClick={() => {
                    setExchanges({
                      initiatorExchange: ExchangeType.ERC721,
                      counterExchange: ExchangeType.ERC20,
                    });
                  }}
                  initiatorExchange={ExchangeType.ERC721}
                  counterExchange={ExchangeType.ERC20}
                />

                <InnerCard
                  onClick={() => {
                    setExchanges({
                      initiatorExchange: ExchangeType.ERC721,
                      counterExchange: ExchangeType.ERC721,
                    });
                  }}
                  initiatorExchange={ExchangeType.ERC721}
                  counterExchange={ExchangeType.ERC721}
                />
              </div>
            </>
          )}{" "}
        </CardContent>
        {error && (
          <CardFooter className="max-w-full break-words break-all">
            <div className="hyphens-auto text-red-400">
              {error?.split("\n").slice(-2)?.[0] ?? error}
            </div>
          </CardFooter>
        )}
      </Card>
    </>
  );
};
