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
import { useLocale, useTranslations } from 'next-intl';
import useHttp from "@/hooks/useHttp"
import { Alert } from "@/components/ui/alert"
import { API_ENDPOINTS } from "@/constants/apiEnds"

export default function SignUpPage() {
  const t = useTranslations('signup');
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [errors, setErrors] = useState<{
    full_name?: string
    email?: string
    phone_number?: string
    password?: string
    confirm_password?: string
    agreeTerms?: string
    general?: string
  }>({})
  const {sendRequests: sendSignUpRequest, isLoading: isSignUpLoading} = useHttp()
  const [successMessage, setSuccessMessage] = useState<string>("")

  const currentLocale = useLocale()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const validateForm = () => {
    let isValid = true
    if (!name) {
      setErrors((prev) => ({ ...prev, full_name: t('name_required') }))
      isValid = false
    }
    if (!email) {
      setErrors((prev) => ({ ...prev, email: t('email_required') }))
      isValid = false
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: t('password_required') }))
      isValid = false
    }
    if (!confirmPassword) {
      setErrors((prev) => ({ ...prev, confirm_password: t('confirm_password_required') }))
      isValid = false
    }
    if (!agreeTerms) {
      setErrors((prev) => ({ ...prev, agreeTerms: t('agree_terms_required') }))
      isValid = false
    }

    if(password !== confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: t('password_not_match') }))
      isValid = false
    }

    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setSuccessMessage("")
    if (validateForm()) {

      const response = (data: any) => {
        setSuccessMessage(t('success_message'))
      }

      sendSignUpRequest(
        {
          url_info: {
            url: API_ENDPOINTS.SIGNUP,
            is_auth_required: false,
          },
          method: "POST",
          data: {
            full_name: name, email, phone_number: phone, password, confirm_password: confirmPassword, terms_and_conditions: agreeTerms
          }
        }
      , response, (err: any) => {
        setErrors(err)
      })
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
                <h1 className="text-3xl font-bold text-white">{t('title')}</h1>
                <p className="mt-2 text-brand-100">{t('description')}</p>
              </div>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">

                <div className="md:col-span-2">
                  <div className="mb-6 flex items-center justify-center space-x-4">
                    <button
                      type="button"
                      className="btn-hover-effect flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                      disabled={isSignUpLoading}
                    >
                      <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                      </svg>
                      <span>{t('register_with_google')}</span>
                    </button>
                  </div>

                  <div className="fancy-divider">
                    <span>{t('register_with_email')}</span>
                  </div>
                </div>
                {errors.general && <div className="md:col-span-2">
                  <Alert variant="destructive" className="w-full mb-4">{errors.general}</Alert>
                </div>}
                {successMessage && <div className="md:col-span-2">
                  <Alert variant="success" className="w-full mb-4 text-center">{successMessage}</Alert>
                </div>}

                <div>
                  <Label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                    {t('name')} *
                  </Label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="name"
                      type="text"
                      placeholder={t('name_placeholder')}
                      className={`pl-10 ${errors.full_name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "focus:border-brand-500 focus:ring-brand-500"}`}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isSignUpLoading}
                    />
                  </div>
                  {errors.full_name && <p className="mt-1 text-xs text-red-500">{errors.full_name}</p>}
                </div>

                <div>
                  <Label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                    {t('email')} *
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
                      disabled={isSignUpLoading}
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
                    {t('phone')}
                  </Label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={"e.g. 017XXXXXXXX"}
                      className={`pl-10 ${errors.phone_number ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "focus:border-brand-500 focus:ring-brand-500"}`}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={isSignUpLoading}
                    />
                  </div>
                  {errors.phone_number && <p className="mt-1 text-xs text-red-500">{errors.phone_number}</p>}
                </div>

                <div>
                  <Label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                    {t('password')} *
                  </Label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t('password_placeholder')}
                      className={`pl-10 pr-10 ${errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "focus:border-brand-500 focus:ring-brand-500"}`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isSignUpLoading}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                      onClick={togglePasswordVisibility}
                      disabled={isSignUpLoading}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-gray-700">
                    {t('confirm_password')} *
                  </Label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder={t('confirm_password_placeholder')}
                      className={`pl-10 pr-10 ${errors.confirm_password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "focus:border-brand-500 focus:ring-brand-500"}`}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={isSignUpLoading}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                      onClick={toggleConfirmPasswordVisibility}
                      disabled={isSignUpLoading}
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.confirm_password && <p className="mt-1 text-xs text-red-500">{errors.confirm_password}</p>}
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center">
                    <Checkbox
                      id="agree-terms"
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                      disabled={isSignUpLoading}
                      className={errors.agreeTerms ? "border-red-500 text-red-500" : ""}
                    />
                    <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                      {t('ami')} {" "} {t('agree')} {" "}
                      <Link href="/terms" className="text-brand-600 hover:text-brand-500">
                        {t('terms')}
                      </Link>{" "}
                      {t('and')} {" "}
                      <Link href="/privacy" className="text-brand-600 hover:text-brand-500">
                        {t('privacy')}
                      </Link>
                    </label>
                  </div>
                  {errors.agreeTerms && <p className="mt-1 text-xs text-red-500">{errors.agreeTerms}</p>}
                </div>

                <div className="md:col-span-2">
                  <Button
                    type="submit"
                    className="w-full bg-brand-600 hover:bg-brand-700 transition-colors"
                    disabled={isSignUpLoading}
                  >
                    {isSignUpLoading ? (
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
                      t('register')
                    )}
                  </Button>

                  <div className="mt-6 text-center text-sm">
                    <span className="text-gray-600">{t('already_have_account')}</span>{" "}
                    <Link href={`/${currentLocale}/signin`} className="font-medium text-brand-600 hover:text-brand-500">
                      {t('sign_in')}
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
