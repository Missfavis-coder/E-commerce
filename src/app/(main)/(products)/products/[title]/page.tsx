// src/app/(main)/(blogs)/blogs/[slug]/page.tsx

import { getProducts } from "@/api/product";
import AddToCartButton from "@/constants/button";
import ProductDescription from "@/constants/constant";
import { Facebook, PaintBucket, ShoppingBasket, Star, Truck, Twitter } from "lucide-react";
import Image from "next/image";

type ProductPageProps = {
  params:Promise< {
    title: string;
  }>;
};
function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
export default async function ProductPage({params}: ProductPageProps) {
  const {title} = await params;
  const products = await getProducts();
  const product = products.find((p) => slugify(p.title) === title);

  if (!products) {
    return <div className="max-w-3xl mx-auto p-6">Blog not found</div>;
  }

  

  return (
    <div className=" bg-gray-200 rounded-md py-6 px-6 pt-24  ">
      <div className="md:flex max-w-7xl mx-auto pt-10  gap-4 space-y-4 w-full">
        <div className="bg-white rounded-md lg:flex gap-2 md:gap-4 p-4 md:w-3/4 ">
          {/**first half */}
          <div className="lg:w-1/3 flex flex-col items-center gap-2 ">
            <div className=" flex items-center justify-center relative ">
              <div className="bg-green-500/80 text-sm flex items-center justify-center h-8 w-10 rounded-md text-green-900 font-bold absolute -translate-y-10 translate-x-10 lg:translate-x-14">-{product?.discountPercentage.toFixed(0)}%</div>
              <Image
              src={product?.images[0] || "/placeholder.png"}
              alt="Product"
              width={180}
              height={180}
              />
            </div>
            <div className="lg:flex hidden flex-col justify-center text-neutral-600 mt-2">
              <div className="mb-1 ">Share this product</div>
              <div className="flex gap-2">
                <div className="border border-neutral-500 p-1 rounded-full text-[12px]"><Facebook  className="text-neutral-500"/></div>
                <div className="border border-neutral-500 p-1 rounded-full text-[12px]"><Twitter className="text-neutral-500"/></div>
              </div>
            </div>
          </div>
          {/**Second half */}
          <div className="text-neutral-700">
            <div className=" md:flex hidden py-1 w-[160px] font-semibold rounded-lg m-2">Official Store</div>
            <div className="  ">
              <div className="md:text-xl text-[16px] md:max-w-[250px] font-semibold " >{product?.title}</div>
              <div className=" text-[16px] md:max-w-[320px]">
                <ProductDescription description={product?.description ?? ""}/>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="font-semibold">Brand:</span>
              <div className="text-neutral-700">{product?.brand || "De Rica"}</div>
            </div>
            <div className="font-bold md:text-2xl text-xl mt-1">${product?.price}</div>
            <div className="text-sm">Shipping from $40 to Washington(London)</div>
            <div className="flex items-center my-2">
              <div className="flex gap-1">
                <Star className="w-4 h-4 text-amber-400" fill="gold"/>
                <Star className="w-4 h-4 text-amber-400" fill="gold"/>
                <Star className="w-4 h-4 text-amber-400" fill="gold"/>
                <Star className="w-4 h-4 text-amber-400" fill="gold"/>
                <Star className="w-4 h-4"/>
              </div>
              <p>({product?.rating.count} verified ratings)</p>
            </div>
            <div>{product &&
                <AddToCartButton product={product}/>}
              </div>
            <div className="border-t-3 border-neutral-200 my-2">
              <div className="uppercase font-semibold my-2">Promotions</div>
              <div className="flex items-center gap-2">
                <div className="bg-green-600 p-1 rounded-full text-white w-6 h-6 flex items-center "><Star fill="white"/></div>
                <div className="text-[16px]">Call 07006000000 To Place Your Order</div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="bg-green-600 p-1 rounded-full text-white w-6 h-6 flex items-center "><Star fill="white"/></div>
                <div className="text-[16px]">Enjoy cheaper shipping fees when you select a PickUp Station at checkout.</div>
              </div>
            </div>
          </div>

        </div>

        <div className="bg-white rounded-md md:flex gap-2 md:w-1/3 text-sm">
           <div className="py-4">
             <p className="uppercase font-semibold mb-2 px-4">Delivery & returns</p>
             <div className="px-4">
               <div>DeCart Store</div>
               <div>The BEST products, delivered faster. Now PAY on DELIVERY, Cash or Bank Transfer Anywhere, Zero Wahala! </div>
             </div>
             <div className="border-t-2 border-neutral-200 mt-4">
                <div className="flex gap-2 px-4 mt-4">
                  <div className="text-green-600 "><ShoppingBasket/></div>
                  <div>
                    <div className="font-semibold">Pickup Station</div>
                    <div>Delivery Fees $20</div>
                    <div className="">
                    Ready for pickup between 01 October and 03 October if you place your order within the next 18hrs 47mins</div>
                  </div>
                </div>
                <div className="flex gap-2 px-4 mt-4">
                  <div className="text-green-600 "><Truck/></div>
                  <div>
                    <div className="font-semibold">Door Delivery</div>
                    <div>Delivery Fees $30</div>
                    <div className="">
                    Ready for pickup between 01 October and 03 October if you place your order within the next 8hrs 47mins</div>
                  </div>
                </div>
                <div className="flex gap-2 px-4 mt-4">
                  <div className="text-green-600 "><PaintBucket/></div>
                  <div>
                    <div className="font-semibold">Return Policy</div>
                    <div className="">Free return within 7 days for ALL eligible items</div>
                  </div>
                </div>        
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
