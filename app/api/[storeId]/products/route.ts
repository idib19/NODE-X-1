import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import prismadb from '@/lib/prismadb';
import { validateRequestAndAuthorize } from '@/permissions/checkStorePermission';
import validator from 'validator';

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { userId } = auth();
    const validateRequest = await validateRequestAndAuthorize(params.storeId, userId!, params.storeId)

    if (validateRequest.error) {
      return NextResponse.json({ error: validateRequest.error }, { status: validateRequest.status });
    }

    // Sanitize and Validate storeId
    const sanitizedStoreId = validator.trim(validator.escape(params.storeId));
    if (!validator.isUUID(sanitizedStoreId)) {
      return new NextResponse("Invalid store id format", { status: 400 });
    }

    const body = await req.json();
    let { name, price, categoryId, colorId, sizeId, images, isFeatured, isArchived } = body;

    // Validate and Sanitize name
    if (typeof name !== "string") {
      return new NextResponse("Name must be a string", { status: 400 });
    }
    name = validator.trim(validator.escape(name));

    // Validate price
    if (typeof price !== "number" || isNaN(price) || price < 0) {
      return new NextResponse("Invalid price: must be a non-negative number", { status: 400 });
    }
    // Sanitize and Validate UUIDs: categoryId, colorId, sizeId
    [categoryId, colorId, sizeId].forEach(id => {
      if (!validator.isUUID(id)) {
        throw new Error("Invalid ID format");
      }
    });

    // Validate images
    if (!Array.isArray(images) || images.some(image => typeof image.url !== "string")) {
      return new NextResponse("Invalid images format", { status: 400 });
    }

    // Validate booleans: isFeatured, isArchived
    if (typeof isFeatured !== "boolean" || typeof isArchived !== "boolean") {
      return new NextResponse("Invalid boolean fields", { status: 400 });
    }

    // Create product
    const product = await prismadb.product.create({
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        colorId,
        sizeId,
        storeId: sanitizedStoreId,
        images: {
          createMany: {
            data: images.map(image => ({ url: image.url })),
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCTS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};



export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get('categoryId') || undefined;
    const colorId = searchParams.get('colorId') || undefined;
    const sizeId = searchParams.get('sizeId') || undefined;
    const isFeatured = searchParams.get('isFeatured');

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
