import { type NextPage } from "next";
import Head from "next/head";

// import { api } from "@app/utils/api";
import { WagmiWrapper } from "@app/components/WagmiWrapper";
import { useState } from "react";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const [theme, setTheme] = useState<"dark" | "light">("light");
  const toggle = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  return (
    <>
      <Head>
        <title>Escrow Protocol - 0xTender</title>
        <meta name="description" content="Escrow Protocol - 0xTender" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="bg-background text-foreground">
        <WagmiWrapper {...{ toggle, theme }}></WagmiWrapper>
      </div>
    </>
  );
};

export default Home;
