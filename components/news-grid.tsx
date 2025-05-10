import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function NewsGrid() {
  // Sample book data
  const books = [
    {
      id: 1,
      title: "নীল জোসনা",
      author: "হুমায়ূন আহমেদ",
      price: 350,
      originalPrice: 400,
      rating: 4.5,
      isNew: true,
      discount: 15,
    },
    {
      id: 2,
      title: "পথের পাঁচালী",
      author: "বিভূতিভূষণ বন্দ্যোপাধ্যায়",
      price: 280,
      originalPrice: 320,
      rating: 4.8,
      isNew: false,
      discount: 12,
    },
    {
      id: 3,
      title: "ফেলুদা সমগ্র",
      author: "সত্যজিৎ রায়",
      price: 550,
      originalPrice: 600,
      rating: 4.7,
      isNew: true,
      discount: 8,
    },
    {
      id: 4,
      title: "শেষের কবিতা",
      author: "রবীন্দ্রনাথ ঠাকুর",
      price: 250,
      originalPrice: 300,
      rating: 4.9,
      isNew: false,
      discount: 17,
    },
    {
      id: 5,
      title: "দেবী চৌধুরানী",
      author: "বঙ্কিমচন্দ্র চট্টোপাধ্যায়",
      price: 220,
      originalPrice: 250,
      rating: 4.3,
      isNew: false,
      discount: 12,
    },
    {
      id: 6,
      title: "আরণ্যক",
      author: "বিভূতিভূষণ বন্দ্যোপাধ্যায়",
      price: 300,
      originalPrice: 350,
      rating: 4.6,
      isNew: true,
      discount: 14,
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {books.map((book) => (
        <Link key={book.id} href={`/books/${book.id}`} className="group">
          <div className="relative mb-3 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 group-hover:shadow-card-hover">
            <div className="relative aspect-[3/4] w-full">
              <Image
                src={`/placeholder.svg?height=300&width=200&text=Book${book.id}`}
                alt={book.title}
                fill
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {book.isNew && <Badge className="absolute left-2 top-2 bg-red-500 text-white">নতুন</Badge>}
              {book.discount > 0 && (
                <Badge className="absolute right-2 top-2 bg-brand-500 text-white">-{book.discount}%</Badge>
              )}
            </div>
            <div className="p-3">
              <div className="mb-1 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(book.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-1 text-xs text-gray-600">{book.rating}</span>
              </div>
              <h3 className="line-clamp-1 text-sm font-medium transition-colors group-hover:text-brand-600">
                {book.title}
              </h3>
              <p className="text-xs text-gray-600">{book.author}</p>
              <div className="mt-2 flex items-center">
                <span className="text-sm font-semibold text-brand-600">৳ {book.price}</span>
                {book.originalPrice > book.price && (
                  <span className="ml-2 text-xs text-gray-500 line-through">৳ {book.originalPrice}</span>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
