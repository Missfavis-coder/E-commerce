"use client"
import { useState, useEffect } from "react";
import Image from "next/image";

const headphones = [
  "/assets/headphones.png",
  "/assets/headphones-browN.png",
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === headphones.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  return (
    <div className="text-white relative mt-32 max-w-7xl mx-auto lg:px-2 px-4 ">
      <div className="flex justify-between items-center bg-neutral-800 py-8 md:px-14 px-6 rounded-md">
        <div className=" px-4">
          <div className="lg:text-4xl text-3xl mb-6">
            Grab Up To 50% Off <br /> on Selected headphones
          </div>
          <button className="bg-green-700 py-2 px-4 rounded-md">Buy Now</button>
        </div>
        <div className="md:flex items-center justify-center hidden pr-15 h-[200px]">
          <Image
            key={headphones[currentIndex]}
            src={headphones[currentIndex]}
            alt="headphones"
            width={240}
            height={240}
            className="object-cover transition-opacity duration-500 ease-in-out"
          />
        </div>
      </div>
    </div>
  );
}
