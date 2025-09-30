"use client"

import { Product } from "@/type/type";
import { useState, useEffect } from "react";
import { getProducts } from "@/api/product";
import Image from "next/image";

export default function PopularCategories() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  // Group products by category and take the first product per category
  const popularCategories = Object.values(
    products.reduce((acc: Record<string, Product>, product) => {
      if (!acc[product.category]){
         acc[product.category] = product;}
      return acc;
    }, {})
  );

  return (
    <div  className=" border-1 border-neutral-300 mx-2 rounded-lg my-10 max-w-7xl lg:mx-auto lg:px-8 px-4 py-8">
        <div className="border-b border-neutral-300 ">
            <div className="font-semibold lg:text-3xl text-2xl py-4">Popular Categories</div>
        </div>
        <div className="grid md:grid-cols-2  gap-6 mt-10">
           {popularCategories.map((product) => (
              <div
                key={product.category}
                className="flex flex-col bg-gray-100  p-4  rounded-lg"
            >
               <div className="flex items-center gap-4">
                <div className="bg-white p-2 border border-green-600">
                   <Image
                      src={product.images[0]}
                      alt={product.category}
                      width={90}
                       height={90}
                      className="object-cover rounded-md"
                    />
                 </div>
                 <div>
                    <h1 className="uppercase font-bold">{product.category}</h1>
                    <p>({product.category.length}) items Available</p>
                </div>   
               </div>    
           </div>
        ))}
     </div>
    </div>
  );
}
