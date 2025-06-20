"use client"

import Image from "next/image"
import Link from "next/link"
import { CircleNav } from "@/components/circle-nav"
import { MainCarousel } from "@/components/main-carousel"
import { NewsGrid } from "@/components/news-grid"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { SpecialOffersCarousel } from "@/components/special-offers-carousel"
import { ArticlesSection } from "@/components/articles-section"
import { TestimonialsSlider } from "@/components/testimonials-slider"
import { useEffect, useState } from "react"
import useHttp from "@/hooks/useHttp"
import { API_ENDPOINTS } from "@/constants/apiEnds"
import { useTranslations } from "next-intl"
import { useDispatch, useSelector } from "react-redux"
import { setGeneralData } from "@/store/generalData"

export default function Home() {
  const dispatch = useDispatch()
  const t = useTranslations("home")
  const [categories, setCategories] = useState<any[]>([])
  const [carouselItems, setCarouselItems] = useState<any[]>([])
  const [advertisementItems, setAdvertisementItems] = useState<any[]>([])
  const {sendRequests: fetchCategories, isLoading} = useHttp()
  const {sendRequests: fetchCarousel, isLoading: isCarouselLoading} = useHttp()
  const {sendRequests: fetchGeneralData} = useHttp()
  const generalData = useSelector((state: any) => state.generalData.generalData)

  // Fetch categories
  useEffect(() => {
    fetchCategories({
      url_info:{
        url: API_ENDPOINTS.CATEGORIES + "?is_featured=true",
      }
    }, (res: any) => {
      setCategories(res)
    })
  }, [])

  // Fetch carousel
  useEffect(() => {
    fetchCarousel({
      url_info: {
        url: API_ENDPOINTS.HOME_CAROUSEL,
      }
    }, (res: any) => {
      setCarouselItems(res.filter((item: any) => !item.is_advertise))
      setAdvertisementItems(res.filter((item: any) => item.is_advertise))
    })

    fetchGeneralData({
      url_info: {
        url: API_ENDPOINTS.GENERAL_DATA,
      }
    }, (res: any) => {
      dispatch(setGeneralData(res))
    })
  }, [])

  return (
    <main className="min-h-screen bg-white">
      {/* Header with logo, search and icons */}
      <Header />

      {/* Main navigation */}
      <Navigation />

      {/* Circle navigation */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {isLoading
              ? Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center animate-pulse"
                  >
                    <div className="mb-2 h-20 w-20 rounded-full bg-gray-200" />
                    <div className="h-4 w-16 rounded bg-gray-200" />
                  </div>
                ))
              : (
                <>
                  {categories.map((category) => (
                    <CircleNav
                      key={category.slug}
                      title={category.name}
                      title_bn={category.name_bn}
                      imageUrl={category.image_url}
                    />
                  ))}
                  <CircleNav
                    title="More View"
                    title_bn="আরও দেখুন"
                    imageUrl="/menu.png"
                    className="bg-brand-100"
                  />
                </>
              )}
          </div>
        </div>
      </section>

      {/* Main carousel */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <MainCarousel carouselItems={carouselItems} isLoading={isCarouselLoading} />
            </div>

            {/* Advertisement section */}
            <div className="space-y-6">
              {advertisementItems.map((item: any, index: number) => (
              <div key={index} className="group overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg h-[187px]">
                <Image
                  src={item.image_url}
                  alt="Advertisement"
                  width={400}
                  height={187}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      

      {/* Featured section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">নতুন প্রকাশিত বই</h2>
            {/* <Link href="/books/new" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              সব দেখুন →
            </Link> */}
          </div>
          <NewsGrid />
          <NewsGrid />
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">জনপ্রিয় বই</h2>
            {/* <Link href="/books/new" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              সব দেখুন →
            </Link> */}
          </div>
          <NewsGrid />
        </div>
      </section>

      {/* Special Offers Carousel */}
      {/* <section className="py-12">
        <div className="container mx-auto px-4">
          <SpecialOffersCarousel />
        </div>
      </section> */}

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">শীঘ্রই আসছে...</h2>
            {/* <Link href="/books/new" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              সব দেখুন →
            </Link> */}
          </div>
          <NewsGrid />
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <ArticlesSection generalData={generalData?.articles_section} />
        </div>
      </section>

      {/* Testimonials Slider */}
      <TestimonialsSlider />
    </main>
  )
}
