import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function OPTIONS() {
    return NextResponse.json("ok", { status: 200 });
}

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const { orderItemsData, data } = await req.json();

        // Validate required fields
        if (!orderItemsData || orderItemsData.length === 0) {
            return new NextResponse("Order items are required", { status: 400 });
        }

        // Create order in the database => extract into its a query function and take it out from the handler file here 
        const order = await prismadb.order.create({
            data: {
                storeId: params.storeId,
                isPaid: false,
                name: data.name,
                phone: data.phone,
                address: data.address,
                email: data.email,
                clientId: data.clientId,
                orderItems: {
                    create: orderItemsData.map((item: { productId: string, options: { size: string, color: string } }) => ({
                        product: {
                            connect: {
                                id: item.productId,
                            },
                        },
                        size: item.options.size,
                        color: item.options.color
                    })),
                },
            },
        });

        return NextResponse.json({ message: "Order created successfully" + order.id }, { status: 201 });
        

    } catch (error) {
        console.error("Error processing order:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
