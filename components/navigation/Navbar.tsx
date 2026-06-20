// components/navigation/Navbar.tsx
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react'
import { IconType } from "react-icons";
import { CiSearch, CiShop, CiSettings, CiCamera, CiUser, } from "react-icons/ci";

type User = { username?: string | null; emailVerified?: boolean; };
type NavbarProps = { user: User | null; };


const pathToKey = { "/": "Home", "/search": "Search", "/post": "Post", "/settings": "Settings", "/profile": "Profile", "/signin": "Signin", "/signup": "Signin", } as const;
const linkClass = "relative shadow-stone-500 p-1 rounded-2xl";
type NavKey = | "Home" | "Search" | "Post" | "Settings" | "Profile" | "Signin";
type LinkMeta = { Icon: IconType; label: string; title: string; key: NavKey; href: string; }

const Navbar = ({ user }: NavbarProps) => {
  const pathname = usePathname();
  const activeKey = pathname && pathname in pathToKey ? pathToKey[pathname as keyof typeof pathToKey] : null;
  const [scrollingDown, setScrollingDown] = useState(false);

  const isLoggedIn = Boolean(user?.username?.trim() && user?.emailVerified);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const next =
        window.scrollY > lastScrollY &&
        window.scrollY > 50;
      setScrollingDown(prev =>
        prev !== next ? next : prev
      );
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const linkMeta = useMemo(
    () => [
      { Icon: CiShop, label: "Home", title: "Home", key: "Home", href: "/", },
      { Icon: CiSearch, label: "Search", title: "Search", key: "Search", href: "/search", },

      ...(isLoggedIn
        ? [
          { Icon: CiCamera, label: "Post Work", title: "Post Work", key: "Post", href: "/post", },
          { Icon: CiSettings, label: "Settings", title: "Settings", key: "Settings", href: "/settings", },
        ]
        : []),

      { Icon: CiUser, label: isLoggedIn ? "Profile" : "Signin", title: isLoggedIn ? "Profile" : "Signin", key: isLoggedIn ? "Profile" : "Signin", href: isLoggedIn ? "/profile" : "/signin", },
    ] satisfies LinkMeta[],
    [isLoggedIn]
  );

  return (
    <nav className={`fixed bottom-0 left-1/2 -translate-x-1/2 shadow-inner shadow-stone-500 bg-background py-2 px-4 my-1 rounded-4xl text-2xl flex justify-center items-center gap-4 transition-transform duration-300 ease-out ${scrollingDown ? "translate-y-[125%]" : "translate-y-0"}`}>
      {linkMeta.map(({ Icon, label, title, key, href }) => (
        <Link
          key={key}
          aria-label={label}
          aria-current={activeKey === key ? "page" : undefined}
          title={title}
          href={href}
          className={`${linkClass} ${activeKey === key
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
