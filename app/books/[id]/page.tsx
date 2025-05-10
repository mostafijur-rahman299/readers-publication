import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Minus, Plus, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"

export default function BookDetailPage({ params }: { params: { id: string } }) {
  const bookId = params.id

  return (
    <div className="min-h-screen bg-white">
      {/* Header with logo, search and icons */}
      <Header />

      {/* Main navigation */}
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm">
            <Link href="/" className="text-gray-600 hover:text-teal-600">
              মূলপাতা
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/books" className="text-gray-600 hover:text-teal-600">
              সকল বই
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-800">বইয়ের শিরোনাম {bookId}</span>
          </div>
        </div>
      </div>

      {/* Book detail */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="mb-4 overflow-hidden rounded-md border">
                  <Image
                    src={`/placeholder.svg?height=600&width=400&text=Book${bookId}`}
                    alt={`Book ${bookId}`}
                    width={400}
                    height={600}
                    className="h-auto w-full"
                  />
                </div>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-1/4 cursor-pointer overflow-hidden rounded-md border p-1">
                      <Image
                        src={`/placeholder.svg?height=150&width=100&text=View${i}`}
                        alt={`Book view ${i}`}
                        width={100}
                        height={150}
                        className="h-auto w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h1 className="mb-2 text-2xl font-bold">বইয়ের শিরোনাম {bookId}</h1>
              <div className="mb-4 flex items-center">
                <span className="text-sm text-gray-600">লেখক:</span>
                <Link href="#" className="ml-2 text-sm text-teal-600 hover:underline">
                  হুমায়ূন আহমেদ
                </Link>
              </div>

              <div className="mb-6 flex items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`h-4 w-4 ${star <= 4 ? "text-yellow-400" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">(১২৫ রিভিউ)</span>
              </div>

              <div className="mb-6">
                <span className="text-2xl font-bold text-teal-600">৳ {350 + Number.parseInt(bookId) * 10}</span>
                <span className="ml-2 text-sm text-gray-500 line-through">৳ {400 + Number.parseInt(bookId) * 10}</span>
                <span className="ml-2 rounded-full bg-teal-100 px-2 py-1 text-xs text-teal-800">১৫% ছাড়</span>
              </div>

              <div className="mb-6 space-y-2 text-sm text-gray-600">
                <p>
                  প্রকাশক: <span className="text-gray-800">গার্ডিয়ান পাবলিকেশন্স</span>
                </p>
                <p>
                  বিষয়: <span className="text-gray-800">উপন্যাস</span>
                </p>
                <p>
                  পৃষ্ঠা: <span className="text-gray-800">২৫০</span>
                </p>
                <p>
                  কভার: <span className="text-gray-800">পেপারব্যাক</span>
                </p>
                <p>
                  প্রকাশের তারিখ: <span className="text-gray-800">জানুয়ারি ২০২৪</span>
                </p>
              </div>

              <div className="mb-6 flex items-center space-x-4">
                <div className="flex items-center rounded-md border">
                  <button className="p-2 hover:bg-gray-100">
                    <Minus className="h-4 w-4" />
                  </button>
                  <input type="text" value="1" className="w-12 border-0 text-center" readOnly />
                  <button className="p-2 hover:bg-gray-100">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <Button className="flex-1 bg-teal-600 hover:bg-teal-700">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  কার্টে যোগ করুন
                </Button>

                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>

                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="mb-8 rounded-md bg-gray-50 p-4">
                <p className="text-sm">
                  <span className="font-semibold">দ্রুত ডেলিভারি:</span> ঢাকার ভিতরে ২৪ ঘন্টা, ঢাকার বাইরে ৪৮-৭২ ঘন্টা
                </p>
              </div>

              <Tabs defaultValue="description">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="description">বিবরণ</TabsTrigger>
                  <TabsTrigger value="specifications">স্পেসিফিকেশন</TabsTrigger>
                  <TabsTrigger value="reviews">রিভিউ</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-4">
                  <div className="prose max-w-none text-gray-700">
                    <p>
                      এই বইটি হুমায়ূন আহমেদের একটি অসাধারণ উপন্যাস। এটি একটি পরিবারের গল্প যারা তাদের জীবনের নানা সংকট মোকাবেলা করে।
                      লেখক তার অনন্য শৈলীতে পাঠকদের নিয়ে যান এক অবিস্মরণীয় যাত্রায়, যেখানে হাসি, কান্না, আনন্দ এবং বেদনা সবই মিশে আছে।
                    </p>
                    <p className="mt-4">
                      বইটির চরিত্রগুলো এতটাই জীবন্ত যে পাঠক নিজেকে তাদের মাঝে হারিয়ে ফেলেন। প্রতিটি পৃষ্ঠায় লেখক তার অসাধারণ কল্পনাশক্তি
                      এবং ভাষার জাদু দিয়ে পাঠকদের মুগ্ধ করেন।
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="specifications" className="mt-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 rounded-md bg-gray-50 p-4">
                      <div className="text-sm font-medium text-gray-600">শিরোনাম</div>
                      <div className="text-sm text-gray-800">বইয়ের শিরোনাম {bookId}</div>

                      <div className="text-sm font-medium text-gray-600">লেখক</div>
                      <div className="text-sm text-gray-800">হুমায়ূন আহমেদ</div>

                      <div className="text-sm font-medium text-gray-600">প্রকাশক</div>
                      <div className="text-sm text-gray-800">গার্ডিয়ান পাবলিকেশন্স</div>

                      <div className="text-sm font-medium text-gray-600">প্রকাশের তারিখ</div>
                      <div className="text-sm text-gray-800">জানুয়ারি ২০২৪</div>

                      <div className="text-sm font-medium text-gray-600">পৃষ্ঠা</div>
                      <div className="text-sm text-gray-800">২৫০</div>

                      <div className="text-sm font-medium text-gray-600">কভার</div>
                      <div className="text-sm text-gray-800">পেপারব্যাক</div>

                      <div className="text-sm font-medium text-gray-600">ভাষা</div>
                      <div className="text-sm text-gray-800">বাংলা</div>

                      <div className="text-sm font-medium text-gray-600">ISBN</div>
                      <div className="text-sm text-gray-800">978-1-234567-89-0</div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="reviews" className="mt-4">
                  <div className="space-y-6">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b pb-6">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                            <div className="ml-3">
                              <p className="font-medium">রিভিউয়ার {review}</p>
                              <p className="text-xs text-gray-500">১০ মে, ২০২৪</p>
                            </div>
                          </div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`h-4 w-4 ${star <= 4 ? "text-yellow-400" : "text-gray-300"}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          এই বইটি পড়ে আমি খুব আনন্দিত। লেখকের ভাষা এবং গল্প বলার ধরন অসাধারণ। আমি এই বইটি সবাইকে পড়ার পরামর্শ দিব।
                        </p>
                      </div>
                    ))}

                    <Button className="w-full bg-teal-600 hover:bg-teal-700">সব রিভিউ দেখুন</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* Related books */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-2xl font-bold">সম্পর্কিত বই</h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Link key={index} href={`/books/${Number.parseInt(bookId) + index + 1}`} className="group">
                <div className="mb-3 overflow-hidden rounded-md border border-gray-200 bg-white">
                  <Image
                    src={`/placeholder.svg?height=250&width=180&text=Book${Number.parseInt(bookId) + index + 1}`}
                    alt={`Book ${Number.parseInt(bookId) + index + 1}`}
                    width={180}
                    height={250}
                    className="h-auto w-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-sm font-medium group-hover:text-teal-600">
                  বইয়ের শিরোনাম {Number.parseInt(bookId) + index + 1}
                </h3>
                <p className="text-xs text-gray-600">লেখক নাম</p>
                <p className="mt-1 text-sm font-semibold text-teal-600">
                  ৳ {350 + (Number.parseInt(bookId) + index) * 10}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
