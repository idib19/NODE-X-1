import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';

export async function POST(req: Request, { params }: { params: { productId: string } }) {
  const { variant } = await req.json();
  const { productId } = params;

  try {
    const newVariant = await prismadb.variant.create({
      data: {
        productId: productId,
        additionalPrice: variant.additionalPrice,
        stockQuantity: variant.quantity,
        attributes: {
          create: variant.attributes.map((attribute: any) => ({
            attributeValueId: attribute.attributeValueId,
          })),
        },
      },
      include: {
        attributes: true,
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
