import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import permissions from "@/permissions/permissions.json"; // Import your permissions file

// Define the UserRole type
type UserRole = "admin" | "storeManager" | "debugger";

export default async function SetupLayout({
    children
}: {
    children: React.ReactNode;
}) {

    const { userId } = auth();

    if (!userId) {
        redirect('/sign-in');
    }

    // Retrieve the user's data from the database
    const user = await prismadb.user.findFirst({
        where: {
            id: userId
        }
    });

    // Redirect if the user is not found in the database
    if (!user) {
        redirect('/landing-page'); // Adjust the redirect URL as needed
    }

    // Ensure the userRole is a valid UserRole
    const userRole: UserRole = user.role as UserRole;

    // Load permissions for the user's role
    // Ensuring TypeScript knows userRole is one of the keys in permissions.roles
    const userPermissions = permissions.roles[userRole].permissions;

    // Check and handle different user flows based on role and permissions
    // Flow for Admin
    if (userRole === 'admin' && userPermissions.includes('adminAccess')) {
        // Create session cookie here (if needed)
        redirect('/admin');
    }

    // Flow for Store Manager + // don't need to check permissions at this point I think
    if ((userRole === 'storeManager') && userPermissions.includes('storeManagerAccess')) {

    
        // Check if a store in the database is linked to this user
        const store = await prismadb.store.findFirst({
            where: {
                id: user.storeId,
                users: {
                    some: {
                        id: userId
                    }
                }
            }
        });

        if (store) {
            // Create session cookie here (if needed)
            redirect(`/store/${store.id}`);
        }
    }

    // Redirect to a generic landing page if none of the above conditions are met
    // This could be a sign-up page, info page, FAQ, etc.
    redirect('/general-landing-page'); // Adjust the redirect URL as needed

    // Render children if none of the above redirects occur
    return (
        <div>
            {children}
        </div>
    );
}
