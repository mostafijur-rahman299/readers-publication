"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, MessageCircle, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { useLocale, useTranslations } from 'next-intl';

export default function SupportPage() {
  const t = useTranslations('support');
  const currentLocale = useLocale()

  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors: { email?: string; message?: string } = {}
    let isValid = true

    if (!email) {
      newErrors.email = "ইমেইল আবশ্যক"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "সঠিক ইমেইল দিন"
      isValid = false
    }

    if (!message) {
      newErrors.message = "বার্তা লিখুন"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsLoading(true)

      // Simulate support message submission
      setTimeout(() => {
        console.log("Support message sent:", { email, message })
        setIsLoading(false)
        setSubmitted(true)
      }, 1500)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-xl">
          <div className="overflow-hidden rounded-xl bg-white shadow-lg">
            <div className="px-8 py-10">
              <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-gray-900 flex justify-center items-center gap-2">
                  <HelpCircle className="w-7 h-7 text-brand-600" />
                  {t('title')}
                </h1>
                <p className="mt-2 text-sm text-gray-600">{t('description')}</p>
              </div>

              {submitted ? (
                <div className="text-center py-8">
                  <p className="text-green-600 text-lg font-medium">{t('success_message')}</p>
                  <p className="text-gray-600 mt-2">{t('follow_up_message')}</p>
                  <Link href={`/${currentLocale}/`} className="mt-4 inline-block text-brand-600 hover:underline">
                    {t('back_to_home')}
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                      {t('email')}
                    </Label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t('email_placeholder')}
                        className={`pl-10 ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "focus:border-brand-500 focus:ring-brand-500"}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">
                      {t('message')}
                    </Label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder={t('message_placeholder')}
                      className={`w-full rounded-md border bg-white px-3 py-2 text-sm shadow-sm transition placeholder-gray-400 ${errors.message ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "focus:border-brand-500 focus:ring-brand-500"}`}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={isLoading}
                    />
                    {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
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
                      t('submit')
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
