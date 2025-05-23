"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    phone?: string
    password?: string
    confirmPassword?: string
    agreeTerms?: string
  }>({})
  const router = useRouter()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const validateForm = () => {
    const newErrors: {
      name?: string
      email?: string
      phone?: string
      password?: string
      confirmPassword?: string
      agreeTerms?: string
    } = {}
    let isValid = true

    if (!name) {
      newErrors.name = "নাম আবশ্যক"
      isValid = false
    }

    if (!email) {
      newErrors.email = "ইমেইল আবশ্যক"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "সঠিক ইমেইল দিন"
      isValid = false
    }

    if (!phone) {
      newErrors.phone = "ফোন নম্বর আবশ্যক"
      isValid = false
    } else if (!/^[0-9]{11}$/.test(phone)) {
      newErrors.phone = "সঠিক ফোন নম্বর দিন (১১ সংখ্যা)"
      isValid = false
    }

    if (!password) {
      newErrors.password = "পাসওয়ার্ড আবশ্যক"
      isValid = false
    } else if (password.length < 6) {
      newErrors.password = "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে"
      isValid = false
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "পাসওয়ার্ড নিশ্চিত করুন"
      isValid = false
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "পাসওয়ার্ড মিলছে না"
      isValid = false
    }

    if (!agreeTerms) {
      newErrors.agreeTerms = "শর্তাবলী গ্রহণ করুন"
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
        console.log("Form submitted:", { name, email, phone, password, agreeTerms })
        setIsLoading(false)
        router.push("/signin")
      }, 1500)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <div className="overflow-hidden rounded-xl bg-white shadow-lg">
            <div className="relative h-32 bg-gradient-to-r from-brand-600 to-brand-700">
              <div className="absolute left-8 top-8">
                <h1 className="text-3xl font-bold text-white">নতুন অ্যাকাউন্ট তৈরি করুন</h1>
                <p className="mt-2 text-brand-100">আপনার তথ্য দিয়ে রেজিস্ট্রেশন করুন</p>
              </div>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <div className="mb-6 flex items-center justify-center space-x-4">
                    <button
                      type="button"
                      className="btn-hover-effect flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                      disabled={isLoading}
                    >
                      <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                      </svg>
                      <span>গুগল দিয়ে রেজিস্ট্রেশন</span>
                    </button>
                    <button
                      type="button"
                      className="btn-hover-effect flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                      disabled={isLoading}
                    >
                      <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22,12c0-5.52-4.48-10-10-10S2,6.48,2,12c0,4.84,3.44,8.87,8,9.8V15H8v-3h2V9.5C10,7.57,11.57,6,13.5,6H16v3h-2 c-0.55,0-1,0.45-1,1v2h3v3h-3v6.95C18.05,21.45,22,17.19,22,12z" />
                      </svg>
                      <span>ফেসবুক দিয়ে রেজিস্ট্রেশন</span>
                    </button>
                  </div>

                  <div className="fancy-divider">
                    <span>অথবা ইমেইল দিয়ে রেজিস্ট্রেশন করুন</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                    নাম
                  </Label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="name"
                      type="text"
                      placeholder="আপনার পূর্ণ নাম"
                      className={`pl-10 ${errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "focus:border-brand-500 focus:ring-brand-500"}`}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>

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
                      placeholder="আপনার ইমেইল"
                      className={`pl-10 ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "focus:border-brand-500 focus:ring-brand-500"}`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
                    ফোন নম্বর
                  </Label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="আপনার ফোন নম্বর"
                      className={`pl-10 ${errors.phone ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "focus:border-brand-500 focus:ring-brand-500"}`}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>

                <div>
                  <Label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                    পাসওয়ার্ড
                  </Label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="পাসওয়ার্ড দিন"
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

                <div>
                  <Label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-gray-700">
                    পাসওয়ার্ড নিশ্চিত করুন
                  </Label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="পাসওয়ার্ড আবার দিন"
                      className={`pl-10 pr-10 ${errors.confirmPassword ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "focus:border-brand-500 focus:ring-brand-500"}`}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                      onClick={toggleConfirmPasswordVisibility}
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center">
                    <Checkbox
                      id="agree-terms"
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                      disabled={isLoading}
                      className={errors.agreeTerms ? "border-red-500 text-red-500" : ""}
                    />
                    <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                      আমি{" "}
                      <Link href="/terms" className="text-brand-600 hover:text-brand-500">
                        শর্তাবলী
                      </Link>{" "}
                      এবং{" "}
                      <Link href="/privacy" className="text-brand-600 hover:text-brand-500">
                        গোপনীয়তা নীতি
                      </Link>{" "}
                      গ্রহণ করছি
                    </label>
                  </div>
                  {errors.agreeTerms && <p className="mt-1 text-xs text-red-500">{errors.agreeTerms}</p>}
                </div>

                <div className="md:col-span-2">
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
                      "রেজিস্ট্রেশন করুন"
                    )}
                  </Button>

                  <div className="mt-6 text-center text-sm">
                    <span className="text-gray-600">ইতিমধ্যে অ্যাকাউন্ট আছে?</span>{" "}
                    <Link href="/signin" className="font-medium text-brand-600 hover:text-brand-500">
                      সাইন ইন করুন
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
