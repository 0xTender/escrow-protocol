"use client";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal, useWeb3Modal } from "@web3modal/react";
import { useState, useEffect, FC } from "react";
import { configureChains, createConfig, useAccount, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { localhost } from "viem/chains";
import { Button } from "./ui/button";

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
  toggle: () => void;
  theme: "dark" | "light";
}> = () => {
  const { address } = useAccount();
  const { open } = useWeb3Modal();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <>
      <main className="min-h-screen px-6 py-6 md:px-12">
        {hydrated && (
          <>
            <div className="mb-10 flex items-center justify-between">
              <div className="flex font-bold">Escrow Protocol</div>
              <div className="flex gap-4">
                {/*  */}
                <WagmiConfig config={wagmiConfig}>
                  <div>
                    <Button
                      onClick={() => {
                        open().catch(console.error);
                      }}
                      className="m-auto"
                    >
                      {address === undefined
                        ? "Connect Wallet"
                        : "Disconnect Wallet"}
                    </Button>
                  </div>
                </WagmiConfig>
              </div>
            </div>
            <>{address && <></>}</>
          </>
        )}
      </main>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
};
