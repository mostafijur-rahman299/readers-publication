"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { useLocale, useTranslations } from "next-intl"

export default function BooksPage() {
  const t = useTranslations("books")
  const pt = useTranslations("pagination")
  const locale = useLocale()

  return (
    <div className="min-h-screen bg-white">
      {/* Header with logo, search and icons */}
      <Header />

      {/* Main navigation */}
      <Navigation />

      {/* Books listing */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h1 className="mb-6 text-2xl font-bold text-teal-600">{t("title")}</h1>

          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="col-span-1 h-[600px] rounded-lg border p-4">
              <h3 className="text-lg font-semibold">{t("filter")}</h3>

              <div className="h-[calc(100%-2rem)] overflow-y-auto">
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 font-medium">{t("category")}</h4>
                    <div className="space-y-2">
                      {["উপন্যাস", "গল্প", "কবিতা", "ইতিহাস", "বিজ্ঞান", "ধর্ম"].map((category) => (
                        <div key={category} className="flex items-center">
                          <input type="checkbox" id={category} className="mr-2 h-4 w-4" />
                          <label htmlFor={category} className="text-sm">
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 font-medium">{t("author")}</h4>
                    <div className="space-y-2">
                      {["হুমায়ূন আহমেদ", "মুহম্মদ জাফর ইকবাল", "সুনীল গঙ্গোপাধ্যায়", "রবীন্দ্রনাথ ঠাকুর"].map((author) => (
                        <div key={author} className="flex items-center">
                          <input type="checkbox" id={author} className="mr-2 h-4 w-4" />
                          <label htmlFor={author} className="text-sm">
                            {author}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 font-medium">{t("price")}</h4>
                    <div className="flex items-center space-x-2">
                      <Input type="number" placeholder={t("min")} className="w-full" />
                      <span>-</span>
                      <Input type="number" placeholder={t("max")} className="w-full" />
                    </div>
                    <Button className="mt-2 w-full bg-teal-600 hover:bg-teal-700">{t("apply")}</Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-3">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  {t("total")} <span className="font-semibold">১২৮</span> {t("books")}
                </p>
                <select className="rounded-md border border-gray-300 px-3 py-1 text-sm">
                  <option>{t("recent")}</option>
                  <option>{t("popular")}</option>
                  <option>{t("price_low_to_high")}</option>
                  <option>{t("price_high_to_low")}</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {Array.from({ length: 20 }).map((_, index) => (
                  <Link key={index} href={`/books/${index + 1}`} className="group">
                    <div className="mb-3 overflow-hidden rounded-md border border-gray-200">
                      <Image
                        src={`/placeholder.svg?height=250&width=180&text=Book${index + 1}`}
                        alt={`Book ${index + 1}`}
                        width={180}
                        height={250}
                        className="h-auto w-full transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-sm font-medium group-hover:text-teal-600">বইয়ের শিরোনাম {index + 1}</h3>
                    <p className="text-xs text-gray-600">লেখক নাম</p>
                    <p className="mt-1 text-sm font-semibold text-teal-600">৳ {350 + index * 10}</p>
                  </Link>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-1">
                  <a href="#" className="rounded-md border px-3 py-1 text-sm hover:bg-gray-100">
                    {pt("previous")}
                  </a>
                  <a href="#" className="rounded-md bg-teal-600 px-3 py-1 text-sm text-white">
                    ১
                  </a>
                  <a href="#" className="rounded-md border px-3 py-1 text-sm hover:bg-gray-100">
                    ২
                  </a>
                  <a href="#" className="rounded-md border px-3 py-1 text-sm hover:bg-gray-100">
                    ৩
                  </a>
                  <span className="px-2 text-sm">...</span>
                  <a href="#" className="rounded-md border px-3 py-1 text-sm hover:bg-gray-100">
                    ১০
                  </a>
                  <a href="#" className="rounded-md border px-3 py-1 text-sm hover:bg-gray-100">
                    {pt("next")}
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
