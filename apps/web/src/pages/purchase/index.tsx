import { type NextPage } from "next";
import Head from "next/head";

import { cn } from "@app/utils";
import { api } from "@app/utils/api";
import { useAccount } from "wagmi";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { E_SwapStateChanged_SwapERC20Extension } from "@prisma/client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@app/components/ui/table";

import { ColumnDef } from "@tanstack/react-table";
import { AgreementStatus } from "@app/types";
import { Badge } from "@app/components/ui/badge";
import { millisecondsToStr, secondsToString } from "@app/utils/date";
import { Button } from "@app/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
} from "@app/components/ui/collapsible";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import Link from "next/link";

const getColor = (status: string) => {
  switch (status) {
    case AgreementStatus.Active:
      return "dark:bg-green-500 bg-green-400 hover:bg-green-500";
    case AgreementStatus.Expired:
      return "dark:bg-red-500 bg-red-400 hover:bg-red-400";
    case AgreementStatus.Cancelled:
      return "dark:bg-red-500 bg-red-400 hover:bg-red-400";
    case AgreementStatus.Completed:
      return "dark:bg-blue-500 bg-blue-400 hover:bg-blue-400";
    default:
      return "dark:bg-gray-500 bg-gray-400";
  }
};

export const columns: ColumnDef<
  E_SwapStateChanged_SwapERC20Extension & {
    status: AgreementStatus;
    initiatorTokenName: string;
    counterTokenName: string;
  }
>[] = [
  {
    accessorKey: "A_escrowId",
    header: "Agreement ID",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row, getValue }) => {
      const status: string = row.getValue("status");
      return (
        <Link href={"/purchase/" + row.getValue("A_escrowId")}>
          <Badge className={`${getColor(status)}`}>{status}</Badge>
        </Link>
      );
    },
  },
  {
    header: "From",
    accessorFn: (data) => data.A_initiator,
  },
  {
    accessorKey: "counterTokenName",
    header: "Token Requested",
  },
  {
    accessorKey: "initiatorTokenName",
    header: "Token Offered",
  },
  {
    accessorKey: "A_deadline",
    header: "Valid Till",
    cell: ({ row }) => {
      const deadline: number = parseInt(row.getValue("A_deadline")) * 1000;
      if (deadline > Date.now())
        return <>{secondsToString((deadline - Date.now()) / 1000)}</>;
      else return <></>;
    },
  },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

const PurchasePage: NextPage = () => {
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
        {data && (
          <>
            <DataTable columns={columns} data={data.instances}></DataTable>
          </>
        )}
      </div>
    </>
  );
};

export default PurchasePage;
