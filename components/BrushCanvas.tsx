"use client"

import { useState, useEffect } from "react"
import { TrailAnimation } from "./TrailAnimation"

type Theme = "cream" | "brown" | "black"

const THEMES: { id: Theme; color: string; border: string }[] = [
  { id: "cream", color: "#f0e8d8", border: "#c8bfaa" },
  { id: "brown", color: "#5c2e14", border: "#5c2e14" },
  { id: "black", color: "#1a1210", border: "#1a1210" },
]

export function BrushCanvas() {
  const [enabled, setEnabled] = useState(true)
  const [theme, setTheme] = useState<Theme>("cream")

  useEffect(() => {
    const root = document.documentElement
    if (theme === "cream") {
      root.removeAttribute("data-theme")
    } else {
      root.setAttribute("data-theme", theme)
    }
  }, [theme])

  return (
    <>
      {enabled && <TrailAnimation />}
      <div
        data-no-clear
        className="fixed top-4 right-4 z-50 flex items-center gap-2.5 px-2.5 py-1.5 rounded-full bg-stone-100/70"
      >
        {/* theme circles */}
        <div className="flex items-center gap-1.5">
          {THEMES.map(({ id, color, border }) => (
            <button
              key={id}
              data-no-clear
              onClick={() => setTheme(id)}
              title={id}
              className="w-3.5 h-3.5 rounded-full transition-transform duration-150"
              style={{
                backgroundColor: color,
                border: `1.5px solid ${border}`,
                outline: theme === id ? `1px solid ${border}` : "none",
                outlineOffset: "2px",
                transform: theme === id ? "scale(1.1)" : "scale(1)",
              }}
            />
          ))}
        </div>

        <div className="w-px h-3 bg-stone-300/60" />

        {/* brush icon */}
        <svg
          viewBox="0 0 24 24"
          width="13"
          height="13"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-stone-500 shrink-0"
          style={{ opacity: enabled ? 1 : 0.4 }}
        >
          <path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" />
          <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1 1 2.65 2.02 5 2.02 3.14 0 5-1.52 5-5.02 0-1.67-1.35-3.04-3-3.04z" />
        </svg>

        {/* toggle switch */}
        <button
          data-no-clear
          onClick={() => setEnabled((e) => !e)}
          title={enabled ? "Turn off brush" : "Turn on brush"}
          className="relative w-7 h-4 rounded-full transition-colors duration-200 shrink-0 overflow-hidden"
          style={{ backgroundColor: enabled ? "#78716c" : "#e7e5e4" }}
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
