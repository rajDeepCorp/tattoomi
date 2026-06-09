import SignoutButton from '@/components/ui/SignoutButton';
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function DashBoard() {

    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) { redirect('/'); }

    return (
        <div>
            <p>
                Welcome {session.user.name}!
            </p>
            <Image width={50} height={50} src={session.user.image as string || '/artralogo.png'} alt="Profile Pic" />
            <SignoutButton />
        </div>
    )
}