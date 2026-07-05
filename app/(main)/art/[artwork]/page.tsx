// app/(main)/art/[artwork]/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { adminDb } from "@/firebaseAdmin";
import { notFound } from "next/navigation";
import { formatCount } from '@/lib/utils';
import ArtworkActions from '@/components/actions/ArtworkActions';
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type ArtworkPageProps = {
  params: Promise<{
    artwork: string;
  }>;
};

type Post = {
  title: string;
  description?: string;
  imageUrl: string;
  username: string;

  likes: number;
  likedBy?: Record<string, true>;

  saves: number;
  savedBy?: Record<string, true>;

  got: number;
  gotBy?: Record<string, true>;

  createdAt: number;
  tags: string[];
};

type RelatedPost = Post & {
  id: string;
  score: number;
};

export default async function Artwork({
  params,
}: ArtworkPageProps) {
  const { artwork } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user.email?.replace(/\./g, ",") ?? "";

  // Current Artwork
  const snapshot = await adminDb.ref(`posts/${artwork}`).get();

  if (!snapshot.exists()) {
    notFound();
  }

  const post = snapshot.val() as Post;

  // Related Posts
  const allSnapshot = await adminDb.ref("posts").get();

  let relatedPosts: RelatedPost[] = [];

  if (allSnapshot.exists()) {
    const data = allSnapshot.val();

    const currentTags = new Set(post.tags ?? []);

    relatedPosts = Object.entries(data)
      .map(([id, value]) => {
        const item = {
          id,
          ...(value as Post),
        };

        const score =
          item.id === artwork
            ? 0
            : item.tags?.filter((tag) => currentTags.has(tag)).length ?? 0;

        return {
          ...item,
          score,
        };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);
  }

  return (
    <div className="relative rounded-2xl p-2 flex not-sm:flex-col justify-between items-center w-full not-sm:gap-1">

      <div className="relative shadow shadow-stone-500 rounded-2xl sm:w-7/12 p-1 flex justify-center items-center">
        <Image
          className="relative shadow shadow-stone-500 rounded-2xl max-w-full h-auto"
          width={720}
          height={720}
          src={post.imageUrl}
          alt={post.title}
        />
      </div>

      <ArtworkActions
        postId={artwork}
        likes={post.likes}
        saves={post.saves}
        got={post.got}
        liked={!!post.likedBy?.[email]}
        saved={!!post.savedBy?.[email]}
        gotted={!!post.gotBy?.[email]}
      />

      <div className="relative sm:w-4/12">

        <div className="relative dark:shadow shadow-inner shadow-stone-500 rounded-2xl mx-1 my-2 p-2 overflow-x-hidden columns-2 lg:columns-3">

          {relatedPosts.length > 0 ? (
            relatedPosts.map((item) => (
              <div
                key={item.id}
                className="relative flex justify-center items-center shadow shadow-stone-500 rounded-xl mb-4"
              >
                <Link href={`/art/${item.id}`}>
                  <Image
                    width={720}
                    height={720}
                    src={item.imageUrl}
                    alt={item.title}
                    className="rounded-xl"
                  />
                </Link>
              </div>
            ))
          ) : (
            <div className="relative flex justify-center items-center shadow shadow-stone-500 rounded-xl mb-4">
              <Link href="/">
                <Image
                  width={720}
                  height={720}
                  src="/1.jpg"
                  alt="Go to Home"
                  className="rounded-xl"
                />
              </Link>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
