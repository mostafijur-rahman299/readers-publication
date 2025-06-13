"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Phone,
  MapPin,
  Calendar,
  Camera,
  CreditCard,
  ShoppingBag,
  LogOutIcon,
  StarIcon,
  BellIcon,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Switch } from "@/components/ui/switch"
import { useSelector } from "react-redux"
import { useTranslations } from "next-intl"
import Orders from "./components/Orders"
import Wishlist from "./components/Wishlist"
import Reviews from "./components/Reviews"
import SettingsPage from "./components/Settings"
import Address from "./components/Address"
import PaymentMethod from "./components/PaymentMethod"
import Notifications from "./components/Notifications"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("orders")
  const { userInfo } = useSelector((state: any) => state.user)
  const t = useTranslations("profile")
  

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 overflow-hidden rounded-xl bg-white shadow-lg">
          <div className="relative h-48 bg-gradient-to-r from-brand-600 to-brand-700">
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent"></div>
            <div className="absolute bottom-4 left-1/2 flex w-full -translate-x-1/2 items-end justify-between px-8">
              <div className="flex items-end">
                <div className="relative mr-4 h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg">
                  <Image
                    src={userInfo?.profile_picture || "/default_profile.png"}
                    alt={"user profile"}
                    fill
                    className="h-full w-full object-cover"
                  />
                  <button className="absolute bottom-0 right-0 rounded-full bg-brand-600 p-2.5 text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div className="mb-1 text-white">
                  <h1 className="text-2xl font-bold">{userInfo?.full_name}</h1>
                  <p className="text-sm text-brand-100">{userInfo?.email}</p>
                </div>
              </div>
              {/* <Button
                onClick={() => setIsEditing(!isEditing)}
                className="mb-1 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                size="sm"
              >
                <Edit className="mr-1 h-4 w-4" />
                প্রোফাইল সম্পাদনা
              </Button> */}
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 px-8 py-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="mr-2 h-4 w-4 text-brand-500" />
                <span>{userInfo?.phone_number || "--"}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="mr-2 h-4 w-4 text-brand-500" />
                <span>{userInfo?.address || "--"}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="mr-2 h-4 w-4 text-brand-500" />
                <span>{t("member_since")}: {userInfo?.joined_at || "--"}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              {/* <Badge className="bg-brand-100 text-brand-800">প্রিমিয়াম সদস্য</Badge>
              <Badge className="bg-amber-100 text-amber-800">১০০+ পয়েন্ট</Badge> */}
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="rounded-xl bg-white p-4 shadow-lg">
              <h3 className="mb-4 border-b border-gray-100 pb-2 text-lg font-semibold">{t("dashboard")}</h3>
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
                  <span>{t("orders.title")}</span>
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
                  <span>{t("wishlist.title")}</span>
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
                  <span>{t("reviews.title")}</span>
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
                  <span>{t("settings.title")}</span>
                </button>
              </nav>

              <h3 className="mb-4 mt-6 border-b border-gray-100 pb-2 text-lg font-semibold">{t("account")}</h3>
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
                  <span>{t("address.side_title")}</span>
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
                  <span>{t("payment_methods.side_title")}</span>
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
                  <span>{t("notifications.side_title")}</span>
                </button>
                <Link
                  href="/logout"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOutIcon className="mr-3 h-5 w-5" />
                  <span>{t("logout")}</span>
                </Link>
              </nav>
            </div>
          </div>

          <div className="md:col-span-3">
            {activeTab === "orders" && (
              <Orders />  
            )}

            {activeTab === "wishlist" && (
              <Wishlist />
            )}

            {activeTab === "reviews" && (
              <Reviews />
            )}

            {activeTab === "settings" && (
              <SettingsPage />
            )}
            {activeTab === "address" && (
              <Address />
            )}
            {activeTab === "payment" && (
              <PaymentMethod />
            )}
            {activeTab === "notifications" && (
                <Notifications />
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

