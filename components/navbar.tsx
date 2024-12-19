import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { ThemeToggle } from "@/components/theme-toggle";


const Navbar = async () => {

    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const user = await prismadb.user.findFirst({
        where: {
            id: userId
        }
    });

    // retrieving data (should add some security chek, jwt migth be more efficient)
    // than always calling the database to tchek actions and shit 
    const store = await prismadb.store.findFirst({
        where: {
            id: user?.storeId,
            users: {
                some: {
                    id: userId
                }
            }
        }
    });

    // State for handling responsive menu on small screens 

    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">

                {store?.name}

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