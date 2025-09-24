// src/lib/data/blogs.ts

import { blogs } from "@/constants/constant";

export async function getBlogBySlug(slug: string) {
  // Simulate delay (optional)
  await new Promise((res) => setTimeout(res, 1000));

  return blogs.find((b) => b.slug === slug) || null;
}
