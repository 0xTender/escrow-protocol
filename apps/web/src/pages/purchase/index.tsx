import { type NextPage } from "next";
import Head from "next/head";

import { cn } from "@app/utils";
import { api } from "@app/utils/api";
import { useAccount } from "wagmi";

import { DataTable, columns } from "@app/components/DataTable";
import Link from "next/link";

const SalePage: NextPage = () => {
  const { address } = useAccount();
  const { data } = api.escrow.purchases.useQuery(
    { address },
    {
      enabled: !!address,
      refetchInterval: 60 * 1000,
    }
  );
  return (
    <>
      <Head>
        <title>Escrow Protocol - Purchase Agreements - 0xTender</title>
        <meta name="description" content="Escrow Protocol - 0xTender" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className={cn("bg-background text-foreground")}>
        <Link href="/sale">
          <p className="my-2 text-sm text-muted-foreground underline">
            View Sale Agreements
          </p>
        </Link>
        {data && (
          <>
            <DataTable
              columns={columns("purchase")}
              data={data.instances}
            ></DataTable>
          </>
        )}
      </div>
    </>
  );
};

export default SalePage;
