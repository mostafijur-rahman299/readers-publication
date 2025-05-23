"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { BookOpen, Users, Award, Star, PenLine, Calendar, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"

// Mock data - Replace with actual data fetching
const author = {
  id: 1,
  name: "Humayun Ahmed",
  image: "/authors/humayun-ahmed.jpg",
  totalBooks: 45,
  followers: 12000,
  description: "One of the most popular Bengali writers of modern times. Known for his unique storytelling style and memorable characters.",
  awards: 12,
  genres: ["Novel", "Drama", "Science Fiction"],
  rating: 4.8,
  birthDate: "1948-11-13",
  nationality: "Bangladeshi",
  education: "Ph.D. in Polymer Chemistry",
  biography: "Humayun Ahmed was a Bangladeshi novelist, dramatist, screenwriter, filmmaker, songwriter, scholar, and professor. His breakthrough was his debut novel Nondito Noroke published in 1972. He wrote over 200 fiction and non-fiction books, many of which were bestsellers in Bangladesh.",
  books: [
    {
      id: 1,
      title: "Nondito Noroke",
      coverImage: "/books/nondito-noroke.jpg",
      price: "৳350",
      rating: 4.9,
      category: "Novel"
    },
    {
      id: 2,
      title: "Shonkhonil Karagar",
      coverImage: "/books/shonkhonil-karagar.jpg",
      price: "৳400",
      rating: 4.8,
      category: "Novel"
    },
    // Add more books as needed
  ]
}

export default function AuthorPage() {
  const t = useTranslations()

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Header />
      <Navigation />

      {/* Author Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto py-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-4">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                <AvatarImage src={author.image} alt={author.name} />
                <AvatarFallback className="bg-brand-50 text-4xl text-brand-600">
                  {author.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h1 className="mb-2 text-3xl font-bold text-slate-900">{author.name}</h1>
              <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{author.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{author.books.length} Books</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{author.followers.toLocaleString()} Followers</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  <span>{author.awards} Awards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Author Info */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>About the Author</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-slate-600">{author.biography}</p>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium text-slate-900">Birth Date</p>
                      <p className="text-sm text-slate-500">{author.birthDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium text-slate-900">Nationality</p>
                      <p className="text-sm text-slate-500">{author.nationality}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-medium text-slate-900">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {author.genres.map((genre) => (
                      <span
                        key={genre}
                        className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Author Stats */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Author Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Total Books</span>
                  <span className="font-medium text-slate-900">{author.books.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Followers</span>
                  <span className="font-medium text-slate-900">{author.followers.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Awards</span>
                  <span className="font-medium text-slate-900">{author.awards}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Average Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-slate-900">{author.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full bg-brand-600 hover:bg-brand-700">
              Follow Author
            </Button>
          </div>
        </div>

        {/* Author's Books */}
        <div className="mt-8">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Books by {author.name}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {author.books.map((book) => (
              <Link key={book.id} href={`/books/${book.id}`}>
                <Card className="group h-full overflow-hidden transition-all hover:shadow-md">
                  <div className="relative aspect-[2/3] w-full overflow-hidden">
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(book.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-xs text-slate-500">{book.rating}</span>
                    </div>
                    <h3 className="mb-1 line-clamp-2 text-sm font-medium text-slate-900 group-hover:text-brand-600">
                      {book.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-brand-600">{book.price}</span>
                      <Button size="sm" variant="outline">
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
