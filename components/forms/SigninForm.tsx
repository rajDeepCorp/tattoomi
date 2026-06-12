// inkrush/components/ui/signinbuttons.jsx
"use client";
import { FcGoogle } from "react-icons/fc";
import { CiFacebook } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io5";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

const styles = {
  formContainer:
    "relative w-10/12 text-shadow-sm text-shadow-stone-500 flex sm:flex-row flex-col justify-start sm:items-start items-end gap-2 p-2",
  shortLabel:
    "relative px-5 py-0.5 shadow rounded-2xl shadow-stone-500 sm:text-end text-start",
  input:
    "relative outline-none shadow-inner shadow-stone-500 rounded-2xl px-2 w-full text-shadow-2xs text-shadow-stone-500",
  inputWrapper:
    "relative px-5 py-1 shadow rounded-2xl shadow-stone-500 flex gap-4",
};

const SigninForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);
      setAlertMessage("");

      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/dashboard",
        rememberMe: true,
      });

      if (error) {
        setAlertMessage(
          `❌ ${error.message || "Invalid email or password"}`
        );
        return;
      }

    } catch (err) {
      setAlertMessage("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      setAlertMessage("");

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });

    } catch (err) {
      setAlertMessage("❌ Google Signin Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    if (!alertMessage) return;

    const timer = setTimeout(() => {
      setAlertMessage("");
    }, 3000);

    return () => clearTimeout(timer);

  }, [alertMessage]);

  // const handleFacebookSignUp = async () => {
  //   await authClient.signIn.social({
  //     provider: "facebook",
  //     callbackURL: "/dashboard",
  //   });
  // };

  const buttonMeta = [
    { Icon: FcGoogle, Action: handleGoogleSignUp, text: "Google" },
    // { Icon: CiFacebook, Action: handleFacebookSignUp, text: "Facebook" },
    // { Icon: IoLogoInstagram, Action: handleGoogleSignUp, text: "Instagram" },
  ]

  const buttonStylesClasses = "relative max-w-xs min-w-54 tracking-widest shadow-stone-500 py-2 rounded-2xl flex justify-center items-center gap-1.5 transition-all duration-200 ease-in shadow hover:scale-105 active:scale-95 active:shadow-inner";

  return (
    <div className="relative w-full text-sm flex flex-col justify-center items-center gap-6">
      <p className='relative text-xl'>Sign into your account</p>
      <form onSubmit={handleSubmit}
        className="relative w-11/12 max-w-2xl mx-auto flex flex-col justify-center items-center my-7 border-b"      >
        {/* Email */}
        <div className={styles.formContainer}>

          <label
            htmlFor="email"
          className={styles.shortLabel}
          >
            Email
          </label>

          <div className={styles.inputWrapper}>

            <input
              required
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter Email'
            className={styles.input}
            />

          </div>

        </div>

        {/* Password */}
        <div className={styles.formContainer}>

          <label
            htmlFor="password"
          className={styles.shortLabel}
          >
            Password
          </label>

          <div className={styles.inputWrapper}>

            <input
              required
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter Password'
            className={styles.input}
            />

          </div>

        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`${loading ? "opacity-50 cursor-not-allowed" : ""} relative mb-2 max-w-2xs rounded-2xl shadow shadow-stone-500 text-shadow-sm text-shadow-stone-500 py-1 px-5 transition-all duration-150 ease-in hover:scale-105 active:scale-95`}
        >
          {loading ? "Signing In..." : "Signin"}
        </button>
      </form>

      <p>or continue with</p>
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
    </div>
  )
}

export default SigninForm