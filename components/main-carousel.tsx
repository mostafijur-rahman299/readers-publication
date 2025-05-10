"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function MainCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const slides = [
    {
      image: "/placeholder.svg?height=400&width=800",
      title: "নতুন প্রকাশিত বইসমূহ",
      description: "সাম্প্রতিক প্রকাশিত সেরা বইগুলো এখনই কিনুন",
    },
    {
      image: "/placeholder.svg?height=400&width=800",
      title: "বিশেষ অফার",
      description: "সকল বইয়ে ২০% পর্যন্ত ছাড়",
    },
    {
      image: "/placeholder.svg?height=400&width=800",
      title: "শিশুদের জন্য বিশেষ সংগ্রহ",
      description: "আপনার সন্তানের জন্য সেরা বইসমূহ",
    },
  ]

  const nextSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
      setTimeout(() => setIsAnimating(false), 500)
    }
  }, [isAnimating, slides.length])

  const prevSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
      setTimeout(() => setIsAnimating(false), 500)
    }
  }, [isAnimating, slides.length])

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <div className="relative h-[400px] overflow-hidden rounded-lg shadow-md">
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative min-w-full">
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={`Slide ${index + 1}`}
              fill
              className="h-full w-full object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h2 className="mb-2 text-2xl font-bold">{slide.title}</h2>
              <p className="text-lg">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-brand-500"
        disabled={isAnimating}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-brand-500"
        disabled={isAnimating}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true)
                setCurrentSlide(index)
                setTimeout(() => setIsAnimating(false), 500)
              }
            }}
            className={`h-2 w-8 rounded-full transition-all ${
              currentSlide === index ? "bg-white" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            disabled={isAnimating}
          />
        ))}
      </div>
    </div>
  )
}
