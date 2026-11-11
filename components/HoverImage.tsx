"use client"

import { useState, useRef } from "react"

export function HoverImage({
  children,
  src,
  rotate = -5,
}: {
  children: React.ReactNode
  src: string
  rotate?: number
}) {
  const [hovered, setHovered] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLSpanElement>(null)

  const handleMouseEnter = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      const tooltipW = 420
      const idealLeft = rect.left + rect.width / 2 - tooltipW / 2
      const clampedLeft = Math.max(8, Math.min(idealLeft, window.innerWidth - tooltipW - 8))
      setPos({ x: clampedLeft, y: rect.bottom })
    }
    setHovered(true)
  }

  return (
    <span
      ref={ref}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="cursor-default"
        style={{
          textDecoration: "underline",
          textDecorationStyle: "dashed",
          textDecorationColor: "#a8a29e",
          textUnderlineOffset: "3px",
        }}
      >
        {children}
      </span>
      <div
        className="pointer-events-none z-50"
        style={{
          position: "fixed",
          top: pos.y + 12,
          left: pos.x,
          width: 420,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          className="w-full rounded-lg"
          style={{
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            transform: `rotate(${rotate}deg)`,
          }}
        />
      </div>
    </span>
  )
}
