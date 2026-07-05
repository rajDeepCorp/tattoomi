"use client";

import { useState } from "react";
import { formatCount } from "@/lib/utils";

type ArtworkActionsProps = {
    postId: string;
    likes: number;
    saves: number;
    got: number;
    liked: boolean;
    saved: boolean;
    gotted: boolean;
};

export default function ArtworkActions({
    postId,
    likes,
    saves,
    got,
    liked,
    saved,
    gotted
}: ArtworkActionsProps) {
    const [loading, setLoading] = useState<"like" | "save" | "got" | null>(null);
    const [reacted, setReacted] = useState({ liked, saved, gotted, });
    const [counts, setCounts] = useState({ likes, saves, got, });


    const handleReaction = async (
        type: "like" | "save" | "got"
    ) => {
        if (loading) return;

        try {
            setLoading(type);

            const response = await fetch("/api/posts/reaction", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    postId,
                    type,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            setCounts((prev) => ({
                ...prev,
                [type === "like"
                    ? "likes"
                    : type === "save"
                        ? "saves"
                        : "got"]: data.count,
            }));

            setReacted((prev) => ({
                ...prev,
                [type === "like"
                    ? "liked"
                    : type === "save"
                        ? "saved"
                        : "gotted"]: data.reacted,
            }));
        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="relative sm:w-1/12 px-1 flex sm:flex-col justify-center items-center gap-2 shadow shadow-stone-500 rounded-2xl sm:py-28 py-2">

            <div className="relative flex justify-center items-center">
                <button
                    onClick={() => handleReaction("like")}
                    disabled={loading === "like"}
                    className={`relative rounded-l-2xl min-w-16 max-w-3xs py-1 flex justify-center items-center disabled:opacity-50 ${reacted.liked
                        ? "shadow-inner shadow-stone-500"
                        : "shadow shadow-stone-500"
                        }`}
                >
                    Like
                </button>

                <button
                    className="relative shadow shadow-stone-500 rounded-r-2xl p-1 mr-1"
                    disabled
                >
                    {formatCount(counts.likes)}
                </button>
            </div>

            <div className="relative flex justify-center items-center">
                <button
                    onClick={() => handleReaction("save")}
                    disabled={loading === "save"}
                    className={`relative rounded-l-2xl min-w-16 max-w-3xs py-1 flex justify-center items-center disabled:opacity-50 ${reacted.saved
                        ? "shadow-inner shadow-stone-500"
                        : "shadow shadow-stone-500"
                        }`}
                >
                    Save
                </button>

                <button
                    className="relative shadow shadow-stone-500 rounded-r-2xl p-1 mr-1"
                    disabled
                >
                    {formatCount(counts.saves)}
                </button>
            </div>

            <div className="relative flex justify-center items-center">
                <button
                    onClick={() => handleReaction("got")}
                    disabled={loading === "got"}
                    className={`relative rounded-l-2xl min-w-16 max-w-3xs py-1 flex justify-center items-center disabled:opacity-50 ${reacted.gotted
                        ? "shadow-inner shadow-stone-500"
                        : "shadow shadow-stone-500"
                        }`}
                >
                    Get
                </button>

                <button
                    className="relative shadow shadow-stone-500 rounded-r-2xl p-1 mr-1"
                    disabled
                >
                    {formatCount(counts.got)}
                </button>
            </div>

        </div>
    );
}