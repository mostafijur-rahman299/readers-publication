"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRef, useState, useEffect } from "react"

export function NewsGrid() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Sample book data
  const books = [
    {
      id: 1,
      title: "নীল জোসনা",
      author: "হুমায়ূন আহমেদ",
      price: 350,
      originalPrice: 400,
      rating: 4.5,
      isNew: true,
      discount: 15,
    },
    {
      id: 2,
      title: "পথের পাঁচালী",
      author: "বিভূতিভূষণ বন্দ্যোপাধ্যায়",
      price: 280,
      originalPrice: 320,
      rating: 4.8,
      isNew: false,
      discount: 12,
    },
    {
      id: 3,
      title: "ফেলুদা সমগ্র",
      author: "সত্যজিৎ রায়",
      price: 550,
      originalPrice: 600,
      rating: 4.7,
      isNew: true,
      discount: 8,
    },
    {
      id: 4,
      title: "শেষের কবিতা",
      author: "রবীন্দ্রনাথ ঠাকুর",
      price: 250,
      originalPrice: 300,
      rating: 4.9,
      isNew: false,
      discount: 17,
    },
    {
      id: 5,
      title: "দেবী চৌধুরানী",
      author: "বঙ্কিমচন্দ্র চট্টোপাধ্যায়",
      price: 220,
      originalPrice: 250,
      rating: 4.3,
      isNew: false,
      discount: 12,
    },
    {
      id: 6,
      title: "আরণ্যক",
      author: "বিভূতিভূষণ বন্দ্যোপাধ্যায়",
      price: 300,
      originalPrice: 350,
      rating: 4.6,
      isNew: true,
      discount: 14,
    },
    {
      id: 7,
      title: "গোরা",
      author: "রবীন্দ্রনাথ ঠাকুর",
      price: 320,
      originalPrice: 380,
      rating: 4.4,
      isNew: false,
      discount: 16,
    },
    {
      id: 8,
      title: "চোখের বালি",
      author: "রবীন্দ্রনাথ ঠাকুর",
      price: 290,
      originalPrice: 340,
      rating: 4.7,
      isNew: true,
      discount: 15,
    },
  ]

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || 200
      const gap = 16 // 1rem gap
      const scrollAmount = cardWidth + gap
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount * 2, // Scroll 2 cards at a time
        behavior: "smooth",
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || 200
      const gap = 16 // 1rem gap
      const scrollAmount = cardWidth + gap
      scrollContainerRef.current.scrollBy({
        left: scrollAmount * 2, // Scroll 2 cards at a time
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      checkScrollButtons()
      container.addEventListener("scroll", checkScrollButtons)
      window.addEventListener("resize", checkScrollButtons)

      return () => {
        container.removeEventListener("scroll", checkScrollButtons)
        window.removeEventListener("resize", checkScrollButtons)
      }
    }
  }, [])

  return (
    <div className="relative w-full">
      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className={`absolute left-2 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl ${
          !canScrollLeft ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
        }`}
        onClick={scrollLeft}
        disabled={!canScrollLeft}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className={`absolute right-2 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl ${
          !canScrollRight ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
        }`}
        onClick={scrollRight}
        disabled={!canScrollRight}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Carousel Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth px-4 py-2 scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitScrollbar: { display: "none" },
        }}
      >
        {books.map((book) => (
          <Link key={book.id} href={`/books/${book.id}`} className="group flex-none">
            <div className="relative w-36 sm:w-40 md:w-44 lg:w-48 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={`/placeholder.svg?height=300&width=200&text=Book${book.id}`}
                  alt={book.title}
                  fill
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {book.isNew && (
                  <Badge className="absolute left-2 top-2 bg-red-500 text-white text-xs px-2 py-1">নতুন</Badge>
                )}
                {book.discount > 0 && (
                  <Badge className="absolute right-2 top-2 bg-blue-500 text-white text-xs px-2 py-1">
                    -{book.discount}%
                  </Badge>
                )}
              </div>

              <div className="p-3 space-y-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(book.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-xs text-gray-600 font-medium">{book.rating}</span>
                </div>

                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight transition-colors group-hover:text-blue-600">
                  {book.title}
                </h3>

                <p className="text-xs text-gray-600 line-clamp-1">{book.author}</p>

                <div className="flex items-center gap-2 pt-1">
                  <span className="text-sm font-bold text-blue-600">৳ {book.price}</span>
                  {book.originalPrice > book.price && (
                    <span className="text-xs text-gray-500 line-through">৳ {book.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default NewsGrid
