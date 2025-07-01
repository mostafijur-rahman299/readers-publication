"use client"

import { useEffect, useState, useRef } from "react"
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
  Edit,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import useHttp from "@/hooks/useHttp"
import { API_ENDPOINTS } from "@/constants/apiEnds"
import { useLocale, useTranslations } from "next-intl"

export default function BookDetailPage() {
  const { id } = useParams()
  const bookId = id as string
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isReading, setIsReading] = useState(false)
  const [currentReviewPage, setCurrentReviewPage] = useState(1)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [bookData, setBookData] = useState<any>(null)
  const locale = useLocale()
  const [bookImages, setBookImages] = useState<any[]>([])
  const [selectedBookImage, setSelectedBookImage] = useState<any>(null)
  const t = useTranslations("book_details")

  const availableStock = 25
  const reviewsPerPage = 3

  const { sendRequests: fetchBook, isLoading: isBookLoading } = useHttp()

  useEffect(() => {
    fetchBook(
      {
        url_info: {
          url: API_ENDPOINTS.BOOK_DETAIL(bookId),
        },
      },
      (res: any) => {
        setBookData(res)
        setBookImages([
          {
            image: res.cover_image,
            alt_text: res.title,
            id: "cover-image",
          },
          ...res.book_images,
        ])
        setSelectedBookImage({
          image: res.cover_image,
          alt_text: res.title,
          id: "cover-image",
        })
      },
    )
  }, [bookId])

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

  const onSelectBookImage = (image: any) => {
    setSelectedBookImage(image)
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
    const currentIndex = bookImages.findIndex((image) => image.id === selectedBookImage?.id)
    const nextIndex = (currentIndex + 1) % bookImages.length
    setSelectedBookImage(bookImages[nextIndex])
  }

  const prevImage = () => {
    const currentIndex = bookImages.findIndex((image) => image.id === selectedBookImage?.id)
    const prevIndex = (currentIndex - 1 + bookImages.length) % bookImages.length
    setSelectedBookImage(bookImages[prevIndex])
  }

  console.log("bookData=======", bookData)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex items-center py-3 text-sm text-gray-600">
            <Link href="/" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>{t("main_page")}</span>
            </Link>
            <span className="mx-2">/</span>
            <Link href="/books" className="hover:text-blue-600 transition-colors hidden sm:inline">
              {t("all_books")}
            </Link>
            <span className="mx-2 hidden sm:inline">/</span>
            <span className="text-gray-800 font-medium truncate">
              {locale === "bn" ? bookData?.title_bn : bookData?.title}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24 space-y-2">
              <Card
                className="overflow-hidden cursor-pointer"
                onClick={() => {
                  if (bookData?.book_pdf) {
                    setIsReading(true)
                  }
                }}
              >
                <CardContent className="p-3 sm:p-4">
                  <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden max-w-[380px] sm:max-w-[340px] mx-auto group">
                    <Image
                      src={selectedBookImage?.image || "/images/book-skeleton.jpg"}
                      alt={selectedBookImage?.alt_text || "Book cover"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      {bookData?.book_pdf && (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                          <BookOpen className="h-6 w-6 text-gray-800" />
                        </div>
                      )}
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
                  </div>
                  {bookData?.book_pdf && (
                    <div className="text-center mt-3">
                      <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {t("read_now")}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Thumbnails */}
              <div className="flex gap-2 justify-center">
                {bookImages?.map((image: any, i: number) => (
                  <button
                    key={image.id}
                    className={`relative aspect-[3/4] w-16 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedBookImage?.id === image.id ? "border-blue-500" : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => onSelectBookImage(image)}
                  >
                    <Image
                      src={image.image || "/images/book-skeleton.jpg"}
                      alt={image.alt_text || "Book cover"}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:col-span-8 xl:col-span-9">
            {/* Title and Author */}
            <div className="mb-6 pb-4 border-b">
              <h1 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
                {locale === "bn" ? bookData?.title_bn : bookData?.title}
              </h1>
              <div className="flex flex-col gap-3">
                <Link href="#" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  <span>{locale === "bn" ? bookData?.author?.name_bn : bookData?.author?.name}</span>
                </Link>
                <div className="flex items-center flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${bookData?.rating > i ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                        />
                      ))}
                    </div>
                    <span className="font-medium">{bookData?.rating}</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-500">
                    {bookData?.reviews_count > 0 && (
                      <span className="flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        {bookData?.reviews_count} রিভিউ
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Price and Stock */}
            <div className="mb-6 pb-4">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-green-600">৳{bookData?.discounted_price}</span>
                  <span className="text-gray-400 line-through">৳{bookData?.price}</span>
                </div>
                {bookData?.discounted_price < bookData?.price && (
                  <Badge className="bg-red-50 text-red-600 text-xs">
                    {Math.round(((bookData?.price - bookData?.discounted_price) / bookData?.price) * 100)}%{" "}
                    {t("discount")}
                  </Badge>
                )}
              </div>
              {bookData?.available_copies > 0 && (
                <div className="flex items-center gap-2 text-xs">
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                    {t("stock_available")}
                  </Badge>
                  <span className="text-gray-500">
                    • {t("only")} {bookData?.available_copies} {t("t")} {t("book")} {t("available")}
                  </span>
                </div>
              )}
              {bookData?.available_copies === 0 && (
                <div className="flex items-center gap-2 text-xs">
                  <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                    {t("stock_not_available")}
                  </Badge>
                </div>
              )}
            </div>

            {/* Book Details */}
            <div className="mb-6 pb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {[
                  { label: t("publisher"), value: bookData?.publisher_name, icon: BookOpen },
                  { label: t("page"), value: bookData?.pages, icon: BookOpen },
                  { label: t("language"), value: bookData?.language, icon: BookOpen },
                  { label: t("publication_date"), value: bookData?.published_date, icon: BookOpen },
                ].map((info) => (
                  <div key={info.label} className="flex items-center gap-2 py-1.5">
                    <info.icon className="h-3.5 w-3.5 text-gray-400" />
                    <span className="text-gray-500 min-w-[80px]">{info.label}:</span>
                    <span className="font-medium text-gray-700">{info.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mb-6 pb-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 bg-gray-50 rounded-md px-2 py-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(false)}
                    disabled={quantity <= 1}
                    className="h-7 w-7"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(true)}
                    disabled={quantity >= availableStock}
                    className="h-7 w-7"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
                  কার্টে যোগ করুন
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleWishlist}
                  className={`h-7 w-7 ${isWishlisted ? "text-red-500 border-red-500" : ""}`}
                >
                  <Heart className={`h-3.5 w-3.5 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
                <Button variant="outline" size="sm" onClick={shareBook} className="h-7 w-7 bg-transparent">
                  <Share2 className="h-3.5 w-3.5" />
                </Button>
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
      </div>

      {/* Enhanced Book Reading Modal - PDF Style */}
      <Dialog open={isReading} onOpenChange={setIsReading}>
        <DialogContent className="max-w-full w-full sm:max-w-4xl md:max-w-6xl lg:max-w-7xl h-[90vh] md:h-[95vh] p-0 bg-white flex flex-col">
          {/* Header */}
          <DialogHeader className="p-3 md:p-4 border-b bg-gray-50 flex-shrink-0">
            <div className="flex items-center justify-between gap-4">
              <DialogTitle className="text-sm md:text-base lg:text-lg font-semibold text-gray-900 truncate flex-1">
                {locale === "bn" ? bookData?.title_bn : bookData?.title}
              </DialogTitle>
              <Button onClick={() => setIsReading(false)} variant="outline" size="sm" className="flex-shrink-0">
                বন্ধ করুন
              </Button>
            </div>
          </DialogHeader>

          {/* PDF Viewer */}
          <div className="flex-1 min-h-0 overflow-hidden">
            {bookData?.book_pdf ? (
              <PDFViewer pdfUrl={bookData.book_pdf} />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-50">
                <div className="text-center p-8">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">PDF ফাইল উপলব্ধ নেই</p>
                  <Button onClick={() => setIsReading(false)}>বন্ধ করুন</Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Enhanced PDF Viewer Component
const PDFViewer = ({ pdfUrl }: { pdfUrl: string }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [scale, setScale] = useState(1.0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pdfDoc, setPdfDoc] = useState<any>(null)

  // Initialize PDF.js
  useEffect(() => {
    const initPDFJS = async () => {
      try {
        // Use dynamic import for PDF.js to avoid SSR issues
        const pdfjsLib = await import("pdfjs-dist")

        // Set worker source
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

        return pdfjsLib
      } catch (err) {
        console.error("Failed to load PDF.js:", err)
        setError("PDF viewer could not be loaded")
        return null
      }
    }

    const loadPDF = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const pdfjsLib = await initPDFJS()
        if (!pdfjsLib) return

        const loadingTask = pdfjsLib.getDocument({
          url: "https://33a6-103-220-206-188.ngrok-free.app/media/book_pdfs/cover-letter-sciit.pdf",
          cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/",
          cMapPacked: true,
        })

        const pdf = await loadingTask.promise
        setPdfDoc(pdf)
        setTotalPages(pdf.numPages)
        setCurrentPage(1)
      } catch (err) {
        console.error("Error loading PDF:", err)
        setError("Failed to load PDF document")
      } finally {
        setIsLoading(false)
      }
    }

    if (pdfUrl) {
      loadPDF()
    }
  }, [pdfUrl])

  // Render current page
  useEffect(() => {
    if (!pdfDoc || !containerRef.current) return

    const renderPage = async () => {
      try {
        const page = await pdfDoc.getPage(currentPage)
        const container = containerRef.current
        if (!container) return

        // Clear previous content
        container.innerHTML = ""

        // Calculate scale based on container width
        const containerWidth = container.clientWidth - 40 // Account for padding
        const viewport = page.getViewport({ scale: 1.0 })
        const calculatedScale = Math.min(containerWidth / viewport.width, scale)

        const scaledViewport = page.getViewport({ scale: calculatedScale })

        // Create canvas
        const canvas = document.createElement("canvas")
        const context = canvas.getContext("2d")
        if (!context) return

        canvas.height = scaledViewport.height
        canvas.width = scaledViewport.width
        canvas.className = "mx-auto shadow-lg rounded-lg"

        container.appendChild(canvas)

        // Render page
        const renderContext = {
          canvasContext: context,
          viewport: scaledViewport,
        }

        await page.render(renderContext).promise
      } catch (err) {
        console.error("Error rendering page:", err)
        setError("Failed to render PDF page")
      }
    }

    renderPage()
  }, [pdfDoc, currentPage, scale])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      // Re-render current page with new scale
      if (pdfDoc && containerRef.current) {
        const event = new Event("resize")
        window.dispatchEvent(event)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [pdfDoc])

  const goToPage = (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum)
    }
  }

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3.0))
  }

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5))
  }

  const downloadPDF = () => {
    const link = document.createElement("a")
    link.href = pdfUrl
    link.download = "book.pdf"
    link.click()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">PDF লোড হচ্ছে...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center p-8">
          <div className="text-red-500 mb-4">
            <BookOpen className="h-16 w-16 mx-auto mb-2" />
            <p className="font-medium">PDF লোড করতে সমস্যা হয়েছে</p>
          </div>
          <p className="text-gray-600 mb-4 text-sm">{error}</p>
          <div className="space-y-2">
            <Button onClick={downloadPDF} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              PDF ডাউনলোড করুন
            </Button>
            <Button variant="outline" onClick={() => window.open(pdfUrl, "_blank")} className="w-full">
              নতুন ট্যাবে খুলুন
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Controls */}
      <div className="flex items-center justify-between p-3 bg-white border-b flex-shrink-0">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => goToPage(currentPage - 1)} disabled={currentPage <= 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2 text-sm">
            <input
              type="number"
              value={currentPage}
              onChange={(e) => goToPage(Number.parseInt(e.target.value) || 1)}
              className="w-16 px-2 py-1 border rounded text-center"
              min={1}
              max={totalPages}
            />
            <span className="text-gray-600">/ {totalPages}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={zoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>

          <span className="text-sm text-gray-600 min-w-[60px] text-center">{Math.round(scale * 100)}%</span>

          <Button variant="outline" size="sm" onClick={zoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="sm" onClick={downloadPDF}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* PDF Content */}
      <div ref={containerRef} className="flex-1 overflow-auto p-4 bg-gray-100" style={{ minHeight: 0 }} />

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center justify-between p-3 bg-white border-t">
        <Button
          variant="outline"
          size="sm"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
          className="flex-1 mr-2"
        >
          পূর্ববর্তী
        </Button>

        <div className="text-sm text-gray-600 px-4">
          {currentPage} / {totalPages}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="flex-1 ml-2"
        >
          পরবর্তী
        </Button>
      </div>
    </div>
  )
}
