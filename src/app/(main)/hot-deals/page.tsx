"use client"
import { useState, useEffect } from "react";
import { Product } from "@/type/type";
import { getProducts } from "@/api/product";
import {  Flame, Heart, ShoppingBag, Star } from "lucide-react"
import Image from "next/image";
import { useCart } from "@/lib/context/cart-context";
import { ProductSkeleton } from "@/lib/product/product-skeleton";

export default function HotDeal(){
    const [products, setProducts] = useState<Product[]>([]);
    const {addToCart, cart, favouriteBtn, favourite} = useCart();
    const [loading, setLoading] = useState(true); // Add loading state

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
    return(
        <div className="bg-gray-100 pt-20 px-4 " >
            <div className="max-w-7xl mx-auto ">
            <div className="md:text-3xl text-xl underline font-semibold ">Hot Deals of the week</div>

            <div className="grid lg:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-4 py-12">
                {loading 
                ? Array.from({length:12}).map((_, index) => (
                    <ProductSkeleton key={index}/>
                ))
                : products.filter((product) => product.price <= 40).slice(0, 15).map((product, index)=>(
                        <div key={index} className="flex flex-col justify-between border border-gray-300 rounded-md ">
                            <div className="bg-gray-50 px-2 py-2">
                                <div className="flex justify-between ">
                                   <div className="flex items-center cursor-pointer  p-2">
                                       <Flame fill="orange"/>
                                    </div>
                                   <div onClick={() =>favouriteBtn(product.id)} className={` cursor-pointer flex items-center justify-end p-1 text-xs rounded-full ${favourite.includes(product.id) ? "bg-green-600 text-white " : "border-3 border-neutral-300 "}`}>
                                       <Heart className=" cursor-pointer " />
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
    )
}