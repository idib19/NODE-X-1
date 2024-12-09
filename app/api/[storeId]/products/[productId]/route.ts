import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    // Check if productId is provided
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    // Fetch product with related data
    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId
      },
      include: {
        images: true,
        category: true,
        variants: {
          select: {
            stockQuantity: true,
            attributes: {
              select: {
                attributeValue: {
                  select: {
                    name: true,
                    value: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // Check if product exists
    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    // Transform product data
    // const transformedProduct = {
    //   id: product.id,
    //   name: product.name,
    //   description: product.description,
    //   price: parseFloat(product.price.toString()),
    //   category: product.category.name,
    //   mainImage: product.images.length > 0 ? product.images[0].url : null,
    //   sizes: product.variants.flatMap(variant => 
    //     variant.attributes.map(attribute => ({
    //       name: attribute.attributeValue.name,
    //       value: attribute.attributeValue.value,
    //       stock: variant.stockQuantity
    //     }))
    //   )
    // };

    // Return the transformed product data
    return NextResponse.json(JSON.stringify(product));
  } catch (error) {
    console.log('[PRODUCT_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }
    // validation function - midleware here !!! it checks the token roles and permissions validity
    // we should set up a validation function here scalable and efficient. using
    // using either tokens. cessions or basic permissions checking

    const isAuthorised = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        users: {
          some: {
            id: userId
          }
        }
      }
    });

    if (!isAuthorised) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const product = await prismadb.product.delete({
      where: {
        id: params.productId
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCTiD_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { productId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, price, categoryId, images, isFeatured, isArchived } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }


    const isAuthorised = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        users: {
          some: {
            id: userId
          }
        }
      }
    });

    if (!isAuthorised) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    await prismadb.product.update({
      where: {
        id: params.productId
      },
      data: {
        name,
        price,
        categoryId,
        images: {
          deleteMany: {},
        },
        isFeatured,
        isArchived,
      },
    });

    const product = await prismadb.product.update({
      where: {
        id: params.productId
      },
      data: {
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image),
            ],
          },
        },
      },
    })

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

