import { Button } from '@/components/ui/button'
import { StarIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'

const Reviews = () => {
    const t = useTranslations("profile.reviews")
    return (
        <div className="rounded-xl bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-xl font-semibold">{t("title")}</h2>

            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 rounded-full bg-gray-100 p-6">
                    <StarIcon className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="mb-2 text-lg font-medium">{t("no_reviews")}</h3>
                <p className="mb-6 max-w-md text-gray-500">
                    {t("no_reviews_message")}
                </p>
                <Button className="bg-brand-600 hover:bg-brand-700">
                    <Link href="/books">{t("browse_books")}</Link>
                </Button>
            </div>
        </div>
    )
}

export default Reviews