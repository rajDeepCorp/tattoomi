import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const recommandationsStyles = "relative shadow dark:shadow-inner shadow-stone-500 rounded-2xl p-2 hover:scale-105 transition-all ease-in duration-150"

  const recommendations = Array.from({ length: 4 });

export const ExploreArtist = () => {
    return (
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
    )
}