"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { useLocale, useTranslations } from "next-intl"

type CartItem = {
  id: number
  title: string
  author: string
  cover: string
  price: number
  quantity: number
}

export default function CartPage() {
  const t = useTranslations('cart')
  const locale = useLocale()

  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 1,
      title: "Deep Work",
      author: "Cal Newport",
      cover: "/books/deep-work.jpg",
      price: 14.99,
      quantity: 1,
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      cover: "/books/atomic-habits.jpg",
      price: 18.5,
      quantity: 2,
    }
  ])

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <ShoppingCart className="mx-auto h-10 w-10 text-brand-600 mb-3" />
            <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
            <p className="text-gray-600 text-sm">{t('description')}</p>
          </div>

          {cart.length > 0 ? (
            <>
              <div className="space-y-6">
                {cart.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center bg-white rounded-xl shadow-md p-6 gap-6 hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="h-32 w-24 object-cover rounded-lg shadow-sm"
                    />
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-900">{item.title}</h2>
                      <p className="text-sm text-gray-500 mt-1">{item.author}</p>
                      <p className="mt-2 font-medium text-brand-600">${item.price.toFixed(2)}</p>
                      <div className="mt-3 flex items-center gap-3">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="w-8 h-8 p-0"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          -
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <Button 
                          size="sm"
                          variant="outline" 
                          className="w-8 h-8 p-0"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-4">
                      <p className="font-semibold text-lg text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        {t('remove')}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-between items-center bg-white rounded-xl shadow-md p-8">
                <div>
                  <p className="text-lg font-medium text-gray-600">{t('subtotal')}</p>
                  <p className="text-3xl font-bold text-gray-900">${subtotal.toFixed(2)}</p>
                </div>
                <Button className="px-8 py-3 text-lg bg-brand-600 hover:bg-brand-700" asChild>
                  <Link href={`/${locale}/checkout`}>
                    {t('checkout')}
                  </Link>
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 mt-10">
              <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg">{t('empty')}</p>
              <Link 
                href="/shop" 
                className="inline-block mt-4 text-brand-600 hover:text-brand-700 font-medium"
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
