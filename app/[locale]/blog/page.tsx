"use client"

import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"

export default function BlogListPage() {
    const t = useTranslations("blog")
    const locale = useLocale()

  const blogPosts = [
    {
      id: 1,
      title: "The Art of Storytelling",
      subtitle: "Modern Literature and Emotional Impact",
      description: "Explore how storytelling is evolving through fresh voices, unconventional styles, and emotional depth in contemporary writing.",
      imageUrl: "/images/storytelling.jpg",
      author: "Jane D’Souza",
      date: "September 15, 2025",
      readTime: "6 min read",
      slug: "art-of-storytelling"
    },
    {
      id: 2,
      title: "Rise of Independent Publishing",
      subtitle: "Breaking Barriers in the Book World",
      description: "Independent publishing empowers authors like never before. Learn how it's changing the landscape for readers and writers alike.",
      imageUrl: "/images/indie-publishing.jpg",
      author: "Alex Rahman",
      date: "August 29, 2025",
      readTime: "5 min read",
      slug: "independent-publishing"
    },
    {
      id: 3,
      title: "Submitting Your First Manuscript",
      subtitle: "Tips from a Publisher’s Perspective",
      description: "A step-by-step guide for writers preparing their manuscript for submission. Avoid common pitfalls and get noticed.",
      imageUrl: "/images/manuscript.jpg",
      author: "Nadia Karim",
      date: "August 10, 2025",
      readTime: "4 min read",
      slug: "submit-manuscript"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">{t("title")}</h1>
          <p className="text-gray-600">{(t("subtitle"))}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-300">
              <Link href={`/blog/${post.slug}`}>
                <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
              </Link>
              <div className="p-6">
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-bold text-blue-700 hover:underline">{post.title}</h2>
                </Link>
                <p className="text-sm text-gray-500 mb-1">{post.subtitle}</p>
                <p className="text-sm text-gray-600 mb-3">{post.description}</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <div className="mt-2 text-sm text-gray-700">By {post.author}</div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-block text-blue-600 hover:underline text-sm"
                >
                  Read more →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
