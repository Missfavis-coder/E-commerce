// src/lib/context/cart-context.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Product } from '@/type/type';
import { useRouter } from 'next/navigation';

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  clearCart: () => void;
  updateCartQuantity: (productId: number, newQuantity:number) => void;
  removeFromCart : (productId : number) => void;
  subtotal: number;
  favourite: number[];
  favouriteBtn: (productId : number) => void;
}


const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

// 5️⃣ Provider Component
export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState< Product[]>([]);
  const router = useRouter();
  const [favourite, setFavourite] = useState<number[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

//Add to cart
  const addToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
    router.push("/carts")
  };
//Remove Cart
  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

//empty cart after checkout
  const clearCart = () => {
    setCart([])
  }
//subtotal
const subtotal = cart.reduce((acc, item) => {
    const discountedPrice = item.price * (1 - item.discountPercentage / 100);
    const quantity = item.quantity ?? 1
    return acc + discountedPrice * quantity;
  }, 0);
  
//quantity of the product
const updateCartQuantity = (productId: number, newQuantity: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
//favourite for later purchase. 
const favouriteBtn =(productId:  number) =>{
    setFavourite(prev => 
        prev.includes(productId) ? prev.filter(id => id !== productId) :
        [...prev, productId]
    )
}
  return (
    <CartContext.Provider value={{ cart, clearCart, addToCart, favouriteBtn, favourite, updateCartQuantity, removeFromCart, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};
