import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold">কাস্টমার কেয়ার</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-600 hover:text-teal-600">
                  সাহায্য
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-teal-600">
                  অর্ডার ট্র্যাকিং
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-teal-600">
                  শিপিং এবং ডেলিভারি
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-teal-600">
                  রিটার্ন পলিসি
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">আমাদের সম্পর্কে</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-600 hover:text-teal-600">
                  আমাদের সম্পর্কে
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-teal-600">
                  যোগাযোগ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-teal-600">
                  ক্যারিয়ার
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-teal-600">
                  প্রেস
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">পেমেন্ট মেথড</h3>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-8 w-16 rounded bg-gray-200"></div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">আমাদের সাথে যোগাযোগ করুন</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-teal-600">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-teal-600">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-teal-600">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-teal-600">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-600">ঠিকানা: ১২৩ বুক স্ট্রিট, ঢাকা, বাংলাদেশ</p>
            <p className="mt-2 text-sm text-gray-600">ফোন: +৮৮০ ১২৩৪৫৬৭৮৯০</p>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} গার্ডিয়ান পাবলিকেশন্স। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  )
}
