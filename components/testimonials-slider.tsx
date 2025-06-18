"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "আহমেদ হাসান",
    location: "ঢাকা",
    rating: 5,
    comment: "এই প্ল্যাটফর্মে অসাধারণ সব বই পেয়েছি। বিশেষ করে বাংলা সাহিত্যের সংগ্রহ অত্যন্ত সমৃদ্ধ। দ্রুত ডেলিভারি এবং ভালো প্যাকেজিং।",
    image: "/placeholder.svg?height=80&width=80",
    purchasedBooks: 15,
  },
  {
    id: 2,
    name: "ফাতেমা খাতুন",
    location: "চট্টগ্রাম",
    rating: 5,
    comment: "শিশুদের জন্য বইয়ের চমৎকার সংগ্রহ। আমার সন্তানরা এখানকার বই পড়ে খুবই উপকৃত হয়েছে। দাম অনুযায়ী মান অসাধারণ।",
    image: "/placeholder.svg?height=80&width=80",
    purchasedBooks: 8,
  },
  {
    id: 3,
    name: "রফিকুল ইসলাম",
    location: "সিলেট",
    rating: 4,
    comment: "ইতিহাস এবং ধর্মীয় বইয়ের জন্য এটি আমার প্রিয় জায়গা। লেখকদের সাথে যোগাযোগের সুবিধা এবং নতুন বইয়ের আপডেট পাওয়া যায়।",
    image: "/placeholder.svg?height=80&width=80",
    purchasedBooks: 22,
  },
  {
    id: 4,
    name: "সালমা বেগম",
    location: "রাজশাহী",
    rating: 5,
    comment:
      "কবিতার বইয়ের অসাধারণ কালেকশন। নতুন এবং পুরাতন সব কবিদের বই এক জায়গায় পাওয়া যায়। অর্ডার করা থেকে ডেলিভারি পর্যন্ত সব কিছু নিখুঁত।",
    image: "/placeholder.svg?height=80&width=80",
    purchasedBooks: 12,
  },
  {
    id: 5,
    name: "করিম উদ্দিন",
    location: "খুলনা",
    rating: 4,
    comment: "বিজ্ঞান বিষয়ক বইয়ের জন্য খুবই ভালো প্ল্যাটফর্ম। দাম সাশ্রয়ী এবং বইয়ের মান উন্নত। কাস্টমার সার্ভিস অত্যন্ত সহায়ক।",
    image: "/placeholder.svg?height=80&width=80",
    purchasedBooks: 18,
  },
]

export function TestimonialsSlider() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">পাঠকদের মতামত</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">আমাদের প্রিয় পাঠকরা কী বলছেন আমাদের সেবা এবং বইয়ের মান সম্পর্কে</p>
        </div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-lg text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.location}</p>
                        <p className="text-xs text-blue-600 font-medium">{testimonial.purchasedBooks} টি বই কিনেছেন</p>
                      </div>
                    </div>

                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="relative">
                      <Quote className="absolute -top-2 -left-1 w-6 h-6 text-blue-200" />
                      <p className="text-gray-700 leading-relaxed pl-6 italic">"{testimonial.comment}"</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 bg-white shadow-lg border-2" />
          <CarouselNext className="right-0 bg-white shadow-lg border-2" />
        </Carousel>

        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">আপনিও আমাদের সাথে আপনার অভিজ্ঞতা শেয়ার করুন</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            রিভিউ লিখুন
          </button>
        </div>
      </div>
    </div>
  )
}
