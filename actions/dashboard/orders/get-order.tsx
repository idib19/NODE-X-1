// import { Order } from "@/types";
// import prismadb from "@/lib/prismadb";

// const URL = `${process.env.NEXT_PUBLIC_API_URL}/orders`;


// const getOrders = async (orderId : string | null): Promise<Order[]> => {
    
//     const order = await prismadb.order.findUnique({
//         where: {
//           id: orderId
//         },
//         include: {
//           orderItems: {
//             include: {
//               product: {
//                 include: {
//                   images: true
//                 }
//               }
//             }
//           }
//         }
//       });

//         const res = await fetch(URL, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ userId: userId }),
//         });

//         return res.json();
    
// };

// export default getOrders;