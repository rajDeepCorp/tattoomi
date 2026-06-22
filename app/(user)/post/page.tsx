"use client";

import Image from "next/image";
import React, { useState } from "react";
import { upload } from "@vercel/blob/client";

export default function PostPage() {
    const [file, setFile] = useState<File | null>(null);
    const [image, setImage] = useState("/1.jpg");
    const [uploading, setUploading] = useState(false);

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const selectedFile = e.target.files?.[0];

        if (!selectedFile) return;

        setFile(selectedFile);

        const imageUrl = URL.createObjectURL(selectedFile);

        setImage(imageUrl);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select an image.");
            return;
        }

        try {
            setUploading(true);

            const blob = await upload(file.name, file, {
                access: "public",
                handleUploadUrl: "/api/imagefiles/upload",
            });

            console.log(blob);

            alert("Image Uploaded Successfully");
        } catch (err) {
            console.error(err);
            alert("Upload Failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="relative shadow-inner shadow-stone-500 p-2 m-1 rounded-4xl">

            <div className="relative shadow shadow-stone-500 p-2 m-1 rounded-4xl flex justify-center">
                <Image
                    src={image}
                    width={720}
                    height={720}
                    alt="Preview"
                    className="rounded-3xl object-cover"
                />
            </div>

            <div className="relative shadow shadow-stone-500 p-2 m-1 rounded-4xl">

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />

            </div>

            <div className="relative shadow shadow-stone-500 p-2 m-1 rounded-4xl">

                <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="px-5 py-2 bg-blue-600 rounded-lg text-white"
                >
                    {uploading ? "Uploading..." : "Upload"}
                </button>

            </div>

        </div>
    );
}