// app/(main)[username]/page.tsx

// import { db } from "@/lib/mongodb";
import { notFound } from "next/navigation";
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { CiFacebook, CiInstagram, CiLinkedin, CiYoutube } from 'react-icons/ci';
import { RiTwitterXLine } from 'react-icons/ri';
import { db } from "@/lib/auth";

const socialLinks = [
  { icon: <CiFacebook />, href: "/" },
  { icon: <CiInstagram />, href: "/" },
  { icon: <RiTwitterXLine />, href: "/" },
  { icon: <CiLinkedin />, href: "/" },
  { icon: <CiYoutube />, href: "/" },
];

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

  const buttonClasses =
    "relative shadow dark:shadow-inner shadow-stone-500 py-1 px-2 hover:scale-105 transition-all ease-in duration-150";

  const socialLinkClasses = "relative shadow dark:shadow-inner shadow-stone-500 rounded-full p-3 hover:scale-105 transition-all ease-in duration-150 text-3xl"

  const recommandationsStyles = "relative shadow dark:shadow-inner shadow-stone-500 rounded-2xl p-2 hover:scale-105 transition-all ease-in duration-150"

  const recommendations = Array.from({ length: 4 });

  return (
    <div className="relative dark:shadow shadow-inner shadow-stone-500 rounded-2xl mx-1 my-2 p-2 overflow-x-hidden">
      <div className='relative flex not-sm:flex-col justify-center items-start not-sm:items-center gap-1'>

        {/* Photo wali Div */}
        <div className='relative sm:w-1/5 w-full shadow dark:shadow-inner shadow-stone-500 rounded-2xl mx-1 my-2 p-2 flex flex-col justify-start items-center gap-2'>
          <Image width={200} height={200} src={user.image} alt="Profile Pic" className='relative dark:shadow shadow-inner shadow-stone-500 rounded-full p-2' />
          <p className='relative dark:shadow min-w-1/2 shadow-inner shadow-stone-500 rounded-2xl py-0.5 text-xl text-center text-shadow-lg opacity-80 font-light'>
            {user.name}
          </p>
        </div>

        {/* user ki details wali div */}
        <div className='relative sm:w-2/5 w-full shadow dark:shadow-inner shadow-stone-500 rounded-2xl mx-1 my-2 p-2 text-shadow-xs text-shadow-stone-500'>
          <h1 className='relative max-w-fit text-xl text-center dark:shadow shadow-inner shadow-stone-500 rounded-2xl py-0.5 px-2 text-shadow-lg my-1'>
            {user.username}
          </h1>
          {/* <h2 className='relative max-w-fit text-md opacity-75 dark:shadow shadow-inner shadow-stone-500 rounded-2xl py-0.5 px-2 text-shadow-lg my-1'>
            {user.artField}
          </h2> */}
          <address className='relative text-xs opacity-60 max-w-fit dark:shadow shadow-inner shadow-stone-500 rounded-2xl py-0.5 px-2 text-shadow-lg my-1'>
            123 Tattoo Studio, 456 Main Street, City, State 12345
          </address>
          <p className='relative text-sm opacity-80 max-w-fit dark:shadow shadow-inner shadow-stone-500 rounded-xl py-0.5 px-2 text-shadow-lg my-1'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil beatae necessitatibus exercitationem laudantium iusto error aliquam ad id ea aspernatur adipisci, asperiores impedit, inventore maiores porro totam rem fuga sint.
          </p>
          <div className='relative flex max-w-fit justify-start items-center dark:shadow shadow-inner shadow-stone-500 rounded-4xl p-2 my-2'>
            <button className={`${buttonClasses} rounded-l-4xl`}>Follow</button>
            <button className={`${buttonClasses} rounded-r-4xl`}>100</button>
            <button className={`${buttonClasses} rounded-4xl mx-4`}>Message</button>
            <button className={`${buttonClasses} rounded-4xl`}>Hire</button>
          </div>
        </div>

        {/* social links wali div */}
        <div className='relative sm:w-1/5 shadow dark:shadow-inner shadow-stone-500 rounded-2xl mx-1 my-2 p-2'>
          <p className='relative text-center shadow dark:shadow-inner shadow-stone-500 rounded-2xl mx-1 my-2 p-2 italic font-bold'>Social Links</p>
          <div className='relative max-w-full dark:shadow shadow-inner shadow-stone-500 rounded-4xl p-2 my-1 flex flex-wrap not-sm:justify-between justify-start items-center gap-4'>
            {socialLinks.map((item, index) => (
              <Link key={index} href={item.href} className={socialLinkClasses}>
                {item.icon}
              </Link>
            ))}
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