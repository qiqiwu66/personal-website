"use client"

import { useState, useEffect } from "react"
import { DetailItem } from "@/content"
import { cn } from "@/lib/utils"

function splitColumnsWithIndex<T>(items: T[], cols: number): Array<Array<{ item: T; idx: number }>> {
  const columns: Array<Array<{ item: T; idx: number }>> = Array.from({ length: cols }, () => [])
  items.forEach((item, i) => {
    const isExtraItem = items.length % cols !== 0 && i === items.length - 1
    const col = isExtraItem ? cols - 1 : i % cols
    columns[col].push({ item, idx: i })
  })
  return columns
}

function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: string[]
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
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % images.length)
      if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + images.length) % images.length)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [images.length, onClose])

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="flex flex-col items-center gap-3 max-h-screen px-6" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images[current]} alt="" className="max-h-[90vh] max-w-full object-contain" />
      </div>
    </div>
  )
}

function DetailView({ item }: { item: DetailItem }) {
  const { detail } = item
  const hasContent = detail.images?.length || detail.description || detail.bodyText || detail.intro
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (!hasContent) return null

  const images = detail.images ?? []
  const imageColumns = images.length > 1 ? splitColumnsWithIndex(images, 2) : null

  return (
    <div className="w-full">
      {detail.intro && (
        <p className="text-body mb-5 whitespace-pre-line">
          {detail.introLink
            ? (() => {
                const parts = detail.intro!.split(detail.introLink.text)
                return <>{parts[0]}<a href={detail.introLink.href} target="_blank" rel="noopener noreferrer" className="underline hover:text-stone-900">{detail.introLink.text}</a>{parts[1]}</>
              })()
            : detail.intro}
          {detail.bodyText && (
            <><br />{detail.bodyTextBold
              ? (() => {
                  const parts = detail.bodyText!.split(detail.bodyTextBold)
                  return <>{parts[0]}<strong>{detail.bodyTextBold}</strong>{parts[1]}</>
                })()
              : detail.bodyText}</>
          )}
        </p>
      )}
      {!detail.intro && detail.description && (
        <p className="text-body mb-5">{detail.description}</p>
      )}
      {!detail.intro && detail.bodyText && (
        <p className="text-body mb-5">
          {detail.bodyTextBold
            ? (() => {
                const parts = detail.bodyText!.split(detail.bodyTextBold)
                return <>{parts[0]}<strong>{detail.bodyTextBold}</strong>{parts[1]}</>
              })()
            : detail.bodyText}
        </p>
      )}
      {images.length > 0 && (
        <div className="mb-5">
          {imageColumns ? (
            <div className="flex gap-2">
              {imageColumns.map((col, ci) => (
                <div key={ci} className="flex-1 flex flex-col gap-2">
                  {col.map(({ item: src, idx }) => (
                    <div key={idx} className="flex flex-col gap-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt=""
                        className="w-full h-auto cursor-pointer"
                        onClick={() => setLightboxIndex(idx)}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none"
                        }}
                      />
                      {detail.imageCaptions?.[idx] && (
                        <p className="text-caption text-center">{detail.imageCaptions[idx]}</p>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[0]}
                alt=""
                className="w-full h-auto cursor-pointer"
                onClick={() => setLightboxIndex(0)}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none"
                }}
              />
              {detail.imageCaptions?.[0] && (
                <p className="text-caption text-center">{detail.imageCaptions[0]}</p>
              )}
            </div>
          )}
        </div>
      )}
      {lightboxIndex !== null && (
        <Lightbox images={images} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </div>
  )
}

export function DetailListLayout({ items }: { items: DetailItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="flex">
      <div className="w-64 shrink-0 border-r border-stone-200 p-2 sticky top-0 h-screen overflow-y-auto">
        <ul>
          {items.map((item, i) => (
            <li key={i}>
              <button
                className={cn(
                  "text-left w-full p-3 cursor-default rounded-[var(--radius)]",
                  i === activeIndex
                    ? "bg-amber-900/10 text-stone-900"
                    : "text-stone-500 hover:bg-amber-900/[0.06] hover:text-stone-900"
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
