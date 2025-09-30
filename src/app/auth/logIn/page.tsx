"use client";

import { useState } from "react";
import { Mail, Lock, EyeOff, Eye } from "lucide-react";
import {useForm} from "react-hook-form";
import {zodResolver } from "@hookform/resolvers/zod";
import { LoginInput, loginSchema } from "@/lib/validators/validator";
import { useRouter } from "next/navigation"
import Link from "next/link";
import { useAuth } from "@/lib/context/auth-context";
import toast from "react-hot-toast";
import AuthHeader from "@/components/home/auth/auth-header";


export default function SigninPage() {
  const { login } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
      } = useForm<LoginInput>({
     resolver: zodResolver(loginSchema),
    mode: "onBlur", // validates on blur
  });
  const router = useRouter();

  //const { toastE, toastS } = toaster;
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setError(null);
    
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000 ))
      login({ name: "Adeshola", email: data.email });
      router.push('/');
      toast.success("Welcome to DeCart Store 🎉")
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex min-h-screen">
      <div className="w-full flex items-center justify-center p-6 lg:p-8 pt-24">
        <div className="w-full max-w-md relative">
          <AuthHeader/>
          {/* Header */}
          <div className="mb-6 relative flex flex-col items-center justify-center">
            <h1 className="md:text-3xl text-2xl font-bold text-neutral-900 mb-3">Welcome Back</h1>
            <p className="text-neutral-600">Sign in to continue shopping.</p>
          </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Sign In Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-10 mb-6 md:px-8 " autoComplete="off">
            <div className="space-y-4">
            
              <div>
                 <div className="relative group">
                    <input
                     type="email"
                     {...register("email")}
                     placeholder="Enter your email"
                     className="h-12 pl-12 pr-4 w-full rounded-xl border border-gray-300 text-gray-500 outline-none focus:outline-none focus:ring-2 focus:ring-green-600 transition-all duration-200 bg-white/20 "
                     autoComplete="off"
                     />
                    <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                </div>
                {errors.email && (<p className="text-red-500 text sm mt-1">{errors.email.message}</p>)}
              </div>

              <div>
                 <div className="relative group">
                    <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                    <input
                     type={showPassword ? "text" : "password"}
                     {...register("password")}
                     placeholder="Enter your password"
                     className="h-12 pl-12 pr-4 w-full rounded-xl border border-gray-300 text-gray-500 outline-none focus:outline-none focus:ring-2 focus:ring-green-600 transition-all duration-200 bg-white/20 "
                     autoComplete="off"
                     />
                    <button
                       type="button"
                       onClick={() => setShowPassword(!showPassword)}
                       className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                </div>
                  {errors.password && (<p className="text-red-500 text sm mt-1">{errors.password.message}</p>)}
              </div>

            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 " autoComplete="off" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <div className="text-primary-500 cursor-pointer hover:text-green-700 font-medium">
                Forgot password?
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 flex items-center justify-center bg-gradient-to-r from-[#186b15] to-[#26b24b] hover:opacity-90 text-white font-semibold rounded-full transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-1 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="mt-4 text-center text-[15px]">
            <p className="text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" className="text-neutral-800 hover:text-neutral-600/90 font-semibold transition-colors">
                Create account
              </Link>
            </p>
          </div>
        </div>
      
      </div>
    </div>
  );
}