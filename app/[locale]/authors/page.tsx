"use client"

import { useTranslations } from "next-intl"
import { useLocale } from "next-intl"
import Link from "next/link"
import { BookOpen, Users, Award, Star, PenLine } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"

const authors = [
  {
    id: 1,
    name: "Humayun Ahmed",
    image: "/authors/humayun-ahmed.jpg",
    books: 45,
    followers: 12000,
    description: "One of the most popular Bengali writers of modern times.",
    awards: 12,
    genres: ["Novel", "Drama", "Science Fiction"],
    rating: 4.8
  },
  {
    id: 2,
    name: "Arif Iqbal",
    image: "/authors/Arif-Iqbal.jpg", 
    books: 38,
    followers: 8500,
    description: "Renowned science fiction writer and professor.",
    awards: 8,
    genres: ["Science Fiction", "Children's Literature", "Educational"],
    rating: 4.6
  }
]

export default function AuthorsPage() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Header />
      <Navigation />

      <div className="border-b bg-white">
        <div className="container mx-auto py-6">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-2 rounded-full bg-brand-50 p-1.5">
              <PenLine className="h-5 w-5 text-brand-600" />
            </div>
            <div>
              <h2 className="mb-1 text-xl font-bold text-slate-900">{t("authors.title")}</h2>
              <p className="text-xs text-slate-500">{t("authors.description")}</p>
            </div>
          </div>
        </div>
      </div>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {authors.map((author) => (
              <Link
                key={author.id}
                href={`/${locale}/authors/${author.id}`}
                className="group block"
              >
                <Card className="h-full overflow-hidden border-slate-200 transition-all duration-300 hover:border-brand-200 hover:shadow-md">
                  <CardHeader className="flex flex-row items-center gap-3 bg-white p-4">
                    <Avatar className="h-14 w-14 border-2 border-slate-100">
                      <AvatarImage src={author.image} alt={author.name} />
                      <AvatarFallback className="bg-brand-50 text-brand-600">
                        {author.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-slate-900 group-hover:text-brand-600">
                        {author.name}
                      </CardTitle>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{author.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="mb-3 text-xs text-slate-600 line-clamp-2">
                      {author.description}
                    </p>
                    <div className="mb-3 flex flex-wrap gap-1.5">
                      {author.genres.map((genre) => (
                        <span
                          key={genre}
                          className="inline-flex items-center rounded-full bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-600"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        <span>{author.books}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{author.followers.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        <span>{author.awards}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
