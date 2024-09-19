import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import Navbar from "@/components/navbar";
import { NextResponse } from "next/server";
import { checkPermission } from "@/permissions/checkStorePermission";
import { CurrencyProvider } from "@/providers/currencyContext";
export default async function DashboardLayout({ children, params }: { children: React.ReactNode; params: { storeId: string } }) {
    const { userId } = auth();

    // Redirect to sign-in if no user ID is found
    if (!userId) {
        redirect('/sign-in');
    }

    const storeId = params.storeId;
    const user = await prismadb.user.findFirst({
        where: {
            id: userId
        }
    });

    // If user is not found, return unauthorized response
    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check user's permission
    const hasPermission = await checkPermission(user, storeId);

    // If the user does not have permission, return unauthorized response
    if (!hasPermission) {
        return new NextResponse("Access Forbiden", { status: 403 });
    }

    // Render children components if the user has permission
    return (
        <>
            
            <Navbar/>
            <CurrencyProvider storeId={storeId}>
                {children}
            </CurrencyProvider>
        </>
    );
}
