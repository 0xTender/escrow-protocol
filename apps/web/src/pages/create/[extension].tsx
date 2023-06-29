import { CreateSwapERC20Extension } from "@app/components/CreateSwapERC20Extension";
import { cn } from "@app/utils";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CreatePage: NextPage = () => {
  const { query } = useRouter();
  const [create, setCreate] = useState<string>();

  useEffect(() => {
    if (query.extension === "SwapERC20Extension") {
      setCreate("SwapERC20Extension");
    }
    if (query.extension === "MultiSwapExtension") {
      setCreate("MultiSwapExtension");
    }
  }, [query]);
  return (
    <>
      <Head>
        <title>Escrow Protocol - Create Agreement - 0xTender</title>
        <meta name="description" content="Escrow Protocol - 0xTender" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className={cn("bg-background text-foreground")}>
        {create === "SwapERC20Extension" && (
          <>
            <CreateSwapERC20Extension />
          </>
        )}
        {create === "MultiSwapExtension" && <></>}
      </div>
    </>
  );
};

export default CreatePage;
