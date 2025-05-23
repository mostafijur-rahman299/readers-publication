"use client"

import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProfileDropdown } from "@/components/profile-dropdown"
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface HeaderProps {
  isLoggedIn?: boolean
  userName?: string
}

export function Header({ isLoggedIn = false, userName = "" }: HeaderProps) {
  const t = useTranslations('header');
  const router = useRouter();
  const pathname = usePathname(); // e.g., /en/about

  const currentLocale = pathname.split('/')[1]; // 'en' or 'bn'
  const restOfPath = pathname.split('/').slice(2).join('/'); // 'about' or ''

  const changeLanguage = (lang: string) => {
    const newPath = `/${lang}/${restOfPath}`;
    router.push(newPath);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="mr-6 transition-transform hover:scale-105">
            <div className="relative h-12 w-32">
              <Image src="/logo.png" alt="Logo" fill className="object-contain" priority />
            </div>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex flex-1 items-center justify-center px-4 md:max-w-md">
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

        {/* Language and Support */}
        <div className="flex items-center space-x-6">
          {/* Language */}
          <div className="flex items-center">
            <span className="mr-2 text-sm font-medium">En</span>
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
            <span className="ml-2 text-sm font-medium">বাংলা</span>
          </div>
          
          {/* Support */}
          <Link
            href="/support"
            className="group flex flex-col items-center transition-transform hover:scale-105"
            aria-label={t('support')}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 p-1.5 text-brand-600 transition-colors group-hover:bg-brand-100">
              <Image src="/icons/headphones.png" alt={t('support')} width={20} height={20} />
            </div>
            <span className="mt-1 text-xs font-medium">{t('support')}</span>
          </Link>
          <Link
            href="/wishlist"
            className="group flex flex-col items-center transition-transform hover:scale-105"
            aria-label={t('wishlist')}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 p-1.5 text-brand-600 transition-colors group-hover:bg-brand-100">
              <Image src="/icons/gift.png" alt={t('wishlist')} width={20} height={20} />
            </div>
            <span className="mt-1 text-xs font-medium">{t('wishlist')}</span>
          </Link>
          <Link
            href="/cart"
            className="group flex flex-col items-center transition-transform hover:scale-105"
            aria-label={t('cart')}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 p-1.5 text-brand-600 transition-colors group-hover:bg-brand-100">
              <Image src="/icons/cart.png" alt={t('cart')} width={20} height={20} />
            </div>
            <span className="mt-1 text-xs font-medium">{t('cart')}</span>
          </Link>
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">{userName}</span>
              <Button variant="outline" size="sm" onClick={() => {}}>
                {t('logout')}
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/signin" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                {t('signIn')}
              </Link>
              <Link href="/signup">
                <Button size="sm">{t('signUp')}</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
