// components/navigation/Navbar.tsx

"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { IconType } from "react-icons";
import { CiSearch, CiShop, CiShoppingCart, CiShoppingTag, CiUser, } from "react-icons/ci";

type NavbarProps = { isAuthenticated: boolean; };

const pathToKey = { "/": "Home", "/search": "Search", "/profile": "Profile", "/signin": "Profile", "/signup": "Profile", } as const;
const linkClass = "relative shadow shadow-stone-500 p-1 rounded-2xl transition-all duration-300 ease-in";
type LinkMeta = { Icon: IconType; label: string; title: string; key: string; href: string; };

const Navbar = ({ isAuthenticated }: NavbarProps) => {
  const pathname = usePathname();
  const activeIndex = pathname ? pathToKey[pathname as keyof typeof pathToKey] ?? null : null;
  const [scrollingDown, setScrollingDown] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setScrollingDown(true);
      } else {
        setScrollingDown(false);
      }

      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const linkMeta: LinkMeta[] = [
    { Icon: CiShop, label: "Home", title: "Home", key: "Home", href: "/" },
    { Icon: CiSearch, label: "Search", title: "Search", key: "Search", href: "/search" },

    ...(isAuthenticated
      ? [
        { Icon: CiShoppingTag, label: "Orders", title: "Orders", key: "Orders", href: "/orders", },
        { Icon: CiShoppingCart, label: "Cart", title: "Cart", key: "Cart", href: "/cart", },
      ]
      : []),
    { Icon: CiUser, label: "Profile", title: "Profile", key: "Profile", href: isAuthenticated ? "/profile" : "/signin", },
  ];
  return (
    <nav className={`fixed bottom-0 left-1/2 -translate-x-1/2 shadow-inner shadow-stone-500 py-2 px-4 my-1 rounded-4xl text-2xl flex justify-center items-center gap-4 transition-all duration-300 ease-in ${scrollingDown ? "translate-y-[125%]" : "translate-y-0"}`}>
      {linkMeta.map(({ Icon, label, title, key, href }) => (
        <Link
          key={key}
          aria-label={label}
          aria-current={activeIndex === key ? "page" : undefined}
          title={title}
          href={href}
          className={`${linkClass} ${activeIndex === key
            ? "shadow-inner dark:shadow"
            : "shadow dark:shadow-inner"
            }`}
        >
          <Icon />
        </Link>
      ))}
    </nav>
  )
}

export default Navbar
