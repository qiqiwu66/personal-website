const CARD_H        = 290
const CARD_H_CENTER = 380

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`
const MASK = "radial-gradient(ellipse 88% 88% at center, black 55%, transparent 100%)"

export function PhotoFan({ photos }: { photos: string[] }) {
  const mid = Math.floor(photos.length / 2)
  return (
    <>
      {/* SVG filter for torn/rough paper edges */}
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
        <defs>
          <filter id="torn-paper" x="-6%" y="-6%" width="112%" height="112%">
            <feTurbulence type="fractalNoise" baseFrequency="0.032" numOctaves="4" seed="5" result="noise" />
            <feDisplacementMap in="SourceAlpha" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feComposite in="SourceGraphic" in2="displaced" operator="in" />
          </filter>
        </defs>
      </svg>

      <div className="flex gap-8 items-center">
        {photos.map((src, i) => (
          <div
            key={i}
            style={{
              position: "relative",
              flexShrink: 0,
              maskImage: MASK,
              WebkitMaskImage: MASK,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              style={{
                height: i === mid ? CARD_H_CENTER : CARD_H,
                width: "auto",
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
        ))}
      </div>
    </>
  )
}
