import { NextResponse } from "next/server";


import prismadb from "@/lib/prismadb";
import { isAuthorised } from "@/permissions/checkStorePermission"; // need to check that before allowing UPDATE requests on order's status 
import { Console } from "console";

export async function GET(req: Request, { params }: { params: { orderId: string, storeId: string } }) {

    const { orderId, storeId } = params

    try {
        if (!orderId) {
            return new NextResponse("Order id is required", { status: 400 });
        }

        const orderStatus = await prismadb.order.findUnique({
            where: { id: orderId },
            select: { status: true },
        });

        if (orderStatus) {
            console.log("Order status:", orderStatus);
        } else {
            console.log("Order not found with ID:", orderId);
        }

        return NextResponse.json(orderStatus);

    } catch (error) {
        console.log('[orderId-Status_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};



export async function PATCH(req: Request, { params }: { params: { orderId: string, storeId: string } }) {

    const { orderId, storeId } = params;
    const status = await req.json();

    try {
        console.log(status)
        const updatedOrder = await prismadb.order.update({
            where: { id: orderId},
            data: { status : status},
        });
     
        if (updatedOrder) {
            console.log("Order status updated to :", updatedOrder.status);
        } else {
            console.log("Order could not be updated:", updatedOrder);
        }
        return NextResponse.json({ message: 'Order status updated successfully' }, { status: 200 });
    } catch (error) {
        console.log('[ORDER-STATUS_PATCH]', error);
        console.log('orderId ', orderId, "status ", status);

        return new NextResponse("Internal error", { status: 500 });
    }
};