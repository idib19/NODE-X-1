import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';


// USING A POST REQUEST TO RETRIEVE DATA IS POSSIBLE BUT IS PROBABLY
// NOT THE BEST WAY TO GO ABOUT THIS HERE !! TO UPDATE !!
export async function POST(
    req: Request,
    { params }: { params: { storeId: string } },
) {
    try {
        const body = await req.json();
        const { userId } = body
        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

          const orders = await prismadb.order.findMany({
            where: {
              storeId: params.storeId,
              clientId : userId
            },
            orderBy: {
              createdAt: 'desc',
            }
          });

        return NextResponse.json(orders);
    } catch (error) {
        console.log('[ORDERS_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};