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
  tel: string;
  name: string;
  date: string;
  price: string;
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

export const columns2: ColumnDef<OrderColumn2>[] = [
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
];
