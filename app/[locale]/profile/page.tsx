"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Camera,
  Package,
  CreditCard,
  Clock,
  ShoppingBag,
  LogOutIcon,
  StarIcon,
  BellIcon,
  TrashIcon,
  Settings,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("orders")

  // Mock user data
  const userData = {
    name: "আব্দুল করিম",
    email: "abdul.karim@example.com",
    phone: "01712345678",
    address: "১২৩/এ, গ্রীন রোড, ঢাকা-১২১৫",
    joinDate: "১০ জানুয়ারি, ২০২৩",
    avatar: "/placeholder.svg?height=200&width=200",
  }

  // Mock orders data
  const orders = [
    {
      id: "ORD-12345",
      date: "১৫ মে, ২০২৪",
      status: "সম্পন্ন",
      total: "৳ ১,২৫০",
      items: 3,
    },
    {
      id: "ORD-12346",
      date: "২০ এপ্রিল, ২০২৪",
      status: "প্রক্রিয়াধীন",
      total: "৳ ৮৫০",
      items: 2,
    },
    {
      id: "ORD-12347",
      date: "৫ মার্চ, ২০২৪",
      status: "সম্পন্ন",
      total: "৳ ১,৫৫০",
      items: 4,
    },
  ]

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userName={userData.name} />
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 overflow-hidden rounded-xl bg-white shadow-lg">
          <div className="relative h-48 bg-gradient-to-r from-brand-600 to-brand-700">
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent"></div>
            <div className="absolute bottom-4 left-1/2 flex w-full -translate-x-1/2 items-end justify-between px-8">
              <div className="flex items-end">
                <div className="relative mr-4 h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg">
                  <Image
                    src={userData.avatar || "/placeholder.svg"}
                    alt={userData.name}
                    fill
                    className="h-full w-full object-cover"
                  />
                  <button className="absolute bottom-0 right-0 rounded-full bg-brand-600 p-1.5 text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
                    <Camera className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="mb-1 text-white">
                  <h1 className="text-2xl font-bold">{userData.name}</h1>
                  <p className="text-sm text-brand-100">{userData.email}</p>
                </div>
              </div>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                className="mb-1 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                size="sm"
              >
                <Edit className="mr-1 h-4 w-4" />
                প্রোফাইল সম্পাদনা
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 px-8 py-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="mr-2 h-4 w-4 text-brand-500" />
                <span>{userData.phone}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="mr-2 h-4 w-4 text-brand-500" />
                <span>{userData.address}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="mr-2 h-4 w-4 text-brand-500" />
                <span>সদস্য হয়েছেন: {userData.joinDate}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Badge className="bg-brand-100 text-brand-800">প্রিমিয়াম সদস্য</Badge>
              <Badge className="bg-amber-100 text-amber-800">১০০+ পয়েন্ট</Badge>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="rounded-xl bg-white p-4 shadow-lg">
              <h3 className="mb-4 border-b border-gray-100 pb-2 text-lg font-semibold">ড্যাশবোর্ড</h3>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`flex w-full items-center rounded-md px-3 py-2 text-left text-sm font-medium ${
                    activeTab === "orders"
                      ? "bg-brand-50 text-brand-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <ShoppingBag className="mr-3 h-5 w-5" />
                  <span>অর্ডার</span>
                </button>
                <button
                  onClick={() => setActiveTab("wishlist")}
                  className={`flex w-full items-center rounded-md px-3 py-2 text-left text-sm font-medium ${
                    activeTab === "wishlist"
                      ? "bg-brand-50 text-brand-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <HeartIcon className="mr-3 h-5 w-5" />
                  <span>উইশলিস্ট</span>
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`flex w-full items-center rounded-md px-3 py-2 text-left text-sm font-medium ${
                    activeTab === "reviews"
                      ? "bg-brand-50 text-brand-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <StarIcon className="mr-3 h-5 w-5" />
                  <span>রিভিউ</span>
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`flex w-full items-center rounded-md px-3 py-2 text-left text-sm font-medium ${
                    activeTab === "settings"
                      ? "bg-brand-50 text-brand-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Settings className="mr-3 h-5 w-5" />
                  <span>সেটিংস</span>
                </button>
              </nav>

              <h3 className="mb-4 mt-6 border-b border-gray-100 pb-2 text-lg font-semibold">অ্যাকাউন্ট</h3>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab("address")}
                  className={`flex w-full items-center rounded-md px-3 py-2 text-left text-sm font-medium ${
                    activeTab === "address"
                      ? "bg-brand-50 text-brand-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <MapPin className="mr-3 h-5 w-5" />
                  <span>ঠিকানা</span>
                </button>
                <button
                  onClick={() => setActiveTab("payment")}
                  className={`flex w-full items-center rounded-md px-3 py-2 text-left text-sm font-medium ${
                    activeTab === "payment"
                      ? "bg-brand-50 text-brand-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <CreditCard className="mr-3 h-5 w-5" />
                  <span>পেমেন্ট মেথড</span>
                </button>
                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`flex w-full items-center rounded-md px-3 py-2 text-left text-sm font-medium ${
                    activeTab === "notifications"
                      ? "bg-brand-50 text-brand-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <BellIcon className="mr-3 h-5 w-5" />
                  <span>নোটিফিকেশন</span>
                </button>
                <Link
                  href="/logout"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOutIcon className="mr-3 h-5 w-5" />
                  <span>লগআউট</span>
                </Link>
              </nav>
            </div>
          </div>

          <div className="md:col-span-3">
            {activeTab === "orders" && (
              <div className="rounded-xl bg-white p-6 shadow-lg">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">আপনার অর্ডার</h2>
                  <div className="flex items-center space-x-2">
                    <select className="rounded-md border-gray-300 text-sm focus:border-brand-500 focus:ring-brand-500">
                      <option>সকল অর্ডার</option>
                      <option>সম্পন্ন</option>
                      <option>প্রক্রিয়াধীন</option>
                      <option>বাতিল</option>
                    </select>
                    <Button variant="outline" size="sm">
                      <Clock className="mr-1 h-4 w-4" />
                      সাম্প্রতিক
                    </Button>
                  </div>
                </div>

                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-md"
                      >
                        <div className="flex flex-wrap items-center justify-between border-b border-gray-100 p-4">
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium text-gray-900">{order.id}</h3>
                              <Badge
                                className={`ml-2 ${
                                  order.status === "সম্পন্ন"
                                    ? "bg-green-100 text-green-800"
                                    : order.status === "প্রক্রিয়াধীন"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {order.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500">{order.date}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="font-medium text-gray-900">{order.total}</p>
                              <p className="text-sm text-gray-500">{order.items} আইটেম</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="transition-colors group-hover:border-brand-500 group-hover:text-brand-600"
                            >
                              বিস্তারিত দেখুন
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between bg-gray-50 px-4 py-2">
                          <div className="flex items-center">
                            <Package className="mr-2 h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-500">
                              {order.status === "সম্পন্ন"
                                ? "আপনার অর্ডার সফলভাবে ডেলিভারি করা হয়েছে"
                                : "আপনার অর্ডার প্রক্রিয়াধীন রয়েছে"}
                            </span>
                          </div>
                          <Link
                            href={`/orders/${order.id}/track`}
                            className="text-sm font-medium text-brand-600 hover:text-brand-700"
                          >
                            অর্ডার ট্র্যাক করুন
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 rounded-full bg-gray-100 p-6">
                      <ShoppingBag className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="mb-2 text-lg font-medium">কোন অর্ডার নেই</h3>
                    <p className="mb-6 max-w-md text-gray-500">
                      আপনি এখনও কোন অর্ডার করেননি। আমাদের বইয়ের কালেকশন দেখুন এবং আপনার পছন্দের বই অর্ডার করুন।
                    </p>
                    <Button className="bg-brand-600 hover:bg-brand-700">
                      <Link href="/books">বই ব্রাউজ করুন</Link>
                    </Button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="rounded-xl bg-white p-6 shadow-lg">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">আপনার উইশলিস্ট</h2>
                  <Button variant="outline" size="sm">
                    <Clock className="mr-1 h-4 w-4" />
                    সাম্প্রতিক
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
                            কার্টে যোগ করুন
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:bg-red-50 hover:text-red-700"
                          >
                            <TrashIcon className="h-4 w-4" />
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
                    <h3 className="mb-2 text-lg font-medium">উইশলিস্ট খালি</h3>
                    <p className="mb-6 max-w-md text-gray-500">
                      আপনার উইশলিস্টে কোন বই নেই। আপনার পছন্দের বইগুলো উইশলিস্টে যোগ করুন।
                    </p>
                    <Button className="bg-brand-600 hover:bg-brand-700">
                      <Link href="/books">বই ব্রাউজ করুন</Link>
                    </Button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="rounded-xl bg-white p-6 shadow-lg">
                <h2 className="mb-6 text-xl font-semibold">আপনার রিভিউ</h2>

                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 rounded-full bg-gray-100 p-6">
                    <StarIcon className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium">কোন রিভিউ নেই</h3>
                  <p className="mb-6 max-w-md text-gray-500">
                    আপনি এখনও কোন বইয়ের রিভিউ দেননি। আপনার পড়া বইগুলোর রিভিউ দিন এবং অন্যদের সাহায্য করুন।
                  </p>
                  <Button className="bg-brand-600 hover:bg-brand-700">
                    <Link href="/books">বই ব্রাউজ করুন</Link>
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="rounded-xl bg-white p-6 shadow-lg">
                <h2 className="mb-6 text-xl font-semibold">অ্যাকাউন্ট সেটিংস</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="mb-4 text-lg font-medium">ব্যক্তিগত তথ্য</h3>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">নাম</label>
                        <div className="flex overflow-hidden rounded-md border border-gray-300 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500">
                          <div className="flex items-center bg-gray-50 px-3 text-gray-500">
                            <User className="h-5 w-5" />
                          </div>
                          <input
                            type="text"
                            className="w-full border-0 bg-transparent py-2 pl-2 focus:outline-none focus:ring-0"
                            defaultValue={userData.name}
                            readOnly={!isEditing}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">ইমেইল</label>
                        <div className="flex overflow-hidden rounded-md border border-gray-300 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500">
                          <div className="flex items-center bg-gray-50 px-3 text-gray-500">
                            <Mail className="h-5 w-5" />
                          </div>
                          <input
                            type="email"
                            className="w-full border-0 bg-transparent py-2 pl-2 focus:outline-none focus:ring-0"
                            defaultValue={userData.email}
                            readOnly={!isEditing}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">ফোন নম্বর</label>
                        <div className="flex overflow-hidden rounded-md border border-gray-300 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500">
                          <div className="flex items-center bg-gray-50 px-3 text-gray-500">
                            <Phone className="h-5 w-5" />
                          </div>
                          <input
                            type="tel"
                            className="w-full border-0 bg-transparent py-2 pl-2 focus:outline-none focus:ring-0"
                            defaultValue={userData.phone}
                            readOnly={!isEditing}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">ঠিকানা</label>
                        <div className="flex overflow-hidden rounded-md border border-gray-300 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500">
                          <div className="flex items-center bg-gray-50 px-3 text-gray-500">
                            <MapPin className="h-5 w-5" />
                          </div>
                          <input
                            type="text"
                            className="w-full border-0 bg-transparent py-2 pl-2 focus:outline-none focus:ring-0"
                            defaultValue={userData.address}
                            readOnly={!isEditing}
                          />
                        </div>
                      </div>
                    </div>

                    {isEditing && (
                      <div className="mt-6 flex justify-end space-x-4">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          বাতিল
                        </Button>
                        <Button className="bg-brand-600 hover:bg-brand-700" onClick={() => setIsEditing(false)}>
                          সংরক্ষণ করুন
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="mb-4 text-lg font-medium">পাসওয়ার্ড পরিবর্তন</h3>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">বর্তমান পাসওয়ার্ড</label>
                        <div className="flex overflow-hidden rounded-md border border-gray-300 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500">
                          <div className="flex items-center bg-gray-50 px-3 text-gray-500">
                            <Lock className="h-5 w-5" />
                          </div>
                          <input
                            type="password"
                            className="w-full border-0 bg-transparent py-2 pl-2 focus:outline-none focus:ring-0"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">নতুন পাসওয়ার্ড</label>
                        <div className="flex overflow-hidden rounded-md border border-gray-300 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500">
                          <div className="flex items-center bg-gray-50 px-3 text-gray-500">
                            <Lock className="h-5 w-5" />
                          </div>
                          <input
                            type="password"
                            className="w-full border-0 bg-transparent py-2 pl-2 focus:outline-none focus:ring-0"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">নতুন পাসওয়ার্ড নিশ্চিত করুন</label>
                        <div className="flex overflow-hidden rounded-md border border-gray-300 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500">
                          <div className="flex items-center bg-gray-50 px-3 text-gray-500">
                            <Lock className="h-5 w-5" />
                          </div>
                          <input
                            type="password"
                            className="w-full border-0 bg-transparent py-2 pl-2 focus:outline-none focus:ring-0"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <Button className="bg-brand-600 hover:bg-brand-700">পাসওয়ার্ড আপডেট করুন</Button>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="mb-4 text-lg font-medium text-red-600">অ্যাকাউন্ট ডিলিট</h3>
                    <p className="mb-4 text-gray-600">
                      আপনার অ্যাকাউন্ট ডিলিট করলে আপনার সমস্ত ডাটা মুছে যাবে এবং এটি পুনরুদ্ধার করা যাবে না।
                    </p>
                    <Button variant="destructive">অ্যাকাউন্ট ডিলিট করুন</Button>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "address" && (
              <div className="rounded-xl bg-white p-6 shadow-lg">
                <h2 className="mb-6 text-xl font-semibold">ঠিকানা সেটিংস</h2>
                <p className="mb-4 text-gray-600">
                  আপনার ডেলিভারি ঠিকানা আপডেট করুন। এটি আপনার অর্ডার ডেলিভারির জন্য ব্যবহৃত হবে।
                </p>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">নতুন ঠিকানা</label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand-500 focus:ring-brand-500"
                      placeholder="১২৩/এ, গ্রীন রোড, ঢাকা-১২১৫"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">পোস্টাল কোড</label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand-500 focus:ring-brand-500"
                      placeholder="১২১৫"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button className="bg-brand-600 hover:bg-brand-700">ঠিকানা আপডেট করুন</Button>
                </div>
              </div>
            )}
            {activeTab === "payment" && (
              <div className="rounded-xl bg-white p-6 shadow-lg">
                <h2 className="mb-6 text-xl font-semibold">পেমেন্ট মেথড</h2>
                <p className="mb-4 text-gray-600">
                  আপনার পেমেন্ট মেথড আপডেট করুন। এটি আপনার অর্ডার পেমেন্টের জন্য ব্যবহৃত হবে।
                </p>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">কার্ড নম্বর</label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand-500 focus:ring-brand-500"
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">কার্ডের নাম</label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand-500 focus:ring-brand-500"
                      placeholder="আব্দুল করিম"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button className="bg-brand-600 hover:bg-brand-700">পেমেন্ট মেথড আপডেট করুন</Button>
                </div>
              </div>
            )}
            {activeTab === "notifications" && (
                <div className="rounded-xl bg-white p-6 shadow-lg">
                <h2 className="mb-6 text-xl font-semibold">নোটিফিকেশন সেটিংস</h2>
                <p className="mb-4 text-gray-600">
                  আপনার নোটিফিকেশন সেটিংস আপডেট করুন। আপনি কোন ধরনের নোটিফিকেশন পেতে চান তা নির্বাচন করুন।
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                  <span>অর্ডার আপডেট</span>
                  <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                  <span>প্রোমোশনাল ইমেইল</span>
                  <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                  <span>নতুন বইয়ের নোটিফিকেশন</span>
                  <Switch defaultChecked />
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="mb-4 text-lg font-medium">নোটিফিকেশন তালিকা</h3>
                  <ul className="divide-y divide-gray-100">
                  <li className="flex items-start gap-3 py-3">
                    <BellIcon className="h-5 w-5 text-brand-500 mt-1" />
                    <div>
                    <p className="text-sm text-gray-800">আপনার অর্ডার <span className="font-semibold">ORD-12345</span> সফলভাবে ডেলিভারি হয়েছে।</p>
                    <span className="text-xs text-gray-400">১ দিন আগে</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 py-3">
                    <BellIcon className="h-5 w-5 text-brand-500 mt-1" />
                    <div>
                    <p className="text-sm text-gray-800">নতুন বই <span className="font-semibold">"নীল জোসনা"</span> এখন উপলব্ধ।</p>
                    <span className="text-xs text-gray-400">২ দিন আগে</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 py-3">
                    <BellIcon className="h-5 w-5 text-brand-500 mt-1" />
                    <div>
                    <p className="text-sm text-gray-800">বিশেষ অফার: আজই অর্ডার করুন এবং ১০% ছাড় পান।</p>
                    <span className="text-xs text-gray-400">৩ দিন আগে</span>
                    </div>
                  </li>
                  </ul>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button className="bg-brand-600 hover:bg-brand-700">নোটিফিকেশন আপডেট করুন</Button>
                </div>
                </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  )
}

function HeartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

function LogOut(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  )
}

function Star(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
