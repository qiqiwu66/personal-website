"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { sections } from "@/content"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className="shrink-0 md:w-64 md:h-screen md:sticky md:top-0 md:overflow-y-auto md:border-r md:border-stone-200 flex flex-col py-6 px-3">
      <div className="mb-4 px-2">
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-70 transition-opacity">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/wu-logo.png" alt="吴" className="w-7 h-7 object-contain rounded-[var(--radius)]" />
          <span className="text-sm font-medium tracking-tight">Alana Wu</span>
        </Link>
      </div>

      <ul className="flex flex-row flex-wrap gap-x-4 gap-y-1 md:flex-col md:gap-x-0 md:gap-y-0">
        {sections.filter((s) => s.slug !== "").map((section) => {
          const href = `/${section.slug}`
          const isActive = pathname === href

          return (
            <li key={section.slug}>
              <Link
                href={href}
                className={cn(
                  "block text-sm font-medium leading-snug px-2 py-1.5 rounded-[var(--radius)]",
                  isActive
                    ? "bg-amber-900/10 text-stone-900"
                    : "text-stone-400 hover:bg-amber-900/[0.06] hover:text-stone-900"
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
