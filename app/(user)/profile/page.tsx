import React from 'react'
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { UserFace } from '@/components/ui/UserFace';
import { UserDetails } from '@/components/ui/UserDetails';
import { UserSocialLinks } from '@/components/ui/UserSocialLinks';
import { ExploreArtist } from '@/components/ui/ExploreArtist';

const images = [1, 2, 3, 4];

export default async function Profile() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/signin');
  }

  const buttonClasses = "relative shadow dark:shadow-inner shadow-stone-500 py-1 px-2 hover:scale-105 transition-all ease-in duration-150";

  return (
    <div className='relative shadow-inner shadow-stone-500 p-2 m-1 rounded-4xl overflow-x-hidden'>
      <div className='relative flex not-sm:flex-col justify-center items-start not-sm:items-center gap-1'>

        {/* Photo wali Div */}
        <UserFace user={session.user} />

        {/* user ki details wali div */}
        <UserDetails user={session.user} />

        {/* social links wali div */}
        <UserSocialLinks user={session.user} />


        {/* recommandations wali div */}
        <ExploreArtist />

      </div>

      <div className='relative shadow dark:shadow-inner shadow-stone-500 rounded-2xl m-1 p-1 flex justify-center items-center'>
        <div className='relative max-w-fit flex justify-center items-center gap-4 dark:shadow shadow-inner shadow-stone-500 rounded-4xl p-2 my-1'>
          <button className={`${buttonClasses} rounded-4xl`}>Artworks</button>
          <button className={`${buttonClasses} rounded-4xl`}>Interests</button>
        </div>
      </div>

      <div className="relative dark:shadow shadow-inner shadow-stone-500 rounded-2xl mx-1 my-2 p-2 overflow-x-hidden columns-2 lg:columns-3 xl:columns-5 2xl:columns-7">
        {images.map((num) => (
          <div
            key={num}
            className="relative flex justify-center items-center dark:shadow-inner shadow shadow-stone-500 rounded-xl mb-4"
          >
            <Link href={`/art/${num}`}>
              <Image
                width={720}
                height={720}
                src={`/${num}.jpg`}
                alt={`Decorative Image ${num}`}
                className="rounded-xl"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
