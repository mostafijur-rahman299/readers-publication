"use client"

import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import Image from "next/image"
import { useTranslations } from "next-intl"

const packages = [
  {
    id: 1,
    image: "/images/package1.jpg",
  },
  {
    id: 2,
    image: "/images/package2.jpg",
  },
  {
    id: 3,
    image: "/images/package3.jpg",
  },
  {
    id: 4,
    image: "/images/package4.jpg",
  },
  // Add more package items as needed
]

export default function SpecialPackagesPage() {
  const t = useTranslations("special_package")

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
          <p className="mt-2 text-sm text-gray-600">{t("description")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {packages.map((pkg) => (
            <div key={pkg.id} className="rounded-lg overflow-hidden shadow-md bg-white">
              <Image
                src={pkg.image}
                alt={`Package ${pkg.id}`}
                width={600}
                height={400}
                className="w-full h-80 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
