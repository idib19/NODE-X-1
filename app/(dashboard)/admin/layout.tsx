import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import AdminNavbar from "@/components/admin-components/admin-navbar";

export default async function DashboardLayout({ children, params }: { children: React.ReactNode; params: { storeId: string } }) {

    // 2nd entry point 
    // redirecting to /ADMIN

    const { userId } = auth();

    if (!userId) {
        redirect('/sign-in');
    }

    // const roleUtilisateur = orgRole;

    // function => authentication (roleStatus + link to database ) {return Ture or False}




    // Retrieving the stores based on URL and user's access to the store 
    const stores = await prismadb.store.findMany({

    })


    //logic admin access his dashboard  because is  his admin and have the rigth access role !
    // if ({/*auth=> true*/ }) {
    //     redirect('/');
    // }


    return (
        <>
            <AdminNavbar />

            {children}

        </>
    )
}

