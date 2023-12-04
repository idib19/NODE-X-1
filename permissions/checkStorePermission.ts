import { PrismaClient } from '@prisma/client';
import { User } from '@prisma/client';

const prisma = new PrismaClient();

// Assuming the user and storeId types are defined appropriately
export async function checkPermission(user: User, storeId: string): Promise<boolean> {
    if (user.role === 'storeManager') {
        const store = await prisma.store.findFirst({
            where: {
                id: storeId,
                users: {
                    some: {
                        id: user.id
                    }
                }
            }
        });

        if (store) {
            // The user has permission to access this store
            return true;
        }
    }

    // The user does not have permission
     return false;
}
