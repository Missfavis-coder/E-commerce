"use client";
import { ShoppingBag } from "lucide-react";
import React from "react";
import { Product } from "@/type/type";
import { useCart } from "@/lib/context/cart-context";

type AddToCartButtonProps = {
  product: Product;
};

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart, cart } = useCart();

  const isInCart = cart.some((item) => item.id === product.id);

  return (
    <div className="mx-2 my-4">
      <div
        onClick={() => {
          if (!isInCart) {
            addToCart(product);
          }
        }}
        className={`flex text-sm font-semibold items-center justify-center gap-2 ${
          isInCart
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-600/60 cursor-pointer"
        } py-2 px-2 rounded-lg text-white`}
      >
        <ShoppingBag className="w-5 h-5" />
        <p>{isInCart ? "Already in Cart" : "Add to Cart"}</p>
      </div>
    </div>
  );
}
