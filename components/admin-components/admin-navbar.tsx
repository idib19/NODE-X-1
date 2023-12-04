import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

import { AdminMainNav } from "@/components/admin-components/admin-main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { data } from "autoprefixer";


const adminNavbar = async () => {

    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in");
    }

    // retrieving data (should add some security chek, jwt migth be more efficient)
    // than always calling the database to tchek actions and shit 
    const stores = await prismadb.store.findMany({

    })

    // State for handling responsive menu on small screens 

    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <StoreSwitcher items={stores} />

                
                <AdminMainNav className="mx-6" />

                <div className="ml-auto flex items-center space-x-4">
                    <ThemeToggle />
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    )
}

export default adminNavbar;