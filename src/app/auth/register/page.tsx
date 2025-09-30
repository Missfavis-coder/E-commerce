"use client"
import Link from "next/link"
import { Lock, User, EyeOff, Eye, Mail } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupInput } from "@/lib/validators/validator";
import { signupSchema } from "@/lib/validators/validator";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/auth-context";
import toast from "react-hot-toast";

export default function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();
    const {login} = useAuth();
  
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<SignupInput>({
        resolver: zodResolver(signupSchema),
      });
     //const { error, setError } = useState();
  

  const onSubmit =  async (data: SignupInput) => {
    setIsLoading(true);
    const newUser = { name: data.firstName, email: data.email };

   // Save user to context
    login(newUser);

    try{
      await new Promise((resolve) => setTimeout(resolve, 1000 ))
      router.push("/auth/logIn")
      toast.success("Account Created Successfully 🎉");
    } catch(err){
      console.error(err);

    }finally{
      setIsLoading(false)
    }
  };


    return(
        <div className="flex min-h-screen ">
        <div className="w-full  flex items-center justify-center p-6 lg:p-8 px-4">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="mb-8">
            </div>
  
            {/* Header */}
            <div className="mb-8 flex-col flex items-center justify-center">
              <h1 className="md:text-3xl text-2xl font-bold text-gray-900 mb-2">DeCart Store</h1>
              <p className="text-gray-600 text-center ">
                 Join us today and enjoy a seamless shopping experience.
              </p>
            </div>
  
            {/* Sign Up Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mb-8 w-full " autoComplete="off">
              <div className="space-y-4 ">

                <div className="grid grid-cols-1 gap- space-y-4">
                  <div>
                  <div className="relative group ">
                    <input
                      {...register("firstName")}
                      placeholder="First name"
                      className="h-12 pl-12 pr-6 w-full rounded-xl transition-all duration-200 bg-white/50 backdrop-blur-sm border border-gray-300 outline-none text-gray-600 text-[15px] focus:ring-2 focus:outline-none focus:ring-green-600 focus:border-green-600"
                    />
                    <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                  </div>
                  {errors.firstName && <p className="text-red-500 mt-1 text-sm">{errors.firstName.message}</p>}
                  </div>
                  <div>
                  <div className="relative group 2">
                    <input
                      {...register("lastName")}
                      placeholder="Last name"
                      className="h-12 pl-12 pr-6 w-full rounded-xl transition-all duration-200 bg-white/50 backdrop-blur-sm border border-gray-300 outline-none text-gray-600 text-[15px] focus:ring-2 focus:outline-none focus:ring-green-600 focus:border-green-600"
                    />
                    <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                  </div>
                  {errors.lastName && <p className="text-red-500 mt-1 text-sm">{errors.lastName.message}</p>}
                  </div>
                </div>
                <div> 
                <div className="relative group">
                  <input
                    {...register("email")}
                    placeholder="Enter your email"
                    className="h-12 pl-12 pr-6 w-full rounded-xl transition-all duration-200 bg-white/50 backdrop-blur-sm border border-gray-300 outline-none text-gray-600 text-[15px] focus:ring-2 focus:outline-none focus:ring-green-600 focus:border-green-600"
                  />
                  <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                </div>
                {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>}
                </div>
                
                <div>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="Create a password"
                    className="h-12 pl-12 pr-6 w-full  rounded-xl transition-all duration-200 bg-white/50 backdrop-blur-sm border border-gray-300 outline-none text-gray-600 text-[15px] focus:ring-2 focus:outline-none focus:ring-green-600 focus:border-green-600"
                  />
                  <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 mt-1 text-sm">{errors.password.message}</p>}
                </div>
                
                <div>
                <div className="relative group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword")}
                    placeholder="Confirm your password"
                    className="h-12 pl-12 pr-6 w-full rounded-xl transition-all duration-200 bg-white/50 backdrop-blur-sm border border-gray-300 outline-none text-gray-600 text-[15px] focus:ring-2 focus:outline-none focus:ring-green-600 focus:border-green-600"
                  />
                  <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>  
                </div>
                {errors.confirmPassword && <p className="text-red-500 mt-1 text-sm">{errors.confirmPassword.message}</p>}
              </div>

              </div>
  
              <div className="flex items-start space-x-2 text-sm">
                <input type="checkbox" className="w-4 h-4 mt-0.5 text-blue-600 border-gray-300 rounded focus:ring-primary"  />
                <span className="text-gray-600">
                  I agree to the{" "}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-700 text-sm">
                    Terms of Service
                  </Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-700 text-sm">
                    Privacy Policy
                  </Link>
                </span>
              </div>
  
              <button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-[#186b15] to-[#26b24b] hover:opacity-90 text-white font-semibold rounded-full transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] text-[16px] cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-1 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
  
            <div className="mt-4 text-center md:text-[16px] text-sm">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link href="/auth/logIn" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
  
        </div>
    )
}