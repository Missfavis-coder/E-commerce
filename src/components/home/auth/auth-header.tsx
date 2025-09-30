"use client";

import Link from "next/link";
//import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface AuthHeaderProps {
  showBackButton?: boolean;
  backHref?: string;
  backText?: string;
}

export default function AuthHeader({ 
  showBackButton = true, 
  backHref = "/", 
  backText = "Back" 
}: AuthHeaderProps) {
  //const pathname = usePathname();
  
  // Determine which auth page is active
 // const isLoginPage = pathname === "/auth/login";
 // const isSignupPage = pathname === "/auth/signUp";
//  const isForgotPasswordPage = pathname === "/auth/forgot-password";
 // const isResetPasswordPage = pathname === "/auth/reset-password";

  return (
    <nav className="w-full py-4 fixed top-0 left-0 z-50 transition-colors duration-500">
      <div className="max-w-7xl lg:mx-auto my-2 flex justify-between items-center px-2  py-8 lg:px-16 ">

        {/* Back Button */}
        {showBackButton && (
          <div className="">
            <Link 
              href={backHref} 
              className="flex items-center gap-2 text-white bg-green-700 hover:text-gray-300 transition-colors rounded-full backdrop-blur-2xl mx-5 shadow-md px-8 py-3"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">{backText}</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
