import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getSalesCount = async (storeId: string) => {
    const salesCount = await prisma.order.count({
        where: {
            storeId,
            isPaid: true
        },
    });

    return salesCount;
};