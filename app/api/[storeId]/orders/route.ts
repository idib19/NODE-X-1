import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import validator from 'validator';

// Centralized error handling
const handleError = (message: string, status: number) => {
  return new NextResponse(message, { status });
};

// Validation function
const validateInput = (userId: string, storeId: string) => {
  if (!userId) throw new Error("Client ID is required");
  if (!storeId) throw new Error("Store ID is required");
  if (!validator.isUUID(storeId)) throw new Error("Invalid Store ID format");
};

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = await req.json();
    validateInput(userId, params.storeId);

    const rawOrders = await prismadb.order.findMany({
      where: { storeId: params.storeId, clientId: userId },
      include: { orderItems: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });

    if (!rawOrders.length) return handleError("No orders found", 404);

    const orders = rawOrders.map(order => ({
      ...order,
      totalPrice: calculateTotalPrice(order)
    }));

    return NextResponse.json(orders);
    
  } catch (error) {
    console.error('[ORDERS_GET]', error);
    return handleError(error instanceof Error ? error.message : "Internal server error",
      error instanceof Error ? 400 : 500);
  }
};

// Function to calculate total price remains unchanged
const calculateTotalPrice = (order: any) => {
  return order.orderItems.reduce((total: any, item: any) => {
    return total + (item.product.price.toNumber() * item.quantity.toNumber());
  }, 0);
};



