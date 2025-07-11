import { Clock, HeartIcon, ShoppingCartIcon, TrashIcon } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Package } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

const Wishlist = () => {

    // Mock wishlist data
  const wishlist = [
    {
      id: 1,
      title: "নীল জোসনা",
      author: "হুমায়ূন আহমেদ",
      price: "৳ ৩৫০",
      image: "/placeholder.svg?height=120&width=80&text=Book1",
    },
    {
      id: 2,
      title: "পথের পাঁচালী",
      author: "বিভূতিভূষণ বন্দ্যোপাধ্যায়",
      price: "৳ ২৮০",
      image: "/placeholder.svg?height=120&width=80&text=Book2",
    },
    {
      id: 3,
      title: "ফেলুদা সমগ্র",
      author: "সত্যজিৎ রায়",
      price: "৳ ৫৫০",
      image: "/placeholder.svg?height=120&width=80&text=Book3",
    },
  ]

    const t = useTranslations("profile.wishlist")
    return (
        <div className="rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">{t("title")}</h2>
                <Button variant="outline" size="sm">
                    <Clock className="mr-1 h-4 w-4" />
                    {t("recent")}
                </Button>
            </div>

            {wishlist.length > 0 ? (
                <div className="space-y-4">
                    {wishlist.map((item) => (
                        <div
                            key={item.id}
                            className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 transition-all hover:shadow-md"
                        >
                            <div className="flex items-center">
                                <div className="relative mr-4 h-20 w-14 overflow-hidden rounded-md border border-gray-200">
                                    <Image
                                        src={item.image || "/placeholder.svg"}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900 group-hover:text-brand-600">{item.title}</h3>
                                    <p className="text-sm text-gray-500">{item.author}</p>
                                    <p className="mt-1 font-medium text-brand-600">{item.price}</p>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <Button size="sm" className="bg-brand-600 hover:bg-brand-700">
                                    <ShoppingCartIcon className="h-4 w-4" />
                                    <span>{t("add_to_cart")}</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                                >
                                    <TrashIcon className="h-4 w-4" />
                                    <span>{t("remove")}</span>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 rounded-full bg-gray-100 p-6">
                        <HeartIcon className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="mb-2 text-lg font-medium">{t("no_wishlist")}</h3>
                    <p className="mb-6 max-w-md text-gray-500">
                        {t("no_wishlist_message")}
                    </p>
                    <Button className="bg-brand-600 hover:bg-brand-700">
                        <Link href="/books">{t("browse_books")}</Link>
                    </Button>
                </div>
            )}
        </div>
    )
}

export default Wishlist