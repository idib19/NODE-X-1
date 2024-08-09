import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

  export interface AttributeValue {
    id: string;
    name: string;
    value: string;
  };
  
  export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
  ) {
    try {
      if (!params?.storeId) {
        return NextResponse.json("Store id is required", { status: 400 });
      }
  
      const attributeValues = await prismadb.attributeValue.findMany({
        where: {
          attribute: {
            storeId: params.storeId,
          },
        },
        include: {
          attribute: true,
        },
      });
  
      // Transform data to match the AttributeValue interface
      const result: AttributeValue[] = attributeValues.map(av => ({
        id: av.id,
        name: av.name,
        value: av.value,
      }));
  
      return NextResponse.json(result);
    } catch (error) {
      console.log('[ATTRIBUTE_GET]', error);
      return NextResponse.json("Internal error", { status: 500 });
    }
  }
