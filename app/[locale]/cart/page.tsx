"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { useLocale, useTranslations } from "next-intl"
import useHttp from "@/hooks/useHttp"
import { API_ENDPOINTS } from "@/constants/apiEnds"

export default function CartPage() {
  const t = useTranslations("cart")
  const locale = useLocale()

  const [selected, setSelected] = useState<number[]>([])
  const [cartItems, setCartItems] = useState<any[]>([])
  const allSelected = selected.length === cartItems.length && cartItems.length > 0
  const {sendRequests: fetchCartItems} = useHttp()

  const DELIVERY_CHARGE = 60

  useEffect(() => {
    fetchCartItems({
      url_info:{
        url: API_ENDPOINTS.CART_LIST,
      },
    }, (response: any) => {
      setCartItems(response)
    })
  }, [])

  const updateQuantity = (id: number, delta: number) => {
    // setCart((prev) =>
    //   prev.map((item) => (item.uuid === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item)),
    // )
  }

  const removeItem = (id: number) => {
    // setCart((prev) => prev.filter((item) => item.uuid !== id))
    setSelected((prev) => prev.filter((selId) => selId !== id))
  }

  const handleSelect = (id: number) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((selId) => selId !== id) : [...prev, id]))
  }

  const handleSelectAll = () => {
    setSelected(allSelected ? [] : cartItems.map((item) => item.uuid))
  }

  const subtotal = cartItems
    .filter((item) => selected.includes(item.uuid))
    .reduce((sum, item) => sum + item.book_details.discounted_price * item.quantity, 0)

  const originalSubtotal = cartItems
    .filter((item) => selected.includes(item.uuid))
    .reduce((sum, item) => sum + item.book_details.price * item.quantity, 0)

  const totalSavings = originalSubtotal - subtotal
  const total = subtotal + (selected.length > 0 ? DELIVERY_CHARGE : 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <Navigation />

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 max-w-7xl">
        {/* <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{t("title") || "Shopping Cart"}</h1>
          <p className="text-sm sm:text-base text-gray-600">
            {cart.length} {cart.length === 1 ? t("item") : t("items")} {t("in_your_cart") || "in your cart"}
          </p>
        </div> */}

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-3 xl:col-span-2 space-y-3 sm:space-y-4">
              {/* Select All */}
              <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200">
                <label className="flex items-center gap-2 sm:gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleSelectAll}
                    className="h-4 w-4 sm:h-5 sm:w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500 focus:ring-offset-0"
                  />
                  <span className="text-sm sm:text-base font-semibold text-gray-900">
                    {t("select_all") || "Select All"}
                  </span>
                  <span className="ml-auto text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 sm:px-3 py-1 rounded-full">
                    {selected.length} / {cartItems.length}
                  </span>
                </label>
              </div>

              {/* Cart Items */}
              {cartItems.map((item) => (
                <div
                  key={item.uuid}
                  className={`bg-white rounded-lg sm:rounded-xl shadow-sm border-2 transition-all duration-200 hover:shadow-md ${
                    selected.includes(item.uuid)
                      ? "border-teal-200 bg-teal-50/30"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="p-3 sm:p-4 lg:p-5">
                    <div className="flex gap-3 sm:gap-4">
                      {/* Checkbox and Image */}
                      <div className="flex items-start gap-2 sm:gap-3 flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={selected.includes(item.uuid)}
                          onChange={() => handleSelect(item.uuid)}
                          className="h-4 w-4 sm:h-5 sm:w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500 focus:ring-offset-0 mt-1"
                        />
                        <div className="relative group">
                          <img
                            src={item.cover_image || "/images/book-skeleton.jpg"}
                            alt={item.book_details.title}
                            className="h-20 w-16 sm:h-24 sm:w-18 lg:h-28 lg:w-20 object-cover rounded-md border border-gray-200 shadow-sm transition-transform duration-200 group-hover:scale-105"
                          />
                          {item.book_details.discounted_price < item.book_details.price && (
                            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                              {((item.book_details.discounted_price - item.book_details.price) / item.book_details.price * 100).toFixed(2)}%
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-1 line-clamp-2 leading-tight">
                              {locale === "en" ? item.book_details.title : item.book_details.title_bn}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 mb-2">by {locale === "en" ? item.author_details.name : item.author_details.name_bn}</p>

                            {/* Pricing */}
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-base sm:text-lg lg:text-xl font-bold text-teal-600">
                                ৳{item.book_details.discounted_price.toFixed(2)}
                              </span>
                              {item.book_details.price > item.book_details.discounted_price && (
                                <span className="text-xs sm:text-sm text-red-500 line-through font-medium">
                                  ৳{item.book_details.price.toFixed(2)}
                                </span>
                              )}
                              {item.book_details.discounted_price < item.book_details.price && (
                                <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-semibold">
                                  Save {((item.book_details.price - item.book_details.discounted_price) / item.book_details.price * 100).toFixed(2)}%
                                </span>
                              )}
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 sm:gap-3">
                              <span className="text-xs sm:text-sm font-medium text-gray-700">{t("qty") || "Qty:"}</span>
                              <div className="flex items-center bg-gray-100 rounded-md">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-7 w-7 sm:h-8 sm:w-8 rounded-md hover:bg-gray-200 p-0"
                                  onClick={() => updateQuantity(item.uuid, -1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                                </Button>
                                <span className="w-8 sm:w-10 text-center text-sm sm:text-base font-semibold text-gray-900">
                                  {item.quantity}
                                </span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-7 w-7 sm:h-8 sm:w-8 rounded-md hover:bg-gray-200 p-0"
                                  onClick={() => updateQuantity(item.uuid, 1)}
                                >
                                  <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Total and Remove */}
                          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2">
                            <div className="text-right">
                              <div className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">
                                ৳{(item.book_details.discounted_price * item.quantity).toFixed(2)}
                              </div>
                              {item.book_details.price > item.book_details.discounted_price && (
                                <div className="text-xs text-red-500 line-through">
                                  ৳{(item.book_details.price * item.quantity).toFixed(2)}
                                </div>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 h-7 sm:h-8 px-2 sm:px-3"
                              onClick={() => removeItem(item.uuid)}
                            >
                              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
                              <span className="hidden sm:inline text-xs">{t("remove")}</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 xl:col-span-1">
              <div className="sticky top-20 sm:top-24">
                <div className="bg-white rounded-lg sm:rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-4 sm:px-5 py-3 sm:py-4">
                    <h2 className="text-base sm:text-lg font-bold text-white">{t("summary") || "Order Summary"}</h2>
                  </div>

                  <div className="p-4 sm:p-5">
                    <div className="space-y-3 mb-4 sm:mb-6">
                      <div className="flex justify-between text-sm sm:text-base text-gray-700">
                        <span>{t("subtotal") || "Subtotal"}</span>
                        <span className="font-semibold">৳{subtotal.toFixed(2)}</span>
                      </div>

                      {totalSavings > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>{t("total_savings")}</span>
                          <span className="font-semibold">-৳{totalSavings.toFixed(2)}</span>
                        </div>
                      )}

                      {originalSubtotal > subtotal && (
                        <div className="flex justify-between text-xs sm:text-sm text-gray-500">
                          <span>{t("original_price")}</span>
                          <span className="line-through text-red-500">৳{originalSubtotal.toFixed(2)}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-sm sm:text-base text-gray-700">
                        <span>{t("delivery_charge")}</span>
                        <span className="font-semibold">
                          ৳{selected.length > 0 ? DELIVERY_CHARGE.toFixed(2) : "0.00"}
                        </span>
                      </div>

                      <div className="border-t pt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-base sm:text-lg font-bold text-gray-900">{t("total")}</span>
                          <span className="text-lg sm:text-xl lg:text-2xl font-bold text-teal-600">
                            ৳{total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full h-10 sm:h-12 text-sm sm:text-base font-semibold bg-teal-600 hover:bg-teal-700 rounded-lg shadow-md transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      asChild
                      disabled={selected.length === 0}
                    >
                      <Link href={`/${locale}/checkout`}>{t("order_now")}</Link>
                    </Button>

                    {selected.length === 0 && (
                      <p className="text-xs sm:text-sm text-gray-500 text-center mt-2 sm:mt-3">
                        {t("please_select_items_to_proceed")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart State */
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 py-12 sm:py-16">
            <div className="text-center max-w-md mx-auto px-4">
              <div className="bg-gray-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <ShoppingCart className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-gray-400" />
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">
                {t("empty") || "Your cart is empty"}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                {t("empty_cart_description")}
              </p>
              <Button
                asChild
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold shadow-md transition-all duration-200 text-sm sm:text-base"
              >
                <Link href="/shop">{t("go_shopping") || "Start Shopping"}</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
