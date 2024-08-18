import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getProductVariants(productId: string) {
  try {
    const variants = await prisma.variant.findMany({
      where: { productId },
      include: {
        attributes: {
          include: {
            attributeValue: true, // Includes the related AttributeValue for each VariantAttribute
          },
        },
      },
    });
    return variants;
  } catch (error) {
    console.error("Error fetching variants: ", error);
    throw error;
  }
}


