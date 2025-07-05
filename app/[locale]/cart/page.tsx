"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ShoppingCart, Trash2, Plus, Minus, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import useCart from "@/hooks/useCart"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const t = useTranslations("cart")
  const locale = useLocale()
  const generalData = useSelector((state: any) => state.generalData)
  const [selected, setSelected] = useState<number[]>([])
  const { cartItems, updateQuantity, removeFromCart, fetchCartItems } = useCart()
  const allSelected = selected.length === cartItems.length && cartItems.length > 0
  const router = useRouter()
  const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated) 


  const DELIVERY_CHARGE = generalData?.delivery_charge || 0

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

  useEffect(() => {
    fetchCartItems()
  }, [isAuthenticated])

  return (
    <div className="min-h-screen">
      <Header />
      <Navigation />

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          {cartItems.length > 0 ? (
            <>
              {/* Page Header */}
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-50 p-3 rounded-xl">
                    <ShoppingCart className="h-8 w-8 text-orange-500" />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Shopping Cart</h1>
                    <p className="text-gray-600 mt-1">{cartItems.length} items in your cart</p>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {/* Select All */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={handleSelectAll}
                        className="h-5 w-5 rounded border-gray-300 text-orange-500 focus:ring-orange-400 focus:ring-offset-0"
                      />
                      <span className="text-base font-semibold text-gray-900">{t("select_all") || "Select All"}</span>
                      <span className="ml-auto text-sm text-gray-500 bg-orange-50 px-3 py-1 rounded-full">
                        {selected.length} / {cartItems.length}
                      </span>
                    </label>
                  </div>

                  {/* Cart Items */}
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className={`bg-white rounded-lg border-2 transition-all duration-200 ${
                        selected.includes(item.uuid)
                          ? "border-orange-200 bg-orange-50/30"
                          : "border-gray-200 hover:border-yellow-200"
                      }`}
                    >
                      <div className="p-5">
                        <div className="flex gap-4">
                          {/* Checkbox and Image */}
                          <div className="flex items-start gap-3 flex-shrink-0">
                            <input
                              type="checkbox"
                              checked={selected.includes(item.uuid)}
                              onChange={() => handleSelect(item.uuid)}
                              className="h-5 w-5 rounded border-gray-300 text-orange-500 focus:ring-orange-400 focus:ring-offset-0 mt-1"
                            />
                            <div className="relative">
                              <Link href={`/${locale}/books/${item?.book_details?.slug}`}>
                                <Image
                                  width={200}
                                  height={200}
                                  src={item?.book_details?.cover_image || "/images/book-skeleton.jpg"}
                                  alt={item?.book_details?.title || "Book Image"}
                                  className="h-28 w-20 object-cover rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                                  loading="lazy"
                                />
                              </Link>
                              {item?.book_details?.discounted_price < item?.book_details?.price && (
                                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                                  {(
                                    ((item?.book_details?.price - item?.book_details?.discounted_price) /
                                      item?.book_details?.price) *
                                    100
                                  ).toFixed(0)}
                                  % OFF
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Item Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <Link href={`/${locale}/books/${item?.book_details?.slug}`}>
                                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-orange-600 transition-colors">
                                    {locale === "en" ? item?.book_details?.title : item?.book_details?.title_bn}
                                  </h3>
                                </Link>
                                <Link href={`/${locale}/authors/${item?.author_details?.slug}`}>
                                  <p className="text-sm text-gray-600 mb-3 hover:text-orange-600 transition-colors">
                                    by {locale === "en" ? item?.author_details?.name : item?.author_details?.name_bn}
                                  </p>
                                </Link>

                                {/* Pricing */}
                                <div className="flex items-center gap-3 mb-4">
                                  <span className="text-xl font-bold text-orange-600">
                                    ৳{item?.book_details?.discounted_price ? Number(item.book_details.discounted_price).toFixed(2) : '0.00'}
                                  </span>
                                  {item?.book_details?.price > item?.book_details?.discounted_price && (
                                    <>
                                      <span className="text-sm text-gray-500 line-through">
                                        ৳{item?.book_details?.price ? Number(item.book_details.price).toFixed(2) : '0.00'}
                                      </span>
                                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-semibold">
                                        Save{" "}
                                        {(
                                          ((item?.book_details?.price - item?.book_details?.discounted_price) /
                                            item?.book_details?.price) *
                                          100
                                        ).toFixed(0)}
                                        %
                                      </span>
                                    </>
                                  )}
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center gap-3">
                                  <span className="text-sm font-medium text-gray-700">{t("qty") || "Quantity:"}</span>
                                  <div className="flex items-center bg-yellow-50 rounded-lg">
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="h-8 w-8 rounded-lg hover:bg-orange-100 p-0 text-orange-600"
                                      onClick={() => updateQuantity(item.uuid, item.quantity - 1)}
                                      disabled={item.quantity <= 1}
                                    >
                                      <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-12 text-center text-base font-semibold text-gray-900">
                                      {item.quantity}
                                    </span>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="h-8 w-8 rounded-lg hover:bg-orange-100 p-0 text-orange-600"
                                      onClick={() => updateQuantity(item.uuid, item.quantity + 1)}
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>

                              {/* Total and Remove */}
                              <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-3">
                                <div className="text-right">
                                  <div className="text-lg font-bold text-gray-900">
                                    ৳{(item?.book_details?.discounted_price ? Number(item.book_details.discounted_price) * item.quantity : 0).toFixed(2)}
                                  </div>
                                  {item?.book_details?.price > item?.book_details?.discounted_price && (
                                    <div className="text-sm text-gray-500 line-through">
                                      ৳{(item?.book_details?.price ? Number(item.book_details.price) * item.quantity : 0).toFixed(2)}
                                    </div>
                                  )}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg"
                                  onClick={() => removeFromCart(item.uuid)}
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  <span className="text-sm">{t("remove") || "Remove"}</span>
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
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
                    <h2 className="text-xl font-semibold mb-6 text-gray-800">Order Summary</h2>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-gray-700">
                        <span>{t("subtotal") || "Subtotal"}</span>
                        <span className="font-semibold">৳{subtotal && Number(subtotal).toFixed(2)}</span>
                      </div>

                      {totalSavings > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>{t("total_savings") || "Total Savings"}</span>
                          <span className="font-semibold">-৳{totalSavings && Number(totalSavings).toFixed(2)}</span>
                        </div>
                      )}

                      {originalSubtotal > subtotal && (
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{t("original_price") || "Original Price"}</span>
                          <span className="line-through text-red-500">৳{originalSubtotal && Number(originalSubtotal).toFixed(2)}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-gray-700">
                        <span>{t("delivery_charge") || "Delivery Charge"}</span>
                        <span className="font-semibold">
                          ৳{selected.length > 0 ? Number(DELIVERY_CHARGE).toFixed(2) : "0.00"}
                        </span>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-gray-900">{t("total") || "Total"}</span>
                          <span className="text-2xl font-bold text-orange-600">৳{total && Number(total).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full py-4 text-base font-semibold bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all duration-200 disabled:bg-orange-200 disabled:cursor-not-allowed shadow-md"
                      disabled={selected.length === 0}
                      onClick={() => {
                        if (selected.length > 0) {
                          router.push(`/${locale}/checkout`)
                        }
                      }}
                    >
                      {t("order_now") || "Proceed to Checkout"}
                    </Button>

                    {selected.length === 0 && (
                      <p className="text-sm text-gray-500 text-center mt-3">
                        {t("please_select_items_to_proceed") || "Please select items to proceed"}
                      </p>
                    )}

                    {/* Selected Items Count */}
                    {selected.length > 0 && (
                      <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <p className="text-sm text-orange-700 text-center">
                          {selected.length} item{selected.length > 1 ? "s" : ""} selected for checkout
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Empty Cart State */
            <div className="bg-white rounded-lg border border-gray-200 py-16">
              <div className="text-center max-w-md mx-auto px-4">
                <div className="bg-yellow-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <Package className="h-12 w-12 text-orange-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("empty") || "Your cart is empty"}</h2>
                <p className="text-base text-gray-600 mb-8">
                  {t("empty_cart_description") || "Looks like you haven't added any books to your cart yet."}
                </p>
                <Button
                  asChild
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md"
                >
                  <Link href={`/${locale}/books`}>{t("go_shopping") || "Start Shopping"}</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
