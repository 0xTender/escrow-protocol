import { type NextPage } from "next";
import Head from "next/head";

// import { api } from "@app/utils/api";
import { WagmiWrapper } from "@app/components/WagmiWrapper";
import { useState } from "react";
import { cn } from "@app/utils";

const Home: NextPage = () => {
  const [theme, setTheme] = useState<"dark" | "light" | "front">("light");

  return (
    <>
      <Head>
        <title>Escrow Protocol - 0xTender</title>
        <meta name="description" content="Escrow Protocol - 0xTender" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className={cn("bg-background text-foreground", theme)}>
        <WagmiWrapper {...{ setTheme, theme }}></WagmiWrapper>
      </div>
    </>
  );
};

export default Home;
