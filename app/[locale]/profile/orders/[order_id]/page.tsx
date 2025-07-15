"use client"

import { ArrowLeft, Calendar, CreditCard, Package, Truck, CheckCircle, Clock, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { API_ENDPOINTS } from "@/constants/apiEnds"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import useHttp from "@/hooks/useHttp"
import { useLocale } from "next-intl"
import { useTranslation } from "react-i18next"

export default function Component() {
  const { order_id } = useParams()
  const [order, setOrder] = useState<any>(null)
  const {sendRequests: fetchOrderDetails, isLoading: isFetchingOrderDetails} = useHttp()
  const {t} = useTranslation()
  const locale = useLocale()

  useEffect(() => {
    fetchOrderDetails({
      url_info: {
        url: API_ENDPOINTS.ORDER_DETAIL(order_id as string),
        isAuthRequired: true,
      }
    }, (res: any) => {
      setOrder(res)
    })
  }, [order_id])

  const trackingSteps = [
    { status: "Order Placed", completed: ["pending", "processing", "ready_to_ship", "shipped", "delivered", "completed"].includes(order?.status) },
    { status: "Processing", completed: ["processing", "ready_to_ship", "shipped", "delivered", "completed"].includes(order?.status) },
    { status: "Shipped", completed: ["ready_to_ship", "shipped", "delivered", "completed"].includes(order?.status) },
    { status: "Delivered", completed: ["delivered", "completed"].includes(order?.status) },
    { status: "Completed", completed: ["completed"].includes(order?.status) }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild className="hover:bg-gray-100 transition-colors">
              <Link href="/profile/orders">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Order #{order?.order_id}</h1>
            <div className="w-8" /> {/* Spacer for alignment */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-teal-600 to-teal-700 py-4">
                <CardTitle className="flex items-center gap-3 text-xl text-white">
                  <Package className="h-6 w-6" />
                  Order Status
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {trackingSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                            step.completed ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-400"
                          }`}
                        >
                          {step.completed ? <CheckCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                        </div>
                        {index < trackingSteps.length - 1 && (
                          <div
                            className={`w-0.5 h-8 mt-1 transition-colors duration-300 ${
                              step.completed ? "bg-teal-600" : "bg-gray-200"
                            }`}
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className={`text-base font-medium ${step.completed ? "text-gray-900" : "text-gray-500"}`}>
                            {step.status}
                          </h3>
                          <Badge
                            variant={step.completed ? "default" : "secondary"}
                            className={`${
                              step.completed ? "bg-teal-100 text-teal-800" : "bg-gray-100 text-gray-600"
                            } text-sm px-3 py-1`}
                          >
                            {step.completed ? "Completed" : "Pending"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-teal-600 to-teal-700 py-4">
                <CardTitle className="text-xl text-white">Order Items</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {order?.order_items.map((item: any) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="relative w-24 h-32 overflow-hidden rounded-lg">
                        <Image
                          src={item.book.cover_image || "/images/book-skeleton.jpg"}
                          alt={item.book.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{item.book.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">Quantity: {item.quantity}</p>
                        </div>
                        <div className="flex justify-between items-end">
                          <span className="text-sm text-gray-600">Unit Price: ৳{item.book.price}</span>
                          <span className="text-lg font-bold text-teal-700">৳{item.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-teal-600 to-teal-700 py-4">
                <CardTitle className="flex items-center gap-3 text-xl text-white">
                  <Truck className="h-6 w-6" />
                  Shipping Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 mb-2">Contact Information</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>Name: {order?.shipping_address?.name}</p>
                        {order?.shipping_address?.email && <p>Email: {order?.shipping_address?.email}</p>}
                        <p>Phone: {order?.shipping_address?.phone}</p>
                      </div>
                    </div>
                    {order?.shipping_address?.note && (
                      <div>
                        <h4 className="text-base font-semibold text-gray-900 mb-2">Special Instructions</h4>
                        <p className="text-sm text-gray-600">{order?.shipping_address?.note}</p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 mb-2">Delivery Address</h4>
                      <p className="text-sm text-gray-600">
                        {locale === "bn" ? (
                          <>
                            {order?.shipping_address?.union_name_bn}, {order?.shipping_address?.thana_name_bn},
                            {order?.shipping_address?.city_name_bn}, {order?.shipping_address?.state_name_bn}
                          </>
                        ) : (
                          <>
                            {order?.shipping_address?.union_name}, {order?.shipping_address?.thana_name},
                            {order?.shipping_address?.city_name}, {order?.shipping_address?.state_name}
                          </>
                        )}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">{order?.shipping_address?.detail_address}</p>
                    </div>
                    {(order?.shipping_address?.courier_service_name || order?.shipping_address?.courier_service_tracking_id) && (
                      <div>
                        <h4 className="text-base font-semibold text-gray-900 mb-2">Courier Information</h4>
                        <p className="text-sm text-gray-600">
                          {order?.shipping_address?.courier_service_name} | {order?.shipping_address?.courier_service_tracking_id}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-teal-600 to-teal-700 py-4">
                <CardTitle className="text-xl text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">৳{order?.sub_total}</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">৳{order?.shipping_cost}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-teal-700">৳{parseFloat(order?.sub_total) + parseFloat(order?.shipping_cost)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-teal-600 to-teal-700 py-4">
                <CardTitle className="flex items-center gap-3 text-xl text-white">
                  <CreditCard className="h-6 w-6" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="grid gap-4">
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 mb-2">Payment Method</h4>
                      <div className={`inline-block px-4 py-2 rounded-lg text-white text-sm font-medium ${
                        order?.payment_details?.payment_method === "cod" ? "bg-green-600" :
                        order?.payment_details?.payment_method === "bkash" ? "bg-pink-600" :
                        "bg-blue-600"
                      }`}>
                        {order?.payment_details?.payment_method === "cod" ? "Cash on Delivery" :
                         order?.payment_details?.payment_method?.toUpperCase()}
                      </div>
                    </div>

                    {order?.payment_details?.payment_status && (
                      <div>
                        <h4 className="text-base font-semibold text-gray-900 mb-2">Payment Status</h4>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          order?.payment_details?.payment_status === "paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {order?.payment_details?.payment_status?.toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  {order?.payment_details && order?.payment_details?.payment_method !== "cod" && (
                    <div className="space-y-4 border-t pt-4">
                      <div>
                        <h4 className="text-base font-semibold text-gray-900 mb-2">Transaction Details</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>Account: {order?.payment_details?.mobile_number}</p>
                          <p>Reference: {order?.payment_details?.reference_number}</p>
                          {order?.payment_details?.transaction_id && (
                            <p>Transaction ID: {order?.payment_details?.transaction_id}</p>
                          )}
                          <p>Date: {new Date(order?.payment_details?.payment_date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}