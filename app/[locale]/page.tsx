"use client"

import Image from "next/image"
import Link from "next/link"
import { CircleNav } from "@/components/circle-nav"
import { MainCarousel } from "@/components/main-carousel"
import { NewsGrid } from "@/components/news-grid"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { SpecialOffersCarousel } from "@/components/special-offers-carousel"
import { ArticlesSection } from "@/components/articles-section"
import { TestimonialsSlider } from "@/components/testimonials-slider"

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

            {/* Advertisement section */}
            <div className="space-y-6">
              <div className="group overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg h-[187px]">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Advertisement"
                  width={400}
                  height={200}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="group overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg h-[187px]">
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

      {/* Special Offers Carousel */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <SpecialOffersCarousel />
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <ArticlesSection />
        </div>
      </section>

      {/* Featured section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">নতুন প্রকাশিত বই</h2>
            {/* <Link href="/books/new" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              সব দেখুন →
            </Link> */}
          </div>
          <NewsGrid />
          <NewsGrid />
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">জনপ্রিয় বই</h2>
            {/* <Link href="/books/new" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              সব দেখুন →
            </Link> */}
          </div>
          <NewsGrid />
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">শীঘ্রই আসছে...</h2>
            {/* <Link href="/books/new" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              সব দেখুন →
            </Link> */}
          </div>
          <NewsGrid />
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

      {/* Testimonials Slider */}
      <TestimonialsSlider />
    </main>
  )
}
