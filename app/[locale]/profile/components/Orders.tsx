import { Clock, ShoppingBag } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Package } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const Orders = () => {

    // Mock orders data
  const orders = [
    {
      id: "ORD-12345",
      date: "১৫ মে, ২০২৪",
      status: "সম্পন্ন",
      total: "৳ ১,২৫০",
      items: 3,
    },
    {
      id: "ORD-12346",
      date: "২০ এপ্রিল, ২০২৪",
      status: "প্রক্রিয়াধীন",
      total: "৳ ৮৫০",
      items: 2,
    },
    {
      id: "ORD-12347",
      date: "৫ মার্চ, ২০২৪",
      status: "সম্পন্ন",
      total: "৳ ১,৫৫০",
      items: 4,
    },
  ]

    const t = useTranslations("profile.orders")
    return (
        <div className="rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">{t("title")}</h2>
                <div className="flex items-center space-x-2">
                    <select className="rounded-md border-gray-300 text-sm focus:border-brand-500 focus:ring-brand-500">
                        <option>{t("all_orders")}</option>
                        <option>{t("completed")}</option>
                        <option>{t("pending")}</option>
                        <option>{t("canceled")}</option>
                    </select>
                    <Button variant="outline" size="sm">
                        <Clock className="mr-1 h-4 w-4" />
                        {t("recent")}
                    </Button>
                </div>
            </div>

            {orders.length > 0 ? (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-md"
                        >
                            <div className="flex flex-wrap items-center justify-between border-b border-gray-100 p-4">
                                <div>
                                    <div className="flex items-center">
                                        <h3 className="font-medium text-gray-900">{order.id}</h3>
                                        <Badge
                                            className={`ml-2 ${order.status === "সম্পন্ন"
                                                    ? "bg-green-100 text-green-800"
                                                    : order.status === "প্রক্রিয়াধীন"
                                                        ? "bg-blue-100 text-blue-800"
                                                        : "bg-gray-100 text-gray-800"
                                                }`}
                                        >
                                            {order.status}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-gray-500">{order.date}</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="text-right">
                                        <p className="font-medium text-gray-900">{order.total}</p>
                                        <p className="text-sm text-gray-500">{order.items} আইটেম</p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="transition-colors group-hover:border-brand-500 group-hover:text-brand-600"
                                    >
                                        {t("view_details")}
                                    </Button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between bg-gray-50 px-4 py-2">
                                <div className="flex items-center">
                                    <Package className="mr-2 h-4 w-4 text-gray-400" />
                                    <span className="text-sm text-gray-500">
                                        {order.status === "সম্পন্ন"
                                            ? "আপনার অর্ডার সফলভাবে ডেলিভারি করা হয়েছে"
                                            : "আপনার অর্ডার প্রক্রিয়াধীন রয়েছে"}
                                    </span>
                                </div>
                                <Link
                                    href={`/orders/${order.id}/track`}
                                    className="text-sm font-medium text-brand-600 hover:text-brand-700"
                                >
                                    {t("track_order")}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 rounded-full bg-gray-100 p-6">
                        <ShoppingBag className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="mb-2 text-lg font-medium">{t("no_orders")}</h3>
                    <p className="mb-6 max-w-md text-gray-500">
                        {t("no_orders_message")}
                    </p>
                    <Button className="bg-brand-600 hover:bg-brand-700">
                        <Link href="/books">{t("browse_books")}</Link>
                    </Button>
                </div>
            )}
        </div>
    )
}

export default Orders