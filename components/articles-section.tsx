import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User } from "lucide-react"
import useHttp from "@/hooks/useHttp"
import { useLocale, useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { API_ENDPOINTS } from "@/constants/apiEnds"

const articles = [
  {
    id: 1,
    title: "বাংলা সাহিত্যের নতুন দিগন্ত",
    excerpt: "আধুনিক বাংলা সাহিত্যে নতুন লেখকদের অবদান এবং তাদের লেখার ধরন নিয়ে বিস্তারিত আলোচনা।",
    image: "/placeholder.svg?height=200&width=300",
    author: "রহিম উদ্দিন",
    date: "১৫ ডিসেম্বর, ২০২৪",
    category: "সাহিত্য",
    readTime: "৫ মিনিট",
  },
  {
    id: 2,
    title: "কবিতার জগতে নতুন আবিষ্কার",
    excerpt: "সমসাময়িক কবিতার ধারা এবং নতুন কবিদের সৃজনশীল কাজের পর্যালোচনা।",
    image: "/placeholder.svg?height=200&width=300",
    author: "ফাতেমা খাতুন",
    date: "১২ ডিসেম্বর, ২০২৪",
    category: "কবিতা",
    readTime: "৪ মিনিট",
  },
  {
    id: 3,
    title: "ইতিহাসের পাতায় হারিয়ে যাওয়া গল্প",
    excerpt: "বাংলার ইতিহাসের অজানা কিছু ঘটনা এবং তার প্রভাব আজকের সমাজে।",
    image: "/placeholder.svg?height=200&width=300",
    author: "করিম আহমেদ",
    date: "১০ ডিসেম্বর, ২০২৪",
    category: "ইতিহাস",
    readTime: "৭ মিনিট",
  },
  {
    id: 4,
    title: "শিশু সাহিত্যের গুরুত্ব",
    excerpt: "শিশুদের মানসিক বিকাশে সাহিত্যের ভূমিকা এবং উপযুক্ত বই নির্বাচনের গুরুত্ব।",
    image: "/placeholder.svg?height=200&width=300",
    author: "সালমা বেগম",
    date: "৮ ডিসেম্বর, ২০২৪",
    category: "শিশু সাহিত্য",
    readTime: "৬ মিনিট",
  }
]

export function ArticlesSection({generalData}: {generalData: any}) {
  const [articles, setArticles] = useState<any[]>([])
  const {sendRequests: fetchArticles, isLoading} = useHttp()
  const locale = useLocale()
  const t = useTranslations("home")

  useEffect(() => {
    fetchArticles({
      url_info: {
        url: API_ENDPOINTS.BLOG_LIST + "?is_featured=True",
      }
    }, (data: any) => {
      setArticles(data.results)
    })
  }, [])

  if (articles.length === 0) return null
  
  return (
    <Card className="overflow-hidden shadow-lg">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r p-6">
          <h2 className="text-2xl font-bold mb-2">{locale === "bn" && generalData?.title_bn ? generalData?.title_bn : generalData?.title}</h2>
          <p className="text-gray-900">{locale === "bn" && generalData?.subtitle_bn ? generalData?.subtitle_bn : generalData?.subtitle}</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {articles.slice(0, 4).map((article) => (
              <Link key={article.id} href={`/blog/${article.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <Image
                        src={article.cover_image || "/placeholder.svg"}
                        alt={article.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* <Badge className="absolute top-3 left-3 bg-blue-500 hover:bg-blue-600">{article.category}</Badge> */}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {locale === "bn" && article.title_bn ? article.title_bn : article.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3">{locale === "bn" && article.subtitle_bn ? article.subtitle_bn : article.subtitle}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{locale === "bn" && article.author_name_bn ? article.author_name_bn : article.author_name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{article.published_date}</span>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-blue-600 font-medium">Read Time: {article.read_time}</div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}

           
          </div>

          <div className="text-center mt-6">
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium"
            >
              {t("read_all_articles")} →
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
