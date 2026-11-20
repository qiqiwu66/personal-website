"use client"

import { useState, useEffect } from "react"
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
    [ 20,  60,  30],
    [ 30,  75,  38],
    [ 55,  18,  72],
    [ 70,  22,  88],
    [ 90,  15,  18],
    [ 65,  12,  22],
  ],
}

// Pencil uses a fixed palette: graphite on light themes, light tones on dark
const PENCIL_PALETTE: Record<Theme, number[][]> = {
  cream: [[28, 22, 16], [60, 52, 44]],
  brown: [[210, 185, 155], [230, 210, 185]],  // light warm brown / tan
  black: [[245, 238, 218], [255, 252, 244]],
}

const THEMES: { id: Theme; color: string; border: string }[] = [
  { id: "cream", color: "#f0e8d8", border: "#c8bfaa" },
  { id: "brown", color: "#5c2e14", border: "#5c2e14" },
  { id: "black", color: "#0d0a08", border: "#0d0a08" },
]

const BRUSH_STYLES: { id: BrushStyle; label: string; icon: React.ReactNode }[] = [
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
    id: "brush",
    label: "Brush",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" />
        <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1 1 2.65 2.02 5 2.02 3.14 0 5-1.52 5-5.02 0-1.67-1.35-3.04-3-3.04z" />
      </svg>
    ),
  },
  {
    id: "wide",
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
  const [userOverride, setUserOverride] = useState<boolean | null>(null)
  const [theme, setTheme] = useState<Theme>("cream")
  const [brushStyle, setBrushStyle] = useState<BrushStyle>("brush")

  const enabled = userOverride !== null ? userOverride : isHome

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

  const palette = brushStyle === "pencil" ? PENCIL_PALETTE[theme] : PALETTES[theme]

  return (
    <>
      {enabled && <TrailAnimation key={theme} palette={palette} brushStyle={brushStyle} />}
      <div
        data-no-clear
        className="fixed top-4 right-4 z-50 flex items-center gap-2.5 px-2.5 py-1.5 rounded-full border border-stone-300/70"
        style={{
          backgroundColor:
            theme === "brown" ? "rgba(245, 234, 210, 0.65)" :
            theme === "black" ? "rgba(130, 130, 128, 0.88)" :
            "rgba(255, 255, 255, 0.88)",
        }}
      >
        {/* theme circles */}
        <div className="flex items-center gap-2">
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

        <div className="w-px self-stretch bg-stone-300/60" />

        {/* brush style buttons */}
        <div className="flex items-center gap-0.5">
          {BRUSH_STYLES.map(({ id, label, icon }) => (
            <button
              key={id}
              data-no-clear
              onClick={() => setBrushStyle(id)}
              title={label}
              className="w-7 h-6 flex items-center justify-center rounded transition-colors"
              style={{
                color: theme === "black"
                  ? (brushStyle === id ? "#ffffff" : "#c4c0bc")
                  : (brushStyle === id ? "#1c1917" : "#6b6560"),
                backgroundColor: brushStyle === id
                  ? (theme === "black" ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.08)")
                  : "transparent",
              }}
            >
              {icon}
            </button>
          ))}
        </div>

        <div className="w-px self-stretch bg-stone-300/60" />

        {/* toggle switch */}
        <button
          data-no-clear
          onClick={() => setUserOverride(!enabled)}
          title={enabled ? "Turn off brush" : "Turn on brush"}
          className="relative w-7 h-4 rounded-full transition-colors duration-200 shrink-0 overflow-hidden"
          style={{
            backgroundColor: enabled
              ? theme === "brown" ? "#7a4020" : theme === "black" ? "#3a3a38" : "#78716c"
              : theme === "brown" ? "#c8a880" : theme === "black" ? "#c0c0bc" : "#e7e5e4",
          }}
        >
          <span
            className="absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white transition-transform duration-200 block"
            style={{ transform: enabled ? "translateX(12px)" : "translateX(0)" }}
          />
        </button>
      </div>
    </>
  )
}
