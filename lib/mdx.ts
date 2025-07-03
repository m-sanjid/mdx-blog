import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags: string[];
};

export async function getPostBySlug(slug: string) {
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    const fileContent = await fs.promises.readFile(filePath, "utf-8");

    const { content, frontmatter } = await compileMDX<BlogFrontmatter>({
      source: fileContent,
      options: { parseFrontmatter: true },
    });

    return { content, frontmatter, slug };
  } catch (error) {
    console.error(`❌ Failed to read or parse blog: ${slug}`, error);
    return null;
  }
}

export async function getBlogFrontmatterBySlug(slug: string) {
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    const fileContent = await fs.promises.readFile(filePath, "utf-8");

    const { frontmatter } = await compileMDX<BlogFrontmatter>({
      source: fileContent,
      options: { parseFrontmatter: true },
    });

    return frontmatter;
  } catch (error) {
    console.error(`❌ Failed to read frontmatter for: ${slug}`, error);
    return null;
  }
}

export async function getAllBlogs() {
  try {
    const files = await fs.promises.readdir(BLOG_DIR);

    const blogFiles = files.filter((file) => file.endsWith(".mdx"));

    const allBlogs = await Promise.all(
      blogFiles.map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const frontmatter = await getBlogFrontmatterBySlug(slug);
        return frontmatter
          ? {
              slug,
              ...frontmatter,
            }
          : null;
      }),
    );

    return allBlogs
      .filter(Boolean)
      .sort(
        (a, b) => new Date(b!.date).getTime() - new Date(a!.date).getTime(),
      );
  } catch (error) {
    console.error("❌ Failed to fetch all blog frontmatter", error);
    return [];
  }
}
