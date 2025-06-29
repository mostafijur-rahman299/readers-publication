"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Share2,
  Star,
  ArrowLeft,
  BookOpen,
  Eye,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams } from "next/navigation"
import { useState, useRef } from "react"

export default function BookDetailPage() {
  const { id } = useParams()
  const bookId = id as string

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isReading, setIsReading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [zoom, setZoom] = useState(100)
  const [currentReviewPage, setCurrentReviewPage] = useState(1)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const availableStock = 25
  const reviewsPerPage = 3

  const bookImages = [
    `/placeholder.svg?height=400&width=300&text=Cover`,
    `/placeholder.svg?height=400&width=300&text=Back`,
    `/placeholder.svg?height=400&width=300&text=Inside`,
  ]

  // Mock book pages for reading
  const bookPages = Array.from({ length: 20 }, (_, i) => ({
    page: i + 1,
    content: `অধ্যায় ${Math.ceil((i + 1) / 5)} - পৃষ্ঠা ${i + 1}

এটি একটি নমুনা পৃষ্ঠা। এখানে বইয়ের প্রকৃত বিষয়বস্তু থাকবে। লেখক তার অনন্য শৈলীতে পাঠকদের নিয়ে যান এক অবিস্মরণীয় যাত্রায়। 

বইটির চরিত্রগুলো এতটাই জীবন্ত যে পাঠক নিজেকে তাদের মাঝে হারিয়ে ফেলেন। প্রতিটি পৃষ্ঠায় লেখক তার অসাধারণ কল্পনাশক্তি এবং ভাষার জাদু দিয়ে পাঠকদের মুগ্ধ করেন।

এই অংশে আরও বিস্তারিত গল্প এবং চরিত্রের বিকাশ দেখানো হবে। গল্পের প্রবাহ এমনভাবে এগিয়ে চলে যে পাঠক একবার পড়া শুরু করলে শেষ না করে উঠতে পারেন না।

"জীবনটা অনেক সুন্দর, যদি আমরা সেটা বুঝতে পারি।" - এই বাক্যটি যেন পুরো বইয়ের মূল বার্তা। লেখক তার অভিজ্ঞতা এবং দর্শনের মাধ্যমে পাঠকদের জীবনের প্রকৃত অর্থ খুঁজে পেতে সাহায্য করেন।

প্রতিটি চরিত্রের মানসিক দ্বন্দ্ব এবং তাদের জীবনের উত্থান-পতনের গল্প এতটাই বাস্তবসম্মত যে মনে হয় আমাদের চারপাশেরই কোনো পরিচিত মানুষের কথা বলা হচ্ছে।`,
  }))

  // All reviews data
  const allReviews = [
    {
      id: 1,
      name: "আহমেদ হাসান",
      date: "১০ মে, ২০২৪",
      rating: 5,
      comment: "এই বইটি পড়ে আমি খুব আনন্দিত। লেখকের ভাষা এবং গল্প বলার ধরন অসাধারণ। আমি এই বইটি সবাইকে পড়ার পরামর্শ দিব।",
      verified: true,
      helpful: 24,
    },
    {
      id: 2,
      name: "ফাতেমা বেগম",
      date: "৮ মে, ২০২৪",
      rating: 4,
      comment: "বইটি খুব সুন্দর। গল্পের ধরন এবং চরিত্রগুলো জীবন্ত। তবে কয়েকটি জায়গায় আরও বিস্তারিত হতে পারত।",
      verified: true,
      helpful: 18,
    },
    {
      id: 3,
      name: "রহমান আলী",
      date: "৫ মে, ২০২৪",
      rating: 5,
      comment: "অসাধারণ একটি বই। লেখকের কলমের জাদুতে মুগ্ধ হয়ে গেছি। প্রতিটি পৃষ্ঠা পড়তে পড়তে সময় কেটে যায়।",
      verified: false,
      helpful: 31,
    },
    {
      id: 4,
      name: "সালমা খাতুন",
      date: "২ মে, ২০২৪",
      rating: 4,
      comment: "বইটি পড়তে ভালো লেগেছে। গল্পের বুনন চমৎকার এবং ভাষা সহজ। তবে শেষটা আরেকটু ভালো হতে পারত।",
      verified: true,
      helpful: 12,
    },
    {
      id: 5,
      name: "করিম উদ্দিন",
      date: "২৮ এপ্রিল, ২০২৪",
      rating: 5,
      comment: "দুর্দান্ত! এই বইটি আমার সংগ্রহের একটি মূল্যবান সংযোজন। লেখকের অনন্য শৈলী এবং গভীর চিন্তাভাবনা প্রতিটি পাতায় ফুটে উঠেছে।",
      verified: true,
      helpful: 19,
    },
    {
      id: 6,
      name: "নাসির আহমেদ",
      date: "২৫ এপ্রিল, ২০২৪",
      rating: 4,
      comment: "ভালো একটি বই। পড়তে পড়তে সময় কেটে যায়। লেখকের ভাষা সহজ এবং বোধগম্য।",
      verified: false,
      helpful: 8,
    },
    {
      id: 7,
      name: "রুমানা আক্তার",
      date: "২০ এপ্রিল, ২০২৪",
      rating: 5,
      comment: "চমৎকার! হুমায়ূন আহমেদের লেখার জাদু এই বইতেও আছে। প্রতিটি চরিত্র জীবন্ত।",
      verified: true,
      helpful: 15,
    },
  ]

  // Related books
  const relatedBooks = Array.from({ length: 6 }, (_, index) => ({
    id: Number.parseInt(bookId) + index + 1,
    title: `সম্পর্কিত বই ${Number.parseInt(bookId) + index + 1}`,
    author: "হুমায়ূন আহমেদ",
    price: 350 + index * 50,
    originalPrice: 400 + index * 50,
    image: `/placeholder.svg?height=300&width=220&text=Book${Number.parseInt(bookId) + index + 1}`,
    rating: 4.5,
  }))

  // Paginated reviews
  const totalReviews = allReviews.length
  const totalPages = Math.ceil(totalReviews / reviewsPerPage)
  const startIndex = (currentReviewPage - 1) * reviewsPerPage
  const currentReviews = allReviews.slice(startIndex, startIndex + reviewsPerPage)

  const handleQuantityChange = (increment: boolean) => {
    if (increment && quantity < availableStock) {
      setQuantity((prev) => prev + 1)
    } else if (!increment && quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const shareBook = () => {
    if (navigator.share) {
      navigator.share({
        title: `বইয়ের শিরোনাম ${bookId}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % bookImages.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + bookImages.length) % bookImages.length)
  }

  const scrollToPage = (pageNumber: number) => {
    if (scrollContainerRef.current) {
      const pageHeight = scrollContainerRef.current.scrollHeight / bookPages.length
      scrollContainerRef.current.scrollTo({
        top: (pageNumber - 1) * pageHeight,
        behavior: "smooth",
      })
    }
  }

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollTop = scrollContainerRef.current.scrollTop
      const pageHeight = scrollContainerRef.current.scrollHeight / bookPages.length
      const newPage = Math.floor(scrollTop / pageHeight) + 1
      if (newPage !== currentPage && newPage <= bookPages.length) {
        setCurrentPage(newPage)
      }
    }
  }

  const adjustZoom = (increment: boolean) => {
    if (increment && zoom < 150) {
      setZoom((prev) => prev + 25)
    } else if (!increment && zoom > 75) {
      setZoom((prev) => prev - 25)
    }
  }

  const nextPage = () => {
    if (currentPage < bookPages.length) {
      const newPage = currentPage + 1
      setCurrentPage(newPage)
      scrollToPage(newPage)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1
      setCurrentPage(newPage)
      scrollToPage(newPage)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex items-center py-3 text-sm text-gray-600">
            <Link href="/" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>মূলপাতা</span>
            </Link>
            <span className="mx-2">/</span>
            <Link href="/books" className="hover:text-blue-600 transition-colors hidden sm:inline">
              সকল বই
            </Link>
            <span className="mx-2 hidden sm:inline">/</span>
            <span className="text-gray-800 font-medium truncate">বইয়ের শিরোনাম {bookId}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24 space-y-4">
              <Card className="overflow-hidden cursor-pointer" onClick={() => setIsReading(true)}>
                <CardContent className="p-3 sm:p-4">
                  <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden max-w-[320px] sm:max-w-[280px] mx-auto group">
                    <Image
                      src={bookImages[selectedImage] || "/placeholder.svg"}
                      alt="Book cover"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                        <BookOpen className="h-6 w-6 text-gray-800" />
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        prevImage()
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 rounded-full shadow-md transition-all"
                    >
                      <ChevronLeft className="h-3 w-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        nextImage()
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 rounded-full shadow-md transition-all"
                    >
                      <ChevronRight className="h-3 w-3" />
                    </button>
                    <Badge className="absolute top-2 left-2 bg-red-500 text-xs">২০% ছাড়</Badge>
                  </div>
                  <div className="text-center mt-3">
                    <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      পড়তে ক্লিক করুন
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Thumbnails */}
              <div className="flex gap-2 justify-center">
                {bookImages.map((image, i) => (
                  <button
                    key={i}
                    className={`relative aspect-[3/4] w-16 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === i ? "border-blue-500" : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedImage(i)}
                  >
                    <Image src={image || "/placeholder.svg"} alt={`View ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:col-span-8 xl:col-span-9">
            {/* Title and Author */}
            <div className="mb-8 border-b pb-4">
              <h1 className="text-2xl font-semibold mb-2">বইয়ের শিরোনাম {bookId}</h1>
              <div className="flex flex-col gap-2">
                <Link href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                  লেখক: হুমায়ূন আহমেদ
                </Link>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4" />
                    ))}
                  </div>
                  <span>৮৫ রিভিউ</span>
                  <span>•</span>
                  <span>১,২৪৭ বার দেখা হয়েছে</span>
                </div>
              </div>
            </div>

            {/* Price and Stock */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-semibold">৳{350 + Number.parseInt(bookId) * 10}</span>
                <span className="text-gray-500 line-through">৳{400 + Number.parseInt(bookId) * 10}</span>
                <Badge variant="outline">১৫% ছাড়</Badge>
              </div>
              <p className="text-sm text-gray-600">স্টকে আছে</p>
            </div>

            {/* Book Details */}
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-4">বইয়ের বিবরণ</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  { label: "প্রকাশক", value: "গার্ডিয়ান" },
                  { label: "পৃষ্ঠা", value: "২৫০" },
                  { label: "ভাষা", value: "বাংলা" },
                  { label: "কভার", value: "পেপারব্যাক" },
                  { label: "প্রকাশকাল", value: "জানুয়ারি ২০২৪" },
                  { label: "ISBN", value: "978-984-XX-XXXX-X" }
                ].map((info) => (
                  <div key={info.label} className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">{info.label}</span>
                    <span>{info.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <Button 
                onClick={() => setIsReading(true)} 
                className="flex-1"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                বই পড়ুন
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={toggleWishlist}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
              </Button>

              <Button 
                variant="outline" 
                size="icon" 
                onClick={shareBook}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Delivery Info */}
            <div className="border rounded p-4">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="font-medium mb-1">ডেলিভারি সময়</h3>
                  <p className="text-sm text-gray-600">ঢাকায় ২৪ ঘন্টা</p>
                  <p className="text-sm text-gray-600">ঢাকার বাইরে ৪৮-৭২ ঘন্টা</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Description Section with Tabs */}
        <div className="mt-8 sm:mt-12">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">বিস্তারিত তথ্য</h3>

              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-lg mb-4 sm:mb-6">
                  <TabsTrigger value="description" className="text-xs sm:text-sm font-medium rounded-md">
                    বইয়ের বিবরণ
                  </TabsTrigger>
                  <TabsTrigger value="author" className="text-xs sm:text-sm font-medium rounded-md">
                    লেখক সম্পর্কে
                  </TabsTrigger>
                  <TabsTrigger value="specifications" className="text-xs sm:text-sm font-medium rounded-md">
                    স্পেসিফিকেশন
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="mt-0">
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
                      এই বইটি হুমায়ূন আহমেদের একটি অসাধারণ উপন্যাস। এটি একটি পরিবারের গল্প যারা তাদের জীবনের নানা সংকট মোকাবেলা করে।
                      লেখক তার অনন্য শৈলীতে পাঠকদের নিয়ে যান এক অবিস্মরণীয় যাত্রায়, যেখানে হাসি, কান্না, আনন্দ এবং বেদনা সবই মিশে আছে।
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
                      বইটির চরিত্রগুলো এতটাই জীবন্ত যে পাঠক নিজেকে তাদের মাঝে হারিয়ে ফেলেন। প্রতিটি পৃষ্ঠায় লেখক তার অসাধারণ কল্পনাশক্তি
                      এবং ভাষার জাদু দিয়ে পাঠকদের মুগ্ধ করেন। এই বইটি বাংলা সাহিত্যের একটি মূল্যবান সম্পদ।
                    </p>
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                      গল্পের প্রতিটি মোড়ে রয়েছে অপ্রত্যাশিত মোচড়, যা পাঠকদের শেষ পর্যন্ত বইয়ের সাথে আটকে রাখে। হুমায়ূন আহমেদের এই কাজটি
                      তার সাহিত্যিক প্রতিভার আরেকটি উজ্জ্বল নিদর্শন।
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="author" className="mt-0">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <div className="w-20 h-20 sm:w-32 sm:h-32 mx-auto sm:mx-0 flex-shrink-0">
                      <Image
                        src="/placeholder.svg?height=128&width=128&text=Author"
                        alt="হুমায়ূন আহমেদ"
                        width={128}
                        height={128}
                        className="rounded-full object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h4 className="text-lg sm:text-xl font-bold mb-3">হুমায়ূন আহমেদ</h4>
                      <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
                        হুমায়ূন আহমেদ (১৯৪৮-২০১২) বাংলাদেশের অন্যতম জনপ্রিয় ঔপন্যাসিক, ছোটগল্পকার, নাট্যকার এবং চলচ্চিত্র নির্মাতা। তিনি
                        বাংলা সাহিত্যে আধুনিকতার পথপ্রদর্শক হিসেবে বিবেচিত।
                      </p>
                      <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
                        তার লেখা উপন্যাস, গল্প এবং নাটকে সাধারণ মানুষের জীবনযাত্রা, আবেগ এবং সংগ্রামের চিত্র ফুটে উঠেছে অসাধারণ দক্ষতায়। তিনি
                        ২০০টিরও বেশি বই লিখেছেন এবং বাংলা সাহিত্যে অমর হয়ে আছেন।
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                        <Badge variant="secondary" className="text-xs">
                          উপন্যাসিক
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          ছোটগল্পকার
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          নাট্যকার
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          চলচ্চিত্র নির্মাতা
                        </Badge>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="specifications" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <h4 className="font-semibold mb-4 text-base sm:text-lg">বইয়ের তথ্য</h4>
                      <div className="space-y-3">
                        {[
                          { label: "শিরোনাম", value: `বইয়ের শিরোনাম ${bookId}` },
                          { label: "লেখক", value: "হুমায়ূন আহমেদ" },
                          { label: "প্রকাশক", value: "গার্ডিয়ান পাবলিকেশন্স" },
                          { label: "প্রকাশের তারিখ", value: "জানুয়ারি ২০২৪" },
                          { label: "সংস্করণ", value: "প্রথম সংস্করণ" },
                          { label: "ভাষা", value: "বাংলা" },
                        ].map((spec) => (
                          <div key={spec.label} className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600 font-medium text-sm">{spec.label}:</span>
                            <span className="text-gray-800 font-semibold text-sm text-right">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4 text-base sm:text-lg">ফিজিক্যাল তথ্য</h4>
                      <div className="space-y-3">
                        {[
                          { label: "পৃষ্ঠা সংখ্যা", value: "২৫০" },
                          { label: "কভার টাইপ", value: "পেপারব্যাক" },
                          { label: "কাগজের ধরন", value: "অফসেট পেপার" },
                          { label: "মাত্রা", value: "৫.৫ x ৮.৫ ইঞ্চি" },
                          { label: "ওজন", value: "৩০০ গ্রাম" },
                          { label: "ISBN", value: "978-1-234567-89-0" },
                        ].map((spec) => (
                          <div key={spec.label} className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600 font-medium text-sm">{spec.label}:</span>
                            <span className="text-gray-800 font-semibold text-sm text-right">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Paginated Reviews Section */}
        <div className="mt-8">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold">পাঠকদের রিভিউ</h2>
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold text-sm sm:text-base">৪.৮</span>
                  <span className="text-gray-600 text-xs sm:text-sm">({totalReviews} রিভিউ)</span>
                </div>
              </div>

              {/* Rating Breakdown */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4 text-sm sm:text-base">রেটিং বিতরণ</h3>
                <div className="space-y-2">
                  {[
                    { stars: 5, count: 52, percentage: 61 },
                    { stars: 4, count: 20, percentage: 24 },
                    { stars: 3, count: 8, percentage: 9 },
                    { stars: 2, count: 3, percentage: 4 },
                    { stars: 1, count: 2, percentage: 2 },
                  ].map((rating) => (
                    <div key={rating.stars} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-10 sm:w-12">
                        <span className="text-xs sm:text-sm">{rating.stars}</span>
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${rating.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs sm:text-sm text-gray-600 w-6 sm:w-8">{rating.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-base sm:text-lg">সকল রিভিউ</h3>
                  <div className="text-xs sm:text-sm text-gray-600">
                    পৃষ্ঠা {currentReviewPage} / {totalPages}
                  </div>
                </div>

                {currentReviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-gray-800 text-sm sm:text-base">{review.name}</p>
                            {review.verified && (
                              <Badge className="bg-green-100 text-green-800 text-xs px-2 py-0.5">যাচাইকৃত</Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex text-yellow-400 ml-11 sm:ml-0">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 sm:h-4 sm:w-4 ${i < review.rating ? "fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3">{review.comment}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <button className="hover:text-blue-600 transition-colors duration-200 flex items-center gap-1">
                        <span>👍</span>
                        সহায়ক ({review.helpful})
                      </button>
                      <button className="hover:text-blue-600 transition-colors duration-200">উত্তর দিন</button>
                      <button className="hover:text-blue-600 transition-colors duration-200">রিপোর্ট করুন</button>
                    </div>
                  </div>
                ))}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentReviewPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentReviewPage === 1}
                      className="text-xs sm:text-sm"
                    >
                      <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">পূর্ববর্তী</span>
                    </Button>

                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentReviewPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentReviewPage(page)}
                          className="w-8 h-8 p-0 text-xs"
                        >
                          {page}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentReviewPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentReviewPage === totalPages}
                      className="text-xs sm:text-sm"
                    >
                      <span className="hidden sm:inline">পরবর্তী</span>
                      <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related Books Section */}
        <div className="mt-8 sm:mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold">সম্পর্কিত বই</h2>
            <Link href="/books" className="text-blue-600 hover:underline text-xs sm:text-sm font-medium">
              সব বই দেখুন
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {relatedBooks.map((book) => (
              <div key={book.id} className="group">
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-[3/4] overflow-hidden cursor-pointer" onClick={() => setIsReading(true)}>
                    <Image
                      src={book.image || "/placeholder.svg"}
                      alt={book.title}
                      width={220}
                      height={300}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-2 sm:p-3">
                    <Link href={`/books/${book.id}`}>
                      <h3 className="font-medium text-xs sm:text-sm line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
                        {book.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-600 mb-2">{book.author}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-green-600">৳{book.price}</p>
                        <p className="text-xs text-gray-500 line-through">৳{book.originalPrice}</p>
                      </div>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-current" />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Book Reading Modal - PDF Style */}
      <Dialog open={isReading} onOpenChange={setIsReading}>
        <DialogContent className="max-w-[95vw] w-full lg:max-w-6xl h-[90vh] md:h-[95vh] p-0 bg-gray-900">
          <DialogHeader className="p-2 md:p-3 lg:p-4 border-b border-gray-700 bg-gray-800">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-sm md:text-base lg:text-lg font-semibold text-white truncate max-w-[150px] md:max-w-[300px]">
                বইয়ের শিরোনাম {bookId}
              </DialogTitle>
              <div className="flex items-center gap-1.5 md:gap-2 lg:gap-3">
                {/* Zoom Controls */}
                <div className="hidden md:flex items-center gap-1 lg:gap-2 bg-gray-700 rounded-lg p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => adjustZoom(false)}
                    disabled={zoom <= 75}
                    className="text-white hover:bg-gray-600 h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 p-0"
                  >
                    <ZoomOut className="h-3 w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4" />
                  </Button>
                  <span className="text-xs md:text-sm font-medium text-white min-w-[35px] md:min-w-[40px] lg:min-w-[50px] text-center">
                    {zoom}%
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => adjustZoom(true)}
                    disabled={zoom >= 150}
                    className="text-white hover:bg-gray-600 h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 p-0"
                  >
                    <ZoomIn className="h-3 w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4" />
                  </Button>
                </div>

                {/* Page Navigation */}
                <div className="flex items-center gap-1 md:gap-1.5 lg:gap-2 bg-gray-700 rounded-lg p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevPage}
                    disabled={currentPage <= 1}
                    className="text-white hover:bg-gray-600 h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 p-0"
                  >
                    <ChevronLeft className="h-3 w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4" />
                  </Button>
                  <span className="text-xs md:text-sm font-medium text-white min-w-[50px] md:min-w-[60px] lg:min-w-[80px] text-center">
                    {currentPage} / {bookPages.length}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={nextPage}
                    disabled={currentPage >= bookPages.length}
                    className="text-white hover:bg-gray-600 h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 p-0"
                  >
                    <ChevronRight className="h-3 w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </DialogHeader>

          {/* PDF-like Scrolling Container */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-auto bg-gray-100 p-2 md:p-3 lg:p-4"
            onScroll={handleScroll}
            style={{ scrollBehavior: "smooth" }}
          >
            <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto space-y-3 md:space-y-4 lg:space-y-8">
              {bookPages.map((page, index) => (
                <div
                  key={page.page}
                  className="bg-white shadow-xl md:shadow-2xl rounded-lg overflow-hidden transition-all duration-300"
                  style={{
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: "top center",
                    marginBottom: index < bookPages.length - 1 ? `${(zoom - 100) * 0.5}px` : "0",
                  }}
                >
                  <div className="p-3 md:p-6 lg:p-8 min-h-[400px] md:min-h-[600px] lg:min-h-[800px] flex flex-col">
                    {/* Page Header */}
                    <div className="text-center mb-4 md:mb-6 lg:mb-8 pb-3 md:pb-4 border-b border-gray-200">
                      <h2 className="text-base md:text-lg lg:text-2xl font-bold text-gray-800 mb-2">
                        অধ্যায় {Math.ceil(page.page / 5)}
                      </h2>
                      <div className="w-12 md:w-16 lg:w-24 h-0.5 md:h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                    </div>

                    {/* Page Content */}
                    <div className="flex-1">
                      <div className="prose prose-xs md:prose-sm lg:prose-lg max-w-none">
                        <div className="whitespace-pre-line text-gray-800 leading-relaxed text-justify font-serif text-xs md:text-sm lg:text-base">
                          {page.content}
                        </div>
                      </div>
                    </div>

                    {/* Page Footer */}
                    <div className="text-center mt-4 md:mt-6 lg:mt-8 pt-3 md:pt-4 lg:pt-6 border-t border-gray-200">
                      <div className="flex items-center justify-between text-[10px] md:text-xs lg:text-sm">
                        <div className="text-gray-500 truncate max-w-[80px] md:max-w-[120px] lg:max-w-[200px]">বইয়ের শিরোনাম {bookId}</div>
                        <div className="font-medium text-gray-700">{page.page}</div>
                        <div className="text-gray-500 truncate max-w-[80px] md:max-w-[120px] lg:max-w-[200px]">হুমায়ূন আহমেদ</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reading Controls Footer */}
          <div className="p-2 md:p-3 lg:p-4 border-t border-gray-700 bg-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 md:gap-2 lg:gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600 text-[10px] md:text-xs lg:text-sm h-7 md:h-8 lg:h-9"
                >
                  <BookOpen className="h-3 w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4 mr-1 md:mr-1.5 lg:mr-2" />
                  <span className="hidden md:inline">বুকমার্ক</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600 text-[10px] md:text-xs lg:text-sm h-7 md:h-8 lg:h-9"
                >
                  <Share2 className="h-3 w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4 mr-1 md:mr-1.5 lg:mr-2" />
                  <span className="hidden md:inline">শেয়ার</span>
                </Button>
              </div>

              <div className="text-[10px] md:text-xs lg:text-sm text-gray-400 bg-gray-700 px-2 md:px-3 lg:px-4 py-1 md:py-1.5 lg:py-2 rounded-lg">
                📖 প্রিভিউ মোড
              </div>

              <Button
                onClick={() => setIsReading(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] md:text-xs lg:text-sm h-7 md:h-8 lg:h-9"
              >
                বন্ধ করুন
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
