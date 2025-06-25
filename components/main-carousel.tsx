"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLocale } from "next-intl"

export function MainCarousel({ carouselItems, isLoading }: { carouselItems: any[], isLoading: boolean }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const locale = useLocale()

  const nextSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1))
      setTimeout(() => setIsAnimating(false), 500)
    }
  }, [isAnimating, carouselItems.length])

  const prevSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentSlide((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1))
      setTimeout(() => setIsAnimating(false), 500)
    }
  }, [isAnimating, carouselItems.length])

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <div className="relative h-[385px] overflow-hidden rounded-lg shadow-md">

      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {carouselItems.map((slide: any, index: number) => (
          <div key={index} className="relative min-w-full">
            <Image
              src={slide.image_url}
              alt={`Slide ${index + 1}`}
              fill
              className="h-full w-full object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h2 className="mb-2 text-2xl font-bold">{locale === "bn" && slide.title_bn ? slide.title_bn : slide.title}</h2>
              <p className="text-lg">{locale === "bn" && slide.subtitle_bn ? slide.subtitle_bn : slide.subtitle}</p>
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
        {carouselItems.map((_: any, index: number ) => (
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
