import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProfileDropdown } from "@/components/profile-dropdown"

interface HeaderProps {
  isLoggedIn?: boolean
  userName?: string
}

export function Header({ isLoggedIn = false, userName = "" }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <Link href="/" className="mr-6 transition-transform hover:scale-105">
            <div className="relative h-12 w-32">
              <Image src="/logo.png" alt="Guardian Logo" fill className="object-contain" priority />
            </div>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 md:max-w-md">
          <div className="relative w-full">
            <Input
              type="search"
              placeholder="খোঁজ করুন..."
              className="w-full rounded-full border-gray-200 bg-gray-50 pl-4 pr-12 focus:border-brand-500 focus:ring-brand-500"
            />
            <Button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-brand-600 p-2 text-white hover:bg-brand-700"
              size="icon"
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <span className="mr-2 text-sm font-medium">En</span>
            <div className="relative h-5 w-10 cursor-pointer rounded-full bg-gray-200 transition-colors">
              <div className="absolute right-0 top-0 h-5 w-5 rounded-full bg-brand-600 shadow-md transition-all"></div>
            </div>
            <span className="ml-2 text-sm font-medium">বাংলা</span>
          </div>
          <Link
            href="/support"
            className="group flex flex-col items-center transition-transform hover:scale-105"
            aria-label="Support"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 p-1.5 text-brand-600 transition-colors group-hover:bg-brand-100">
              <Image src="/icons/headphones.png" alt="Support" width={20} height={20} />
            </div>
            <span className="mt-1 text-xs font-medium">সাপোর্ট</span>
          </Link>
          <Link
            href="/wishlist"
            className="group flex flex-col items-center transition-transform hover:scale-105"
            aria-label="Wishlist"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 p-1.5 text-brand-600 transition-colors group-hover:bg-brand-100">
              <Image src="/icons/gift.png" alt="Gift" width={20} height={20} />
            </div>
            <span className="mt-1 text-xs font-medium">উইশলিস্ট</span>
          </Link>
          <Link
            href="/cart"
            className="group relative flex flex-col items-center transition-transform hover:scale-105"
            aria-label="Cart"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 p-1.5 text-brand-600 transition-colors group-hover:bg-brand-100">
              <Image src="/icons/cart.png" alt="Cart" width={20} height={20} />
            </div>
            <span className="mt-1 text-xs font-medium">কার্ট</span>
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              0
            </span>
          </Link>
          <ProfileDropdown isLoggedIn={isLoggedIn} userName={userName} />
        </div>
      </div>
    </header>
  )
}
