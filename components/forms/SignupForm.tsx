// tattoomi/components/forms/SigninForm.tsx
"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { upload } from "@vercel/blob/client";
import { authClient } from '@/lib/auth-client';
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { CiFacebook } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io5";

const styles = {
  formContainer: "relative w-10/12 text-shadow-sm text-shadow-stone-500 flex sm:flex-row flex-col justify-start sm:items-start gap-2 p-2",
  shortLabel: "relative min-w-fit px-5 py-0.5 shadow rounded-2xl shadow-stone-500 sm:text-end text-start",
  input: "relative outline-none shadow-inner shadow-stone-500 rounded-2xl px-2 w-full text-shadow-2xs text-shadow-stone-500",
  inputWrapper: "relative px-5 py-1 shadow rounded-2xl shadow-stone-500 flex gap-4",
};

const initialForm = { name: "", email: "", username: "", password: "", mobile: "", dob: "", };

const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(initialForm);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value, }));
  };

  const uploadProfilePic = async () => {
    if (!selectedFile) return null;
    const extension =
      selectedFile.name.split(".").pop();

    const fileName =
      `${formData.username}-facepic.${extension}`;

    const uploaded = await upload(
      fileName,
      selectedFile,
      {
        access: "public",
        handleUploadUrl: "/api/imagefiles/upload",
      }
    );
    return uploaded?.url || null;
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { name, email, password, mobile, dob } = formData;
    const username = `@${formData.username.trim().replace(/^@+/, "")}`;

    if (!name.trim() || !email.trim() || !username.trim() || !password.trim() || !mobile.trim() || !dob.trim()) {
      toast.warning("Please fill all required fields");
      return;
    }
    const loadingToast = toast.loading("Creating account...");
    setLoading(true);
    try {
      const checkResponse = await fetch("/api/auth/check-user", {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email,
          username,
        }),
      });
      if (!checkResponse.ok) {
        throw new Error(
          "Failed to verify user"
        );
      }
      const checkData =
        await checkResponse.json();
      if (checkData.emailExists) {
        toast.dismiss(loadingToast);
        toast.error("Email already registered");
        return;
      }
      if (checkData.usernameExists) {
        toast.dismiss(loadingToast);
        toast.error("Username already taken");
        return;
      }
      let imageUrl = "";
      if (selectedFile) {
        const uploadedUrl = await uploadProfilePic();
        if (!uploadedUrl) {
          throw new Error("Image upload failed");
        }
        imageUrl = uploadedUrl;
      }

      type SignupData = { name: string; email: string; password: string; username: string; mobile: string; dob: string; image?: string; callbackURL?: string; };
      const signupData: SignupData = { name, email, password, username, mobile, dob, image: imageUrl, callbackURL: "/profile", };
      const { error } = await authClient.signUp.email(
        signupData as any,
        {
          onSuccess: async () => {
            router.push("/profile");
          },
        }
      );
      if (error) {

        if (imageUrl) {

          await fetch(
            "/api/imagefiles/delete",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                pathname: imageUrl,
              }),
            }
          );
        }

        toast.dismiss(loadingToast);
        toast.error(error.message || "Signup failed");
        return;
      }
      toast.dismiss(loadingToast);
      toast.success("Account created successfully");
      setFormData(initialForm);
      setSelectedFile(null);
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const handleGoogleSignUp = async () => {
    const loadingToast = toast.loading("Redirecting to Google...");
    try {
      setLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/profile",
      });
      toast.dismiss(loadingToast);
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Google Signin Failed");
    } finally {
      setLoading(false);
    }
  };

  const buttonMeta = [
    { Icon: FcGoogle, Action: handleGoogleSignUp, text: "Google" },
    // { Icon: CiFacebook, Action: handleFacebookSignUp, text: "Facebook" },
    // { Icon: IoLogoInstagram, Action: handleGoogleSignUp, text: "Instagram" },
  ]

  const buttonStylesClasses = "relative max-w-xs min-w-54 tracking-widest shadow-stone-500 py-2 rounded-2xl flex justify-center items-center gap-1.5 transition-all duration-200 ease-in shadow hover:scale-105 active:scale-95 active:shadow-inner";

  return (
    <div className="relative w-full text-sm flex flex-col justify-center items-center gap-6 my-2">
      <p className='relative text-xl'>Create your artist account</p>
      <form onSubmit={handleSubmit}
        className="relative w-11/12 max-w-2xl mx-auto flex flex-col justify-center items-center border-b [&>.form-container:nth-child(even)]:items-end">
        <Field id="name" label="Full Name" value={formData.name} onChange={handleChange} />
        <Field id="email" label="Email" type="email" value={formData.email} onChange={handleChange} />
        <Field id="username" label="Username" value={formData.username} onChange={handleChange} />
        <Field id="mobile" label="Mobile" type="tel" value={formData.mobile} onChange={handleChange} />
        <Field id="dob" label="Date of Birth" type="date" value={formData.dob} onChange={handleChange} />
        <Field id="password" label="Password" type="password" value={formData.password} onChange={handleChange} />
        {/* Profile Pic */}
        <div className={`${styles.formContainer} form-container`}>
          <label htmlFor="profilePic" className={`${styles.shortLabel}`}>Profile Pic</label>
          <div className={styles.inputWrapper}>
            <input type="file" id="profilePic" className={styles.input} onChange={(e) => {
              const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp",];
              const file = e.target.files?.[0];
              if (!file) {
                setSelectedFile(null);
                return;
              }

              if (file.size > 2 * 1024 * 1024) {
                toast.warning("File size must be less than 2MB");
                e.target.value = "";
                setSelectedFile(null);
                return;
              }

              if (!allowed.includes(file.type)) {
                toast.warning("Only JPG, PNG or WEBP allowed");
                e.target.value = "";
                setSelectedFile(null);
                return;
              }

              // ✅ Valid file
              setSelectedFile(file);
            }}
            />
          </div>
        </div>
        {/* Submit */}
        <button
          type="submit" disabled={loading}
          className={`${loading ? "opacity-50 cursor-not-allowed" : ""} relative mb-2 max-w-2xs rounded-2xl shadow shadow-stone-500 text-shadow-sm text-shadow-stone-500 py-1 px-5 transition-all duration-150 ease-in hover:scale-105 active:scale-95`}
        >
          {loading ? "Creating..." : "Signup"}
        </button>
      </form>
      <p>or continue with</p>
      {buttonMeta.map(({ Icon, Action, text }, index) => (
        <button key={index} onClick={Action} type="submit" aria-label={`Sign in with ${text}`} className={buttonStylesClasses}>
          {text} <Icon className="text-xl" />
        </button>
      ))}
      <p className='relative w-full px-8'>Already registered? <Link href="/signin" className="underline italic">Click here</Link> to sign into your Artist account.</p>
    </div>
  )
};

type FieldProps = { id: string; label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string; };
const Field = ({ id, label, value, onChange, type = "text", }: FieldProps) => {
  return (
    <div className={`${styles.formContainer} form-container`}>
      <label htmlFor={id} className={styles.shortLabel}>{label}</label>
      <div className={styles.inputWrapper}>
        <input type={type} id={id} name={id} value={value} onChange={onChange} placeholder={`Enter ${label}`} className={styles.input} />
      </div>
    </div>
  );
};

export default SignupForm