import { type NextPage } from "next";
import Head from "next/head";

// import { api } from "@app/utils/api";
import { WagmiWrapper } from "@app/components/WagmiWrapper";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Escrow Protocol - 0xTender</title>
        <meta name="description" content="Escrow Protocol - 0xTender" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <WagmiWrapper></WagmiWrapper>
    </>
  );
};

export default Home;
