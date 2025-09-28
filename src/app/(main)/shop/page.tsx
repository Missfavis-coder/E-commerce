"use client"
import Image from "next/image"
import { useState, useEffect } from "react";
import { getProducts } from "@/api/product";
import { Product } from "@/type/type";
import {  Heart, ShoppingBag, Star } from "lucide-react"
import { useCart } from "@/lib/context/cart-context";
import { ProductSkeleton } from "@/lib/product/product-skeleton";
import { useRouter } from "next/navigation";

function slugify(str: string) {
    return str
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  }
export default function Shop(){
    const [products, setProducts] = useState<Product[]>([]);
    const {addToCart, cart, favouriteBtn, favourite} = useCart();
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    
    const ProductDetails =(title : string)=>{
        router.push(`products/${slugify(title)}`)
    } 

    useEffect(() =>{
        async function load(){
            try{
                const data = await getProducts();
                setProducts(data)
                console.log(data)
            } catch(err) {
                console.error(err)
            }finally{
                setLoading(false)
            }
        }
        load();
    }, []);

    const categories = [
        {label: "Kitchen Appliances"},
        {label: "Television"},
        {label: "Refrigerators"},
        {label: "Washing Machine"},
        {label: "Tablets"},
        {label: "Gadget Accessories"},
        {label: "Appliances"},
        {label: "Air Conditioners"},
        {label: "Fragrances"},
        {label: "Airbuds"},
        {label: "Cameras"},
        {label: "Smartphones"},
        {label: "Mobiles"},
        {label: "Smart Watches"},
    ]

    const brands = [
        {label: "Hi-Tech Limited"},
        {label: "hp Limited"},
        {label: "The Apple Limited"},
        {label: "A4 Tech"},
        {label: "The Hitachi Limited"},
        {label: "Huawei Limited"},
        {label: "IKEA Limited"},
        {label: "Sony Limited"},    
    ]

    const prices = [
        {label: "Under $100"},
        {label: " $100 - $200"},
        {label: " $200 - $300"},
        {label: " $300 - $500"},
        {label: " Over $500"},
    ]
    return(
        <div className="mt-25 max-w-7xl mx-auto md:px-6 px-4 ">
            <div className="">
                <div className="uppercase text-xl font-bold my-6 pt-4" >Get the products as your needs</div>
            </div>
          <div className="flex gap-2">
            <div className="mt-6 lg:max-h-[400px] sm:max-h-[450px] max-h-[450px] w-[280px]  overflow-auto">
                <div className="">
                    <div className="text-[18px] font-semibold">Product Categories</div>
                    <div className="space-y-2 mt-2">
                        {categories.map((category, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                type="checkbox"
                                />
                                <div className="text-neutral-600 md:text-[16px] text-sm"> {category.label} </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-6">
                    <div className="text-[18px] font-semibold">Product Categories</div>
                    <div className="space-y-2 mt-2">
                        {brands.map((brand, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                type="checkbox"
                                />
                                <div className="text-neutral-600 md:text-[16px] text-sm"> {brand.label} </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-6">
                    <div className="text-[18px] font-semibold">Product Categories</div>
                    <div className="space-y-2 mt-2">
                        {prices.map((price, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                type="checkbox"
                                />
                                <div className="text-neutral-600 md:text-[16px] text-sm"> {price.label} </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-h-[450px] overflow-auto w-full">
            <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 mt-8 px-2">
                {loading ? 
                Array.from({length: 12}).map((_, index) => (
                    <ProductSkeleton key={index}/>
                )) :
                products.slice(0, 15).map((product, index)=>(
                        <div key={index} onClick={()=>ProductDetails(product.title)} className="flex flex-col justify-between border border-gray-300 rounded-md transform transition duration-300 ease-in-out 
                        hover:scale-105 hover:shadow-lg cursor-pointer">
                            <div className="bg-gray-50 px-2 py-2">
                            <div className="flex justify-end items-center">
                               <div onClick={() =>favouriteBtn(product.id)} className={` cursor-pointer flex items-center  p-2 text-xs rounded-full ${favourite.includes(product.id) ? "bg-green-600 text-white " : "bg-neutral-300 "}`}>
                                  <Heart className={` cursor-pointer w-4 h-4`}/>
                               </div>
                            </div>
                               <Image
                                 alt="product Image"
                                 src={product.images?.[0] || "/placeholder.png"}
                                  width={220}
                                 height={220}
                               />
                            </div>
                            <div className="px-2 text-[15px] text-neutral-400">{product.title}</div>
                            <div className="px-2 text-[16px] font-semibold">{product.description.slice(0, 30)}...</div>
                            <div className="md:flex items-center gap-4 px-2">
                                <div className="flex gap-1">
                                    <Star className="w-3 h-3 " color="green" fill="green" />
                                    <Star className="w-3 h-3 " color="green" fill="green" />
                                    <Star className="w-3 h-3 " color="green" fill="green" />
                                    <Star className="w-3 h-3 " color="green" fill="green" />
                                    <Star className="w-3 h-3 text-green "  />
                                </div>
                                <div className="text-sm text-neutral-500">5 Reviews</div>
                            </div>
                            <div className="flex gap-2 items-center px-2 text-sm">
                                <div>{product.availabilityStatus}</div>
                                <div className="text-[16px] text-green-900">{product.stock}</div>
                            </div>
                            <div className="flex gap-2 items-center px-2">
                                <div className="text-[16px] text-green-900">${product.discountPercentage}</div>
                                <div className="line-through text-neutral-400 text-sm">${product.price}</div>
                            </div>
                            <div className="mx-2 my-4">
                             {(() => {
                                const isInCart = cart.some(item => item.id === product.id);

                               return (
                                 <div
                                 onClick={() => {
                                 if (!isInCart) {
                                addToCart(product);
                                 }
                                }}
                                className={`flex text-sm font-semibold items-center justify-center gap-2 ${
                                isInCart ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-600/60 cursor-pointer'
                                } py-2 px-2 rounded-lg text-white`}
                              >
                                <ShoppingBag className="w-5 h-5" />
                                <p>{isInCart ? 'Already in Cart' : 'Add to Cart'}</p>
                               </div>
                               );
                             })()}
                            </div>
                        </div>
                ))}
            </div>
            </div>
         </div>
        </div>
    )
}