// components/settings/FacePic.tsx
"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { upload } from "@vercel/blob/client";

type FacePicProps = {
  user: {
    image?: string | null;
    name?: string | null;
    username?: string | null;
  };
};

const FacePic = ({ user }: FacePicProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const extension = file.name.split(".").pop();

      const fileName = `${
        user.username || user.name || "user"
      }-facepic.${extension}`;

      const uploaded = await upload(fileName, file, {
        access: "public",
        handleUploadUrl: "/api/imagefiles/upload",
      });

      await fetch("/api/auth/update-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: uploaded.url,
        }),
      });

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <details className="relative max-w-full min-w-xs shadow shadow-stone-500 px-4 py-2 m-1 rounded-4xl">
      <summary className="relative list-none cursor-pointer font-bold text-center">
        Profile
      </summary>

      <ul className="relative text-sm mt-2 flex flex-col justify-center items-center gap-2">
        <li className="relative w-37.5 h-37.5 rounded-full overflow-hidden">
          <Image
            src={user.image || "/1.jpg"}
            alt="Profile Pic"
            fill
            className="rounded-full object-cover"
            sizes="150px"
          />
        </li>

        <li
          className="cursor-pointer"
          onClick={handleImageClick}
        >
          Change Facepic
        </li>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </ul>
    </details>
  );
};

export default FacePic;