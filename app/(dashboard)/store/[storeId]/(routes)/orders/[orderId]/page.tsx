import prismadb from "@/lib/prismadb";
import OrderDetails from "./components/orderDetails";

const OrderDetailsPage = async ({
    params
  }: {
    params: { orderId: string }
  }) => {
  
    // get specific order 
    const order = await prismadb.order.findUnique({
      where: {
        id: params.orderId
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });
  
   
  
    // const formattedOrders: OrderColumn[] = orders.map((item) => ({
    //   id: item.id,
    //   tel: item.phone,
    //   name: item.name,
    //   // address: item.address,
    //   // products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
    //   price: formatter.format(item.orderItems.reduce((total, item) => {
    //     return total + Number(item.product.price)
    //   }, 0)),
    //   status: item.isPaid,
    //   date: format(item.createdAt, 'MMMM do, yyyy'),
    // }));
    
    
  
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
           <OrderDetails/>
        </div>
      </div>
    );
  };
  
  export default OrderDetailsPage;
  