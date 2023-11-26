import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { ThemeToggle } from "@/components/theme-toggle";


const Navbar = async () => {

    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in");
    }

    // retrieving data (should add some security chek, jwt migth be more efficient)
    // than always calling the database to tchek actions and shit 
    const store = await prismadb.store.findFirst({
       
    })

    // State for handling responsive menu on small screens 

    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                {/* storeswitcher should only be available on top sudo account !!! */}
                {store?.name}
                {/* Main Nav or menu icon displying conditionnaly  */}
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <ThemeToggle />
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    )
}

export default Navbar;