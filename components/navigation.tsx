"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useLocale, useTranslations } from "next-intl"
import { useRouter, usePathname } from 'next/navigation';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const locale = useLocale()
  const t = useTranslations("header")
  const router = useRouter();
  const pathname = usePathname();
  const restOfPath = pathname.split('/').slice(2).join('/');

  const mainLinks = [
    { href: '', label: 'home' },
    { href: 'books', label: 'all_books' },
    { href: 'special-package', label: 'special_package' },
    { href: 'authors', label: 'writers' },
    { href: 'blog', label: 'blog' },
    { href: 'about', label: 'about_us' }
  ]

 const changeLanguage = (lang: string) => {
    const newPath = `/${lang}/${restOfPath}`;
    router.push(newPath);
  };

  return (
    <nav className="bg-gradient-to-r from-brand-600 via-brand-500 to-brand-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        {/* Mobile Menu */}
        <div className="flex items-center justify-between py-4 lg:hidden">
          {/* Logo / Home Link */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 text-xl font-bold text-white transition-colors hover:text-brand-100"
          >
            <span>{t("home")}</span>
          </Link>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-brand-500/20 focus-visible:ring-2 focus-visible:ring-brand-200"
                aria-label={t("toggle_menu")}
              >
                <Menu className="h-7 w-7" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[85%] max-w-xs border-r-0 bg-white p-0 shadow-lg"
            >
              {/* Sheet Header */}
              <div className="flex h-16 items-center gap-2 border-b bg-brand-50 px-6">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:bg-brand-100"
                  aria-label={t("close_menu")}
                >
                  <X className="h-5 w-5" />
                </Button>
                <span className="text-lg font-bold text-brand-700">{t("menu")}</span>
              </div>
              {/* Sheet Body */}
              <div className="py-4">
                <nav className="space-y-1 px-6">
                  {mainLinks.map(link => (
                    <Link
                      key={link.href}
                      href={`/${locale}/${link.href}`}
                      className="block rounded-lg px-4 py-3 text-base font-medium text-gray-900 transition-all hover:bg-brand-50 hover:text-brand-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t(link.label)}
                    </Link>
                  ))}
                </nav>

                {/* Language Switcher */}
                <div className="mt-8 flex items-center justify-center gap-3">
                  <span className={`text-sm font-medium ${locale === "en" ? "text-brand-700" : "text-gray-400"}`}>En</span>
                  <button
                    type="button"
                    aria-label="Switch language"
                    className={`relative h-6 w-12 rounded-full transition-colors duration-200 ${locale === "en" ? "bg-brand-600" : "bg-brand-400"}`}
                    onClick={() => changeLanguage(locale === "en" ? "bn" : "en")}
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ${
                        locale === "en" ? "left-1" : "left-6"
                      }`}
                    />
                  </button>
                  <span className={`text-sm font-medium ${locale === "bn" ? "text-brand-700" : "text-gray-400"}`}>বাংলা</span>
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
          {/* <li className="group relative py-4">
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
          </li> */}
          
          <li className="group relative py-4">
            <Link
              href={`/${locale}/special-package`}
              className="flex items-center text-base font-medium transition-colors hover:text-brand-100"
            >
              <span>{t("special_package")}</span>
            </Link>
            
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
                href={`/${locale}/blog`} 
                className="text-base font-medium transition-colors hover:text-brand-100"
              >
                {t("blog")}
              </Link>
            </li>

             <li className="py-4">
              <Link 
                href={`/${locale}/about`} 
                className="text-base font-medium transition-colors hover:text-brand-100"
              >
                {t("about_us")}
              </Link>
            </li>

          
        </ul>
      </div>
    </nav>
  )
}
