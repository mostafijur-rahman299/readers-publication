import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface CircleNavProps {
  title: string
  imageUrl: string
  href?: string
  className?: string
}

export function CircleNav({ title, imageUrl, href = "#", className }: CircleNavProps) {
  return (
    <Link href={href} className="group flex flex-col items-center transition-transform hover:scale-105">
      <div
        className={cn(
          "mb-2 h-20 w-20 overflow-hidden rounded-full border-2 border-gray-200 shadow-sm transition-all group-hover:border-brand-300 group-hover:shadow-md",
          className,
        )}
      >
        <div className="relative h-full w-full">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="h-full w-full object-cover transition-transform group-hover:scale-110"
          />
        </div>
      </div>
      <span className="text-center text-sm font-medium transition-colors group-hover:text-brand-600">{title}</span>
    </Link>
  )
}
