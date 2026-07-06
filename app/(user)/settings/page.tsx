// app/(user)/settings/page.tsx

import Basics from '@/components/settings/Basics';
import FacePic from '@/components/settings/FacePic';
import SignoutButton from '@/components/ui/SignoutButton'
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function Settings() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/signin');
  }


  return (
    <div className='relative shadow-inner shadow-stone-500 p-2 m-1 rounded-4xl overflow-x-hidden flex flex-col justify-start items-center gap-4'>
      <h1 className='text-xl font-bold'>Settings</h1>

      <FacePic user={session.user}/>

      <Basics />

      <details className="relative max-w-full min-w-xs shadow shadow-stone-500 px-4 py-2 m-1 rounded-4xl">
        <summary className='relative list-none cursor-pointer font-bold text-center'>Security</summary>
        <ul className='relative text-sm mt-2'>
          <li>Update Password</li>
        </ul>
      </details>

      <details className="relative max-w-full min-w-xs shadow shadow-stone-500 px-4 py-2 m-1 rounded-4xl">
        <summary className='relative list-none cursor-pointer font-bold text-center'>Verification</summary>
        <Link href="/" className='relative text-sm mt-2'>
          Verify Account
        </Link>
      </details>

      <div className="relative max-w-full min-w-xs shadow shadow-stone-500 px-4 py-2 m-1 rounded-4xl">
        <span className='relative list-none cursor-pointer font-bold text-center'>
          <SignoutButton />
        </span>
      </div>

    </div>
  )
}
