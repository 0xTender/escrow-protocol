"use client";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal, useWeb3Modal } from "@web3modal/react";
import { useState, useEffect } from "react";
import { configureChains, createConfig, useAccount, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { bsc, bscTestnet } from "viem/chains";
import { shortenAddress } from "@app/utils/web3";

const chains = [bsc, bscTestnet];

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

export function WagmiWrapper() {
  const { address } = useAccount();
  const { open } = useWeb3Modal();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <>
      <main className="min-h-screen px-12 py-6">
        {hydrated && (
          <>
            <div className="mb-10 flex items-center justify-between">
              <div className="flex font-bold">Escrow Protocol</div>
              <div className="flex gap-4">
                <WagmiConfig config={wagmiConfig}>
                  {address && <div>{shortenAddress(address)}</div>}
                  <div>
                    <button onClick={open} className="m-auto">
                      {address === undefined
                        ? "Connect Wallet"
                        : "Disconnect Wallet"}
                    </button>
                  </div>
                </WagmiConfig>
              </div>
            </div>
            <>{address && <>Connected</>}</>
          </>
        )}
      </main>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}
