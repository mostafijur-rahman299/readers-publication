import Image from "next/image"
import Link from "next/link"
import { CircleNav } from "@/components/circle-nav"
import { MainCarousel } from "@/components/main-carousel"
import { NewsGrid } from "@/components/news-grid"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header with logo, search and icons */}
      <Header />

      {/* Main navigation */}
      <Navigation />

      {/* Circle navigation */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <CircleNav title="উপন্যাস" imageUrl="/placeholder.svg?height=80&width=80" />
            <CircleNav title="গল্প" imageUrl="/placeholder.svg?height=80&width=80" />
            <CircleNav title="কবিতা" imageUrl="/placeholder.svg?height=80&width=80" />
            <CircleNav title="ইতিহাস" imageUrl="/placeholder.svg?height=80&width=80" />
            <CircleNav title="বিজ্ঞান" imageUrl="/placeholder.svg?height=80&width=80" />
            <CircleNav title="ধর্ম" imageUrl="/placeholder.svg?height=80&width=80" />
            <CircleNav title="শিশু" imageUrl="/placeholder.svg?height=80&width=80" />
            <CircleNav
              title="আরও দেখুন"
              imageUrl="/placeholder.svg?height=80&width=80&text=+"
              className="bg-brand-100"
            />
          </div>
        </div>
      </section>

      {/* Main carousel */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <MainCarousel />
            </div>
            <div className="space-y-6">
              <div className="group overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Advertisement"
                  width={400}
                  height={200}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="group overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Advertisement"
                  width={400}
                  height={200}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">শীঘ্রই আসছে...</h2>
            <Link href="/books/new" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              সব দেখুন →
            </Link>
          </div>
          <NewsGrid />
        </div>
      </section>

      {/* Categories section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">জনপ্রিয় বিষয়</h2>
            <p className="mt-2 text-gray-600">আপনার পছন্দের বিষয় অনুসারে বই খুঁজুন</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {[
              "উপন্যাস",
              "গল্প",
              "কবিতা",
              "ইতিহাস",
              "বিজ্ঞান",
              "ধর্ম",
              "শিশু সাহিত্য",
              "রাজনীতি",
              "অর্থনীতি",
              "চিকিৎসা",
              "প্রযুক্তি",
              "ভ্রমণ",
            ].map((category, i) => (
              <Link
                key={i}
                href={`/categories/${i + 1}`}
                className="group flex items-center justify-between rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md"
              >
                <span className="font-medium text-gray-800 group-hover:text-brand-600">{category}</span>
                <svg
                  className="h-5 w-5 text-gray-400 transition-transform group-hover:text-brand-600 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/categories"
              className="inline-block rounded-md bg-brand-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              সকল বিষয় দেখুন
            </Link>
          </div>
        </div>
      </section>

      {/* Bestsellers section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">বেস্টসেলার বই</h2>
            <Link href="/books/bestsellers" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              সব দেখুন →
            </Link>
          </div>
          <NewsGrid />
        </div>
      </section>

      {/* Featured authors */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">জনপ্রিয় লেখক</h2>
            <p className="mt-2 text-gray-600">বাংলা সাহিত্যের সেরা লেখকদের সাথে পরিচিত হোন</p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {[...Array(6)].map((_, i) => (
              <Link key={i} href={`/authors/${i + 1}`} className="group">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3 overflow-hidden rounded-full">
                    <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-gray-200 transition-all group-hover:border-brand-300 group-hover:shadow-md">
                      <Image
                        src={`/placeholder.svg?height=96&width=96&text=Author${i + 1}`}
                        alt={`Author ${i + 1}`}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover transition-transform group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <h3 className="text-sm font-medium group-hover:text-brand-600">লেখক {i + 1}</h3>
                  <p className="text-xs text-gray-500">২০+ বই</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/authors"
              className="inline-block rounded-md bg-brand-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              সকল লেখক দেখুন
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter section */}
      <section className="bg-brand-600 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold">আমাদের নিউজলেটার সাবস্ক্রাইব করুন</h2>
            <p className="mt-2 text-brand-100">নতুন বই, অফার এবং ইভেন্ট সম্পর্কে সর্বশেষ আপডেট পেতে সাবস্ক্রাইব করুন</p>

            <div className="mt-6 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <input
                type="email"
                placeholder="আপনার ইমেইল দিন"
                className="flex-1 rounded-md border-0 px-4 py-2 text-gray-900 focus:ring-2 focus:ring-brand-300"
              />
              <button className="rounded-md bg-white px-6 py-2 font-medium text-brand-600 shadow-sm transition-colors hover:bg-gray-100">
                সাবস্ক্রাইব করুন
              </button>
            </div>

            <p className="mt-4 text-xs text-brand-100">
              সাবস্ক্রাইব করে আপনি আমাদের{" "}
              <Link href="/privacy" className="underline hover:text-white">
                গোপনীয়তা নীতি
              </Link>{" "}
              মেনে নিচ্ছেন
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
