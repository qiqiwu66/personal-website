"use client"

import { useState } from "react"

const CARD_H        = 290
const CARD_H_CENTER = 380

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`
const MASK = "radial-gradient(ellipse 88% 88% at center, black 55%, transparent 100%)"

function Bike({ onDone }: { onDone: () => void }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 12,
        left: "-42px",
        animation: "bike-h-move 2.1s linear forwards",
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
      style={{ animation: "bike-flip 2.1s ease-in-out forwards", display: "block", stroke: "var(--bike-color)" }}
    >
      {/* wheels */}
      <circle cx="6"  cy="17" r="6" />
      <circle cx="28" cy="17" r="6" />
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

export function PhotoFan({ photos }: { photos: string[] }) {
  const mid = Math.floor(photos.length / 2)
  const [bikeKey,    setBikeKey]    = useState(0)
  const [bikeActive, setBikeActive] = useState(false)

  return (
    <>
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
        <defs>
          <filter id="torn-paper" x="-6%" y="-6%" width="112%" height="112%">
            <feTurbulence type="fractalNoise" baseFrequency="0.032" numOctaves="4" seed="5" result="noise" />
            <feDisplacementMap in="SourceAlpha" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feComposite in="SourceGraphic" in2="displaced" operator="in" />
          </filter>
        </defs>
      </svg>

      <div className="flex gap-8 items-center w-full">
        {photos.map((src, i) => (
          <div
            key={i}
            style={{ position: "relative", flexShrink: 1, minWidth: 0 }}
            onMouseEnter={i === 0 ? () => { setBikeKey(k => k + 1); setBikeActive(true) } : undefined}
          >
            {/* masked photo */}
            <div style={{ position: "relative", maskImage: MASK, WebkitMaskImage: MASK }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                style={{
                  maxHeight: i === mid ? CARD_H_CENTER : CARD_H,
                  height: "auto",
                  width: "auto",
                  maxWidth: "100%",
                  display: "block",
                  filter: "url(#torn-paper)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  mixBlendMode: "overlay",
                  opacity: 0.22,
                  backgroundImage: GRAIN,
                  backgroundRepeat: "repeat",
                  backgroundSize: "180px 180px",
                }}
              />
            </div>

            {/* bike enters from behind left edge, exits right */}
            {i === 0 && bikeActive && (
              <div style={{
                position: "absolute",
                top: -40,   /* extends 40px above the photo */
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
    </>
  )
}
