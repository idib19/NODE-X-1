import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function OPTIONS() {
    return NextResponse.json("ok", { status: 200 });
}

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const { orderItemsData, data, clientId } = await req.json();

        // Validate required fields
        if (!orderItemsData || orderItemsData.length === 0) {
            // More explicit error message for missing order items
            return new NextResponse("Order items are required to create an order.", { status: 400 });
        }

        // Ensuring clientId is present before proceeding
        if (!clientId) {
            // Changed status code to 401 for unauthorized requests which lack clientId
            return NextResponse.json({ message: "Unauthorized request: clientId is required." }, { status: 401 });
        }

        // Additional validation could include checking for the presence of other necessary data
        if (!data.name || !data.address || !data.phone || !data.email) {
            return new NextResponse("All customer details must be provided.", { status: 400 });
        }

        // Consider wrapping the orderItemsData mapping in a try-catch block to handle potential issues specifically
        let createdOrderItems;
        try {
            createdOrderItems = orderItemsData.map((item: { productId: string, options: { size: string, color: string } }) => ({
                product: { connect: { id: item.productId } },
                size: item.options.size,
                color: item.options.color
            }));
        } catch (error) {
            console.error("Error processing order items:", error);
            return new NextResponse("Invalid order item data provided.", { status: 400 });
        }

        // Database operation to create an order
        const order = await prismadb.order.create({
            data: {
                storeId: params.storeId,
                isPaid: false, // Consider if this should also be part of the input data
                name: data.name,
                phone: data.phone,
                address: data.address,
                email: data.email,
                clientId: clientId,
                orderItems: {
                    create: createdOrderItems
                },
            },
        });

        // Response to indicate successful creation, including order ID and client ID
        return NextResponse.json({
            message: "Order created successfully",
            orderId: order.id,
            clientId: clientId
        }, { status: 201 });

    } catch (error) {
        console.error("Error processing order:", error);
        // Provide a more descriptive server error message
        return new NextResponse("Internal server error while processing the order.", { status: 500 });
    }
}
