"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { useLocale, useTranslations } from "next-intl"
import useHttp from "@/hooks/useHttp";
import { API_ENDPOINTS } from "@/constants/apiEnds";
import { Loader2, ChevronDown, ChevronUp } from "lucide-react"

export default function BooksPage() {
  const t = useTranslations("books")
  const pt = useTranslations("pagination")
  const locale = useLocale()
  const { sendRequests: fetchCategories, isLoading: isLoadingCategories } = useHttp();
  const { sendRequests: fetchAuthors, isLoading: isLoadingAuthors } = useHttp();
  const { sendRequests: fetchBooks, isLoading: isLoadingBooks } = useHttp();
  const [categories, setCategories] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [pagination, setPagination] = useState<any>({
    page_number: 1,
    page_size: 20,
    total: 0,
    page_range: [],
  });
  const [filterParams, setFilterParams] = useState<any>({
    category: [],
    author: [],
    price: {
      min: 0,
      max: 0,
    },
  });
  const [sortBy, setSortBy] = useState<any>({
    recent: true,
    popular: false,
    price_low_to_high: false,
    price_high_to_low: false,
  });


  useEffect(() => {
		fetchCategories(
			{
				url_info: {
					url: API_ENDPOINTS.CATEGORIES,
				},
			},
			(res: any) => {
				setCategories(res);
			},
		);
	}, []);

  useEffect(() => {
		fetchAuthors(
			{
				url_info: {
					url: API_ENDPOINTS.AUTHORS,
				},
			},
			(res: any) => {
				setAuthors(res);
			},
		);
	}, []);

  const fetchBooksData = (pageNumber: number = 1, filterParams: any = {}) => {
    fetchBooks(
			{
				url_info: {
					url: API_ENDPOINTS.BOOKS,
				},
        params: {
          page: pageNumber,
          ...filterParams,
        },
			},
			(res: any) => {
				setBooks(res.results);
				setPagination({
					page_number: res.page_number,
					page_size: 20,
					total: res.count,
					page_range: res.page_range,
				});
			},
		);
  }

  useEffect(() => {
    fetchBooksData();
	}, []);
  
  const onChangeCategoryFilter = (e: any) => {
    if (e.target.checked) {
      setFilterParams({
        ...filterParams,
        category: [...filterParams.category, e.target.value],
      });
    } else {
      setFilterParams({
        ...filterParams,
        category: filterParams.category.filter((category: any) => category !== e.target.value),
      });
    }
  }

  const onChangeAuthorFilter = (e: any) => {
    if (e.target.checked) {
      setFilterParams({
        ...filterParams,
        author: [...filterParams.author, e.target.value],
      });
    } else {
      setFilterParams({ 
        ...filterParams,
        author: filterParams.author.filter((author: any) => author !== e.target.value),
      });
    }
  }

  const onChangePriceFilter = (e: any) => {
    if (e.target.name === "min") {
      setFilterParams({
        ...filterParams,
        price: {
          min: e.target.value || 0,
          max: filterParams.price.max,
        },
      });
    } else {
      setFilterParams({
        ...filterParams,
        price: {
          min: filterParams.price.min,
          max: e.target.value || 0,
        },
      });
    }
  }

  const onChangeSortBy = (e: any) => {
    setSortBy({
      recent: false,
      popular: false,
      price_low_to_high: false,
      price_high_to_low: false,
      [e.target.value]: true,
    });
    fetchBooksData(1, {
      ...filterParams,
      sort_by: e.target.value,
    });
  }

  const onApplyFilter = () => {
    let sortByValue = "";
    if (sortBy.recent) {
      sortByValue = "recent";
    } else if (sortBy.popular) {
      sortByValue = "popular";
    } else if (sortBy.price_low_to_high) {
      sortByValue = "price_low_to_high";
    } else if (sortBy.price_high_to_low) {
      sortByValue = "price_high_to_low";
    }

    fetchBooksData(1, {
      ...filterParams,
      sort_by: sortByValue,
    });
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with logo, search and icons */}
      <Header />

      {/* Main navigation */}
      <Navigation />

      {/* Books listing */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h1 className="mb-6 text-2xl font-bold text-teal-600">{t("title")}</h1>

          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
            {/* Mobile Filter Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex w-full items-center justify-between rounded-lg border p-4 bg-white"
              >
                <h3 className="text-lg font-semibold">{t("filter")}</h3>
                {isFilterOpen ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Filter Section */}
            <div className={`col-span-1 rounded-lg border p-4 bg-white ${
              isFilterOpen ? 'block' : 'hidden'
            } md:block md:h-[600px]`}>
              <h3 className="hidden md:block text-lg font-semibold mb-4">{t("filter")}</h3>

              <div className="md:h-[calc(100%-2rem)] md:overflow-y-auto">
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 font-medium">{t("category")}</h4>
                    <div className="space-y-2">
                      {isLoadingCategories && (
                        <div className="flex items-center justify-center">
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                      ) }

                      {categories.length === 0 && !isLoadingCategories && (
                        <div className="flex items-center justify-center">
                          <p className="text-sm text-gray-600">No categories found</p>
                        </div>
                      )}
                      
                      {categories.length > 0 && categories.map((category) => (
                        <div key={category.slug} className="flex items-center">
                          <input 
                            onChange={onChangeCategoryFilter}
                            type="checkbox" 
                            id={category.id} 
                            className="mr-2 h-4 w-4" 
                            value={category.id} 
                          />
                          <label htmlFor={category.name} className="text-sm">
                            {locale === "bn" ? category.name_bn : category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 font-medium">{t("author")}</h4>
                    <div className="space-y-2">
                      {isLoadingAuthors && (
                        <div className="flex items-center justify-center">
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                      )}

                      {authors.length === 0 && !isLoadingAuthors && (
                        <div className="flex items-center justify-center">
                          <p className="text-sm text-gray-600">No authors found</p>
                        </div>
                      )}

                      {authors.length > 0 && authors.map((author) => (
                        <div key={author.id} className="flex items-center">
                          <input 
                            onChange={onChangeAuthorFilter}
                            type="checkbox" 
                            id={author.id.toString()} 
                            className="mr-2 h-4 w-4" 
                            value={author.id} 
                          />
                          <label htmlFor={author.id.toString()} className="text-sm">
                            {locale === "bn" ? author.name_bn : author.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 font-medium">{t("price")}</h4>
                    <div className="flex items-center space-x-2">
                      <Input onChange={onChangePriceFilter} name="min" type="number" placeholder={t("min")} className="w-full" />
                      <span>-</span>
                      <Input onChange={onChangePriceFilter} name="max" type="number" placeholder={t("max")} className="w-full" />
                    </div>
                    <Button onClick={onApplyFilter} className="mt-2 w-full bg-teal-600 hover:bg-teal-700">{t("apply")}</Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-3">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  {t("total")} <span className="font-semibold">{pagination.total}</span> {t("books")}
                </p>
                <select onChange={onChangeSortBy} name="sort_by" className="rounded-md border border-gray-300 px-3 py-1 text-sm">
                  <option value="recent">{t("recent")}</option>
                  <option value="popular">{t("popular")}</option>
                  <option value="price_low_to_high">{t("price_low_to_high")}</option>
                  <option value="price_high_to_low">{t("price_high_to_low")}</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {books.length === 0 && !isLoadingBooks && (
                  <div className="flex items-center justify-center">
                    <p className="text-sm text-gray-600">No books found</p>
                  </div>
                )}

                {isLoadingBooks && (
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                )}

                {books.length > 0 && books.map((book) => (
                  <Link key={book.id} href={`/books/${book.slug}`} className="group">
                    <div className="mb-3 overflow-hidden rounded-md border border-gray-200 relative">
                      {book.discounted_price && book.discounted_price < book.price && (
                        <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                          {Math.round(((book.price - book.discounted_price) / book.price) * 100)}% OFF
                        </div>
                      )}
                      <Image
                        src={book.cover_image ? book.cover_image : "/images/book-skeleton.jpg"}
                        alt={book.title}
                        width={180}
                        height={250}
                        className="h-auto w-full transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="h-20 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-medium group-hover:text-teal-600 line-clamp-2">{locale === "bn" ? book.title_bn : book.title}</h3>
                        <p className="text-xs text-gray-600 line-clamp-1">{locale === "bn" ? book.author_full_name_bn : book.author_full_name}</p>
                      </div>
                      <div className="mt-1">
                        {book.discounted_price && book.discounted_price < book.price ? (
                          <p className="text-sm font-semibold text-teal-600">৳ {book.discounted_price} <span className="text-xs text-gray-600 line-through">৳ {book.price}</span></p>
                        ) : (
                          <p className="text-sm font-semibold text-teal-600">৳ {book.price}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto max-w-[calc(100vw-2rem)] px-2 sm:px-4 py-2">
                  <button 
                    className="min-w-[4rem] sm:min-w-[5rem] rounded-md border px-2 py-1 text-xs sm:px-3 sm:py-2 md:text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex-shrink-0" 
                    disabled={pagination.page_number === 1}
                    onClick={() => fetchBooksData(pagination.page_number - 1)}
                  >
                    {pt("previous")}
                  </button>
                  {pagination.page_range.map((pageNumber: number) => {
                    const currentPage = pagination.page_number;
                    const totalPages = pagination.page_range.length;
                    
                    // Responsive page number display logic
                    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
                    const isTablet = typeof window !== 'undefined' && window.innerWidth >= 640 && window.innerWidth < 1024;
                    
                    const visibleRange = isMobile ? 1 : isTablet ? 2 : 3;
                    
                    const shouldShow = 
                      pageNumber === 1 || 
                      pageNumber === totalPages || 
                      Math.abs(pageNumber - currentPage) <= visibleRange;
                    
                    const showEllipsisBefore = pageNumber === currentPage - visibleRange && pageNumber > 2;
                    const showEllipsisAfter = pageNumber === currentPage + visibleRange && pageNumber < totalPages - 1;
                    
                    return (
                      <React.Fragment key={pageNumber}>
                        {showEllipsisBefore && (
                          <span className="px-1 sm:px-2 text-xs md:text-sm flex items-center">...</span>
                        )}
                        {shouldShow && (
                          <button
                            className={`min-w-[2rem] sm:min-w-[2.5rem] rounded-md px-2 py-1 text-xs sm:px-3 sm:py-2 md:text-sm transition-colors duration-200 ${
                              pagination.page_number === pageNumber
                                ? 'bg-teal-600 text-white hover:bg-teal-700'
                                : 'border hover:bg-gray-100'
                            }`}
                            onClick={() => fetchBooksData(pageNumber)}
                          >
                            {pageNumber}
                          </button>
                        )}
                        {showEllipsisAfter && (
                          <span className="px-1 sm:px-2 text-xs md:text-sm flex items-center">...</span>
                        )}
                      </React.Fragment>
                    );
                  })}
                  <button 
                    className="min-w-[4rem] sm:min-w-[5rem] rounded-md border px-2 py-1 text-xs sm:px-3 sm:py-2 md:text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex-shrink-0" 
                    disabled={pagination.page_number === pagination.page_range.length}
                    onClick={() => fetchBooksData(pagination.page_number + 1)}
                  >
                    {pt("next")}
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
