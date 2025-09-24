"use client";

import { useCart } from "@/lib/context/cart-context";
import { Heart, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/blogs", label: "Blog" },
  { href: "/hot-deals", label: "Hot Deal" },
];

export default function Header() {
  const pathname = usePathname();
  const {cart, favourite} = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
 
  const handleCartButton = ()=>{
    router.push("/carts")
    //alert("hey")
  }
  const isLinkActive = (href: string, activePaths?: string[]) => {
    if (activePaths) {
      return activePaths.some((p) => pathname.startsWith(p));
    }
    return pathname === href;
  };

  const NavLinkItems = ({ isMobile = false }) => (
    <>
      {navLinks.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={`
              font-semibold transition-colors text-shadow-green-400 text-neutral-600 " ${isLinkActive(link.href)
                ? ""
                : "hover:text-green-600"
              }
          `}
          onClick={() => isMobile && setIsMenuOpen(false)}
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  return (
    <nav 
    className={`w-full fixed top-0 left-0 z-50 transition-colors duration-500 bg-white  `}
    >
      <div className={` container mx-auto flex justify-between items-center  px-4 py-4 lg:px-16 backdrop-blur-[4px]   `}>
        <div className="flex text-2xl font-bold  items-center gap-2">
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-600"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
          <Link href="/">
              DeCart
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <NavLinkItems />
        </div>
        <div className="flex items-center relative md:gap-6 gap-3 text-gray-600">
            {/* Search */}
            <div className="relative  cursor-pointer">
               <Search size={20} className="hover:text-green-500" />
             </div>

             {/* Cart */}
            <div onClick={ handleCartButton} className="relative cursor-pointer">
                <ShoppingBag size={20} className="hover:text-green-500" />
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                  {cart.length}
               </span>
            </div>

             {/* Wishlist */}
            <div className="relative cursor-pointer">
                <Heart size={20} className="hover:text-green-500" />
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                  {favourite.length}
                </span>
            </div>

            {/* Login button */}
            <button className="text-black cursor-pointer">Login</button>
    </div>

      </div>
      
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full  h-[300px] py-4 bg-white transition duration-30" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-6 sm:px-3 flex flex-col items-center">
            <NavLinkItems isMobile={true} />
          </div>
        </div>
      )}
    </nav>
  );
}
