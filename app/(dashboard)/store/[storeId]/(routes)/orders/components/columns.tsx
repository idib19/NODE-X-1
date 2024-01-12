"use client"

import { ColumnDef } from "@tanstack/react-table"

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
}

export type OrderColumn2 = {
  id: string;
  name: string;
  date: string;
  totalPrice: string;
  status: boolean;
}

// ??? 
export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
];

export const columns2: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Commande",
  },
  {
    accessorKey: "phone",
    header: "Nom",
  },
  {
    accessorKey: "address",
    header: "Date",
  },
  {
    accessorKey: "totalPrice",
    header: "Prix",
  },
  {
    accessorKey: "isPaid",
    header: "Status",
  },
];
