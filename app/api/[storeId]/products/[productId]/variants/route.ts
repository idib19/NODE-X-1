import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request, { params }: { params: { productId: string } }) {
  
  const body = await req.json();
  
  const { productId } = params;

  // validate the request body
  const { additionalPrice, quantity, attributes } = body;
  if ( !quantity || !attributes) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // validate the attributes array
  if (!Array.isArray(attributes)) {
    return NextResponse.json({ error: 'Invalid attributes format' }, { status: 400 });
  }


  try {
    const newVariant = await prismadb.variant.create({
      data: {
        productId: productId,
        additionalPrice: body.additionalPrice || 0,
        stockQuantity: body.quantity || 0,
        attributes: {
          create: body.attributes.map((attribute: any) => ({
            attributeValue: {
              connect: { id: attribute.attributeValueId } // Connect existing AttributeValue by ID
            }
          })),
        },
      },
      include: {
        attributes: {
          include: {
            attributeValue: true, // Include the connected attribute values
          },
        },
      },
    });

    return NextResponse.json(newVariant, { status: 201 });
  } catch (error) {
    console.error('Failed to add variant:', error);
    return NextResponse.json({ error: 'Failed to add variant' }, { status: 500 });
  }
}


export async function GET(req: Request, { params }: { params: { productId: string } }) {
  const { productId } = params;

  // instead of directly querying the database in the api. we can create a service to handle the logic
  // and then call the service from the api
  // that way we can add more logic and implement other features relying on the variants without modifying the api
  // or the underlying data model and fetching logic.
  // everytime we migth be fetching the variant of a product but for different purposes. all the time we dont need 
  // the same data or the same level of details, so will use the service fuction that will be more adapted to the 
  // specific needs.

  try {
    const variants = await prismadb.variant.findMany({
      where: { productId },
      include: {
        attributes: {
          include: {
            attributeValue: {
              include: {
                attribute: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(variants, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch variants:', error);
    return NextResponse.json({ error: 'Failed to fetch variants' }, { status: 500 });
  }
}

// This handler is to delete all variants for a specific product  
// it first deletes all the variant attributes and then the variants themselves because of the onDelete cascade
export async function DELETE(req: Request, { params }: { params: { productId: string } }) {

  const { productId } = params;

  try {
    // First, delete the VariantAttribute records associated with the Variants
    await prismadb.variantAttribute.deleteMany({
      where: {
        variant: {
          productId: productId,
        },
      },
    });

    // then delete the Variants themselves
    const deletedVariants = await prismadb.variant.deleteMany({
      where: {
        productId: productId,
      },
    });

    return NextResponse.json({ count: deletedVariants.count }, { status: 200 });
  } catch (error) {
    console.log('[VARIANTS_DELETE]', error);
    return NextResponse.json({ error: 'Failed to delete variants' }, { status: 500 });
  }
}