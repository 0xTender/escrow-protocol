import { CreateSwapERC20Extension } from "@app/components/CreateSwapERC20Extension";
import { MultiSwapExtension } from "@app/components/MultiSwapExtension";
import { Extensions } from "@app/types";
import { cn } from "@app/utils";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CreatePage: NextPage = () => {
  const { query } = useRouter();
  const [create, setCreate] = useState<string>();

  useEffect(() => {
    if (query.extension === Extensions.SwapERC20Extension) {
      setCreate(Extensions.SwapERC20Extension);
    }
    if (query.extension === Extensions.MultiSwapExtension) {
      setCreate(Extensions.MultiSwapExtension);
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
        {create === Extensions.SwapERC20Extension && (
          <>
            <CreateSwapERC20Extension />
          </>
        )}
        {create === Extensions.MultiSwapExtension && (
          <>
            <MultiSwapExtension />
          </>
        )}
      </div>
    </>
  );
};

export default CreatePage;
