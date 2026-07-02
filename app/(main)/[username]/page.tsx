// app/(main)[username]/page.tsx

// import { db } from "@/lib/mongodb";
import { notFound } from "next/navigation";
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { CiFacebook, CiInstagram, CiLinkedin, CiYoutube } from 'react-icons/ci';
import { RiTwitterXLine } from 'react-icons/ri';
import { db } from "@/lib/auth";
import { VscVerified } from "react-icons/vsc";
import { adminDb } from "@/firebaseAdmin";

const images = [1, 2, 3, 4, 5];

export default async function ArtistProfile({
  params,
}: {
  params: Promise<{
    username: string;
  }>;
}) {

  const { username } = await params;

  const decodedUsername = decodeURIComponent(username);

  // console.log(decodedUsername);

  const user = await db
    .collection("user")
    .findOne({
      username: decodedUsername,
    });
  // console.log("Username:", decodedUsername);

  if (!user) {
    notFound();
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
          post.username === user.username
      )
      .sort(
        (a: any, b: any) =>
          b.createdAt - a.createdAt
      );
  }

  const socialLinks = [
    { key: "facebook", icon: <CiFacebook />, href: user.facebook, },
    { key: "instagram", icon: <CiInstagram />, href: user.instagram, },
    { key: "twitter", icon: <RiTwitterXLine />, href: user.twitter, },
    { key: "linkedin", icon: <CiLinkedin />, href: user.linkedin, },
    { key: "youtube", icon: <CiYoutube />, href: user.youtube, },
  ].filter(({ href }) => href);

  const buttonClasses =
    "relative shadow dark:shadow-inner shadow-stone-500 py-1 px-2 hover:scale-105 transition-all ease-in duration-150";

  const socialLinkClasses = "relative shadow dark:shadow-inner shadow-stone-500 rounded-full p-3 hover:scale-105 transition-all ease-in duration-150 text-3xl"

  const recommandationsStyles = "relative shadow dark:shadow-inner shadow-stone-500 rounded-2xl p-2 hover:scale-105 transition-all ease-in duration-150"

  const recommendations = Array.from({ length: 4 });

  return (
    <div className="relative dark:shadow shadow-inner shadow-stone-500 rounded-2xl mx-1 my-2 p-2 overflow-x-hidden">
      <div className='relative flex not-sm:flex-col justify-center items-start not-sm:items-center gap-1'>

        {/* Photo wali Div */}
        <div className="relative sm:w-1/5 w-full shadow dark:shadow-inner shadow-stone-500 rounded-2xl mx-1 my-2 p-2 flex flex-col justify-start items-center gap-2">
          <div className="relative w-37.5 h-37.5 rounded-full overflow-hidden dark:shadow shadow-inner shadow-stone-500 p-2">
            <Image
              src={user.image || "/userpic.jpg"}
              alt="Profile Pic"
              fill
              className="rounded-full object-cover"
              sizes="150px"
            />
          </div>
          <p className="relative dark:shadow min-w-1/2 shadow-inner shadow-stone-500 rounded-2xl py-0.5 text-xl text-center text-shadow-lg opacity-80 font-light">
            {user.name || "User Name"}
          </p>
        </div>

        {/* user ki details wali div */}

        <div className='relative sm:w-2/5 w-full shadow dark:shadow-inner shadow-stone-500 rounded-2xl mx-1 my-2 p-2 text-shadow-xs text-shadow-stone-500'>
          <h1 className='relative max-w-fit text-xl text-center dark:shadow shadow-inner shadow-stone-500 rounded-2xl py-0.5 px-2 text-shadow-lg my-1 flex justify-start items-center'>
            {user.username || "Guest"}
            {user.username?.trim() && user.emailVerified && (
              <span className="relative -translate-y-1/3">
                <VscVerified />
              </span>
            )}
          </h1>

          <address className='relative text-xs opacity-60 max-w-fit dark:shadow shadow-inner shadow-stone-500 rounded-2xl py-0.5 px-2 text-shadow-lg my-1'>
            244, Subhash Nagar, Bareilly - 243001
          </address>

          <p className='relative text-sm opacity-80 max-w-fit dark:shadow shadow-inner shadow-stone-500 rounded-xl py-0.5 px-2 text-shadow-lg my-1'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia laudantium obcaecati, quod qui aliquam totam.
          </p>

          <div className='relative flex max-w-fit justify-start items-center dark:shadow shadow-inner shadow-stone-500 rounded-4xl p-2 my-2'>
            <button className={`${buttonClasses} rounded-l-4xl`}>Follow</button>
            <button className={`${buttonClasses} rounded-r-4xl`}>100</button>
            <button className={`${buttonClasses} rounded-4xl mx-4`}>Message</button>
            <button className={`${buttonClasses} rounded-4xl`}>Hire</button>
          </div>
        </div>

        {/* social links wali div */}
        <div className="relative sm:w-1/5 shadow dark:shadow-inner shadow-stone-500 rounded-2xl mx-1 my-2 p-2">
          <p className="relative text-center shadow dark:shadow-inner shadow-stone-500 rounded-2xl mx-1 my-2 p-2 italic font-bold">
            Links
          </p>
          <div className="relative max-w-full dark:shadow shadow-inner shadow-stone-500 rounded-4xl p-2 my-1 flex flex-wrap not-sm:justify-between justify-start items-center gap-4">
            {socialLinks.length > 0 ? (
              socialLinks.map(({ key, href, icon }) => (
                <Link
                  key={key}
                  href={href!}
                  target="_blank"
                  className={socialLinkClasses}
                >
                  {icon}
                </Link>
              ))
            ) : (
              <p className="relative w-full text-center italic text-stone-500 py-3">
                No links yet
              </p>
            )}
          </div>
        </div>

        {/* recommandations wali div */}
        <div className='not-sm:hidden relative w-1/5 shadow dark:shadow-inner shadow-stone-500 rounded-2xl mx-1 my-2 p-2'>
          <p className='relative text-center shadow dark:shadow-inner shadow-stone-500 rounded-2xl mx-1 my-2 p-2 italic font-bold'>Explore Artist</p>
          <div className='relative max-w-full dark:shadow shadow-inner shadow-stone-500 rounded-2xl p-2 my-1 flex flex-wrap not-sm:justify-between justify-start items-center gap-4'>
            {recommendations.map((_, index) => (
              <Link href="/" key={index}>
                <Image
                  width={70}
                  height={70}
                  src="/userpic.jpg"
                  alt="Profile Pic"
                  className={recommandationsStyles}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className='relative shadow dark:shadow-inner shadow-stone-500 rounded-2xl m-1 p-1 flex justify-center items-center'>
        <div className='relative max-w-fit flex justify-center items-center gap-4 dark:shadow shadow-inner shadow-stone-500 rounded-4xl p-2 my-1'>
          <button className={`${buttonClasses} rounded-4xl`}>Artworks</button>
          <button className={`${buttonClasses} rounded-4xl`}>Interests</button>
        </div>
      </div>

      <div className="relative dark:shadow shadow-inner shadow-stone-500 rounded-2xl mx-1 my-2 p-2 overflow-x-hidden columns-2 lg:columns-3 xl:columns-5 2xl:columns-7">
        {posts.map((post) => (
          <div
            key={post.id}
            className="relative flex justify-center items-center dark:shadow-inner shadow shadow-stone-500 rounded-xl mb-4"
          >
            <Link href={`/art/${post.id}`}>
              <Image
                width={720}
                height={720}
                src={post.imageUrl}
                alt={post.title || "Artwork"}
                className="rounded-xl"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}