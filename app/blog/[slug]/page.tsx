import { getAllBlogs, getPostBySlug } from "@/lib/mdx";
import React from "react";

export async function generateStaticParams() {
  const posts = await getAllBlogs();
  return posts.map((post) => ({ slug: post?.slug }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return <div className="py-20 text-center">Post not found</div>;
  }

  const { frontmatter, content } = post;

  return (
    <article className="prose dark:prose-invert mx-auto max-w-3xl px-4 py-16">
      <h1>{frontmatter.title}</h1>
      <p className="text-sm text-gray-500">{frontmatter.date}</p>
      <div>{content}</div>
    </article>
  );
}
