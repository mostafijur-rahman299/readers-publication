import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, BookOpen, Package, Star } from "lucide-react"

export default function Component() {
  const packageInfo = {
    title: "মুসলিম লাইফস্টাইল",
    subtitle: "বুকস প্যাকেজ",
    totalBooks: 5,
    originalPrice: 1500,
    packagePrice: 1200,
    discount: 20,
    savings: 300,
    rating: 4.8,
    reviews: 156,
  }

  const includedBooks = [
    {
      id: 1,
      title: "ইসলামী জীবনযাত্রা",
      author: "মাওলানা আবুল কালাম আজাদ",
      description: "দৈনন্দিন জীবনে ইসলামী নীতিমালা ও আদর্শের প্রয়োগ। একজন মুসলিমের জীবনযাত্রার সকল দিক নিয়ে বিস্তারিত ���লোচনা।",
      pages: 240,
      originalPrice: 320,
      image: "/placeholder.svg?height=80&width=60",
    },
    {
      id: 2,
      title: "কুরআনের আলোকে পারিবারিক জীবন",
      author: "ড. আহমদ হাসান",
      description: "ইসলামী পারিবারিক মূল্যবোধ ও দাম্পত্য জীবনের নির্দেশনা। পবিত্র কুরআন ও হাদীসের আলোকে পারিবারিক সুখ-শান্তির উপায়।",
      pages: 180,
      originalPrice: 280,
      image: "/placeholder.svg?height=80&width=60",
    },
    {
      id: 3,
      title: "হালাল উপার্জন ও ব্যবসা",
      author: "মাওলানা মুহাম্মদ আলী",
      description: "ইসলামী অর্থনীতি ও হালাল ব্যবসার নীতিমালা। আধুনিক যুগে কীভাবে হালাল উপার্জন করা যায় তার বিস্তারিত দিকনির্দেশনা।",
      pages: 200,
      originalPrice: 350,
      image: "/placeholder.svg?height=80&width=60",
    },
    {
      id: 4,
      title: "নামাজ ও যিকিরের ফজিলত",
      author: "হাফেজ আব্দুর রহমান",
      description: "পাঁচ ওয়াক্ত নামাজের গুরুত্ব ও বিভিন্ন যিকির-আযকারের ফজিলত। আধ্যাত্মিক উন্নতির জন্য প্রয়োজনীয় আমল ও দোয়া।",
      pages: 160,
      originalPrice: 250,
      image: "/placeholder.svg?height=80&width=60",
    },
    {
      id: 5,
      title: "ইসলামী শিষ্টাচার ও আদব",
      author: "মাওলানা সাইয়েদ আহমদ",
      description: "ইসলামী শিষ্টাচার, আদব-কায়দা ও সামাজিক আচরণবিধি। মুসলিম সমাজে কীভাবে আদর্শ চরিত্র গঠন করা যায়।",
      pages: 140,
      originalPrice: 300,
      image: "/placeholder.svg?height=80&width=60",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Package Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-t-lg p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-white/30">
              <Package className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{packageInfo.title}</h1>
              <p className="text-lg opacity-90">{packageInfo.subtitle}</p>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm ml-1">{packageInfo.rating}</span>
                </div>
                <span className="text-sm opacity-75">({packageInfo.reviews} রিভিউ)</span>
              </div>
            </div>
          </div>

          {/* Package Books Preview */}
          <div className="flex space-x-2 items-end">
            {includedBooks.slice(0, 5).map((book, i) => (
              <div
                key={book.id}
                className="bg-white/15 backdrop-blur-sm rounded-lg p-2 border border-white/20 transform hover:scale-105 transition-transform"
              >
                <Image
                  src={book.image || "/placeholder.svg"}
                  alt={book.title}
                  width={45}
                  height={60}
                  className="rounded shadow-lg"
                />
              </div>
            ))}
          </div>

          <div className="text-right">
            <Badge className="bg-red-500 text-white mb-2">{packageInfo.discount}% ছাড়</Badge>
            <p className="text-sm opacity-90 line-through">৳ {packageInfo.originalPrice}</p>
            <p className="text-2xl font-bold">৳ {packageInfo.packagePrice}</p>
            <p className="text-sm opacity-90">সাশ্রয়: ৳ {packageInfo.savings}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm opacity-90">
          <span>{packageInfo.totalBooks}টি বই সহ সম্পূর্ণ প্যাকেজ</span>
          <span>ফ্রি হোম ডেলিভারি</span>
        </div>
      </div>

      {/* Package Contents */}
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">প্যাকেজে অন্তর্ভুক্ত বইসমূহ</h2>
          <p className="text-sm text-gray-600">এই প্যাকেজে মোট {packageInfo.totalBooks}টি বই রয়েছে</p>
        </div>

        <div className="space-y-3">
          {includedBooks.map((book, index) => (
            <Card key={book.id} className="hover:shadow-md transition-all duration-200 border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={book.image || "/placeholder.svg"}
                      alt={book.title}
                      width={60}
                      height={80}
                      className="rounded shadow-sm"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-800 mb-1">{book.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">লেখক: {book.author}</p>
                        <p className="text-sm text-gray-700 leading-relaxed mb-2">{book.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>পৃষ্ঠা: {book.pages}</span>
                          <span>•</span>
                          <span>মূল মূল্য: ৳ {book.originalPrice}</span>
                        </div>
                      </div>

                      <div className="flex-shrink-0 text-right ml-4">
                        <Badge variant="outline" className="mb-2">
                          বই #{index + 1}
                        </Badge>
                        <p className="text-sm text-gray-500">প্যাকেজে অন্তর্ভুক্ত</p>
                        <div className="text-green-600 font-medium text-sm">✓ অন্তর্ভুক্ত</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Package Summary */}
        <Card className="mt-6 bg-gray-50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-800">প্যাকেজ সারসংক্ষেপ</h3>
                <p className="text-sm text-gray-600">
                  মোট {packageInfo.totalBooks}টি বই • {includedBooks.reduce((sum, book) => sum + book.pages, 0)} পৃষ্ঠা
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 line-through">মোট মূল্য: ৳ {packageInfo.originalPrice}</p>
                <p className="text-xl font-bold text-green-600">প্যাকেজ মূল্য: ৳ {packageInfo.packagePrice}</p>
                <p className="text-sm text-green-600 font-medium">আপনার সাশ্রয়: ৳ {packageInfo.savings}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Action Buttons */}
      <div className="grid grid-cols-3 gap-0 rounded-b-lg overflow-hidden">
        <Button className="bg-red-500 hover:bg-red-600 rounded-none py-4 text-white font-medium">
          <ShoppingCart className="h-4 w-4 mr-2" />
          প্যাকেজ অর্ডার করুন
        </Button>
        <Button className="bg-blue-500 hover:bg-blue-600 rounded-none py-4 text-white font-medium">
          <Heart className="h-4 w-4 mr-2" />
          উইশলিস্টে রাখুন
        </Button>
        <Button className="bg-green-600 hover:bg-green-700 rounded-none py-4 text-white font-medium">
          <BookOpen className="h-4 w-4 mr-2" />
          বিস্তারিত দেখুন
        </Button>
      </div>
    </div>
  )
}
