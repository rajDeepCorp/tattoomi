//app/(user)/layout.tsx


import Navbar from "@/components/navigation/Navbar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect('/signin');
  }

  return (
    <>
      {children}
      <Navbar user={session.user} />
    </>
  );
}