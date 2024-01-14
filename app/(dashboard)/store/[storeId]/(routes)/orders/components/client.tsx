"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, OrderColumn, columns2, OrderColumn2 } from "./columns";





interface OrderClientProps {
  data: OrderColumn2[];
}




export const OrderClient: React.FC<OrderClientProps> = ({
  data
}) => {
  return (
    <>
      <Heading title={`Commandes (${data.length})`} description="Gérer vos commandes" />
      <Separator />
      {/*The DataTable components needs to be understood deeper*/}
      <DataTable searchKey="name" columns={columns2} data={data} />
    </>
  );
};
