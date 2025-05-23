"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}
    let isValid = true

    if (!email) {
      newErrors.email = "ইমেইল আবশ্যক"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "সঠিক ইমেইল দিন"
      isValid = false
    }

    if (!password) {
      newErrors.password = "পাসওয়ার্ড আবশ্যক"
      isValid = false
    } else if (password.length < 6) {
      newErrors.password = "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsLoading(true)

      // Simulate API call
      setTimeout(() => {
        console.log("Form submitted:", { email, password, rememberMe })
        setIsLoading(false)
        router.push("/")
      }, 1500)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-md">
          <div className="overflow-hidden rounded-xl bg-white shadow-lg">
            <div className="relative h-32 bg-gradient-to-r from-brand-600 to-brand-700">
              <div className="absolute -bottom-12 left-1/2 h-24 w-24 -translate-x-1/2 overflow-hidden rounded-full border-4 border-white bg-white shadow-md">
                <Image
                  src="/placeholder.svg?height=96&width=96"
                  alt="User"
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="mt-16 px-8 pb-8">
              <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-gray-900">সাইন ইন</h1>
                <p className="mt-2 text-sm text-gray-600">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                    ইমেইল
                  </Label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="আপনার ইমেইল দিন"
                      className={`pl-10 ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "focus:border-brand-500 focus:ring-brand-500"}`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                      পাসওয়ার্ড
                    </Label>
                    <Link href="/forgot-password" className="text-xs font-medium text-brand-600 hover:text-brand-500">
                      পাসওয়ার্ড ভুলে গেছেন?
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="আপনার পাসওয়ার্ড দিন"
                      className={`pl-10 pr-10 ${errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "focus:border-brand-500 focus:ring-brand-500"}`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                      onClick={togglePasswordVisibility}
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                </div>

                <div className="flex items-center">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    disabled={isLoading}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    আমাকে মনে রাখুন
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-brand-600 hover:bg-brand-700 transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>প্রসেসিং...</span>
                    </div>
                  ) : (
                    "সাইন ইন"
                  )}
                </Button>

                <div className="text-center text-sm">
                  <span className="text-gray-600">অ্যাকাউন্ট নেই?</span>{" "}
                  <Link href="/signup" className="font-medium text-brand-600 hover:text-brand-500">
                    নতুন অ্যাকাউন্ট তৈরি করুন
                  </Link>
                </div>
              </form>

              <div className="mt-6">
                <div className="fancy-divider">
                  <span>অথবা এর মাধ্যমে চালিয়ে যান</span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="btn-hover-effect flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    disabled={isLoading}
                  >
                    <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                    </svg>
                    <span>গুগল</span>
                  </button>
                  <button
                    type="button"
                    className="btn-hover-effect flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    disabled={isLoading}
                  >
                    <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22,12c0-5.52-4.48-10-10-10S2,6.48,2,12c0,4.84,3.44,8.87,8,9.8V15H8v-3h2V9.5C10,7.57,11.57,6,13.5,6H16v3h-2 c-0.55,0-1,0.45-1,1v2h3v3h-3v6.95C18.05,21.45,22,17.19,22,12z" />
                    </svg>
                    <span>ফেসবুক</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
