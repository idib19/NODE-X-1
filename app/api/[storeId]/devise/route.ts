import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    const storeId = params.storeId;

    try {
        // Fetch the store with the given ID
        const storeCurrency = await prismadb.store.findUnique({
            where: {
                id: storeId
            },
            select: {
                currency: true // Only fetch the currency field
            }
        });

        // Check if the store was found
        if (!storeCurrency) {
            return NextResponse.json({ error: "Store Currency not found" }, { status: 400 });
        }

        // Respond with the currency of the store
        return NextResponse.json({ currency: storeCurrency.currency }, { status: 200 });

    } catch (error) {

        console.error('Failed to retrieve store currency:', error);
        return NextResponse.json(
            { message: 'Failed to retrieve store currency', error },
            { status: 500 }
        );
    }

}

