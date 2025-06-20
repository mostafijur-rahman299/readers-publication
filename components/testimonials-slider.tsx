"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Star, Quote } from "lucide-react"
import { API_ENDPOINTS } from "@/constants/apiEnds"
import { useEffect, useState } from "react"
import useHttp from "@/hooks/useHttp"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { useLocale, useTranslations } from "next-intl"

export function TestimonialsSlider() {
  const {sendRequests: fetchTestimonials, isLoading} = useHttp()
  const [testimonials, setTestimonials] = useState<any[]>([])
  const locale = useLocale()
  const t = useTranslations("home")

  useEffect(() => {
    fetchTestimonials({
      url_info: {
        url: API_ENDPOINTS.TESTIMONIALS,
      }
    }, (res: any) => {
      setTestimonials(res)
    })
  }, [])

  if (isLoading) return <div>Loading...</div>

  if (testimonials.length === 0) return null

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("testimonials_section_title")}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("testimonials_section_subtitle")}</p>
        </div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Avatar>
                        <AvatarImage src={testimonial.image_url} size={40}/>
                        <AvatarFallback name={testimonial.name} size={40}/>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-lg text-gray-900">{locale === "bn" && testimonial.name_bn ? testimonial.name_bn : testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{locale === "bn" && testimonial.city_bn ? testimonial.city_bn : testimonial.city}</p>
                        {/* <p className="text-xs text-blue-600 font-medium">{testimonial.purchasedBooks} টি বই কিনেছেন</p> */}
                      </div>
                    </div>

                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="relative">
                      <Quote className="absolute -top-2 -left-1 w-6 h-6 text-blue-200" />
                      <p className="text-gray-700 leading-relaxed pl-6 italic">"{locale === "bn" && testimonial.comment_bn ? testimonial.comment_bn : testimonial.comment}"</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 bg-white shadow-lg border-2" />
          <CarouselNext className="right-0 bg-white shadow-lg border-2" />
        </Carousel>

        {/* <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">আপনিও আমাদের সাথে আপনার অভিজ্ঞতা শেয়ার করুন</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            রিভিউ লিখুন
          </button>
        </div> */}
      </div>
    </div>
  )
}
