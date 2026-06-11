// inkrush/components/ui/signinbuttons.jsx
"use client";
import { FcGoogle } from "react-icons/fc";
import { CiFacebook } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io5";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const SigninForm = () => {

  const handleGoogleSignUp = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  const buttonMeta = [
    { Icon: FcGoogle, Action: handleGoogleSignUp, text: "Google" },
    // { Icon: CiFacebook, Action: handleGoogleSignUp, text: "Facebook" },
    // { Icon: IoLogoInstagram, Action: handleGoogleSignUp, text: "Instagram" },
  ]

  const buttonStylesClasses = "relative max-w-xs min-w-54 tracking-widest shadow-stone-500 py-2 rounded-2xl flex justify-center items-center gap-1.5 transition-all duration-200 ease-in shadow hover:scale-105 active:scale-95 active:shadow-inner";

  return (
    <form  className="relative w-full text-sm flex flex-col justify-center items-center gap-6">
      <p className='relative text-xl'>Sign into your account</p>
      {buttonMeta.map(({ Icon, Action, text }, index) => (
        <button
          key={index}
          onClick={Action}
          type="submit"
          aria-label={`Sign in with ${text}`}
          className={buttonStylesClasses}
        >
          {text} <Icon className="text-xl" />
        </button>
      ))}
      <p className='relative w-full px-8'>Are you an Artist? <Link href="/signup" className="underline italic">Click here</Link> to create your Artist Account now.</p>
    </form>
  )
}

export default SigninForm