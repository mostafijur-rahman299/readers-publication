"use client"

import { useEffect, useState, useCallback, useRef } from "react"
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
  Edit,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import useHttp from "@/hooks/useHttp"
import { API_ENDPOINTS } from "@/constants/apiEnds"
import { useLocale, useTranslations } from "next-intl"
import BookPreviewModal from "../components/BookPreview"
import useCart from "@/hooks/useCart"

export default function BookDetailPage() {
  const { id } = useParams()
  const bookId = id as string
  const [cartQuantity, setCartQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isReading, setIsReading] = useState(false)
  const [currentReviewPage, setCurrentReviewPage] = useState(1)
  const [bookData, setBookData] = useState<any>(null)
  const locale = useLocale()
  const [bookImages, setBookImages] = useState<any[]>([])
  const [selectedBookImage, setSelectedBookImage] = useState<any>(null)
  const t = useTranslations("book_details")
  const [bookReviewDistribution, setBookReviewDistribution] = useState<any>(null)
  const { sendRequests: fetchBookReviewDistribution } = useHttp()
  const { sendRequests: fetchBook, isLoading: isBookLoading } = useHttp()
  const { sendRequests: fetchBookReviews, isLoading: isBookReviewsLoading } = useHttp()
  const [bookReviews, setBookReviews] = useState<any[]>([])
  const [bookReviewsPagination, setBookReviewsPagination] = useState<any>(null)
  const [relatedBooks, setRelatedBooks] = useState<any[]>([])
  const { sendRequests: fetchRelatedBooks, isLoading: isRelatedBooksLoading } = useHttp()
  const router = useRouter()
  const { addToCart } = useCart()
  const { sendRequests: addToWishlist, isLoading: isAddingToWishlist } = useHttp()  
  const [selectedRating, setSelectedRating] = useState(0)
  const { sendRequests: removeFromWishlist, isLoading: isRemovingFromWishlist } = useHttp()

  const onRatingChange = (rating: number) => {
    setSelectedRating(rating)
  }

  // Carousel state for related books
  const [relatedCarouselIndex, setRelatedCarouselIndex] = useState(0)
  const relatedCarouselRef = useRef<HTMLDivElement>(null)
  const RELATED_CAROUSEL_VISIBLE = 4

  // Fetch book details
  useEffect(() => {
    fetchBook(
      {
        url_info: {
          url: API_ENDPOINTS.BOOK_DETAIL(bookId),
        },
      },
      (res: any) => {
        setBookData(res)
        const images = [
          {
            image: res.cover_image,
            alt_text: res.title,
            id: "cover-image",
          },
          ...(res.book_images || []),
        ]
        setBookImages(images)
        setSelectedBookImage(images[0])
      },
    )
  }, [bookId])

  // Fetch related books
  useEffect(() => {
    if (bookData?.id) {
      fetchRelatedBooks({
        url_info: {
          url: API_ENDPOINTS.BOOK_RELATED+ `?book_id=${bookData?.id}`,
        },
      }, (res: any) => {
        setRelatedBooks(res)
      })
    }
  }, [bookData])

  // Fetch review distribution
  useEffect(() => {
    if (bookData?.id) {
      fetchBookReviewDistribution(
        {
          url_info: {
            url: API_ENDPOINTS.BOOK_REVIEW_DISTRIBUTION(bookData?.id),
          },
        },
        (res: any) => {
          setBookReviewDistribution(res)
        },
      )
    }
  }, [bookData])

  // Fetch paginated reviews
  const fetchReviews = useCallback(
    (page: number) => {
      if (bookData?.id) {
        fetchBookReviews(
          {
            url_info: {
              url: API_ENDPOINTS.BOOK_REVIEWS(bookData?.id) + `?page=${page}`,
            },
          },
          (res: any) => {
            setBookReviews(res?.results || [])
            setBookReviewsPagination({
              total: res.count,
              current_page: res.current_page,
              page_range: res.page_range,
              total_pages: res.total_pages,
            })
          }
        )
      }
    },
    [bookData, fetchBookReviews]
  )

  useEffect(() => {
    if (bookData?.id) {
      fetchReviews(currentReviewPage)
    }
  }, [bookData, currentReviewPage])

  // Quantity change handler
  const handleCartQuantityChange = (increment: boolean) => {
    if (!bookData) return
    const max = parseInt(bookData?.available_copies) || 1
    setCartQuantity((prev) => {
      if (increment) return prev < max ? prev + 1 : prev
      return prev > 1 ? prev - 1 : prev
    })
  }

  // Image selection
  const onSelectBookImage = (image: any) => {
    setSelectedBookImage(image)
  }

  // Share book
  const shareBook = () => {
    if (navigator.share) {
      navigator.share({
        title: `${bookId}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  // Next/Prev image
  const nextImage = () => {
    if (!bookImages.length) return
    const currentIndex = bookImages.findIndex((image) => image.id === selectedBookImage?.id)
    const nextIndex = (currentIndex + 1) % bookImages.length
    setSelectedBookImage(bookImages[nextIndex])
  }

  const prevImage = () => {
    if (!bookImages.length) return
    const currentIndex = bookImages.findIndex((image) => image.id === selectedBookImage?.id)
    const prevIndex = (currentIndex - 1 + bookImages.length) % bookImages.length
    setSelectedBookImage(bookImages[prevIndex])
  }

  // Smooth scroll to reviews
  const scrollToReviews = () => {
    const el = document.getElementById("reviews-section")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  // See all related books handler (navigate to all books page with filter, or just /books)
  const handleSeeAllRelated = () => {
    router.push(`/${locale}/books`)
  }

  const handleAddToCart = () => {
    let book = {
      quantity: cartQuantity,
      book_details: {
        id: bookData.id,
        slug: bookData.slug,
        title: bookData.title,
        title_bn: bookData.title_bn,
        cover_image: bookData.cover_image,
        price: bookData.price,
        discounted_price: bookData.discounted_price,
        is_available: bookData.is_available,
      },
      author_details: {
        id: bookData.author.id,
        slug: bookData.author.slug,
        name: bookData.author.name,
        name_bn: bookData.author.name_bn,
      }
    }
    addToCart(book, cartQuantity)
  }

  const handleAddToWishlist = () => {
    if (!bookData?.is_in_wishlist){
      addToWishlist({
        url_info: {
          url: API_ENDPOINTS.WISHLIST,
        },
        method: "POST",
        data: {
          book_id: bookData.id,
        },
      }, (data: any) => {
        setBookData({
          ...bookData,
          is_in_wishlist: true,
        })
      })
    }else{
      removeFromWishlist({
        url_info: {
          url: API_ENDPOINTS.WISHLIST_DELETE(`book_${bookData.id}`),
        },
        method: "DELETE",
      }, (data: any) => {
        setBookData({
          ...bookData,
          is_in_wishlist: false,
        })
      })
    }
  }

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
                  if (bookData?.has_preview_images) {
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
                      {bookData?.has_preview_images && (
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
                  {bookData?.has_preview_images && (
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
                      <button
                        className="flex items-center gap-1 hover:underline focus:outline-none"
                        onClick={scrollToReviews}
                        type="button"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        {bookData?.reviews_count} {t("reviews")}
                      </button>
                    )}
                  </div>
                </div>
                {/* Book Categories */}
                  {bookData?.categories?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {bookData?.categories.map((category: any) => (
                        <span
                          key={category.id}
                          className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-medium"
                        >
                          {locale === "bn" ? category.name_bn : category.name}
                        </span>
                      ))}
                    </div>
                  )}
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
                    onClick={() => handleCartQuantityChange(false)}
                    disabled={cartQuantity <= 1}
                    className="h-7 w-7"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm font-medium">{cartQuantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCartQuantityChange(true)}
                    disabled={cartQuantity >= parseInt(bookData?.available_copies || "1")}
                    className="h-7 w-7"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
                  কার্টে যোগ করুন
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddToWishlist}
                  disabled={isAddingToWishlist}
                  className={`h-7 w-7 ${bookData?.is_in_wishlist ? "text-red-500 border-red-500" : ""}`}
                >
                  <Heart className={`h-3.5 w-3.5 ${bookData?.is_in_wishlist ? "fill-current" : ""}`} />
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
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6"> {t("detailed_information")} </h3>
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-lg mb-4 sm:mb-6">
                  <TabsTrigger value="description" className="text-xs sm:text-sm font-medium rounded-md">
                    {t("book_details")}
                  </TabsTrigger>
                  <TabsTrigger value="author" className="text-xs sm:text-sm font-medium rounded-md">
                    {t("author_details")}
                  </TabsTrigger>
                  <TabsTrigger value="specifications" className="text-xs sm:text-sm font-medium rounded-md">
                    {t("specifications")}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="mt-0 m-10">
                  <div
                    className="prose prose-gray max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: locale === "bn" ? (bookData?.description_bn || "") : (bookData?.description || "")
                    }}
                  />
                </TabsContent>

                <TabsContent value="author" className="mt-0">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <div className="w-20 h-20 sm:w-32 sm:h-32 mx-auto sm:mx-0 flex-shrink-0">
                      <Image
                        src={bookData?.author?.profile_picture || "/default_profile.png"}
                        alt={bookData?.author?.name}
                        width={128}
                        height={128}
                        className="rounded-full object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h4 className="text-lg sm:text-xl font-bold mb-3">{locale === "bn" ? bookData?.author?.name_bn : bookData?.author?.name}</h4>
                      <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
                        {locale === "bn" ? bookData?.author?.bio_bn : bookData?.author?.bio}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                        {bookData?.author?.tags?.map((tag: any) => (
                          <Badge variant="secondary" className="text-xs" key={tag.id}>
                            {locale === "bn" ? tag.name_bn : tag.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="specifications" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <h4 className="font-semibold mb-4 text-base sm:text-lg">{t("book_details")}</h4>
                      <div className="space-y-3">
                        {[
                          { label: t("title"), value: locale === "bn" ? bookData?.title_bn : bookData?.title },
                          { label: t("author"), value: locale === "bn" ? bookData?.author?.name_bn : bookData?.author?.name },
                          { label: t("publisher"), value: locale === "bn" ? bookData?.publisher_name_bn : bookData?.publisher_name },
                          { label: t("publisher_website_link"), value: bookData?.publisher_website_link ? <a href={bookData.publisher_website_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{bookData.publisher_website_link}</a> : "" },
                          { label: t("publication_date"), value:  bookData?.published_date },
                        ].map((spec) => (
                          <div key={spec.label} className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600 font-medium text-sm">{spec.label}:</span>
                            <span className="text-gray-800 font-semibold text-sm text-right">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4 text-base sm:text-lg">{t("physical_details")}</h4>
                      <div className="space-y-3">
                        {[
                          { label: t("pages"), value: bookData?.pages ? bookData.pages.toString() : "" },
                          { label: t("dimensions"), value: locale === "bn" ? bookData?.dimensions_bn : bookData?.dimensions || "" },
                          { label: t("weight"), value: bookData?.weight ? `${locale === "bn" ? bookData.weight + " গ্রাম" : bookData.weight} ` : "" },
                          { label: t("edition"), value: locale === "bn" ? bookData?.edition_bn : bookData?.edition || "" },
                          { label: t("language"), value: bookData?.language },
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
        <div className="mt-8" id="reviews-section">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold">{t("reader_reviews")}</h2>
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 sm:h-5 sm:w-5 fill-current ${bookData?.rating > i ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`} />
                    ))}
                  </div>
                  <span className="font-semibold text-sm sm:text-base">{bookData?.rating}</span>
                  <span className="text-gray-600 text-xs sm:text-sm">({bookData?.rating_count || 0} {t("reviews")})</span>
                </div>
              </div>

              {/* Add Review Form */}
              {bookData?.can_give_review && <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-4">{t("write_review")}</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  // Handle form submission
                }}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">{t("your_rating")}</label>
                    <div className="flex gap-2">
                      {[1,2,3,4,5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          className="p-1 hover:scale-110 transition-transform"
                          onClick={() => {
                            // Update the selected rating
                            setSelectedRating(rating);
                            
                            // Optional: Call any additional rating handlers
                            if (onRatingChange) {
                              onRatingChange(rating);
                            }
                          }}
                        >
                          <Star 
                            className={`h-6 w-6 ${
                              rating <= selectedRating 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">{t("your_review")}</label>
                    <textarea
                      className="w-full rounded-md border border-gray-300 p-2 min-h-[100px]"
                      placeholder={t("write_your_review")}
                    />
                  </div>
                  <Button type="submit" className="w-full sm:w-auto">
                    {t("submit_review")}
                  </Button>
                </form>
              </div>}

              {/* Rating Breakdown */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4 text-sm sm:text-base">{t("rating_distribution")}</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = bookReviewDistribution?.[star.toString()] || 0;
                    const total = bookReviewDistribution?.total || 0;
                    const percentage = total > 0 ? (count / total) * 100 : 0;

                    return (
                      <div key={star} className="flex items-center gap-3">
                        <div className="flex items-center gap-1 w-10 sm:w-12">
                          <span className="text-xs sm:text-sm">{star}</span>
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        </div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-600 w-6 sm:w-8">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-base sm:text-lg">{t("all_reviews")}</h3>
                  <div className="text-xs sm:text-sm text-gray-600">
                    {t("page")} {bookReviewsPagination?.current_page} / {bookReviewsPagination?.total_pages}
                  </div>
                </div>

                {bookReviews.map((review: any) => (
                  <div key={review.id} className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                          {review?.user_details?.name?.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-gray-800 text-sm sm:text-base">{review?.user_details?.name}</p>
                          </div>
                          <p className="text-xs text-gray-500">{review?.created_at}</p>
                        </div>
                      </div>
                      <div className="flex text-yellow-400 ml-11 sm:ml-0">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 sm:h-4 sm:w-4 ${i < review?.rating ? "fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3">{review?.review}</p>
                  </div>
                ))}

                {/* Pagination */}
                {bookReviewsPagination?.total_pages > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (currentReviewPage > 1) {
                          setCurrentReviewPage(currentReviewPage - 1)
                        }
                      }}
                      disabled={currentReviewPage === 1}
                      className="text-xs sm:text-sm"
                    >
                      <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">{t("previous_page")}</span>
                    </Button>
                    <div className="flex gap-1">
                      {(() => {
                        const totalPages = bookReviewsPagination?.total_pages;
                        const current = currentReviewPage;
                        let start = Math.max(1, current - 1);
                        let end = Math.min(totalPages, current + 1);

                        if (end - start < 2) {
                          if (start === 1) {
                            end = Math.min(start + 2, totalPages);
                          } else if (end === totalPages) {
                            start = Math.max(1, end - 2);
                          }
                        }

                        const visiblePages = [];
                        for (let i = start; i <= end; i++) {
                          visiblePages.push(i);
                        }

                        return visiblePages.map((page) => (
                          <Button
                            key={page}
                            variant={currentReviewPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                              if (currentReviewPage !== page) {
                                setCurrentReviewPage(page)
                              }
                            }}
                            className="w-8 h-8 p-0 text-xs"
                          >
                            {page}
                          </Button>
                        ));
                      })()}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (currentReviewPage < bookReviewsPagination?.total_pages) {
                          setCurrentReviewPage(currentReviewPage + 1)
                        }
                      }}
                      disabled={currentReviewPage === bookReviewsPagination?.total_pages}
                      className="text-xs sm:text-sm"
                    >
                      <span className="hidden sm:inline">{t("next_page")}</span>
                      <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related Books Carousel */}
        {relatedBooks && relatedBooks.length > 0 && (
          <div className="mt-8">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg sm:text-xl font-bold">{t("related_books")}</h3>
                  <Button
                    variant="link"
                    size="sm"
                    className="text-blue-600 px-2 py-1"
                    onClick={handleSeeAllRelated}
                  >
                    {t("see_all")}
                  </Button>
                </div>
                <div className="relative">
                  {/* Responsive carousel: scrolls 1 at a time on mobile, 4 at a time on desktop */}
                  <button
                    aria-label="Previous"
                    onClick={() => {
                      if (window.innerWidth < 640) {
                        setRelatedCarouselIndex((prev) => Math.max(prev - 1, 0))
                      } else {
                        setRelatedCarouselIndex((prev) => Math.max(prev - RELATED_CAROUSEL_VISIBLE, 0))
                      }
                    }}
                    disabled={relatedCarouselIndex === 0}
                    className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full transition-all ${relatedCarouselIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
                    style={{
                      display:
                        relatedBooks.length > (typeof window !== "undefined" && window.innerWidth < 640 ? 1 : RELATED_CAROUSEL_VISIBLE)
                          ? "block"
                          : "none",
                    }}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <div
                    className="overflow-hidden"
                    style={{
                      marginLeft:
                        relatedBooks.length > (typeof window !== "undefined" && window.innerWidth < 640 ? 1 : RELATED_CAROUSEL_VISIBLE)
                          ? "2.5rem"
                          : 0,
                      marginRight:
                        relatedBooks.length > (typeof window !== "undefined" && window.innerWidth < 640 ? 1 : RELATED_CAROUSEL_VISIBLE)
                          ? "2.5rem"
                          : 0,
                    }}
                  >
                    <div
                      className="flex gap-5 pb-2 transition-transform duration-500 ease-in-out"
                      ref={relatedCarouselRef}
                      style={{
                        transform: (() => {
                          // Responsive: 1 at a time on mobile, 4 at a time on desktop
                          const cardWidth = 200 + 20; // 200px card + 20px gap
                          const visible = typeof window !== "undefined" && window.innerWidth < 640 ? 1 : RELATED_CAROUSEL_VISIBLE;
                          return `translateX(-${relatedCarouselIndex * cardWidth}px)`;
                        })(),
                        willChange: "transform",
                      }}
                    >
                      {relatedBooks.map((book: any, idx: number) => {
                        // Calculate discount percentage if applicable
                        const hasDiscount =
                          book.discounted_price &&
                          parseFloat(book.discounted_price) < parseFloat(book.price)
                        const discountPercent = hasDiscount
                          ? Math.round(
                              (1 -
                                parseFloat(book.discounted_price) /
                                  parseFloat(book.price)) *
                                100
                            )
                          : 0

                        return (
                          <div
                            key={book.id}
                            className="min-w-[230px] max-w-[230px] flex-shrink-0 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 relative border border-gray-100"
                            style={{
                              width: "200px",
                            }}
                          >
                            
                            <div className="block h-full">
                              <div className="aspect-[3/4] w-full bg-gray-100 rounded-t-xl flex items-center justify-center overflow-hidden cursor-pointer relative" style={{height: "200px", minHeight: "200px", maxHeight: "200px"}}>
                                <Link href={`/${locale}/books/${book.slug}`}>
                                  <img
                                    src={book.cover_image || "/images/book-skeleton.jpg"}
                                    alt={locale === "bn" ? book.title_bn : book.title}
                                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                                  />
                                  {hasDiscount && (
                                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                                      -{discountPercent}%
                                    </span>
                                  )}
                                </Link>
                              </div>
                              <div className="p-3">
                                <div className="font-semibold text-base truncate mb-1">
                                <Link href={`/${locale}/books/${book.slug}`}>
                                  {locale === "bn" ? book.title_bn?.length > 20 ? book.title_bn.slice(0, 20) + "..." : book.title_bn : book.title?.length > 20 ? book.title.slice(0, 20) + "..." : book.title}
                                </Link>
                                </div>
                                <div className="text-xs text-gray-500 truncate mb-1">
                                  <Link href={`/${locale}/authors/${book.author_slug}`}>
                                    {locale === "bn" ? book.author_full_name_bn : book.author_full_name}
                                  </Link>
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                  <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                                  <span className="text-xs font-medium text-gray-700">
                                    {book.rating ? Number(book.rating).toFixed(1) : "0.0"}
                                  </span>
                                  <span className="text-xs text-gray-400">
                                    ({book.rating_count || 0})
                                  </span>
                                </div>
                                <div className="mt-2 flex items-center gap-2">
                                  {hasDiscount ? (
                                    <>
                                      <span className="text-base font-bold text-red-600">
                                        {parseFloat(book.discounted_price).toLocaleString()}৳
                                      </span>
                                      <span className="text-xs line-through text-gray-400">
                                        {parseFloat(book.price).toLocaleString()}৳
                                      </span>
                                    </>
                                  ) : (
                                    <span className="text-base font-bold text-gray-800">
                                      {parseFloat(book.price).toLocaleString()}৳
                                    </span>
                                  )}
                                </div>
                              </div>
                              </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <button
                    aria-label="Next"
                    onClick={() => {
                      if (typeof window !== "undefined" && window.innerWidth < 640) {
                        setRelatedCarouselIndex((prev) =>
                          Math.min(prev + 1, relatedBooks.length - 1)
                        )
                      } else {
                        setRelatedCarouselIndex((prev) =>
                          Math.min(
                            prev + RELATED_CAROUSEL_VISIBLE,
                            Math.max(relatedBooks.length - RELATED_CAROUSEL_VISIBLE, 0)
                          )
                        )
                      }
                    }}
                    disabled={
                      (typeof window !== "undefined" && window.innerWidth < 640)
                        ? relatedCarouselIndex >= relatedBooks.length - 1
                        : relatedCarouselIndex + RELATED_CAROUSEL_VISIBLE >= relatedBooks.length
                    }
                    className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full shadow p-1.5 transition-all ${
                      (typeof window !== "undefined" && window.innerWidth < 640
                        ? relatedCarouselIndex >= relatedBooks.length - 1
                        : relatedCarouselIndex + RELATED_CAROUSEL_VISIBLE >= relatedBooks.length)
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-100"
                    }`}
                    style={{
                      display:
                        relatedBooks.length > (typeof window !== "undefined" && window.innerWidth < 640 ? 1 : RELATED_CAROUSEL_VISIBLE)
                          ? "block"
                          : "none",
                    }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <BookPreviewModal 
        open={isReading} 
        onOpenChange={() => setIsReading(false)} 
        bookId={bookData?.id} 
        bookTitle={locale === "bn" ? bookData?.title_bn : bookData?.title} 
        hasPreviewImages={bookData?.has_preview_images} 
      />     
    </div>
  )
}
