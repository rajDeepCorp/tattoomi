// tattoomi/app/(main)/page.tsx

"use client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function Home() {

  const handleGoogleSignUp = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };


  return (
    <div>
      Hello, welcome to Tattoomi! Please sign up to continue.
      <div className="relative my-10">
        <button

          onClick={handleGoogleSignUp}
          className="fancyFont2 text-xl mb-2 max-w-2xs rounded-2xl shadow shadow-stone-500 text-shadow-sm text-shadow-stone-500 py-1 px-5 transition-all duration-150 ease-in hover:scale-105 active:scale-95"
        >
          Google
        </button>
      </div>
    </div>
  );
}
