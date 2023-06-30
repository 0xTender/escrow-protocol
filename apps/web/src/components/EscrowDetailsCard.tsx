import { ExchangeType } from "@app/types";
import { shortenAddress } from "@app/utils/web3";
import {
  type E_SwapStateChanged_MultiSwapExtension,
  type E_SwapStateChanged_SwapERC20Extension,
} from "@prisma/client";
import { ExternalLink } from "lucide-react";
import { type FC } from "react";
import { formatEther } from "viem";
import { useAccount } from "wagmi";

export const EscrowDetailsCard: FC<{
  data:
    | {
        extensionName: "MultiSwapExtension";
        details: E_SwapStateChanged_MultiSwapExtension;
      }
    | {
        extensionName: "SwapERC20Extension";
        details: E_SwapStateChanged_SwapERC20Extension;
      };
  pageType: "purchase" | "sale";
}> = ({ data, pageType }) => {
  const { address } = useAccount();
  return (
    <>
      <div className="flex items-center space-x-2">
        <div>
          Initiator:{" "}
          <span className="text-slate-500 dark:text-slate-400">
            {pageType === "sale" && address === data.details.A_initiator
              ? "You"
              : shortenAddress(data.details.A_initiator)}
          </span>
        </div>

        <ExternalLink className="h-4 cursor-pointer" />
      </div>
      <div>
        Counter:{" "}
        <span className="text-slate-500 dark:text-slate-400">
          {pageType === "purchase" && address === data.details.A_counter
            ? "You"
            : shortenAddress(data.details.A_counter)}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <div>
          Token Offered:{" "}
          <span className="text-slate-500 dark:text-slate-400">
            {shortenAddress(data.details.A_initiatorToken)}{" "}
          </span>
        </div>

        <ExternalLink className="h-4 cursor-pointer" />
      </div>
      <div>
        Token Amount Offered:{" "}
        <span className="text-slate-500 dark:text-slate-400">
          {data.extensionName === "SwapERC20Extension" ||
            (data.details?.A_initiatorExchange === `${ExchangeType.ERC20}` &&
              formatEther(BigInt(data.details.A_initiatorAmount)).toString())}

          {data.extensionName === "MultiSwapExtension" &&
            data.details.A_initiatorExchange === `${ExchangeType.ERC721}` &&
            `Token with id ${data.details.A_initiatorAmount}`}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <div>
          Token Requested:{" "}
          <span className="text-slate-500 dark:text-slate-400">
            {shortenAddress(data.details.A_counterToken)}{" "}
          </span>
        </div>
        <ExternalLink className="h-4 cursor-pointer" />
      </div>
      <div>
        Token Amount Requested:{" "}
        <span className="text-slate-500 dark:text-slate-400">
          {data.extensionName === "SwapERC20Extension" ||
            (data.details?.A_counterExchange === `${ExchangeType.ERC20}` &&
              formatEther(BigInt(data.details.A_counterAmount)).toString())}
          {data.extensionName === "MultiSwapExtension" &&
            data.details.A_counterExchange === `${ExchangeType.ERC721}` &&
            `Token with id ${data.details.A_counterAmount}`}
        </span>
      </div>
    </>
  );
};
