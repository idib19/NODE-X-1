"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";

export type OrderColumn = {
  id: string;
  tel: string;
  name: string;
  date: string;
  price: string;
  status: boolean;
}


export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "id",
    header: "Commande",
  },
  
  {
    accessorKey: "name",
    header: "Nom",
  },
  {
    accessorKey: "tel",
    header: "Téléphone",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "price",
    header: "Prix",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
