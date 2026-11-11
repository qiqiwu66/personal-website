"use client"

import { useState } from "react"
import { DetailItem } from "@/content"
import { cn } from "@/lib/utils"

function splitColumns<T>(items: T[], cols: number): T[][] {
  const columns: T[][] = Array.from({ length: cols }, () => [])
  items.forEach((item, i) => columns[i % cols].push(item))
  return columns
}

function DetailView({ item }: { item: DetailItem }) {
  const { detail } = item
  const hasContent = detail.images?.length || detail.description || detail.bodyText

  if (!hasContent) return null

  const images = detail.images ?? []
  const imageColumns = images.length > 1 ? splitColumns(images, 2) : null

  return (
    <div className="w-full">
      {images.length > 0 && (
        <div className="mb-5">
          {imageColumns ? (
            <div className="flex gap-2">
              {imageColumns.map((col, ci) => (
                <div key={ci} className="flex-1 flex flex-col gap-2">
                  {col.map((src, ri) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={ri}
                      src={src}
                      alt=""
                      className="w-full h-auto"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none"
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={images[0]}
              alt=""
              className="w-full h-auto"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none"
              }}
            />
          )}
        </div>
      )}
      {detail.description && (
        <p className="text-sm text-stone-700 leading-relaxed mb-3">{detail.description}</p>
      )}
      {detail.bodyText && (
        <p className="text-sm text-stone-500 leading-relaxed">{detail.bodyText}</p>
      )}
    </div>
  )
}

export function DetailListLayout({ items }: { items: DetailItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="flex">
      <div className="w-64 shrink-0 border-r border-stone-100 p-2 self-start sticky top-0">
        <ul>
          {items.map((item, i) => (
            <li key={i}>
              <button
                className={cn(
                  "text-left w-full p-3 cursor-default rounded-[var(--radius)]",
                  i === activeIndex
                    ? "bg-stone-100 text-stone-900"
                    : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"
                )}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => setActiveIndex(i)}
              >
                <span className="block text-sm leading-snug">{item.title}</span>
                {item.detail.description && (
                  <span className={cn(
                    "block text-sm mt-1 leading-snug",
                    i === activeIndex ? "text-stone-500" : "text-stone-400"
                  )}>
                    {item.detail.description}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <DetailView item={items[activeIndex]} />
      </div>
    </div>
  )
}
