import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getStockCount = async (storeId: string) => {
    const stockCount = await prisma.product.count({
        where: {
            storeId,
            isArchived: false,
        }
    });

    return stockCount;
};