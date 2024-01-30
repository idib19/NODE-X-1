import prismadb from "@/lib/prismadb";

interface GraphData {
    name: string;
    total: number;
} 


export const getOrdersByStore = async (storeId: string)=> {
    const paidOrders = await prismadb.order.findMany({
        where: {
            storeId,
            isPaid: true,
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
        
    });
    return null;
}