"use client"
import Image from "next/image"
import { blogs } from "@/constants/constant"
import Link from "next/link"

export default function Blog() {
    {/*const Blogs = [
        {
            image: "/assets/asset1.webp",
            category: "Lifestyle",
            icon: Calendar,
            Date: "February 19, 2025",
            href: "/",
            description: "Office rental agency or direct? Which is best when renting an office in London?"
        },
        {
            image: "/assets/asset2.webp",
            category: "Social Media",
            icon: Calendar,
            Date: "February 19, 2025",
            description: "Lotus Electronics - New Store Launch In Bhilal, Chhattisgarh"
        },
        {
            image: "/assets/asset3.webp",
            category: "Company News",
            icon: Calendar,
            Date: "February 19, 2025",
            description: "We Invite You to These Wonderful Wine Tasting Events"
        },
        {
            image: "/assets/asset4.webp",
            category: "Electronics",
            icon: Calendar,
            Date: "February 19, 2025",
            description: "10 French Wine Regions to Visit for Amazing views and Delicious Vinos"
        },
    ]*/}
    return(
        <div className="max-w-7xl lg:mx-auto mx-2 mt-15 mb-4 px-4 ">
            <div>
                <div className="lg:text-3xl text-2xl font-semibold my-6 px-6">Latest Blog</div>
                <div className="grid lg:grid-cols-4 space-x-2 lg:space-y-0 space-y-8 ">
                    {blogs.map((blog, index) => (
                        <div className="flex flex-col justify-between border border-neutral-200 rounded-md" key={index}>
                            <div>
                                <Image
                                src={blog.image}
                                alt="Blog Image"
                                width={400}
                                height={300}
                                className="w-full h-[350px] lg:h-full object-cover rounded-t-md"
                                />
                            </div>
                            <div className="flex items-center gap-4 text-sm my-2 px-4">
                                 <div className="text-green-700 font-bold cursor-pointer">{blog.category}</div>
                                 <div className="flex items-center gap-2 text-neutral-400">
                                    <blog.icon className="w-5 h-5"/>
                                    <div>{blog.date}</div>
                                 </div>
                            </div>
                            <Link href={`/blogs/${blog.slug}`}>
                            <div className="lg:text-lg text-[16px] font-semibold px-4 mb-2 cursor-pointer hover:text-green-800">{blog.title}</div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}