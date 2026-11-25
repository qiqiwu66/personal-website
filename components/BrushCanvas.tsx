"use client"

import React, { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { TrailAnimation, BrushStyle } from "./TrailAnimation"

type Theme = "cream" | "brown" | "black"

const PALETTES: Record<Theme, number[][]> = {
  cream: [
    [212, 168, 106],
    [196, 132, 110],
    [168, 197, 160],
    [164, 184, 212],
    [196, 180, 212],
    [220, 170, 160],
  ],
  brown: [
    [130,  48,  22],
    [120,  40,  70],
    [160,  68,  28],
    [185,  95,  20],
    [200, 155,  35],
    [150,  42,  30],
    [115,  38,  18],
  ],
  black: [
    [ 80, 120, 210],
    [110, 140, 230],
    [130, 100, 220],
    [160, 130, 240],
    [ 60,  90, 190],
    [170, 150, 235],
    [100, 160, 220],
  ],
}

// Pencil uses a fixed palette: graphite on light themes, light tones on dark
const PENCIL_PALETTE: Record<Theme, number[][]> = {
  cream: [[28, 22, 16], [60, 52, 44]],
  brown: [[210, 185, 155], [230, 210, 185]],  // light warm brown / tan
  black: [[200, 220, 248], [220, 232, 255]],
}

const THEMES: { id: Theme; color: string; border: string }[] = [
  { id: "cream", color: "#f0e8d8", border: "#c8bfaa" },
  { id: "brown", color: "#5c2e14", border: "#5c2e14" },
  { id: "black", color: "#060810", border: "#3a5080" },
]

type UIMode = "cursor" | BrushStyle

const CURSOR_ICON = (
  <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor">
    <path d="M3.5 1.5 L3.5 12.5 L6.2 9.8 L8.6 15 L10.2 14.3 L7.8 9.1 L12 9.1 Z" />
  </svg>
)

const TOOL_OPTIONS: { id: UIMode; label: string; icon: React.ReactNode }[] = [
  { id: "cursor", label: "Cursor", icon: CURSOR_ICON },
  {
    id: "pencil",
    label: "Pencil",
    icon: (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeLinecap="round">
        <line x1="3" y1="13" x2="13" y2="3" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    id: "marker",
    label: "Marker",
    icon: (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeLinecap="round">
        <line x1="3" y1="13" x2="13" y2="3" strokeWidth="4" />
      </svg>
    ),
  },
  {
    id: "wide",
    label: "Brush",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" />
        <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1 1 2.65 2.02 5 2.02 3.14 0 5-1.52 5-5.02 0-1.67-1.35-3.04-3-3.04z" />
      </svg>
    ),
  },
  {
    id: "brush",
    label: "Wide brush",
    icon: (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeLinecap="round">
        <line x1="2" y1="8" x2="14" y2="8" strokeWidth="8" />
      </svg>
    ),
  },
]

export function BrushCanvas() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [theme, setTheme] = useState<Theme>("cream")
  const [uiMode, setUiMode] = useState<UIMode>(isHome ? "wide" : "cursor")

  useEffect(() => {
    if (!isHome) setUiMode("cursor")
  }, [isHome])

  useEffect(() => {
    const root = document.documentElement
    if (theme === "cream") root.removeAttribute("data-theme")
    else root.setAttribute("data-theme", theme)
  }, [theme])

  useEffect(() => {
    const themeOrder: Theme[] = ["cream", "brown", "black"]
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault()
        setTheme(t => themeOrder[(themeOrder.indexOf(t) + 1) % themeOrder.length])
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const isDrawing = uiMode !== "cursor"
  const brushStyle = uiMode as BrushStyle
  const palette = brushStyle === "pencil" ? PENCIL_PALETTE[theme] : PALETTES[theme]

  const iconColor = (id: UIMode) =>
    theme === "black"
      ? (uiMode === id ? "#d0dcf0" : "#6880a8")
      : (uiMode === id ? "#1c1917" : "#6b6560")

  const iconBg = (id: UIMode) =>
    uiMode === id
      ? (theme === "black" ? "rgba(100,140,220,0.18)" : "rgba(0,0,0,0.08)")
      : "transparent"

  return (
    <>
      {isDrawing && <TrailAnimation key={theme} palette={palette} brushStyle={brushStyle} />}
      <div
        data-no-clear
        className="shrink-0 w-10 sticky top-0 h-screen z-50 flex flex-col items-center border-l"
        style={{
          backgroundColor: "var(--background)",
          borderColor: "var(--border)",
        }}
      >
        {/* theme circles */}
        <div className="flex flex-col items-center gap-2 pt-4 pb-3 w-full border-b" style={{ borderColor: "var(--border)" }}>
          {THEMES.map(({ id, color, border }) => (
            <button
              key={id}
              data-no-clear
              onClick={() => setTheme(id)}
              title={id}
              className="w-4 h-4 rounded-full"
              style={{
                backgroundColor: color,
                border: `1.5px solid ${border}`,
                outline: theme === id ? `1px solid ${border}` : "none",
                outlineOffset: "2px",
              }}
            />
          ))}
        </div>

        {/* cursor + drawing tools */}
        <div className="flex flex-col items-center gap-0.5 pt-2">
          {TOOL_OPTIONS.map(({ id, label, icon }) => (
            <button
              key={id}
              data-no-clear
              onClick={() => setUiMode(id)}
              title={label}
              className="w-7 h-7 flex items-center justify-center rounded transition-colors"
              style={{ color: iconColor(id), backgroundColor: iconBg(id) }}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
