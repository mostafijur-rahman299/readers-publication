"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const specialOffers = [
  {
    id: 1,
    title: "বিশেষ ছাড় - ৫০% পর্যন্ত",
    description: "সকল উপন্যাস বইয়ে বিশেষ ছাড়",
    discount: "৫০% ছাড়",
    image: "/placeholder.svg?height=300&width=400",
    originalPrice: "৮০০ টাকা",
    discountedPrice: "৪০০ টাকা",
  },
  {
    id: 2,
    title: "নতুন লেখকদের বই",
    description: "নতুন লেখকদের বইয়ে বিশেষ অফার",
    discount: "৩০% ছাড়",
    image: "/placeholder.svg?height=300&width=400",
    originalPrice: "৬০০ টাকা",
    discountedPrice: "৪২০ টাকা",
  },
  {
    id: 3,
    title: "কবিতার বই সংগ্রহ",
    description: "সকল কবিতার বইয়ে মেগা অফার",
    discount: "৪০% ছাড়",
    image: "/placeholder.svg?height=300&width=400",
    originalPrice: "৫০০ টাকা",
    discountedPrice: "৩০০ টাকা",
  },
]

export function SpecialOffersCarousel() {
  return (
    <Card className="overflow-hidden shadow-lg">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">বিশেষ অফার</h2>
          <p className="text-orange-100">সীমিত সময়ের জন্য বিশেষ ছাড়</p>
        </div>

        <div className="p-6">
          <Carousel className="w-full">
            <CarouselContent>
              {specialOffers.map((offer) => (
                <CarouselItem key={offer.id} className="md:basis-1/2">
                  <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="relative">
                        <Image
                          src={offer.image || "/placeholder.svg"}
                          alt={offer.title}
                          width={400}
                          height={300}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <Badge className="absolute top-3 right-3 bg-red-500 hover:bg-red-600">{offer.discount}</Badge>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2">{offer.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{offer.description}</p>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-green-600">{offer.discountedPrice}</span>
                            <span className="text-sm text-gray-500 line-through">{offer.originalPrice}</span>
                          </div>
                        </div>
                        <Button className="w-full bg-orange-500 hover:bg-orange-600">এখনই কিনুন</Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </CardContent>
    </Card>
  )
}
