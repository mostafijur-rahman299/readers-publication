import type { Metadata } from "next"
import Image from "next/image"
import { Award, BookOpen, Users, Building, GraduationCap, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "About Us | Guardian Publications",
  description: "Learn about Guardian Publications, our history, mission, and team.",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-slate-900 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tighter md:text-5xl">
              About Guardian Publications
            </h1>
            <p className="mb-8 text-lg text-slate-300">
              For over 25 years, we've been dedicated to publishing quality books and educational materials that
              inspire, educate, and entertain readers of all ages.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h2 className="mb-6 text-3xl font-bold tracking-tight">Our Story</h2>
              <p className="mb-4 text-muted-foreground">
                Guardian Publications was founded in 1998 by a group of educators and literary enthusiasts who saw the
                need for high-quality educational materials and engaging literature.
              </p>
              <p className="mb-4 text-muted-foreground">
                What began as a small publishing house with just three employees has grown into a respected name in the
                publishing industry, with offices in multiple countries and a catalog of over 5,000 titles.
              </p>
              <p className="text-muted-foreground">
                Throughout our journey, we've remained committed to our founding principles: to publish works that
                inform, inspire, and ignite the imagination of readers worldwide.
              </p>
            </div>
            <div className="relative h-[400px] overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Guardian Publications office"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Our Mission & Values</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              At Guardian Publications, we're guided by a clear mission and a strong set of values that inform
              everything we do.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Quality Content</h3>
                <p className="text-muted-foreground">
                  We are committed to publishing well-researched, thoughtfully crafted content that meets the highest
                  standards of excellence.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Educational Excellence</h3>
                <p className="text-muted-foreground">
                  We believe in the power of education to transform lives and are dedicated to creating materials that
                  facilitate learning.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Global Perspective</h3>
                <p className="text-muted-foreground">
                  We embrace diverse voices and perspectives, publishing content that reflects the rich tapestry of
                  human experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Our Leadership Team</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Meet the dedicated professionals who guide Guardian Publications and uphold our commitment to excellence.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex flex-col items-center text-center">
                <div className="mb-4 h-40 w-40 overflow-hidden rounded-full">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={160}
                    height={160}
                    className="object-cover"
                  />
                </div>
                <h3 className="mb-1 text-xl font-semibold">{member.name}</h3>
                <p className="mb-2 text-sm text-red-600">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-900 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-600">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-4xl font-bold">5,000+</h3>
              <p className="text-slate-300">Publications</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-600">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-4xl font-bold">150+</h3>
              <p className="text-slate-300">Team Members</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-600">
                <Building className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-4xl font-bold">12</h3>
              <p className="text-slate-300">Global Offices</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-600">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-4xl font-bold">45+</h3>
              <p className="text-slate-300">Industry Awards</p>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Our Journey</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Explore the key milestones in Guardian Publications' history as we've grown and evolved over the years.
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <Tabs defaultValue="1990s" className="w-full">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-4">
                <TabsTrigger value="1990s">1990s</TabsTrigger>
                <TabsTrigger value="2000s">2000s</TabsTrigger>
                <TabsTrigger value="2010s">2010s</TabsTrigger>
                <TabsTrigger value="2020s">2020s</TabsTrigger>
              </TabsList>
              <TabsContent value="1990s" className="mt-6 space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 text-lg font-semibold">1998</h3>
                  <p className="text-muted-foreground">
                    Guardian Publications is founded by a group of educators and literary enthusiasts in Boston,
                    Massachusetts.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 text-lg font-semibold">1999</h3>
                  <p className="text-muted-foreground">
                    Publication of our first educational series, "Learning Foundations," which quickly becomes popular
                    in schools across the Northeast.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="2000s" className="mt-6 space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 text-lg font-semibold">2002</h3>
                  <p className="text-muted-foreground">
                    Expansion into fiction publishing with the launch of our "Contemporary Voices" imprint.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 text-lg font-semibold">2005</h3>
                  <p className="text-muted-foreground">
                    Opening of our first international office in London, marking the beginning of our global expansion.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 text-lg font-semibold">2008</h3>
                  <p className="text-muted-foreground">
                    Launch of our digital publishing division, embracing the emerging e-book market.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="2010s" className="mt-6 space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 text-lg font-semibold">2012</h3>
                  <p className="text-muted-foreground">
                    Acquisition of Educational Press, significantly expanding our academic and educational catalog.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 text-lg font-semibold">2015</h3>
                  <p className="text-muted-foreground">
                    Launch of our children's literature division, bringing quality storytelling to young readers.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 text-lg font-semibold">2018</h3>
                  <p className="text-muted-foreground">
                    Celebration of our 20th anniversary with the establishment of the Guardian Literary Foundation.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="2020s" className="mt-6 space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 text-lg font-semibold">2020</h3>
                  <p className="text-muted-foreground">
                    Adaptation to remote work and increased focus on digital publishing during the global pandemic.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 text-lg font-semibold">2022</h3>
                  <p className="text-muted-foreground">
                    Launch of our audiobook division, making our content accessible in new formats.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 text-lg font-semibold">2024</h3>
                  <p className="text-muted-foreground">
                    Continued innovation with interactive educational materials and expanded global presence.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-red-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">Join Our Team</h2>
          <p className="mx-auto mb-8 max-w-2xl">
            We're always looking for talented individuals who are passionate about publishing and education to join our
            growing team.
          </p>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
            View Career Opportunities
          </Button>
        </div>
      </section>
    </div>
  )
}

// Sample data
const teamMembers = [
  {
    name: "Dr. Jonathan Reynolds",
    role: "CEO & Founder",
    image: "/placeholder.svg?height=160&width=160",
    bio: "With over 30 years in publishing, Jonathan founded Guardian Publications with a vision to transform educational publishing.",
  },
  {
    name: "Sarah Mitchell",
    role: "Editorial Director",
    image: "/placeholder.svg?height=160&width=160",
    bio: "Sarah oversees all editorial decisions and has been instrumental in shaping our catalog of award-winning publications.",
  },
  {
    name: "Michael Chen",
    role: "Chief Technology Officer",
    image: "/placeholder.svg?height=160&width=160",
    bio: "Michael leads our digital transformation initiatives and ensures we stay at the forefront of publishing technology.",
  },
  {
    name: "Dr. Amara Okafor",
    role: "Academic Director",
    image: "/placeholder.svg?height=160&width=160",
    bio: "Amara brings her extensive academic background to ensure the highest standards in our educational materials.",
  },
]
