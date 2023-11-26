import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import Navbar from "@/components/navbar";
import { NextResponse } from "next/server";
import { error } from "console";

export default async function DashboardLayout({ children, params }: { children: React.ReactNode; params: { storeId: string } }) {

    // 2nd entry point 
    // redirecting to /STORE 
    
    const { userId } = auth();

    if (!userId) {
        redirect('/sign-in');
    }

    // const roleUtilisateur = orgRole;


    // function => authentication (roleStatus + link to database ) {return Ture or False}


   
    // Retrieving the store based on URL and user's access to the store 
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId
        }
    });


     //logic: a storemamager access the store dashboard because is linked to it in in a database and have the rigth acces role!
    // if ({/*auth=> true*/ }) {
    //     redirect('/');
    // }

    // else{
    //     return new NextResponse ("Unauthorized", { status: 403 })
    // }

    return (
        <>
            <Navbar />

            {children}
        </>
    )
}