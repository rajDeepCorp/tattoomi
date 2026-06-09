import Link from 'next/link';
import React from 'react'
import { CiShop, CiUser } from 'react-icons/ci';

type NavbarProps = {
  isAuthenticated: boolean;
};

const Navbar = ({ isAuthenticated }: NavbarProps) => {
  return (
    <div className='fixed bottom-0 left-1/2 -translate-x-1/2 shadow-inner shadow-stone-500 py-2 px-4 my-1 rounded-4xl sm:text-3xl text-2xl flex justify-center items-center gap-4'>
      <Link title='Go to Home' aria-label='Home' href="/" className='relative shadow shadow-stone-500 p-1 rounded-2xl'><CiShop /></Link>
      <Link title='Go to Profile' aria-label='Profile' href="/" className='relative shadow shadow-stone-500 p-1 rounded-2xl'><CiUser /></Link>
    </div>
  )
}

export default Navbar
