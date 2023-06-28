import { type NextPage } from "next";
import Head from "next/head";

// import { api } from "@app/utils/api";
import { WagmiWrapper } from "@app/components/WagmiWrapper";
import { useContext, useState } from "react";
import { cn } from "@app/utils";
import { ThemeContext } from "@app/hooks/useTheme";
import { Create } from "@app/components/Create";

const HomePage: NextPage = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <Head>
        <title>Escrow Protocol - Create Agreement - 0xTender</title>
        <meta name="description" content="Escrow Protocol - 0xTender" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className={cn("bg-background text-foreground", theme)}>
        <Create />
      </div>
    </>
  );
};

export default HomePage;
