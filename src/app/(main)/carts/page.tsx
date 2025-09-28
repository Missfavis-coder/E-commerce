"use client"
import { useCart } from "@/lib/context/cart-context";
import { Trash } from "lucide-react";
import Image from "next/image";

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart,subtotal } = useCart();

  return (
    <div className="max-w-7xl mx-auto p-6 mt-20 bg-gray-50">
      <h1 className="font-semibold text-xl"> Cart ({cart.length})🛒</h1>
      {cart.length === 0 ? (
        <div className="flex items-center justify-center h-100 ">
            <div className="bg-white px-6 py-2 shadow-md">Your Cart is Empty.</div>
        </div>
      ) : (
        <div className="w-full lg:flex lg:items-start gap-4 " >
         <div className="bg-white shadow-md rounded-lg  sm:p-4 p-2 mt-6 lg:w-3/4 " >
          {cart.map((item, index) => (
            <div key={index} className=" flex flex-col mb-2 px-4 not-first:border-t border-neutral-300 ">
              <div className="flex gap-2 mt-4">
                <div className="md:w-[100px] w-[150px] ">
                  <Image
                  alt="product Image"
                  src={item.images?.[0] || "/placeholder.png"}
                  width={80}
                  height={80}
                  className="object-cover"
                  />
                  
                </div>

                <div className="space-y-2 md:flex justify-between  w-full" >

                  <div>
                    <div className="font-extralight md:text-xl text-[16px]">{item.title}</div>
                    <div className="text-sm">{item.availabilityStatus}</div>
                    <div className="text-sm">DeCart Store</div>
                  </div>

                  <div className="flex md:flex-col items-center gap-3">
                   <div className="font-semibold sm:text-xl text-[17px]">${ (item.price * (1 - item.discountPercentage / 100)).toFixed(2) }</div>
                    <div className="flex items-center gap-4">
                      <div className="text-neutral-600 line-through text-sm sm:text-[16px]">${""}{item.price}</div>
                      <div className="bg-green-500/20 text-sm md:flex hidden items-center justify-center h-8 w-10 rounded-md text-green-900">-{item.discountPercentage.toFixed(0)}%</div>
                    </div> 
                 </div>

                </div>

              </div>
              <div className="flex justify-between my-4">
                <div onClick={() => removeFromCart(item.id)} className="flex items-center gap-1 cursor-pointer">
                  <Trash className="text-green-600 w-4 h-4"/>
                  <p className="text-green-600">Remove</p>
                </div>
                <div className="flex gap-4 items-center">
                  <button onClick={() =>updateCartQuantity(item.id, (item.quantity || 1) + 1) } className="flex items-center justify-center bg-gray-400 text-white px-4 py-1 rounded-md text-[16px] cursor-pointer">+</button>
                  <p>{item.quantity || 1}</p>
                  <button onClick={() => {const newQty = (item.quantity || 1) - 1;if (newQty < 1) { removeFromCart(item.id);} else {updateCartQuantity(item.id, newQty);}}} className="flex items-center justify-center bg-green-600 text-white px-4 py-1 rounded-md text-[16px] cursor-pointer">-</button>
                </div>
              </div>
              {/* <div className=" flex items-center mb-2">
                <div className="md:flex  items-center gap-4">
                 <div className="">
                  <Image
                    alt="product Image"
                    src={item.images?.[0] || "/placeholder.png"}
                   width={100}
                    height={100}
                  />
                    </div>
                    <div>
                       <div className="text-neutral-500 w-[250px]">{item.title}</div>
                       <div>{item.stock} units left</div>
                    </div>
                </div>
                <div>
                  <div className="">
                    <div className="font-semibold text-xl">
                      ${ (item.price * (1 - item.discountPercentage / 100)).toFixed(2) }
                    </div>

                  <div className="flex items-center gap-4 ">
                     <div className="text-neutral-600 line-through">${""}{item.price}</div>
                    <div className="bg-green-500/20 text-sm flex items-center justify-center h-8 w-10 rounded-md text-green-900">-{item.discountPercentage.toFixed(0)}%</div>
                  </div>
                  <div>

                  </div>
                  </div>
                  <div></div>
                </div>

               </div>*/}

              {/* <div className="flex justify-between items-center">
                 <button onClick={() => removeFromCart(item.id)} className=" px-4 py-2 cursor-pointer">Remove</button>
                 <div className="flex items-center gap-6">
                    <button onClick={() =>
                       updateCartQuantity(item.id, (item.quantity || 1) + 1)
                      } className="bg-white shadow-md px-4 py-1 rounded-lg text-xl cursor-pointer">+</button>
                       <p>{item.quantity || 1}</p>
                    <button
                      onClick={() => {
                        const newQty = (item.quantity || 1) - 1;
                        if (newQty < 1) {
                          removeFromCart(item.id);
                        } else {
                          updateCartQuantity(item.id, newQty);
                        }
                      }}
                     className="bg-white shadow-md px-4 py-1 rounded-lg text-xl cursor-pointer">-</button>
                 </div>
               </div>*/}

            </div>
          ))}
         </div>
         <div className="bg-white w-full shadow-md rounded-lg lg:w-1/4  mt-10 h-200px py-4">
            <div className="text-xl font-semi-bold border-b border-neutral-300 px-4 mb-4">
                <h2 className="md:text-[16px] text-sm mb-2">Cart Summary</h2>
            </div>
            <div className="flex justify-between items-center px-4 ">
               <div>Subtotal</div>
               <div>${subtotal.toFixed(2)}</div>
            </div>
            <div className="mx-4 mt-8">
            <button className=" bg-green-600 rounded-md w-full flex items-center justify-center py-2 text-white cursor-pointer">Checkout</button>
            </div>
         </div>
        </div>
      )}
    </div>
  );
}
