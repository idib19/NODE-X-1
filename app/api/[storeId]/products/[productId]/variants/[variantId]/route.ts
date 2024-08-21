import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb'; // Ensure this is the correct path to your Prisma client instance

export async function DELETE(req: Request, { params }: { params: { productId: string; variantId: string } }) {
  const { variantId } = params;

  try {
    // Delete the VariantAttribute records associated with the Variant
    await prismadb.variantAttribute.deleteMany({
      where: {
        variantId: variantId,
      },
    });

    // Delete the Variant itself
    const deletedVariant = await prismadb.variant.delete({
      where: {
        id: variantId,
      },
    });

    return NextResponse.json(deletedVariant, { status: 200 });
  } catch (error) {
    console.log('[VARIANT_DELETE_ERROR]', error);
    return NextResponse.json({ error: 'Failed to delete variant' }, { status: 500 });
  }
}
