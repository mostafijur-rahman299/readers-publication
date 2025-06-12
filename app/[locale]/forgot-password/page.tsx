"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { useLocale, useTranslations } from 'next-intl';
import useHttp from "@/hooks/useHttp";
import { API_ENDPOINTS } from "@/constants/apiEnds";
import { Alert } from "@/components/ui/alert"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const t = useTranslations('forgot_password');
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState<{ email_or_phone?: string; non_field_errors?: string }>({})
  const {sendRequests: sendForgotPasswordRequest, isLoading} = useHttp()
  const [successMessage, setSuccessMessage] = useState("")
  const router = useRouter()
  const currentLocale = useLocale()

  const validateForm = () => {
    const newErrors: { email_or_phone?: string; detail?: string } = {}
    let isValid = true

    if (!email) {
      newErrors.email_or_phone = t('email_required')
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    setErrors({})
    setSuccessMessage("")
    e.preventDefault()
    if (validateForm()) {
      sendForgotPasswordRequest({
        url_info: {
          url: API_ENDPOINTS.FORGOT_PASSWORD,
          is_auth_required: false,
        },
        method: "POST",
        data: {
          email_or_phone: email
        }
      }, (response: any) => {
        setSuccessMessage(t('success_message'))
        setTimeout(() => {
          sessionStorage.setItem('forget_password_email_or_phone', email)
          router.push(`/${currentLocale}/update-password`)
        }, 1000)
      }, (err: any) => {
        setErrors(err)
      })
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
                  src="/readers-icon.png"
                  alt="User"
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="mt-16 px-8 pb-8">
              <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
                <p className="mt-2 text-sm text-gray-600">{t('description')}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {successMessage && <div className="md:col-span-2">
                  <Alert variant="success" className="w-full mb-4">{successMessage}</Alert>
                </div>}
                  {errors?.non_field_errors && <div className="md:col-span-2">
                    <Alert variant="destructive" className="w-full mb-4">{errors?.non_field_errors}</Alert>
                  </div>}
                <div>
                  <Label htmlFor="email_or_phone" className="mb-1 block text-sm font-medium text-gray-700">
                    {t('email_or_phone')}
                  </Label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="email_or_phone"
                      type="text"
                      placeholder={"017XXXXXXXX"}
                      className={`pl-10 ${errors.email_or_phone || errors.non_field_errors ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "focus:border-brand-500 focus:ring-brand-500"}`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email_or_phone && <p className="mt-1 text-xs text-red-500">{errors.email_or_phone}</p>}
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
                      <span>{t('processing')}</span>
                    </div>
                  ) : (
                    t('send')
                  )}
                </Button>

                <div className="text-center text-sm">
                  <span className="text-gray-600">{t('want_to_sign_in')}</span>{" "}
                  <Link href={`/${currentLocale}/signin`} className="font-medium text-brand-600 hover:text-brand-500">
                    {t('sign_in')}
                  </Link>
                </div>
              </form>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
