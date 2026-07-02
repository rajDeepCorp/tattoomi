// app/(user)/post/page.tsx

"use client";

import Image from "next/image";
import React, { useState } from "react";
import { upload } from "@vercel/blob/client";

export default function PostPage() {
    const [file, setFile] = useState<File | null>(null);
    const [image, setImage] = useState("/1.jpg");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");

    const [uploading, setUploading] = useState(false);

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const selectedFile = e.target.files?.[0];

        if (!selectedFile) return;

        setFile(selectedFile);
        setImage(URL.createObjectURL(selectedFile));
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select an image.");
            return;
        }

        try {
            setUploading(true);

            // Upload image to Vercel Blob
            const blob = await upload(file.name, file, {
                access: "public",
                handleUploadUrl: "/api/imagefiles/upload",
            });

            const imageUrl = blob.url;

            // Save post in database
            const response = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    imageUrl,
                    title,
                    description,
                    tags: tags
                        .split(",")
                        .map((tag) => tag.trim().toLowerCase())
                        .filter(Boolean),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to save post.");
            }

            alert("Post uploaded successfully!");

            // Reset form
            setFile(null);
            setImage("/1.jpg");
            setTitle("");
            setDescription("");
            setTags("");

        } catch (err) {
            console.error(err);
            alert("Upload Failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="relative shadow-inner shadow-stone-500 p-2 m-1 rounded-4xl">

            {/* Image Preview */}
            <div className="relative shadow shadow-stone-500 p-2 m-1 rounded-4xl flex justify-center">
                <Image
                    src={image}
                    width={720}
                    height={720}
                    alt="Preview"
                    className="rounded-3xl object-cover"
                />
            </div>

            {/* File Input */}
            <div className="relative shadow shadow-stone-500 p-2 m-1 rounded-4xl">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>

            {/* Title */}
            <div className="relative shadow shadow-stone-500 p-2 m-1 rounded-4xl">
                <input
                    type="text"
                    placeholder="Artwork Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full outline-none"
                />
            </div>

            {/* Description */}
            <div className="relative shadow shadow-stone-500 p-2 m-1 rounded-4xl">
                <textarea
                    placeholder="Artwork Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full outline-none resize-none"
                    rows={4}
                />
            </div>

            {/* Tags */}
            <div className="relative shadow shadow-stone-500 p-2 m-1 rounded-4xl">
                <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full outline-none"
                />
            </div>

            {/* Upload Button */}
            <div className="relative shadow shadow-stone-500 p-2 m-1 rounded-4xl">
                <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="px-5 py-2 bg-blue-600 rounded-lg text-white disabled:opacity-50"
                >
                    {uploading ? "Uploading..." : "Upload"}
                </button>
            </div>

        </div>
    );
}