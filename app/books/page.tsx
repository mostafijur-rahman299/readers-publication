import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"

export default function BooksPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header with logo, search and icons */}
      <Header />

      {/* Main navigation */}
      <Navigation />

      {/* Books listing */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h1 className="mb-6 text-2xl font-bold text-teal-600">সকল বই</h1>

          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="col-span-1 space-y-4 rounded-lg border p-4">
              <h3 className="text-lg font-semibold">ফিল্টার</h3>

              <div>
                <h4 className="mb-2 font-medium">বিষয়</h4>
                <div className="space-y-2">
                  {["উপন্যাস", "গল্প", "কবিতা", "ইতিহাস", "বিজ্ঞান", "ধর্ম", "শিশু"].map((category) => (
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
                <h4 className="mb-2 font-medium">লেখক</h4>
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
                <h4 className="mb-2 font-medium">মূল্য</h4>
                <div className="flex items-center space-x-2">
                  <Input type="number" placeholder="সর্বনিম্ন" className="w-full" />
                  <span>-</span>
                  <Input type="number" placeholder="সর্বোচ্চ" className="w-full" />
                </div>
                <Button className="mt-2 w-full bg-teal-600 hover:bg-teal-700">প্রয়োগ করুন</Button>
              </div>
            </div>

            <div className="col-span-1 md:col-span-3">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  মোট <span className="font-semibold">১২৮</span> টি বই
                </p>
                <select className="rounded-md border border-gray-300 px-3 py-1 text-sm">
                  <option>সাম্প্রতিক</option>
                  <option>জনপ্রিয়</option>
                  <option>দাম: কম থেকে বেশি</option>
                  <option>দাম: বেশি থেকে কম</option>
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
                    পূর্ববর্তী
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
                    পরবর্তী
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
