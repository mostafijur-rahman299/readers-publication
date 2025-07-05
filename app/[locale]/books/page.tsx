"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { useLocale, useTranslations } from "next-intl"
import useHttp from "@/hooks/useHttp"
import { API_ENDPOINTS } from "@/constants/apiEnds"
import {
  Loader2,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  ShoppingCart,
  Plus,
} from "lucide-react"
import useCart from "@/hooks/useCart"

// Loading skeleton component
const BookCardSkeleton = () => (
  <div className="group">
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="aspect-[3/4] bg-gray-200 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse" />
        <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
      </div>
    </div>
  </div>
)

// Filter section component
const FilterSection = ({
  categories,
  authors,
  filterParams,
  onCategoryChange,
  onAuthorChange,
  onPriceChange,
  onClearFilters,
  isLoadingCategories,
  isLoadingAuthors,
  locale,
  t,
}: {
  categories: any[]
  authors: any[]
  filterParams: any
  onCategoryChange: (categoryId: string, checked: boolean) => void
  onAuthorChange: (authorId: string, checked: boolean) => void
  onPriceChange: (type: "min" | "max", value: string) => void
  onClearFilters: () => void
  isLoadingCategories: boolean
  isLoadingAuthors: boolean
  locale: string
  t: (key: string) => string
}) => {
  const activeFiltersCount =
    filterParams.category.length +
    filterParams.author.length +
    (filterParams.price.min > 0 || filterParams.price.max > 0 ? 1 : 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{t("filter")}</h3>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <X className="h-4 w-4 mr-1" />
            Clear ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">{t("category")}</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {isLoadingCategories ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          ) : categories.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-2">No categories found</p>
          ) : (
            categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={filterParams.category.includes(category.id.toString())}
                  onCheckedChange={(checked) => onCategoryChange(category.id.toString(), checked)}
                />
                <label htmlFor={`category-${category.id}`} className="text-sm text-gray-700 cursor-pointer flex-1">
                  {locale === "bn" ? category.name_bn : category.name}
                </label>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Authors */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">{t("author")}</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {isLoadingAuthors ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          ) : authors.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-2">No authors found</p>
          ) : (
            authors.map((author) => (
              <div key={author.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`author-${author.id}`}
                  checked={filterParams.author.includes(author.id.toString())}
                  onCheckedChange={(checked) => onAuthorChange(author.id.toString(), checked)}
                />
                <label htmlFor={`author-${author.id}`} className="text-sm text-gray-700 cursor-pointer flex-1">
                  {locale === "bn" ? author.name_bn : author.name}
                </label>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">{t("price")}</h4>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder={t("min")}
            value={filterParams.price.min || ""}
            onChange={(e) => onPriceChange("min", e.target.value)}
            className="text-sm"
          />
          <Input
            type="number"
            placeholder={t("max")}
            value={filterParams.price.max || ""}
            onChange={(e) => onPriceChange("max", e.target.value)}
            className="text-sm"
          />
        </div>
      </div>
    </div>
  )
}

// Book card component
const BookCard = ({ book, locale }: { book: any, locale: string }) => {
  const { addToCart } = useCart()
  
  const discountPercentage =
    book.discounted_price && book.discounted_price < book.price
      ? Math.round(((book.price - book.discounted_price) / book.price) * 100)
      : 0


  const handleAddToCart = (book: any) => {
    let bookData = {
      quantity: 1,
      book_details: {
        id: book.id,
        slug: book.slug,
        title: book.title,
        title_bn: book.title_bn,
        cover_image: book.cover_image,
        price: book.price,
        discounted_price: book.discounted_price,
        is_available: book.is_available,
      },
      author_details: {
        id: book.author_id,
        slug: book.author_slug,
        name: book.author_full_name,
        name_bn: book.author_full_name_bn,
      }
    }
    addToCart(bookData, 1)
  }

  return (
    
    <div className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group-hover:border-teal-200 relative">
      <div className="relative aspect-[3/4] bg-gray-50">
        {discountPercentage > 0 && (
          <Badge className="absolute top-2 left-2 z-10 bg-red-500 hover:bg-red-500 text-white text-xs font-bold">
            {discountPercentage}% OFF
          </Badge>
        )}

        {/* Cart Button */}
        <Button
          size="sm"
          onClick={() => handleAddToCart(book)}
          className="absolute top-2 right-2 z-10 h-8 w-8 p-0 bg-white/90 hover:bg-white text-teal-600 hover:text-teal-700 shadow-sm border border-gray-200 hover:border-teal-300 opacity-0 group-hover:opacity-100 transition-all duration-200"
          title="Add to cart"
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
        <Link href={`/${locale}/books/${book.slug}`}>
        <Image
          src={book.cover_image || "/images/book-skeleton.jpg"}
          alt={book.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
        />
        </Link>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-teal-600 transition-colors text-sm leading-tight">
          <Link href={`/${locale}/books/${book.slug}`}>
            {locale === "bn" ? book.title_bn : book.title}
          </Link>
        </h3>
        <p className="text-xs text-gray-600 line-clamp-1">
          <Link href={`/${locale}/authors/${book.author_slug}`}>
            {locale === "bn" ? book.author_full_name_bn : book.author_full_name}
          </Link>
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {book.discounted_price && book.discounted_price < book.price ? (
              <>
                <span className="font-semibold text-teal-600 text-sm">৳{book.discounted_price}</span>
                <span className="text-xs text-gray-500 line-through">৳{book.price}</span>
              </>
            ) : (
              <span className="font-semibold text-teal-600 text-sm">৳{book.price}</span>
            )}
          </div>

          {/* Mobile Cart Button */}
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="h-7 w-7 p-0 bg-teal-600 hover:bg-teal-700 text-white sm:hidden"
            title="Add to cart"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function BooksPage() {
  const t = useTranslations("books")
  const pt = useTranslations("pagination")
  const locale = useLocale()

  const { sendRequests: fetchCategories, isLoading: isLoadingCategories } = useHttp()
  const { sendRequests: fetchAuthors, isLoading: isLoadingAuthors } = useHttp()
  const { sendRequests: fetchBooks, isLoading: isLoadingBooks } = useHttp()

  const [categories, setCategories] = useState<any[]>([])
  const [authors, setAuthors] = useState<any[]>([])
  const [books, setBooks] = useState<any[]>([])

  const [pagination, setPagination] = useState({
    current_page: 1,
    page_size: 20,
    total: 0,
    page_range: [],
  })

  const [filterParams, setFilterParams] = useState({
    category: [],
    author: [],
    price: { min: 0, max: 0 },
  })

  const [sortBy, setSortBy] = useState("recent")

  // Debounced filter application
  const [filterTimeout, setFilterTimeout] = useState<NodeJS.Timeout | null>(null)

  const applyFilters = useCallback(
    (pageNumber = 1) => {
      const params = {
        page: pageNumber,
        ...filterParams,
        sort_by: sortBy,
      }

      fetchBooks(
        {
          url_info: { url: API_ENDPOINTS.BOOKS },
          params,
        },
        (res) => {
          setBooks(res.results)
          setPagination({
            current_page: res.current_page,
            page_size: 20,
            total: res.count,
            page_range: res.page_range,
          })
        },
      )
    },
    [filterParams, sortBy, fetchBooks],
  )

  // Auto-apply filters with debounce
  useEffect(() => {
    if (filterTimeout) {
      clearTimeout(filterTimeout)
    }

    const timeout = setTimeout(() => {
      applyFilters(1)
    }, 500)

    setFilterTimeout(timeout)

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [filterParams, sortBy])

  // Initial data fetching
  useEffect(() => {
    fetchCategories({ url_info: { url: API_ENDPOINTS.CATEGORIES } }, (res) => setCategories(res))

    fetchAuthors({ url_info: { url: API_ENDPOINTS.AUTHORS } }, (res) => setAuthors(res))

    applyFilters()
  }, [])

  // Filter handlers
  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setFilterParams((prev) => ({
      ...prev,
      category: checked ? [...prev.category, categoryId] : prev.category.filter((id) => id !== categoryId),
    }))
  }

  const handleAuthorChange = (authorId: string, checked: boolean) => {
    setFilterParams((prev) => ({
      ...prev,
      author: checked ? [...prev.author, authorId] : prev.author.filter((id) => id !== authorId),
    }))
  }

  const handlePriceChange = (type: "min" | "max", value: string) => {
    setFilterParams((prev) => ({
      ...prev,
      price: {
        ...prev.price,
        [type]: value ? Number.parseInt(value) : 0,
      },
    }))
  }

  const handleClearFilters = () => {
    setFilterParams({
      category: [],
      author: [],
      price: { min: 0, max: 0 },
    })
  }

  const handlePageChange = (page: number) => {
    if (page !== pagination.current_page && page > 0 && page <= Math.ceil(pagination.total / pagination.page_size)) {
      applyFilters(page)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const getPageNumbers = () => {
    const totalPages = Math.ceil(pagination.total / pagination.page_size)
    const current = pagination.current_page
    const delta = 2
    const range = []
    const rangeWithDots = []
    let l

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= current - delta && i <= current + delta)) {
        range.push(i)
      }
    }

    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1)
        } else if (i - l !== 1) {
          rangeWithDots.push("...")
        }
      }
      rangeWithDots.push(i)
      l = i
    }

    return rangeWithDots
  }

  const activeFiltersCount =
    filterParams.category.length +
    filterParams.author.length +
    (filterParams.price.min > 0 || filterParams.price.max > 0 ? 1 : 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      <main className="container mx-auto px-4 py-6 lg:py-8">
        {/* Page Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{t("title")}</h1>
          <p className="text-gray-600">
            {t("total")} <span className="font-semibold text-teal-600">{pagination.total}</span> {t("books")}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
              <FilterSection
                categories={categories}
                authors={authors}
                filterParams={filterParams}
                onCategoryChange={handleCategoryChange}
                onAuthorChange={handleAuthorChange}
                onPriceChange={handlePriceChange}
                onClearFilters={handleClearFilters}
                isLoadingCategories={isLoadingCategories}
                isLoadingAuthors={isLoadingAuthors}
                locale={locale}
                t={t}
              />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile/Tablet Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              {/* Mobile Filter Button */}
              <div className="flex items-center gap-3 lg:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="relative bg-transparent">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      {t("filter")}
                      {activeFiltersCount > 0 && (
                        <Badge className="ml-2 h-5 w-5 p-0 text-xs bg-teal-600">{activeFiltersCount}</Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>{t("filter")}</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSection
                        categories={categories}
                        authors={authors}
                        filterParams={filterParams}
                        onCategoryChange={handleCategoryChange}
                        onAuthorChange={handleAuthorChange}
                        onPriceChange={handlePriceChange}
                        onClearFilters={handleClearFilters}
                        isLoadingCategories={isLoadingCategories}
                        isLoadingAuthors={isLoadingAuthors}
                        locale={locale}
                        t={t}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">{t("recent")}</SelectItem>
                  <SelectItem value="popular">{t("popular")}</SelectItem>
                  <SelectItem value="price_low_to_high">{t("price_low_to_high")}</SelectItem>
                  <SelectItem value="price_high_to_low">{t("price_high_to_low")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6 p-4 bg-teal-50 rounded-lg border border-teal-200">
                <span className="text-sm font-medium text-teal-800">Active filters:</span>
                {filterParams.category.map((categoryId) => {
                  const category = categories.find((c) => c.id.toString() === categoryId)
                  return category ? (
                    <Badge key={categoryId} variant="secondary" className="bg-teal-100 text-teal-800">
                      {locale === "bn" ? category.name_bn : category.name}
                      <X
                        className="h-3 w-3 ml-1 cursor-pointer"
                        onClick={() => handleCategoryChange(categoryId, false)}
                      />
                    </Badge>
                  ) : null
                })}
                {filterParams.author.map((authorId) => {
                  const author = authors.find((a) => a.id.toString() === authorId)
                  return author ? (
                    <Badge key={authorId} variant="secondary" className="bg-teal-100 text-teal-800">
                      {locale === "bn" ? author.name_bn : author.name}
                      <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handleAuthorChange(authorId, false)} />
                    </Badge>
                  ) : null
                })}
                {(filterParams.price.min > 0 || filterParams.price.max > 0) && (
                  <Badge variant="secondary" className="bg-teal-100 text-teal-800">
                    ৳{filterParams.price.min || 0} - ৳{filterParams.price.max || "∞"}
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() => setFilterParams((prev) => ({ ...prev, price: { min: 0, max: 0 } }))}
                    />
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className="text-teal-700 hover:text-teal-800 hover:bg-teal-100 ml-2"
                >
                  Clear all
                </Button>
              </div>
            )}

            {/* Books Grid */}
            <div className="mb-8">
              {isLoadingBooks ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <BookCardSkeleton key={i} />
                  ))}
                </div>
              ) : books.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Filter className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
                  <Button onClick={handleClearFilters} variant="outline">
                    Clear filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
                  {books.map((book) => (
                    <BookCard key={book.slug} book={book} locale={locale} />
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            {pagination.total > pagination.page_size && (
              <div className="flex justify-center">
                <nav className="flex items-center space-x-1" aria-label="Pagination">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.current_page - 1)}
                    disabled={pagination.current_page === 1}
                    className="flex items-center gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">{pt("previous")}</span>
                  </Button>

                  <div className="flex items-center space-x-1">
                    {getPageNumbers().map((page, idx) =>
                      page === "..." ? (
                        <span key={idx} className="px-2 py-1 text-gray-400">
                          ...
                        </span>
                      ) : (
                        <Button
                          key={page}
                          variant={page === pagination.current_page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className="w-10 h-10 p-0"
                          aria-current={page === pagination.current_page ? "page" : undefined}
                        >
                          {page}
                        </Button>
                      ),
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.current_page + 1)}
                    disabled={pagination.current_page === Math.ceil(pagination.total / pagination.page_size)}
                    className="flex items-center gap-1"
                  >
                    <span className="hidden sm:inline">{pt("next")}</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
