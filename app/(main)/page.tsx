// app/(main)/page.tsx
import Image from "next/image";
import Link from "next/link";
import { adminDb } from "@/firebaseAdmin";

export default async function Home() {
  const snapshot = await adminDb.ref("posts").get();

  let posts: any[] = [];

  if (snapshot.exists()) {
    const data = snapshot.val();

    posts = Object.entries(data)
      .map(([id, post]: any) => ({
        id,
        ...post,
      }))
      .sort(
        (a: any, b: any) =>
          b.createdAt - a.createdAt
      );
  }

  return (
    <div className="relative dark:shadow shadow-inner shadow-stone-500 rounded-2xl mx-1 my-2 p-2 overflow-x-hidden columns-2 lg:columns-3 xl:columns-5 2xl:columns-7">
      {posts.map((post) => (
        <div
          key={post.id}
          className="relative flex justify-center items-center dark:shadow-inner shadow shadow-stone-500 rounded-xl mb-4"
        >
          <Link href={`/art/${post.id}`}>
            <Image
              width={720}
              height={720}
              src={post.imageUrl}
              alt={post.title || "Artwork"}
              className="rounded-xl"
            />
          </Link>
        </div>
      ))}
    </div>
  );
}