import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const { productIds, data } = await req.json();

        // Validate required fields
        if (!productIds || productIds.length === 0) {
            return new NextResponse("Product ids are required", { status: 400 });
        }

        // Create order in the database
        const order = await prismadb.order.create({
            data: {
                storeId: params.storeId,
                isPaid: false,
                name: data.name,
                phone: data.phone,
                address: data.address,
                email: data.email,
                orderItems: {
                    create: productIds.map((productId: string) => ({
                        product: {
                            connect: {
                                id: productId,
                            },
                        },
                    })),
                },
            },
        });

        return NextResponse.json({ message: "success order created" }, { headers: corsHeaders })

    } catch (error) {
        console.error("Error processing order:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
