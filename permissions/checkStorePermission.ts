import { PrismaClient } from '@prisma/client';
import { User } from '@prisma/client';

const prisma = new PrismaClient();

// This function checks for permission with the required role 
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
// This function checks for permission just by lokking inside the db 
export async function isAuthorised(storeId: string, userId: string): Promise<boolean> {
    try {
        const isAuthorised = await prisma.store.findFirst({
            where: {
                id: storeId,
                users: {
                    some: {
                        id: userId
                    }
                }
            }
        });

        return !!isAuthorised;
    } catch (error) {
        console.log(error,"Unauthorised user")
        throw error;
    }
}
// This function validate the requessts made on the API. It combines one or more functions present in the permissions folder 
export async function validateRequestAndAuthorize(
    storeId: string, 
    userId: string, 
    param: string,
  ): Promise<{ error?: string, status?: number }> {
    // User Authentication
    if (!userId) {
      return { error: "Unauthenticated", status: 403 };
    }
  
    // User Authorization
    const havePermission = await isAuthorised(storeId, userId);
    if (!havePermission) {
      return { error: "Unauthorized", status: 401 };
    }
  
    // Parameter Validation
    //::: we need to add moe validation here 
      if (!param) {
        return { error: `${param} is required`, status: 400 };
      }
    
  
    // If all checks pass
    return {};
  }
  