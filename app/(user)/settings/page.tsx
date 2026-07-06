// app/(user)/settings/page.tsx

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

      <details className="relative max-w-full min-w-xs shadow shadow-stone-500 px-4 py-2 m-1 rounded-4xl">
        <summary className='relative list-none cursor-pointer font-bold text-center'>Profile</summary>
        <ul className='relative text-sm mt-2 flex flex-col justify-center items-center gap-2'>
          <li className="relative w-37.5 h-37.5 rounded-full overflow-hidden">
            <Image
              src={session.user.image || "/1.jpg"}
              alt="Profile Pic"
              fill
              className="rounded-full object-cover"
              sizes="150px"
            />
          </li>
          <li>Change Facepic</li>
        </ul>
      </details>

      <details className="relative max-w-full min-w-xs shadow shadow-stone-500 px-4 py-2 m-1 rounded-4xl">
        <summary className='relative list-none cursor-pointer font-bold text-center'>Basic</summary>
        <ul className='relative text-sm mt-2'>
          <li>Edit Your Name</li>
          <li>Edit Your DOB</li>
          <li>Edit Your Bio</li>
          <li>Edit Your Address</li>
        </ul>
      </details>

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
