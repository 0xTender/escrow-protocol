"use client";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal, useWeb3Modal } from "@web3modal/react";
import { useState, useEffect, FC, Dispatch, SetStateAction } from "react";
import { configureChains, createConfig, useAccount, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { localhost } from "viem/chains";
import { Button } from "./ui/button";
import Image from "next/image";
import { cn } from "@app/utils";

const chains = [localhost];

const projectId = "a3b72b0c49a06b52469c2ea63d289f26";

const { publicClient } = configureChains(
  chains,
  [
    w3mProvider({ projectId: projectId }),
    alchemyProvider({ apiKey: "UNmYU0zAvct_GRHxQqMsCUFYbThTkhUJ" }),
    infuraProvider({ apiKey: "9ae618979ecd4afb9e6826f76deb4475" }),
    // publicProvider(),
  ],
  {
    stallTimeout: 5_000,
    pollingInterval: 15_000,
  }
);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

export const WagmiWrapper: FC<{
  setTheme: Dispatch<SetStateAction<"dark" | "light" | "front">>;
  theme: "dark" | "light" | "front";
}> = ({ theme }) => {
  const { address } = useAccount();
  const { open } = useWeb3Modal();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <>
      <main
        className={cn(
          "min-h-screen px-6 py-6 md:px-12",
          theme === "dark" ? "dark" : ""
        )}
      >
        {hydrated && (
          <>
            <div className={"mb-10 flex items-center justify-between"}>
              <div>
                <div className="font-bold">0xTender</div>
                <div className="font-mono text-sm">Escrow</div>
              </div>
              <div className="gap-4">
                <WagmiConfig config={wagmiConfig}>
                  <div>
                    <Button
                      className="rounded-none"
                      onClick={() => {
                        open().catch(console.error);
                      }}
                    >
                      {address === undefined ? (
                        "Connect Wallet"
                      ) : (
                        <>Disconnect Wallet</>
                      )}
                    </Button>
                  </div>
                </WagmiConfig>
              </div>
            </div>

            <>{address && <></>}</>
          </>
        )}
      </main>
      <Web3Modal
        themeMode={"dark"}
        projectId={projectId}
        ethereumClient={ethereumClient}
      />
    </>
  );
};
