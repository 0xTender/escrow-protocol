import React, { useState, type FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Gradient,
} from "../ui/card";
import { ExchangeNames, ExchangeType } from "@app/types";
import { cn } from "@app/utils";

const InnerCard: FC<
  {
    initiatorExchange: ExchangeType;
    counterExchange: ExchangeType;
  } & React.HTMLAttributes<HTMLDivElement>
> = ({ initiatorExchange, counterExchange, ...props }) => {
  return (
    <Card
      className={cn(
        "w-80 cursor-pointer rounded-none dark:rounded-xl dark:bg-[#1B1B1B]",
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
    initiatorExchange?: ExchangeType;
    counterExchange?: ExchangeType;
  }>({});

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
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-8 p-8  md:justify-between">
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
        </CardContent>
      </Card>
    </>
  );
};
