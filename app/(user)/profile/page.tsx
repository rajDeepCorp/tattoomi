import React from 'react'
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { UserFace } from '@/components/ui/UserFace';
import { UserDetails } from '@/components/ui/UserDetails';
import { UserSocialLinks } from '@/components/ui/UserSocialLinks';
import { ExploreArtist } from '@/components/ui/ExploreArtist';
import { adminDb } from "@/firebaseAdmin";
import UserPosts from '@/components/ui/UserPosts';



export default async function Profile() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/signin');
  }

  const snapshot = await adminDb.ref("posts").get();

  let posts: any[] = [];

  if (snapshot.exists()) {
    const data = snapshot.val();

    posts = Object.entries(data)
      .map(([id, post]: any) => ({
        id,
        ...post,
      }))
      .filter(
        (post: any) =>
          post.username === session.user.username
      )
      .sort(
        (a: any, b: any) =>
          b.createdAt - a.createdAt
      );
  }

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
        <div className='relative max-w-fit flex justify-center items-center gap-4 dark:shadow shadow-inner shadow-stone-500 rounded-4xl px-2'>Artwork</div>
      </div>

      <UserPosts posts={posts} />

    </div>
  )
}
