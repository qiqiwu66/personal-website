"use client"

import { GalleryItem } from "@/content"

export function Gallery({ items, natural }: { items: GalleryItem[]; natural?: boolean }) {
  if (natural) {
    return (
      <div className="columns-3 gap-3">
        {items.map((item, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={item.src}
            alt={item.caption}
            className="w-full h-auto block break-inside-avoid"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none"
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-8">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="aspect-square bg-gray-100 overflow-hidden">
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
            <p className="text-xs text-gray-500 leading-relaxed">{item.caption}</p>
          )}
        </div>
      ))}
    </div>
  )
}
