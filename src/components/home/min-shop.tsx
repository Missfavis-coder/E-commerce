"use client"
import { getProducts } from "@/api/product";
import { useCart } from "@/lib/context/cart-context";
import { ProductSkeleton } from "@/lib/product/product-skeleton";
import { Product } from "@/type/type";
import {  Heart, ShoppingBag, Star } from "lucide-react"
import Image from "next/image";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
function slugify(str: string) {
    return str
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  }


export default function MiniShop(){

    const[sortOrder, setSortOrder] = useState<"beauty" | "fragrances" |"furniture"| "groceries" | "all" | null >("beauty");
    const [products, setProducts] = useState<Product[]>([]);
    const {cart, addToCart, favourite, favouriteBtn} = useCart();
    const [loading, setLoading] = useState(true); // Add loading state
    const router = useRouter();
    
    const ProductDetails =(title : string)=>{
        router.push(`products/${slugify(title)}`)
    }
    
    const SeeAllBtn =() =>{
        router.push("/hot-deals")
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
                setLoading(false);
            }
        }
        load();
    }, []);

    const filteredProducts = products.filter((product) => {
        if (!sortOrder) return true; // Show all if no filter selected
        return product.category.toLowerCase() === sortOrder?.toLowerCase();
      });
    

    return(
        <div className="max-w-7xl mx-auto mt-10 lg:px-4 px-6">
            <div>
                <div className="flex flex-wrap items-center md:justify-between text-[14px] gap-2 ">
                   <div className="flex flex-wrap items-center md:gap-2 gap-2 font-semibold ">
                         <button  onClick={()=> setSortOrder(null)} className={`flex items-center ${sortOrder === null ? "bg-green-500 text-white" : "bg-green-300/50 border border-green-600"} rounded-3xl px-8 py-2 cursor-pointer`}>
                            <p>All</p>
                        </button>

                        <button  onClick={()=> setSortOrder("beauty")} className={`flex items-center ${sortOrder === "beauty" ? "bg-green-500 text-white" : "bg-green-300/50 border border-green-600"} rounded-3xl px-4 py-2 cursor-pointer`}>
                            <p>Beauty</p>
                        </button>


                        <button onClick={()=> setSortOrder("fragrances")} className={`flex items-center ${sortOrder === "fragrances" ? "bg-green-500 text-white" : "bg-green-300/50 border border-green-600 "} rounded-3xl px-4 py-2 cursor-pointer`} >
                            <p>Fragrances</p>
                        </button>

                        <button onClick={()=> setSortOrder("furniture")} className={`flex items-center ${sortOrder === "furniture" ? "bg-green-500 text-white" : "bg-green-300/50 border border-green-600 " 
                        }rounded-3xl px-4 py-2 cursor-pointer`} >
                            <p>Furniture</p>
                        </button>

                        <button onClick={()=> setSortOrder("groceries")} className={`flex items-center ${sortOrder === "groceries" ? "bg-green-500 text-white" : "bg-green-300/50 border border-green-600"} rounded-3xl px-4 py-2 cursor-pointer`} >
                            <p>Groceries</p>
                        </button>
                    </div>

                    <div onClick={SeeAllBtn} className={`flex items-center  border border-green-950"} rounded-3xl px-6 py-2 cursor-pointer`}>See All</div>
                </div>
            </div>
            <div className="grid lg:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-4 mt-8">
                {loading ?  Array.from({length: 14}).map((_, index) =>(
                    <ProductSkeleton key={index} />
                ))
                : filteredProducts.slice(0, 14).map((product, index)=>(
                        <div onClick={() => ProductDetails(product.title)} key={index} className="flex flex-col justify-between border border-gray-300 rounded-md transform transition duration-300 ease-in-out 
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
    )
}