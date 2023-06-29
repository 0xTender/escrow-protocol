"use client";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal, useWeb3Modal } from "@web3modal/react";
import { useState, useEffect, useContext } from "react";

import { Moon, Sun } from "lucide-react";
import { configureChains, createConfig, useAccount, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { localhost } from "viem/chains";
import { Button } from "./ui/button";
import { cn } from "@app/utils";
import type { FCC } from "@app/utils";
import { ThemeContext } from "@app/hooks/useTheme";
import Link from "next/link";

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

export const WagmiWrapper: FCC = ({ children }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { address } = useAccount();
  const { open } = useWeb3Modal();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!localStorage) {
      return;
    }
    const localTheme = localStorage.getItem("theme");
    console.log({ localTheme });
    if (localTheme === "dark" || localTheme === "light") {
      setTheme(localTheme);
    }
  }, [hydrated]);

  return (
    <>
      <main className={cn("min-h-screen px-6 py-6 md:px-12")}>
        {hydrated && (
          <>
            <div className={"mb-10 flex items-center justify-between"}>
              <Link href="/">
                <div className="font-bold">0xTender</div>
                <div className="font-mono text-sm">Escrow</div>
              </Link>
              <div className="gap-4">
                <div className="flex items-center space-x-2">
                  <Button
                    className={"rounded-none dark:rounded-lg"}
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
                  <Button
                    className="rounded-none dark:rounded-lg"
                    onClick={() => {
                      if (theme === "dark") {
                        return setTheme("light");
                      } else {
                        return setTheme("dark");
                      }
                    }}
                  >
                    {theme === "light" && <Moon />}
                    {theme === "dark" && <Sun />}
                  </Button>
                </div>
              </div>
            </div>

            <>
              {address && (
                <>
                  <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
                </>
              )}
            </>
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
