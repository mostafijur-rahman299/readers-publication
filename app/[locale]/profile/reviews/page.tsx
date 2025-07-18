"use client"

import { Button } from '@/components/ui/button'
import { StarIcon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import useHttp from '@/hooks/useHttp'
import {API_ENDPOINTS} from '@/constants/apiEnds'
import Pagination from '@/components/pagination'


const Reviews = () => {
    const t = useTranslations("profile.reviews")
    const {sendRequests, isLoading} = useHttp()
    const [reviews, setReviews] = useState<any[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const locale = useLocale()

    const fetchReviews = (params: any = {}) => {
        sendRequests({
            url_info: {
                url: API_ENDPOINTS.BOOK_REVIEWS_LIST,  
            },
            params,
        }, (res: any) => {
            setReviews(res.results)
            setTotalPages(res.total_pages)
        })
    }

    useEffect(() => {
        fetchReviews({
                page: currentPage,
            })
    }, [currentPage])

    return (
        <div className="rounded-xl bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-xl font-semibold">{t("title")}</h2>

            <div className="space-y-6">
                {reviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4 hover:border-brand-600 transition-colors">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <Link href={`/${locale}/books/${review?.book?.slug}`}>
                                <Image
                                    src={review?.book?.cover_image || "/images/book-skeleton.jpg"}
                                    alt={review?.book?.title || "Book Cover"}
                                    width={120}
                                    height={180}
                                    className="rounded-md object-cover"
                                />
                                </Link>
                            </div>
                            <div className="flex-grow">
                                <div className="flex items-center justify-between mb-2">
                                    <Link href={`/${locale}/books/${review?.book?.slug}`} className="text-xl font-medium hover:text-brand-600">
                                        {locale === "bn" ? review?.book?.title_bn : review?.book?.title}
                                    </Link>
                                    <div className="flex items-center">
                                        <StarIcon className="h-5 w-5 text-yellow-400" />
                                        <span className="ml-1">{review?.rating}</span>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-600 mb-2">
                                    <Link href={`/${locale}/authors/${review.book?.author_name}`}>
                                        <p>{locale === "bn" ? review.book?.author_name_bn : review.book?.author_name}</p>
                                    </Link>
                                </div>
                                <div className="border-t pt-2 mt-2">
                                    <p className="text-gray-700">{review.review}</p>
                                    <div className="mt-2 text-sm text-gray-500">
                                        Review posted on: {review.created_at}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    )
}

export default Reviews