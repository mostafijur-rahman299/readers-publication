"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRef, useState, useEffect } from "react"

export function NewsGrid({ book_type, books }: { book_type: string, books: any[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

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
      const gap = 16
      const scrollAmount = cardWidth + gap
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount * 2,
        behavior: "smooth",
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || 200
      const gap = 16
      const scrollAmount = cardWidth + gap
      scrollContainerRef.current.scrollBy({
        left: scrollAmount * 2,
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
      {books.length > 0 && (
        <Button
          variant="outline"
          size="icon"
          className={`absolute left-0 top-1/2 z-10 h-12 w-12 -translate-y-1/2 rounded-full bg-white/80 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl ${
            !canScrollLeft ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
          }`}
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      )}

      {books.length > 0 && (
        <Button
          variant="outline"
          size="icon"
          className={`absolute right-0 top-1/2 z-10 h-12 w-12 -translate-y-1/2 rounded-full bg-white/80 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl ${
            !canScrollRight ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
          }`}
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      )}

      {/* Carousel Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scroll-smooth px-8 py-6 scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitScrollbar: { display: "none" },
        }}
      >
        {books.length === 0 && (
          <div className="flex items-center justify-center w-full min-h-[420px]">
            <p className="text-gray-500 text-base font-medium">No books found</p>
          </div>
        )}
        
        {books.map((book) => (
          <Link key={book.id} href={`/books/${book.id}`} className="group flex-none">
            <div className="relative h-[480px] w-72 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
              <div className="relative h-[320px] w-full">
                <Image
                  src={book.cover_image}
                  alt={book.title}
                  fill
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 288px) 100vw, 288px"
                  priority
                />
                {book.isNew && (
                  <Badge className="absolute left-4 top-4 bg-red-500 text-white text-sm px-3 py-1.5 shadow-md">নতুন</Badge>
                )}
                {book.discount > 0 && (
                  <Badge className="absolute right-4 top-4 bg-blue-500 text-white text-sm px-3 py-1.5 shadow-md">
                    -{book.discount}%
                  </Badge>
                )}
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(book.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">{book.rating}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-gray-900 leading-tight transition-colors group-hover:text-blue-600 min-h-[2.5rem] line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-sm font-medium text-gray-600 line-clamp-1">
                    {book.author}
                  </p>
                </div>

                <div className="flex items-center">
                  <span className="text-base font-bold text-blue-600">৳{book.price}</span>
                  {book.originalPrice > book.price && (
                    <span className="text-sm font-medium text-gray-400 line-through">
                      ৳{book.originalPrice}
                    </span>
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