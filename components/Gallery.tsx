"use client"

import { useState, useEffect } from "react"
import { GalleryItem } from "@/content"

function splitColumnsWithIndex<T>(items: T[], cols: number): Array<Array<{ item: T; idx: number }>> {
  const columns: Array<Array<{ item: T; idx: number }>> = Array.from({ length: cols }, () => [])
  items.forEach((item, i) => columns[i % cols].push({ item, idx: i }))
  return columns
}

function Lightbox({
  items,
  startIndex,
  onClose,
}: {
  items: GalleryItem[]
  startIndex: number
  onClose: () => void
}) {
  const [current, setCurrent] = useState(startIndex)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % items.length)
      if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + items.length) % items.length)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [items.length, onClose])

  const item = items[current]

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="flex flex-col items-center gap-3 max-h-screen px-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={item.caption}
          className="max-h-[90vh] max-w-full object-contain"
        />
        {item.caption && (
          <p className="text-sm text-stone-300 text-center">{item.caption}</p>
        )}
      </div>
    </div>
  )
}

export function Gallery({ items, natural }: { items: GalleryItem[]; natural?: boolean }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (natural) {
    const columns = splitColumnsWithIndex(items, 3)
    return (
      <>
        <div className="flex gap-3">
          {columns.map((col, ci) => (
            <div key={ci} className="flex-1 flex flex-col gap-3">
              {col.map(({ item, idx }) => (
                <div key={idx} className="flex flex-col gap-1.5 cursor-pointer" onClick={() => setLightboxIndex(idx)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-auto"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none"
                    }}
                  />
                  {item.caption && (
                    <p className="text-sm text-stone-500 text-center leading-snug">{item.caption}</p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        {lightboxIndex !== null && (
          <Lightbox items={items} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
        )}
      </>
    )
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-8">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 cursor-pointer"
            onClick={() => setLightboxIndex(i)}
          >
            <div className="aspect-square bg-stone-100 overflow-hidden">
              {item.src && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none"
                  }}
                />
              )}
            </div>
            {item.caption && (
              <p className="text-xs text-stone-500 text-center leading-relaxed">{item.caption}</p>
            )}
          </div>
        ))}
      </div>
      {lightboxIndex !== null && (
        <Lightbox items={items} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </>
  )
}
