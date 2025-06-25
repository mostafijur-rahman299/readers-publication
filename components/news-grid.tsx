"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, ChevronLeft, ChevronRight, BookOpen, Clock, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRef, useState, useEffect } from "react"

export function NewsGrid({ book_type, books }: { book_type: string, books: any[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [isScrollable, setIsScrollable] = useState(false)

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
      setIsScrollable(scrollWidth > clientWidth)
    }
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || 200
      const gap = 16
      const scrollAmount = cardWidth + gap
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount * 3,
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
        left: scrollAmount * 3,
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
      {books.length > 0 && isScrollable && (
        <Button
          variant="outline"
          size="icon"
          className={`absolute -left-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl ${!canScrollLeft ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      )}

      {books.length > 0 && isScrollable && (
        <Button
          variant="outline"
          size="icon"
          className={`absolute -right-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl ${!canScrollRight ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      )}

      {/* Carousel Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth px-4 py-4 scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitScrollbar: { display: "none" },
        }}
      >
        {books.length === 0 && (
          <div className="flex items-center justify-center w-full min-h-[360px]">
            <p className="text-gray-500 text-base font-medium">No books found</p>
          </div>
        )}
        
        {books.map((book) => (
          <Link key={book.id} href={`/books/${book.id}`} className="group flex-none">
            <div className="relative h-[360px] w-56 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:border-gray-200 hover:shadow-md hover:-translate-y-1">
              <div className="relative h-[220px] w-full bg-gray-50">
                <Image
                  src={book.cover_image ? book.cover_image : "/images/book-skeleton.jpg"}
                  alt={book.title}
                  fill
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 224px) 100vw, 224px"
                  priority
                />
                {book.isNew && (
                  <Badge className="absolute left-2 top-2 bg-red-500/90 text-white text-xs px-2 py-1 shadow-sm backdrop-blur-sm">নতুন</Badge>
                )}
                {book.discount > 0 && (
                  <Badge className="absolute right-2 top-2 bg-blue-500/90 text-white text-xs px-2 py-1 shadow-sm backdrop-blur-sm">
                    -{book.discount}%
                  </Badge>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < Math.floor(book.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
                      />
                    ))}
                    <span className="ml-1 text-xs text-gray-500">{book.rating}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Heart className="h-3.5 w-3.5" />
                    <BookOpen className="h-3.5 w-3.5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-gray-900 leading-tight transition-colors group-hover:text-blue-600 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-xs font-medium text-gray-600 line-clamp-1">
                    {book.author_name}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-bold text-blue-600">৳{book.price}</span>
                    {book.originalPrice > book.price && (
                      <span className="text-xs font-medium text-gray-400 line-through">
                        ৳{book.originalPrice}
                      </span>
                    )}
                  </div>
                  {book.stock_status && (
                    <div className="flex items-center gap-1 text-xs font-medium">
                      <Clock className="h-3 w-3 text-green-500" />
                      <span className="text-green-600">{book.stock_status}</span>
                    </div>
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