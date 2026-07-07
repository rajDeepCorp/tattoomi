// components/actions/ArtworkActions.tsx

"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import { CiBookmark, CiHeart, CiMoneyBill } from "react-icons/ci";
import { formatCount } from "@/lib/utils";

type ArtworkActionsProps = { postId: string; likes: number; saves: number; got: number; liked: boolean; saved: boolean; gotted: boolean; isAuthenticated: boolean; };

const ACTIONS = [
    { type: "like", countKey: "likes", reactedKey: "liked", Icon: CiHeart, },
    { type: "save", countKey: "saves", reactedKey: "saved", Icon: CiBookmark, },
    { type: "got", countKey: "got", reactedKey: "gotted", Icon: CiMoneyBill, },
] as const;

export default function ArtworkActions({
    postId, likes, saves, got, liked, saved, gotted, isAuthenticated,
}: ArtworkActionsProps) {
    const [loading, setLoading] = useState<"like" | "save" | "got" | null>(null);
    const [reacted, setReacted] = useState({ liked, saved, gotted, });
    const [counts, setCounts] = useState({ likes, saves, got, });

    const handleReaction = useCallback(
        async (type: "like" | "save" | "got") => {
            if (loading) return;
            const action = ACTIONS.find((a) => a.type === type)!;
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
                    [action.countKey]: data.count,
                }));
                setReacted((prev) => ({
                    ...prev,
                    [action.reactedKey]: data.reacted,
                }));
            } catch (error) {
                console.error(error);
                alert("Something went wrong.");
            } finally {
                setLoading(null);
            }
        },
        [loading, postId]
    );

    if (!isAuthenticated) {
        return (
            <div className="relative sm:w-1/12 px-1 flex sm:flex-col justify-center items-center gap-2 shadow shadow-stone-500 rounded-2xl sm:py-28 py-2">
                <Link
                    href="/signin"
                    className="relative shadow shadow-stone-500 rounded-2xl min-w-20 py-2 text-center"
                >
                    Sign In
                </Link>
            </div>
        );
    }

    return (
        <div className="relative sm:w-1/12 px-1 flex sm:flex-col justify-center items-center gap-2 shadow shadow-stone-500 rounded-2xl sm:py-28 py-2">
            {ACTIONS.map((action) => (
                <div
                    key={action.type}
                    className="relative flex justify-center items-center"
                >
                    <button
                        onClick={() => handleReaction(action.type)}
                        disabled={loading === action.type}
                        className={`relative rounded-l-2xl min-w-16 max-w-3xs py-1 flex justify-center items-center disabled:opacity-50 ${reacted[action.reactedKey]
                            ? "shadow-inner shadow-stone-500"
                            : "shadow shadow-stone-500"
                            }`}
                    >
                        <action.Icon
                            className={`text-2xl rounded-2xl`}
                        />
                    </button>

                    <button
                        disabled
                        className="relative shadow shadow-stone-500 rounded-r-2xl p-1 mr-1"
                    >
                        {formatCount(counts[action.countKey])}
                    </button>
                </div>
            ))}
        </div>
    );
}