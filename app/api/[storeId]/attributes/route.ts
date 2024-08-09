import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';


export async function GET(
  req: Request,
    { params }: { params: { storeId: string } }
  ) {
    try {
      if (!params?.storeId) {
        return NextResponse.json("Store id is required", { status: 400 });
      }
  
      const attributes = await prismadb.attribute.findMany({
        where: {
          storeId: params.storeId,
        },
      });
  
      return NextResponse.json(attributes);
    } catch (error) {
      console.log('[ATTRIBUTE_GET]', error);
      return NextResponse.json("Internal error", { status: 500 });
    }
  }

  


export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // const { userId } = auth();

    const body = await req.json();

    const { name, userId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    // permission check, => to extract into its own module SRP
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        users: {
          some: {
            id: userId
          }
        }
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const attribute = await prismadb.attribute.create({
      data: {
        name,
        storeId: params.storeId
      }
    });

    return NextResponse.json("Attribute create with sucess:" + attribute.name, {status:200});
  } catch (error) {
    console.log('[ATTRIBUTE_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


