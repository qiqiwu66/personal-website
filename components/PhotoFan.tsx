"use client"

import { useState } from "react"


function Bike({ onDone }: { onDone: () => void }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 52,
        left: "-42px",
        animation: "bike-h-move 3.2s linear forwards",
      }}
      onAnimationEnd={onDone}
    >
    <svg
      viewBox="0 0 34 24"
      width="34"
      height="24"
      fill="none"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ animation: "bike-flip 3.2s ease-in-out forwards", display: "block", stroke: "var(--bike-color)" }}
    >
      {/* rear wheel with spokes */}
      <g style={{ transformOrigin: "6px 17px", animation: "wheel-spin 3.2s linear forwards" }}>
        <circle cx="6" cy="17" r="6" />
        <line x1="6" y1="11" x2="6" y2="23" />
        <line x1="0" y1="17" x2="12" y2="17" />
      </g>
      {/* front wheel with spokes */}
      <g style={{ transformOrigin: "28px 17px", animation: "wheel-spin 3.2s linear forwards" }}>
        <circle cx="28" cy="17" r="6" />
        <line x1="28" y1="11" x2="28" y2="23" />
        <line x1="22" y1="17" x2="34" y2="17" />
      </g>
      {/* main frame triangle */}
      <path d="M13 9 L15 17 L25 10 Z" />
      {/* rear triangle */}
      <line x1="6"  y1="17" x2="15" y2="17" />
      <line x1="6"  y1="17" x2="13" y2="9"  />
      {/* fork */}
      <line x1="25" y1="10" x2="28" y2="17" />
      {/* seat post */}
      <line x1="13" y1="9"  x2="13" y2="5"  />
      {/* saddle */}
      <path d="M10 5 Q13 3.5 16 5" />
      {/* stem */}
      <line x1="25" y1="10" x2="25" y2="6"  />
      {/* handlebars */}
      <path d="M22 6 L28 6 L29 4" />
    </svg>
    </div>
  )
}

const ARCH_H = 420

export function PhotoFan({ photos }: { photos: string[] }) {
  const [bikeKey,    setBikeKey]    = useState(0)
  const [bikeActive, setBikeActive] = useState(false)

  return (
    <div className="flex gap-6 items-end w-full">
      {photos.map((src, i) => (
        <div
          key={i}
          style={{ position: "relative", flex: 1, minWidth: 0 }}
          onMouseEnter={i === 0 ? () => { if (!bikeActive) { setBikeKey(k => k + 1); setBikeActive(true) } } : undefined}
        >
          {/* arch-masked photo */}
          <div
            style={{
              height: ARCH_H,
              borderRadius: "50% 50% 0 0",
              overflow: "hidden",
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
                objectPosition: "center top",
                display: "block",
              }}
            />
          </div>

          {/* bike enters from behind left edge, exits right */}
          {i === 0 && bikeActive && (
            <div style={{
              position: "absolute",
              top: -80,
              left: 0,
              right: 0,
              bottom: 0,
              overflow: "hidden",
              pointerEvents: "none",
            }}>
              <Bike key={bikeKey} onDone={() => setBikeActive(false)} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
