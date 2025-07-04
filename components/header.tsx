"use client"

import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { FaHeadphones, FaGift, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

export function Header() {
  const t = useTranslations('header');
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useSelector((state: any) => state.user);
  const locale = useLocale()

  const currentLocale = locale;
  const restOfPath = pathname.split('/').slice(2).join('/');

  const changeLanguage = (lang: string) => {
    const newPath = `/${lang}/${restOfPath}`;
    router.push(newPath);
  };
  const cartCount = useSelector((state: any) => state.cart.cart_count);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Main Header Content */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          {/* Logo */}
          <div className="hidden md:flex items-center">
            <Link href="/" className="transition-transform hover:scale-105">
              <div className="relative h-12 w-32">
                <Image src="/readers-icon.png" alt="Logo" fill className="object-contain" priority />
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 px-4 md:max-w-md">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder={t('search')}
                className="w-full rounded-full border-gray-200 bg-gray-50 pl-4 pr-12 focus:border-brand-500 focus:ring-brand-500"
              />
              <Button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-brand-600 p-2 text-white hover:bg-brand-700"
                size="icon"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">{t('search')}</span>
              </Button>
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {/* Language Switcher - Desktop Only */}
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-sm font-medium">En</span>
              <div 
                className="relative h-5 w-10 cursor-pointer rounded-full bg-gray-200 transition-colors"
                onClick={() => changeLanguage(currentLocale === 'en' ? 'bn' : 'en')}
              >
                <div 
                  className={`absolute top-0 h-5 w-5 rounded-full bg-brand-600 shadow-md transition-all ${
                    currentLocale === 'en' ? 'right-0' : 'left-0'
                  }`}
                ></div>
              </div>
              <span className="text-sm font-medium">বাংলা</span>
            </div>

            <Link
              href={`/${currentLocale}/support`}
              className="group flex flex-col items-center transition-transform hover:scale-105"
              aria-label={t('support')}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 p-1.5 text-brand-600 transition-colors group-hover:bg-brand-100">
                <FaHeadphones />
              </div>
              <span className="mt-1 text-xs font-medium">{t('support')}</span>
            </Link>
            <Link
              href={`/${currentLocale}/wishlist`}
              className="group flex flex-col items-center transition-transform hover:scale-105"
              aria-label={t('wishlist')}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 p-1.5 text-brand-600 transition-colors group-hover:bg-brand-100">
                <FaGift />
              </div>
              <span className="mt-1 text-xs font-medium">{t('wishlist')}</span>
            </Link>
            <Link
              href={`/${currentLocale}/cart`}
              className="group flex flex-col items-center transition-transform hover:scale-105"
              aria-label={t('cart')}
            >
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 p-1.5 text-brand-600 transition-colors group-hover:bg-brand-100">
                <FaShoppingCart />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold leading-none shadow">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="mt-1 text-xs font-medium">{t('cart')}</span>
            </Link>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <Link href={`/${currentLocale}/profile`} className="flex flex-col items-center text-sm font-medium hover:text-brand-700">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-brand-50 overflow-hidden">
                  <Image
                    src="/default_profile.png"
                    alt={t('profile')}
                    width={32}
                    height={32}
                    className="object-cover rounded-full"
                  />
                  </div>
                  <span className="mt-1">{t('profile')}</span>
                </Link>
              ) : (
                <>
                  <Link href={`/${currentLocale}/signin`}>
                    <Button size="sm">{t('signIn')}</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
