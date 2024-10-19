import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAttributesByStoreId(storeId: string) {
  try {
    const attributes = await prisma.attribute.findMany({
      where: {
        storeId: storeId,
      },
      include: {
        values: true, // Include attribute values if needed
      },
    });
    return attributes;
  } catch (error) {
    console.error('Error fetching attributes:', error);
    throw error;
  }
}



