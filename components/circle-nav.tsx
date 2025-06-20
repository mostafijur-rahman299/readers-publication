import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useLocale } from "next-intl"

interface CircleNavProps {
  title: string
  title_bn?: string
  imageUrl?: string
  href?: string
  className?: string
}

export function CircleNav({
  title,
  title_bn,
  imageUrl,
  href = "#",
  className,
}: CircleNavProps) {
  const locale = useLocale()
  const localizedTitle = locale === "bn" && title_bn ? title_bn : title
  const showFallback = !imageUrl || imageUrl.trim() === ""
  const size = 80 // h-20 w-20 = 80px

  return (
    <Link
      href={href}
      className="group flex flex-col items-center transition-transform hover:scale-105"
    >
      <div
        className={cn(
          "mb-2 h-20 w-20 overflow-hidden rounded-full border-2 border-gray-200 shadow-sm transition-all group-hover:border-brand-300 group-hover:shadow-md",
          className,
        )}
      >
        <div className="relative h-full w-full">
          {showFallback ? (
            <Avatar size={size}>
              <AvatarFallback name={localizedTitle} size={size} />
            </Avatar>
          ) : (
            <Image
              src={imageUrl}
              alt={localizedTitle}
              fill
              className="h-full w-full object-cover transition-transform group-hover:scale-110 rounded-full"
            />
          )}
        </div>
      </div>
      <span className="text-center text-sm font-medium transition-colors group-hover:text-brand-600">
        {localizedTitle}
      </span>
    </Link>
  )
}
