"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between lg:hidden">
          <Link href="/" className="py-3 text-sm font-medium hover:text-gray-200">
            মূলপাতা
          </Link>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-brand-700">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80%] border-r-brand-200 bg-white p-0 sm:max-w-sm">
              <div className="flex h-16 items-center border-b px-6">
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className="mr-2">
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close menu</span>
                </Button>
                <span className="text-lg font-bold">মেনু</span>
              </div>
              <div className="py-4">
                <div className="space-y-1 px-6">
                  <Link
                    href="/"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-brand-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    মূলপাতা
                  </Link>
                  <div className="py-1">
                    <div className="flex items-center justify-between rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-brand-50">
                      <span>সকল বই</span>
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    <div className="ml-4 space-y-1 border-l border-gray-200 pl-4">
                      <Link
                        href="/books/fiction"
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-brand-50 hover:text-gray-900"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        উপন্যাস
                      </Link>
                      <Link
                        href="/books/story"
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-brand-50 hover:text-gray-900"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        গল্প
                      </Link>
                      <Link
                        href="/books/poetry"
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-brand-50 hover:text-gray-900"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        কবিতা
                      </Link>
                    </div>
                  </div>
                  <Link
                    href="/special"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-brand-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    স্পেশাল প্যাকেজ
                  </Link>
                  <Link
                    href="/authors"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-brand-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    লেখক
                  </Link>
                  <Link
                    href="/categories"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-brand-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    বিষয়
                  </Link>
                  <Link
                    href="/blog"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-brand-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    ব্লগ
                  </Link>
                  <Link
                    href="/publishers"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-brand-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    পাবলিশিং কোম্পানি
                  </Link>
                  <Link
                    href="/offers"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-brand-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    গার্ডিয়ান প্রতিনিধি
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <ul className="hidden flex-wrap items-center justify-between lg:flex">
          <li className="py-3">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-brand-200">
              মূলপাতা
            </Link>
          </li>
          <li className="group relative py-3">
            <Link
              href="/books"
              className="flex items-center text-sm font-medium transition-colors hover:text-brand-200"
            >
              <span>সকল বই</span>
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <div className="absolute left-0 top-full z-10 hidden min-w-[200px] animate-fadeIn rounded-md bg-white py-2 shadow-lg group-hover:block">
              <Link
                href="/books/fiction"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                উপন্যাস
              </Link>
              <Link
                href="/books/story"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                গল্প
              </Link>
              <Link
                href="/books/poetry"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                কবিতা
              </Link>
              <Link
                href="/books/history"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                ইতিহাস
              </Link>
              <Link
                href="/books/science"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                বিজ্ঞান
              </Link>
            </div>
          </li>
          <li className="group relative py-3">
            <Link
              href="/special"
              className="flex items-center text-sm font-medium transition-colors hover:text-brand-200"
            >
              <span>স্পেশাল প্যাকেজ</span>
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <div className="absolute left-0 top-full z-10 hidden min-w-[200px] animate-fadeIn rounded-md bg-white py-2 shadow-lg group-hover:block">
              <Link
                href="/special/bestsellers"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                বেস্টসেলার বই
              </Link>
              <Link
                href="/special/new-arrivals"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                নতুন প্রকাশিত
              </Link>
              <Link
                href="/special/discounted"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                ছাড়ের বই
              </Link>
            </div>
          </li>
          <li className="group relative py-3">
            <Link
              href="/authors"
              className="flex items-center text-sm font-medium transition-colors hover:text-brand-200"
            >
              <span>লেখক</span>
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <div className="absolute left-0 top-full z-10 hidden min-w-[200px] animate-fadeIn rounded-md bg-white py-2 shadow-lg group-hover:block">
              <Link
                href="/authors/popular"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                জনপ্রিয় লেখক
              </Link>
              <Link
                href="/authors/award-winning"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                পুরস্কারপ্রাপ্ত লেখক
              </Link>
              <Link
                href="/authors/all"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                সকল লেখক
              </Link>
            </div>
          </li>
          <li className="group relative py-3">
            <Link
              href="/categories"
              className="flex items-center text-sm font-medium transition-colors hover:text-brand-200"
            >
              <span>বিষয়</span>
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <div className="absolute left-0 top-full z-10 hidden animate-fadeIn grid-cols-2 gap-2 rounded-md bg-white p-4 shadow-lg group-hover:grid sm:min-w-[400px]">
              <Link
                href="/categories/fiction"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                উপন্যাস
              </Link>
              <Link
                href="/categories/story"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                গল্প
              </Link>
              <Link
                href="/categories/poetry"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                কবিতা
              </Link>
              <Link
                href="/categories/history"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                ইতিহাস
              </Link>
              <Link
                href="/categories/science"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                বিজ্ঞান
              </Link>
              <Link
                href="/categories/religion"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                ধর্ম
              </Link>
              <Link
                href="/categories/children"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                শিশু
              </Link>
              <Link
                href="/categories/biography"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                জীবনী
              </Link>
            </div>
          </li>
          <li className="group relative py-3">
            <Link href="/blog" className="flex items-center text-sm font-medium transition-colors hover:text-brand-200">
              <span>ব্লগ</span>
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <div className="absolute left-0 top-full z-10 hidden min-w-[200px] animate-fadeIn rounded-md bg-white py-2 shadow-lg group-hover:block">
              <Link
                href="/blog/book-reviews"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                বই রিভিউ
              </Link>
              <Link
                href="/blog/author-interviews"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                লেখক সাক্ষাৎকার
              </Link>
              <Link
                href="/blog/literary-news"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                সাহিত্য সংবাদ
              </Link>
            </div>
          </li>
          <li className="group relative py-3">
            <Link
              href="/publishers"
              className="flex items-center text-sm font-medium transition-colors hover:text-brand-200"
            >
              <span>পাবলিশিং কোম্পানি</span>
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <div className="absolute left-0 top-full z-10 hidden min-w-[200px] animate-fadeIn rounded-md bg-white py-2 shadow-lg group-hover:block">
              <Link
                href="/publishers/popular"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                জনপ্রিয় প্রকাশক
              </Link>
              <Link
                href="/publishers/all"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                সকল প্রকাশক
              </Link>
            </div>
          </li>
          <li className="py-3">
            <Link href="/offers" className="text-sm font-medium transition-colors hover:text-brand-200">
              গার্ডিয়ান প্রতিনিধি
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
