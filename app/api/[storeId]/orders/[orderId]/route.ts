import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";
import { isAuthorised } from "@/permissions/checkStorePermission";


// Function to calculate total price
const calculateTotalPrice = (order: any) => {
    return order.orderItems.reduce((total: any, item: any) => {
        return total + (item.product.price.toNumber() * item.quantity.toNumber());
    }, 0);
};

export async function GET(
    req: Request,
    { params }: { params: { orderId: string } }
) {
    try {
        if (!params.orderId) {
            return new NextResponse("Order id is required", { status: 400 });
        }

        const rawOrder = await prismadb.order.findUnique({
            where: {
                id: params.orderId
            },
            include: {
                orderItems: {
                    include: {
                        product: {
                            include: {
                                images: true
                            }
                        }
                    }
                }
            }
        });

        if (!rawOrder) {
            return new NextResponse("Order not found", { status: 404 });
        }

        const totalPrice = calculateTotalPrice(rawOrder);
        const order = { ...rawOrder, totalPrice };

        return NextResponse.json(order);

    } catch (error) {
        console.log('[ORDER_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function DELETE(
    req: Request,
    { params }: { params: { orderId: string, storeId: string } }
) {
    try {
        const { userId } = auth();
        const storeId = params.storeId
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (!params.orderId) {
            return new NextResponse("Order id is required", { status: 400 });
        }
        // validation function - midleware here !!! it checks the token roles and permissions validity
        // we should set up a validation function here scalable and efficient. using
        // using either tokens. cessions or basic permissions checking

        const Authorised = await isAuthorised(storeId, userId)

        if (!Authorised) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // should be separated in a separate module for OCP 
        const order = await prismadb.order.findUnique({
            where: {
                id: params.orderId
            },
            include: {
                orderItems: true,
            }
        });

        if (!order) {
            return new NextResponse("Order not found", { status: 404 });
        }

        // we delete all the orderitems because their is a relation between two tables here 
        await Promise.all(order.orderItems.map(async (orderItem) => {
            await prismadb.orderItem.delete({
                where: {
                    id: orderItem.id
                }
            });
        }));

        const deletedorder = await prismadb.order.delete({
            where: {
                id: params.orderId
            }
        })

        return NextResponse.json(deletedorder);
    } catch (error) {
        console.log('[ORDERiD_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};


// export async function PATCH(
//   req: Request,
//   { params }: { params: { orderId: string, storeId: string } }
// ) {
//   try {
//     const { userId } = auth();

//     const body = await req.json();

//     // this should be updated to fit the requierement of an order
//     const { name, price, categoryId, images, colorId, sizeId, isFeatured, isArchived } = body;

//     if (!userId) {
//       return new NextResponse("Unauthenticated", { status: 403 });
//     }

//     if (!params.orderId) {
//       return new NextResponse("Product id is required", { status: 400 });
//     }

//     if (!name) {
//       return new NextResponse("Name is required", { status: 400 });
//     }

//     if (!images || !images.length) {
//       return new NextResponse("Images are required", { status: 400 });
//     }

//     if (!price) {
//       return new NextResponse("Price is required", { status: 400 });
//     }

//     if (!categoryId) {
//       return new NextResponse("Category id is required", { status: 400 });
//     }

//     if (!colorId) {
//       return new NextResponse("Color id is required", { status: 400 });
//     }

//     if (!sizeId) {
//       return new NextResponse("Size id is required", { status: 400 });
//     }

//     const isAuthorised = await prismadb.store.findFirst({
//       where: {
//         id: params.storeId,
//         users: {
//           some: {
//             id: userId
//           }
//         }
//       }
//     });

//     if (!isAuthorised) {
//       return new NextResponse("Unauthorized", { status: 405 });
//     }

//     await prismadb.order.update({
//       where: {
//         id: params.orderId
//       },
//       data: {
//         name,
//         price,
//         categoryId,
//         colorId,
//         sizeId,
//         images: {
//           deleteMany: {},
//         },
//         isFeatured,
//         isArchived,
//       },
//     });

//     const order = await prismadb.order.update({
//       where: {
//         id: params.orderId
//       },
//       data: {
//         images: {
//           createMany: {
//             data: [
//               ...images.map((image: { url: string }) => image),
//             ],
//           },
//         },
//       },
//     })

//     return NextResponse.json(order);
//   } catch (error) {
//     console.log('[PRODUCT_PATCH]', error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// };
