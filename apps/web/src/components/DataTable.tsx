import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { E_SwapStateChanged_SwapERC20Extension } from "@prisma/client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@app/components/ui/table";

import type { ColumnDef } from "@tanstack/react-table";
import { AgreementStatus } from "@app/types";
import { Badge } from "@app/components/ui/badge";
import { secondsToString } from "@app/utils/date";

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

export const columns: (typeData: "purchase" | "sale") => ColumnDef<
  E_SwapStateChanged_SwapERC20Extension & {
    status: AgreementStatus;
    initiatorTokenName: string;
    counterTokenName: string;
  }
>[] = (typeData) => [
  {
    accessorKey: "A_escrowId",
    header: "Agreement ID",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      const escrowId: string = row.getValue("A_escrowId");
      return (
        <Link href={`/${typeData}/${escrowId}`}>
          <Badge className={`${getColor(status)}`}>{status}</Badge>
        </Link>
      );
    },
  },
  ...[
    typeData === "purchase"
      ? {
          header: "From",
          accessorKey: "A_initiator",
        }
      : { header: "To", accessorKey: "A_counter" },
  ],
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

export interface DataTableProps<TData, TValue> {
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
