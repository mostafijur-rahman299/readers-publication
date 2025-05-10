"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface Testimonial {
  id: number
  content: string
  author: string
  role: string
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextSlide = () => {
    setActiveIndex((current) => (current === testimonials.length - 1 ? 0 : current + 1))
  }

  const prevSlide = () => {
    setActiveIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="min-w-full px-4">
              <Card className="border-none bg-transparent text-white">
                <CardContent className="pt-6">
                  <Quote className="mb-4 h-10 w-10 text-red-500" />
                  <p className="mb-6 text-xl italic leading-relaxed">{testimonial.content}</p>
                </CardContent>
                <CardFooter className="flex-col items-start border-t border-slate-700 pt-6">
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-sm text-slate-300">{testimonial.role}</p>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 flex justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full border-slate-700 text-white hover:bg-slate-800 hover:text-white"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous slide</span>
        </Button>
        <div className="flex items-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${
                activeIndex === index ? "bg-white" : "bg-slate-700 hover:bg-slate-500"
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <span className="sr-only">Go to slide {index + 1}</span>
            </button>
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full border-slate-700 text-white hover:bg-slate-800 hover:text-white"
          onClick={nextSlide}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>
    </div>
  )
}
