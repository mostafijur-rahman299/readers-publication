"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { useTranslations } from "next-intl"

export default function PrivacyPage() {
  const t = useTranslations('privacy')

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-2 text-center">{t('title')}</h1>
        <p className="text-gray-600 text-center">{t('description')}</p>
      </div>
    </div>
  )
}
