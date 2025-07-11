"use client"

import { ArrowLeft, Calendar, CreditCard, Package, Truck, CheckCircle, Clock, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function Component() {
  const orderItems = [
    { id: 1, title: "The Great Gatsby", price: 24.99, quantity: 1, image: "/placeholder.svg?height=80&width=60" },
    { id: 2, title: "To Kill a Mockingbird", price: 19.99, quantity: 2, image: "/placeholder.svg?height=80&width=60" },
    { id: 3, title: "1984", price: 22.99, quantity: 1, image: "/placeholder.svg?height=80&width=60" },
  ]

  const trackingSteps = [
    { status: "Order Placed", completed: true },
    { status: "Processing", completed: true },
    { status: "Shipped", completed: true },
    { status: "Out for Delivery", completed: false },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/profile/orders">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Order #ORD-2024-001234</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-4">
            {/* Order Status */}
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="flex items-center gap-2 text-lg" style={{ color: "#1b706b" }}>
                  <Package className="h-4 w-4" />
                  Status
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {trackingSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            step.completed ? "text-white" : "bg-gray-200 text-gray-400"
                          }`}
                          style={{ backgroundColor: step.completed ? "#1b706b" : undefined }}
                        >
                          {step.completed ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                        </div>
                        {index < trackingSteps.length - 1 && (
                          <div
                            className={`w-0.5 h-6 mt-1 ${step.completed ? "opacity-100" : "bg-gray-200"}`}
                            style={{ backgroundColor: step.completed ? "#1b706b" : undefined }}
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className={`text-sm ${step.completed ? "text-gray-900" : "text-gray-500"}`}>
                            {step.status}
                          </h3>
                          <Badge
                            variant={step.completed ? "default" : "secondary"}
                            style={{ backgroundColor: step.completed ? "#1b706b" : undefined }}
                            className="text-xs"
                          >
                            {step.completed ? "Done" : "Pending"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-lg" style={{ color: "#1b706b" }}>Items</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex gap-3 p-2 border rounded-md">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={60}
                        height={80}
                        className="rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                          <span className="text-sm font-semibold" style={{ color: "#1b706b" }}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="flex items-center gap-2 text-lg" style={{ color: "#1b706b" }}>
                  <Truck className="h-4 w-4" />
                  Shipping
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Address</h4>
                    <p className="text-xs text-gray-600">John Doe, 123 Main St, New York, NY 10001</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Delivery</h4>
                    <p className="text-xs text-gray-600">FedEx | Expected Dec 19, 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Order Summary */}
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-lg" style={{ color: "#1b706b" }}>Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span>$87.97</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping:</span>
                  <span>$5.99</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-semibold">
                  <span>Total:</span>
                  <span style={{ color: "#1b706b" }}>$93.96</span>
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="flex items-center gap-2 text-lg" style={{ color: "#1b706b" }}>
                  <User className="h-4 w-4" />
                  Customer
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                <p className="text-xs text-gray-600">john.doe@email.com</p>
                <p className="text-xs text-gray-600">123 Main St, New York, NY 10001</p>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="flex items-center gap-2 text-lg" style={{ color: "#1b706b" }}>
                  <CreditCard className="h-4 w-4" />
                  Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-4 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
                    VISA
                  </div>
                  <span className="text-xs text-gray-600">•••• 4242</span>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-2">
              <Button className="w-full text-white text-sm" style={{ backgroundColor: "#1b706b" }}>
                Track
              </Button>
              <Button variant="outline" className="w-full bg-transparent text-sm">
                Invoice
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}