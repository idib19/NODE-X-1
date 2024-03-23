import prismadb from "@/lib/prismadb";
import { OrderDetails } from "./components/orderDetails";

import { OrderStatusProvider } from '@/providers/utils/orderStatusProvider'

const OrderDetailsPage = async ({
  params
}: {
  params: { orderId: string }
}) => {

  // get specific order data
  // BAD ARCHITECTURE HERE !! UI SHOULD NOT KNOW ABOUT DB !
  // NEEDS TO  BE A FETCH TO API/ORDERS/ORDERID/GET-ORDER-DETAILS
  const order = await prismadb.order.findUnique({
    where: {
      id: params.orderId
    },
    include: {
      orderItems: {
        include: {
          product: {
            include: {
              images: true
            }
          }
        }
      }
    }
  });



  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderStatusProvider>
          <OrderDetails order={order} />
        </OrderStatusProvider>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
