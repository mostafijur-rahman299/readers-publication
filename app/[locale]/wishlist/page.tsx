"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, Trash2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { useLocale, useTranslations } from 'next-intl'

type Book = {
  id: number
  title: string
  author: string
  cover: string
  price: string
}

export default function WishlistPage() {
  const t = useTranslations('wishlist')
  const currentLocale = useLocale()

  const [wishlist, setWishlist] = useState<Book[]>([
    {
      id: 1,
      title: "Deep Work",
      author: "Cal Newport",
      cover: "/books/deep-work.jpg",
      price: "$14.99"
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      cover: "/books/atomic-habits.jpg",
      price: "$18.50"
    }
  ])

  const handleRemove = (id: number) => {
    setWishlist(wishlist.filter(book => book.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 text-center">
            <Heart className="mx-auto h-8 w-8 text-brand-600 mb-2" />
            <h1 className="text-3xl font-bold">{t('title')}</h1>
            <p className="text-gray-600 text-sm">{t('description')}</p>
          </div>

          {wishlist.length > 0 ? (
            <div className="space-y-6">
              {wishlist.map(book => (
                <div
                  key={book.id}
                  className="flex items-center gap-4 bg-white rounded-lg shadow-sm p-4"
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="h-24 w-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{book.title}</h2>
                    <p className="text-sm text-gray-500">{book.author}</p>
                    <p className="text-sm font-medium mt-1">{book.price}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="default" size="sm" className="flex gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      {t('add_to_cart')}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemove(book.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      {t('remove')}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-10">
              <p>{t('empty')}</p>
              <Link
                href={`/${currentLocale}/shop`}
                className="inline-block mt-4 text-brand-600 hover:underline"
              >
                {t('go_shopping')}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
