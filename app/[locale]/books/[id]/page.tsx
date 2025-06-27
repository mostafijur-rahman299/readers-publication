"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Minus, Plus, Share2, Star, ArrowLeft, Truck, Shield, RotateCcw, BookOpen, Eye, Clock, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"

export default function BookDetailPage() {
  const { id } = useParams();
  const bookId = id;
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewCount, setViewCount] = useState(1247);
  
  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const bookImages = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    src: `/placeholder.svg?height=400&width=300&text=View${i + 1}`,
    alt: `Book view ${i + 1}`
  }));

  const handleQuantityChange = (increment: boolean) => {
    if (increment) {
      setQuantity(prev => prev + 1);
    } else if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const shareBook = () => {
    if (navigator.share) {
      navigator.share({
        title: `বইয়ের শিরোনাম ${bookId}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const bookSpecs = [
    { label: "প্রকাশক", value: "গার্ডিয়ান পাবলিকেশন্স", icon: "🏢" },
    { label: "বিষয়", value: "উপন্যাস", icon: "📚" },
    { label: "পৃষ্ঠা", value: "২৫০", icon: "📄" },
    { label: "কভার", value: "পেপারব্যাক", icon: "📖" },
    { label: "প্রকাশের তারিখ", value: "জানুয়ারি ২০২৪", icon: "📅" },
    { label: "ভাষা", value: "বাংলা", icon: "🇧🇩" },
    { label: "ISBN", value: "978-1-234567-89-0", icon: "🏷️" },
    { label: "মাত্রা", value: "৫.৫ x ৮.৫ ইঞ্চি", icon: "📏" }
  ];

  const reviews = [
    {
      id: 1,
      name: "আহমেদ হাসান",
      date: "১০ মে, ২০২৪",
      rating: 5,
      comment: "এই বইটি পড়ে আমি খুব আনন্দিত। লেখকের ভাষা এবং গল্প বলার ধরন অসাধারণ। আমি এই বইটি সবাইকে পড়ার পরামর্শ দিব।",
      verified: true,
      helpful: 24
    },
    {
      id: 2,
      name: "ফাতেমা বেগম",
      date: "৮ মে, ২০২৪",
      rating: 4,
      comment: "বইটি খুব সুন্দর। গল্পের ধরন এবং চরিত্রগুলো জীবন্ত। তবে কয়েকটি জায়গায় আরও বিস্তারিত হতে পারত।",
      verified: true,
      helpful: 18
    },
    {
      id: 3,
      name: "রহমান আলী",
      date: "৫ মে, ২০২৪",
      rating: 5,
      comment: "অসাধারণ একটি বই। লেখকের কলমের জাদুতে মুগ্ধ হয়ে গেছি। প্রতিটি পৃষ্ঠা পড়তে পড়তে সময় কেটে যায়।",
      verified: false,
      helpful: 31
    }
  ];

  const relatedBooks = Array.from({ length: 6 }, (_, index) => ({
    id: Number.parseInt(bookId as string) + index + 1,
    title: `সম্পর্কিত বই ${Number.parseInt(bookId as string) + index + 1}`,
    author: "লেখক নাম",
    price: 350 + (Number.parseInt(bookId as string) + index) * 10,
    image: `/placeholder.svg?height=250&width=180&text=Book${Number.parseInt(bookId as string) + index + 1}`,
    rating: 4.5,
    discount: 15
  }));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header />
      <Navigation />

      {/* Enhanced Breadcrumb with Animation */}
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-20 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4 text-sm">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-teal-600 transition-all duration-300 flex items-center gap-2 group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-2 transition-transform duration-300" />
              <span className="group-hover:underline">মূলপাতা</span>
            </Link>
            <span className="mx-3 text-gray-400">/</span>
            <Link 
              href="/books" 
              className="text-gray-600 hover:text-teal-600 transition-all duration-300 hover:underline"
            >
              সকল বই
            </Link>
            <span className="mx-3 text-gray-400">/</span>
            <span className="text-gray-800 font-semibold truncate bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
              বইয়ের শিরোনাম {bookId}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content with Enhanced Layout */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:gap-16 xl:grid-cols-3">
            {/* Enhanced Image Gallery */}
            <div className="xl:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* Main Image with Enhanced Effects */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-2xl bg-white p-6 group">
                  <Image
                    src={bookImages[selectedImage].src}
                    alt={bookImages[selectedImage].alt}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Enhanced Discount Badge */}
                  <div className="absolute top-6 left-6 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl animate-pulse">
                    <span className="flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      ২০% ছাড়
                    </span>
                  </div>

                  {/* View Count Badge */}
                  <div className="absolute top-6 right-6 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {viewCount}
                    </span>
                  </div>
                </div>
                
                {/* Enhanced Thumbnail Gallery */}
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {bookImages.map((image, i) => (
                    <div
                      key={image.id}
                      className={`relative min-w-[70px] cursor-pointer rounded-lg transition-all duration-300 ${
                        selectedImage === i 
                          ? 'ring-2 ring-teal-500 ring-offset-2 scale-105 shadow-lg' 
                          : 'hover:scale-105 hover:ring-1 hover:ring-teal-300 hover:shadow-md'
                      }`}
                      onClick={() => setSelectedImage(i)}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={70}
                        height={105}
                        className="rounded-lg object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="xl:col-span-2">
              <div className="space-y-6">
                {/* Title and Author */}
                <div className="space-y-4">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                    বইয়ের শিরোনাম {bookId}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4">
                    <Link 
                      href="#" 
                      className="text-lg text-teal-600 hover:text-teal-700 hover:underline transition-colors duration-200 font-medium flex items-center gap-2"
                    >
                      <BookOpen className="h-4 w-4" />
                      হুমায়ূন আহমেদ
                    </Link>
                    <div className="flex items-center gap-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 font-medium">(১২৫ রিভিউ)</span>
                    </div>
                  </div>
                </div>

                {/* Price Section */}
                <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-6 rounded-2xl border border-teal-100 shadow-sm">
                  <div className="flex flex-wrap items-center gap-4">
                    <div>
                      <span className="text-4xl font-bold text-teal-600">
                        ৳{350 + Number.parseInt(bookId as string) * 10}
                      </span>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-lg text-gray-500 line-through">
                          ৳{400 + Number.parseInt(bookId as string) * 10}
                        </span>
                        <span className="text-sm bg-teal-100 text-teal-800 px-3 py-1 rounded-full font-semibold">
                          ১৫% ছাড়
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Specs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {bookSpecs.slice(0, 4).map((spec) => (
                    <div key={spec.label} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 text-center">
                      <div className="text-xs text-gray-500 font-medium mb-1">{spec.label}</div>
                      <div className="text-sm text-gray-800 font-semibold">{spec.value}</div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center border-2 border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
                      <button 
                        className="p-3 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                        onClick={() => handleQuantityChange(false)}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <input 
                        type="text" 
                        value={quantity} 
                        className="w-16 text-center text-lg font-semibold border-x border-gray-200 py-3 bg-transparent" 
                        readOnly 
                      />
                      <button 
                        className="p-3 hover:bg-gray-50 transition-colors duration-200"
                        onClick={() => handleQuantityChange(true)}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <Button className="flex-1 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      কার্টে যোগ করুন
                    </Button>

                    <Button 
                      variant="outline" 
                      size="icon" 
                      className={`h-12 w-12 rounded-xl border-2 transition-all duration-200 ${
                        isWishlisted 
                          ? 'border-red-300 bg-red-50 text-red-600 hover:bg-red-100' 
                          : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                      }`}
                      onClick={toggleWishlist}
                    >
                      <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                    </Button>

                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-12 w-12 rounded-xl border-2 border-gray-200 hover:border-teal-300 hover:bg-teal-50 transition-all duration-200"
                      onClick={shareBook}
                    >
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Truck className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-blue-800 mb-1">দ্রুত ডেলিভারি</p>
                      <p className="text-xs text-blue-700">ঢাকার ভিতরে ২৪ ঘন্টা, ঢাকার বাইরে ৪৮-৭২ ঘন্টা</p>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center gap-6 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4" />
                    <span>নিরাপদ কেনাকাটা</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <RotateCcw className="h-4 w-4" />
                    <span>৭ দিনের রিটার্ন</span>
                  </div>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="description" className="mt-8">
                  <TabsList className="w-full bg-gray-100 p-1 rounded-xl">
                    <TabsTrigger value="description" className="text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      বিবরণ
                    </TabsTrigger>
                    <TabsTrigger value="specifications" className="text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      স্পেসিফিকেশন
                    </TabsTrigger>
                    <TabsTrigger value="reviews" className="text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      রিভিউ
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="mt-6">
                    <div className="prose prose-sm max-w-none text-gray-700 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                      <p className="text-base leading-relaxed">
                        এই বইটি হুমায়ূন আহমেদের একটি অসাধারণ উপন্যাস। এটি একটি পরিবারের গল্প যারা তাদের জীবনের নানা সংকট মোকাবেলা করে।
                        লেখক তার অনন্য শৈলীতে পাঠকদের নিয়ে যান এক অবিস্মরণীয় যাত্রায়, যেখানে হাসি, কান্না, আনন্দ এবং বেদনা সবই মিশে আছে।
                      </p>
                      <p className="text-base leading-relaxed mt-4">
                        বইটির চরিত্রগুলো এতটাই জীবন্ত যে পাঠক নিজেকে তাদের মাঝে হারিয়ে ফেলেন। প্রতিটি পৃষ্ঠায় লেখক তার অসাধারণ কল্পনাশক্তি
                        এবং ভাষার জাদু দিয়ে পাঠকদের মুগ্ধ করেন। এই বইটি বাংলা সাহিত্যের একটি মূল্যবান সম্পদ।
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="specifications" className="mt-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                        {bookSpecs.map((spec, index) => (
                          <div 
                            key={spec.label} 
                            className={`p-4 flex justify-between items-center ${
                              index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                            } ${index < bookSpecs.length - 2 ? 'border-b border-gray-100' : ''} ${
                              index % 2 === 0 && index < bookSpecs.length - 2 ? 'border-r border-gray-100' : ''
                            }`}
                          >
                            <span className="text-sm font-medium text-gray-600">{spec.label}</span>
                            <span className="text-sm font-semibold text-gray-800">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews" className="mt-6">
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-semibold text-sm">
                                {review.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-800">{review.name}</p>
                                <p className="text-xs text-gray-500">{review.date}</p>
                              </div>
                            </div>
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>
                        </div>
                      ))}

                      <Button className="w-full bg-teal-600 hover:bg-teal-700 h-12 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        সব রিভিউ দেখুন
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related books */}
      <section className="bg-white py-12 border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">সম্পর্কিত বই</h2>
            <Link 
              href="/books" 
              className="text-teal-600 hover:text-teal-700 font-medium text-sm hover:underline transition-colors duration-200"
            >
              সব বই দেখুন →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {relatedBooks.map((book) => (
              <Link key={book.id} href={`/books/${book.id}`} className="group">
                <div className="space-y-3">
                  <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm group-hover:shadow-lg transition-all duration-300">
                    <Image
                      src={book.image}
                      alt={book.title}
                      width={180}
                      height={250}
                      className="h-auto w-full transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-gray-800 group-hover:text-teal-600 transition-colors duration-200 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-xs text-gray-600">{book.author}</p>
                    <p className="text-sm font-bold text-teal-600">
                      ৳{book.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
