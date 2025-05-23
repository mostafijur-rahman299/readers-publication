"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useLocale, useTranslations } from "next-intl"

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const locale = useLocale()
  const t = useTranslations("header")

  const categories = [
    { id: 'fiction', label: 'উপন্যাস' },
    { id: 'story', label: 'গল্প' },
    { id: 'poetry', label: 'কবিতা' },
    { id: 'history', label: 'ইতিহাস' },
    { id: 'science', label: 'বিজ্ঞান' },
    { id: 'religion', label: 'ধর্ম' },
    { id: 'children', label: 'শিশু' },
    { id: 'biography', label: 'জীবনী' }
  ]

  const specialLinks = [
    { id: 'bestsellers', label: 'বেস্টসেলার বই' },
    { id: 'new-arrivals', label: 'নতুন প্রকাশিত' },
    { id: 'discounted', label: 'ছাড়ের বই' }
  ]

  const mainLinks = [
    { href: '', label: 'home' },
    { href: 'books', label: 'all_books' },
    { href: 'authors', label: 'writers' },
    { href: 'blog', label: 'blog' }
  ]

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  return (
    <nav className="bg-gradient-to-r from-brand-600 via-brand-500 to-brand-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        {/* Mobile Menu */}
        <div className="flex items-center justify-between lg:hidden">
          <Link href={`/${locale}`} className="py-4 text-lg font-semibold hover:text-brand-100 transition-colors">
            {t("home")}
          </Link>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-brand-500/20">
                <Menu className="h-6 w-6" />
                <span className="sr-only">{t("toggle_menu")}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85%] border-r-brand-200 bg-white p-0 sm:max-w-sm">
              <div className="flex h-16 items-center border-b px-6 bg-brand-50">
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className="mr-2 hover:bg-brand-100">
                  <X className="h-5 w-5" />
                  <span className="sr-only">{t("close_menu")}</span>
                </Button>
                <span className="text-lg font-bold text-brand-700">{t("menu")}</span>
              </div>
              <div className="py-4">
                <div className="space-y-1 px-6">
                  {mainLinks.map(link => (
                    <Link
                      key={link.href}
                      href={`/${locale}/${link.href}`}
                      className="block rounded-lg px-4 py-3 text-base font-medium text-gray-900 hover:bg-brand-50 hover:text-brand-600 transition-all"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t(link.label)}
                    </Link>
                  ))}
                  
                  <div className="py-1">
                    <button
                      onClick={() => toggleDropdown('categories')}
                      className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-gray-900 hover:bg-brand-50 hover:text-brand-600 transition-all"
                    >
                      <span>{t("categories")}</span>
                      <ChevronDown className={`h-5 w-5 transform transition-transform ${activeDropdown === 'categories' ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === 'categories' && (
                      <div className="ml-4 space-y-1 border-l-2 border-brand-100 pl-4">
                        {categories.map(category => (
                          <Link
                            key={category.id}
                            href={`/${locale}/categories/${category.id}`}
                            className="block rounded-lg px-4 py-2 text-base font-medium text-gray-600 hover:bg-brand-50 hover:text-brand-600 transition-all"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {t(category.label)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => toggleDropdown('special')}
                      className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-gray-900 hover:bg-brand-50 hover:text-brand-600 transition-all"
                    >
                      <span>{t("special_package")}</span>
                      <ChevronDown className={`h-5 w-5 transform transition-transform ${activeDropdown === 'special' ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === 'special' && (
                      <div className="ml-4 space-y-1 border-l-2 border-brand-100 pl-4">
                        {specialLinks.map(link => (
                          <Link
                            key={link.id}
                            href={`/${locale}/special/${link.id}`}
                            className="block rounded-lg px-4 py-2 text-base font-medium text-gray-600 hover:bg-brand-50 hover:text-brand-600 transition-all"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {t(link.label)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        

        {/* Desktop Menu */}
        <ul className="hidden flex-wrap items-center justify-between lg:flex">
           <li className="py-4">
              <Link 
                href={`/${locale}`} 
                className="text-base font-medium transition-colors hover:text-brand-100"
              >
                {t("home")}
              </Link>
            </li>

            <li className="py-4">
              <Link 
                href={`/${locale}/books`} 
                className="text-base font-medium transition-colors hover:text-brand-100"
              >
                {t("all_books")}
              </Link>
            </li>

          {/* Categories Dropdown */}
          <li className="group relative py-4">
            <button
              className="flex items-center text-base font-medium transition-colors hover:text-brand-100"
            >
              <span>{t("categories")}</span>
              <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="invisible absolute left-0 top-full z-10 grid-cols-1 gap-2 rounded-lg bg-white p-4 shadow-xl opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:translate-y-1 sm:grid sm:min-w-[400px] md:grid-cols-2">
              {categories.map(category => (
                <Link
                  key={category.id}
                  href={`/${locale}/categories/${category.id}`}
                  className="block px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-600 whitespace-nowrap"
                >
                  {category.label}
                </Link>
              ))}
            </div>
          </li>
          
          <li className="group relative py-4">
            <Link
              href={`/${locale}/special`}
              className="flex items-center text-base font-medium transition-colors hover:text-brand-100"
            >
              <span>{t("special_package")}</span>
              <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
            </Link>
            <div className="absolute left-0 top-full z-10 hidden min-w-[220px] animate-fadeIn rounded-lg bg-white py-2 shadow-xl group-hover:block">
              {specialLinks.map(link => (
                <Link
                  key={link.id}
                  href={`/${locale}/special/${link.id}`}
                  className="block px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </li>

          

            <li className="py-4">
              <Link 
                href={`/${locale}/authors`} 
                className="text-base font-medium transition-colors hover:text-brand-100"
              >
                {t("writers")}
              </Link>
            </li>

            <li className="py-4">
              <Link 
                href={`/${locale}`} 
                className="text-base font-medium transition-colors hover:text-brand-100"
              >
                {t("blog")}
              </Link>
            </li>

          
        </ul>
      </div>
    </nav>
  )
}
