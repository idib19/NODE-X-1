import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// cette fonction retourne uniquement les attributs de taille pour un store donné
// id de l'attribut de taille : e7ca3a34-cbcf-4ab2-9c31-0fd388a55803
export async function getAttributesByStoreId(storeId: string) {
  try {
    const attributes = await prisma.attribute.findMany({
      where: {
        storeId: storeId,
        id: 'e7ca3a34-cbcf-4ab2-9c31-0fd388a55803', // id of size attributes only !!!! '
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
