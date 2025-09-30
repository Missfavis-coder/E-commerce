// src/app/(main)/(blogs)/blogs/[slug]/page.tsx
import { getBlogBySlug } from "@/lib/data/blog";
import { ArrowLeft, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { blogs } from "@/constants/blog";

type BlogPageProps = {
  params:Promise< {
    slug: string;
  }>;
};
export async function generateStaticParams() {
  return blogs.map((b) => ({
    slug: b.slug,
  }));
}

export default async function BlogPage({params}: BlogPageProps) {
  const {slug} = await params;
  const blog = await getBlogBySlug(slug); // <-- async fetch
  

  if (!blog) {
    return <div className="max-w-3xl mx-auto p-6">Blog not found</div>;
  }

  const Icon = blog.icon; // ✅ fix icon rendering

  return (
    <div className="max-w-7xl mx-auto  p-6 mt-20 ">
      <div className="md:flex gap-4 w-full">
        <div className="md:w-3/4">
          <div className="">
            
            <Image
              src={blog.image}
              alt={blog.title}
              width={800}
              height={500}
              className="rounded-lg mb-6"
            />
            <div className="flex items-center gap-4 text-neutral-500 text-sm mb-4">
              <p className="text-green-900">{blog.category}</p>
              <div className="flex items-center gap-1">
                <Edit className="w-5 h-5" />
                <div>Admin</div>
              </div>
              <div className="flex items-center gap-1">
                {Icon && <Icon className="w-5 h-5" />}
                <div>{blog.date}</div>
              </div>
            </div>
          </div>

          <div className="mt-2">
            <div className="font-semibold text-2xl my-2">{blog.title}</div>
            <div className="text-neutral-500 text-[16px] leading-8">
              {blog.content}
            </div>
            <div className="mt-8">
              <div>
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={550}
                  height={300}
                  className="rounded-lg mb-6 h-[200px] object-cover"
                />
              </div>
              <div className="text-neutral-500 text-[16px]">
                {blog.comment}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="font-semibold text-[20px] mb-2">
              Lorem ipsum dolor sit amet
            </div>
            <div className="text-neutral-500 text-[16px] leading-8">
              {blog.firstcontent}
            </div>
            <div className="text-neutral-500 text-[16px] leading-8 mt-4">
              {blog.secondcontent}
            </div>
            <ul className="my-3 space-y-2">
              <li>Lorem ipsum dolor sit amet.</li>
              <li>At vero eos et accusamus et iusto odio.</li>
              <li>Excepteur sint occaecat cupidant non proident.</li>
            </ul>
            <div className="text-neutral-500 text-[16px] leading-8 mb-4">
              {blog.thirdcontent}
            </div>
            <div className="text-neutral-500 text-[16px] leading-8">
              {blog.comment}
            </div>
          </div>
        </div>

        <div className="md:w-1.5/4">
          <div className="border border-neutral-500 p-6  rounded-lg">
            <div className="text-[18px] font-semibold mb-2">Blog Categories</div>
            <div className="flex justify-between mb-2">
              <div className="text-sm text-neutral-500">Lifestyle</div>
              <div className="font-bold text-sm ">(1)</div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="text-sm text-neutral-500">Social Media</div>
              <div className="font-bold text-sm ">(1)</div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="text-sm text-neutral-500">Company News</div>
              <div className="font-bold text-sm ">(1)</div>
            </div>
          </div>

          <div className="border border-neutral-500 p-6 mt-6 rounded-lg">
            <div className="text-[18px] font-semibold mb-2">Popular Blogs</div>
            <div className="space-y-4 mb-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="text-sm flex items-center gap-2 text-neutral-500">
                  <div className="relative h-[60px] md:w-[80px] w-[100px] rounded-full overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>{blog.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start mt-6">
        <Link href="/blogs">
          <div className="flex items-center gap-2 cursor-pointer bg-black text-white px-4 py-2 rounded-lg ">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Blog</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
