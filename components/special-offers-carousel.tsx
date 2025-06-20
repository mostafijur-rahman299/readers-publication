"use client"

import { useState } from "react"

import { useEffect, useRef } from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

const specialOffers = [
  {
    id: 1,
    image: "/banner-ex2.avif",
  },
  {
    id: 2,
    image: "/home-banner-ex.avif",
  }
]

export function SpecialOffersCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (!api) return

    const startAutoScroll = () => {
      intervalRef.current = setInterval(() => {
        api.scrollNext()
      }, 3000) // Auto scroll every 3 seconds
    }

    const stopAutoScroll = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    startAutoScroll()

    // Pause auto scroll on hover
    const container = api.rootNode()
    container.addEventListener("mouseenter", stopAutoScroll)
    container.addEventListener("mouseleave", startAutoScroll)

    return () => {
      stopAutoScroll()
      container.removeEventListener("mouseenter", stopAutoScroll)
      container.removeEventListener("mouseleave", startAutoScroll)
    }
  }, [api])

  return (
    <div className="w-full">
      <Carousel
        className="w-full"
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {specialOffers.map((offer) => (
            <CarouselItem key={offer.id} className="basis-full md:basis-1/2">
              <div className="p-1">
                <Image
                  src={offer.image || "/placeholder.svg"}
                  alt={`Special offer ${offer.id}`}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  )
}
