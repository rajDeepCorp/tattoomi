// tattoomi/app/layout.tsx


import Navbar from "@/components/navigation/Navbar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function MainLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    const session = await auth.api.getSession({ headers: await headers(), });

    return (
        <main className="relative shadow-inner shadow-stone-500 p-2 m-1 sm:rounded-2xl rounded-xl overflow-x-hidden">
            {children}
            <Navbar isAuthenticated={!!session} />
        </main>

    );
}
