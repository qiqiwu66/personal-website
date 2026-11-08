"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { sections } from "@/content"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className="shrink-0 md:w-64 md:h-screen md:sticky md:top-0 md:overflow-y-auto md:border-r md:border-gray-100 flex flex-col py-10 px-8">
      <div className="mb-10">
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-70 transition-opacity">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/wu-logo.png" alt="吴" className="w-7 h-7 object-contain" />
          <span className="text-sm font-medium tracking-tight">Alana Wu</span>
        </Link>
      </div>

      <ul className="flex flex-row flex-wrap gap-x-4 gap-y-1 md:flex-col md:gap-x-0 md:space-y-1.5">
        {sections.map((section) => {
          const href = section.slug ? `/${section.slug}` : "/"
          const isActive = section.slug
            ? pathname === href
            : pathname === "/"

          return (
            <li key={section.slug}>
              <Link
                href={href}
                className={cn(
                  "text-sm transition-colors leading-snug",
                  isActive
                    ? "text-gray-900 font-medium"
                    : "text-gray-400 hover:text-gray-900"
                )}
              >
                {section.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
