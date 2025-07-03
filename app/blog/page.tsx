import { getAllBlogs } from "@/lib/mdx";
import React from "react";

export default async function Blog() {
  const posts = await getAllBlogs();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-6 text-3xl font-bold">Blog</h1>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post?.slug} className="border-b pb-4">
            <h2 className="text-xl font-semibold">{post?.title}</h2>
            <p className="text-sm text-gray-500">{post?.description}</p>
            <p className="text-muted-foreground text-xs">{post?.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
