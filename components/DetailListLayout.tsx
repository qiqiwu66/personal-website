"use client"

import { useState } from "react"
import { DetailItem } from "@/content"
import { cn } from "@/lib/utils"

function DetailView({ item }: { item: DetailItem }) {
  const { detail } = item
  const hasContent = detail.images?.length || detail.description || detail.bodyText

  if (!hasContent) return null

  return (
    <div className="max-w-lg">
      {detail.images && detail.images.length > 0 && (
        <div className={cn(
          "mb-5",
          detail.images.length === 1
            ? "max-w-sm"
            : "columns-2 gap-2"
        )}>
          {detail.images.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt=""
              className="w-full h-auto block mb-2 break-inside-avoid"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none"
              }}
            />
          ))}
        </div>
      )}
      {detail.description && (
        <p className="text-sm text-gray-700 leading-relaxed mb-3">{detail.description}</p>
      )}
      {detail.bodyText && (
        <p className="text-sm text-gray-500 leading-relaxed">{detail.bodyText}</p>
      )}
    </div>
  )
}

export function DetailListLayout({ items }: { items: DetailItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="flex">
      <div className="w-64 shrink-0 border-r border-gray-100 py-14 px-6 self-start sticky top-0">
        <ul className="space-y-5">
          {items.map((item, i) => (
            <li key={i}>
              <button
                className={cn(
                  "text-left w-full transition-colors cursor-default",
                  i === activeIndex ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
                )}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => setActiveIndex(i)}
              >
                <span className="block text-sm leading-snug">{item.title}</span>
                {item.detail.description && (
                  <span className={cn(
                    "block text-sm mt-1 leading-snug transition-colors",
                    i === activeIndex ? "text-gray-500" : "text-gray-400"
                  )}>
                    {item.detail.description}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 py-14 px-10 overflow-y-auto">
        <DetailView item={items[activeIndex]} />
      </div>
    </div>
  )
}
