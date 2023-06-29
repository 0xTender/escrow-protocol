import { type NextPage } from "next";
import Head from "next/head";

// import { api } from "@app/utils/api";
import { cn } from "@app/utils";
import { Create } from "@app/components/Create";

const CreatePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Escrow Protocol - Create Agreement - 0xTender</title>
        <meta name="description" content="Escrow Protocol - 0xTender" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className={cn("bg-background text-foreground")}>
        <Create />
      </div>
    </>
  );
};

export default CreatePage;
