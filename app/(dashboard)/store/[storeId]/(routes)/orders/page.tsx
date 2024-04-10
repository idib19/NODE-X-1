import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { OrderColumn } from "./components/columns"
import { OrderClient } from "./components/client";

const OrdersPage = async ({
  params
}: {
  params: { storeId: string }
}) => {

  // HERE MY CLIENTS KNOWS ABOUT THE DATABASE !!!!!! BAD !! NEEDS TO CHANGE THAT TO RESPECT A GOOD ARCHITECTURE
  // WE WILL CALL AN INTERFACE ADAPTER OR A USE CASE THAT WILL FETCH TO API/ORDERS/GET-ALL-STORE-ORDERS
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });



  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    tel: item.phone,
    name: item.name,
    // address: item.address,
    // products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
    price: formatter.format(item.orderItems.reduce((total, item) => {
      return total + Number(item.product.price)
    }, 0)),
    status: item.status,
    date: format(item.createdAt, 'MMMM do, yyyy'),
  }));



  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
