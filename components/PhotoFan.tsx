"use client"

import { useState } from "react"

const DEFAULT_TRANSFORMS = [
  { rotate: -9, x: -6, y: 6 },
  { rotate: -2, x: 0, y: 0 },
  { rotate: 6,  x: 8, y: 4 },
]

const HOVER_TRANSFORMS = [
  { rotate: -22, x: -210, y: 0 },
  { rotate:   0, x:    0, y: -18 },
  { rotate:  22, x:  210, y: 0 },
]

const CARD_W = 296
const CARD_H = 392
const CARD_R = 10

export function PhotoFan({ photos }: { photos: string[] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative flex-shrink-0"
      style={{
        height: CARD_H + 30,
        width: CARD_W,
        transform: hovered ? "translateX(-180px)" : "translateX(0)",
        transition: "transform 0.35s cubic-bezier(0.34, 1.4, 0.64, 1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {photos.map((src, i) => {
        const t = hovered ? HOVER_TRANSFORMS[i] : DEFAULT_TRANSFORMS[i]

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              width: CARD_W,
              height: CARD_H,
              marginLeft: -CARD_W / 2,
              zIndex: photos.length - i,
              transform: `rotate(${t.rotate}deg) translateX(${t.x}px) translateY(${t.y}px)`,
              transformOrigin: "bottom center",
              transition: "transform 0.35s cubic-bezier(0.34, 1.4, 0.64, 1)",
              borderRadius: CARD_R,
              overflow: "hidden",
              boxShadow: "0 4px 14px rgba(0,0,0,0.13)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
