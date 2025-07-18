"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  HeartIcon,
  StarIcon,
  Settings,
  LogOutIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/store/userSlice";
import { useDispatch } from "react-redux";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { userInfo } = useSelector((state: any) => state.user);
  const t = useTranslations("profile");
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const dispatch = useDispatch();
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const router = useRouter();

  const activeTab = pathname.split("/").pop() || "orders";

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 overflow-hidden rounded-xl bg-white shadow-lg">
          <div 
            className="relative cursor-pointer md:cursor-default"
            onClick={() => setIsProfileExpanded(!isProfileExpanded)}
          >
            <div className="relative h-36 md:h-48 bg-gradient-to-r from-brand-600 to-brand-700">
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-4 left-1/2 flex w-full -translate-x-1/2 items-end justify-between px-4 md:px-8">
                <div className="flex items-end">
                  <div className="relative mr-3 md:mr-4 h-20 w-20 md:h-24 md:w-24 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg">
                    <Image
                      src={userInfo?.profile_picture || "/default_profile.png"}
                      alt="user profile"
                      fill
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="mb-1 text-white">
                    <h1 className="text-xl md:text-2xl font-bold">{userInfo?.full_name}</h1>
                    <p className="text-xs md:text-sm text-brand-100">{userInfo?.email}</p>
                  </div>
                </div>
                <div className="md:hidden">
                  {isProfileExpanded ? (
                    <ChevronUp className="text-white" />
                  ) : (
                    <ChevronDown className="text-white" />
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className={`transition-all duration-300 ease-in-out ${
            isProfileExpanded ? 'max-h-96' : 'max-h-0 md:max-h-96'
          } overflow-hidden`}>
            <div className="flex flex-col md:flex-row flex-wrap items-start md:items-center justify-between gap-2 md:gap-4 border-b border-gray-200 px-4 md:px-8 py-4">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:space-x-6">
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
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="rounded-xl bg-white p-4 shadow-lg">
              <div 
                className="flex justify-between items-center cursor-pointer md:cursor-default"
                onClick={() => setIsMenuExpanded(!isMenuExpanded)}
              >
                <h3 className="text-lg font-semibold">{t("dashboard")}</h3>
                <div className="md:hidden">
                  {isMenuExpanded ? <ChevronUp /> : <ChevronDown />}
                </div>
              </div>
              
              <div className={`transition-all duration-300 ease-in-out ${
                isMenuExpanded ? 'max-h-[1000px]' : 'max-h-0 md:max-h-[1000px]'
              } overflow-hidden`}>
                <div className="border-b border-gray-100 mt-2 mb-4"></div>
                <nav className="space-y-1">
                  <Link
                    href="/profile/orders"
                    className={`flex w-full items-center rounded-md px-3 py-2 text-left text-sm font-medium ${
                      activeTab === "orders"
                        ? "bg-brand-50 text-brand-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <ShoppingBag className="mr-3 h-5 w-5" />
                    <span>{t("orders.title")}</span>
                  </Link>
                  <Link
                    href="/profile/wishlist"
                    className={`flex w-full items-center rounded-md px-3 py-2 text-left text-sm font-medium ${
                      activeTab === "wishlist"
                        ? "bg-brand-50 text-brand-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <HeartIcon className="mr-3 h-5 w-5" />
                    <span>{t("wishlist.title")}</span>
                  </Link>
                  <Link
                    href="/profile/reviews"
                    className={`flex w-full items-center rounded-md px-3 py-2 text-left text-sm font-medium ${
                      activeTab === "reviews"
                        ? "bg-brand-50 text-brand-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <StarIcon className="mr-3 h-5 w-5" />
                    <span>{t("reviews.title")}</span>
                  </Link>
                  <Link
                    href="/profile/settings"
                    className={`flex w-full items-center rounded-md px-3 py-2 text-left text-sm font-medium ${
                      activeTab === "settings"
                        ? "bg-brand-50 text-brand-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Settings className="mr-3 h-5 w-5" />
                    <span>{t("settings.title")}</span>
                  </Link>
                </nav>

                <div className="mt-6">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOutIcon className="mr-3 h-5 w-5" />
                    <span>{t("logout")}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">{children}</div>
        </div>
      </div>
    </div>
  );
}

// Reused HeartIcon component
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
  );
}