import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request, { params }: { params: { productId: string } }) {
  
  const body = await req.json();
  
  const { productId } = params;

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

// this handler is to delete all variants for a specific product  
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

    // Now delete the Variants themselves
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