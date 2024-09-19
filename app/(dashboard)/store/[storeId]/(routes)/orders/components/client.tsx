"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, OrderColumn } from "./columns";
import { useFormattedCurrency } from "@/hooks/curencyhooks";




interface OrderClientProps {
  data: OrderColumn[];
}




export const OrderClient: React.FC<OrderClientProps> = ({
  data
}) => {

  const { format } = useFormattedCurrency();

  const formattedData: OrderColumn[] = data.map(item => ({
    ...item,
    price: format(item.price)
  }));


  return (
    <>
      <Heading title={`Commandes (${data.length})`} description="Gérer vos commandes" />
      <Separator />
      {/*The DataTable components needs to be understood deeper*/}
      <DataTable searchKey="name" columns={columns} data={formattedData} />
    </>
  );
};
