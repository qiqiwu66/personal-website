"use client"

import { useEffect, useRef } from "react"

// warm watercolor palette
const PALETTE = [
  [212, 168, 106],  // amber
  [196, 132, 110],  // sienna
  [168, 197, 160],  // sage
  [164, 184, 212],  // dusty blue
  [196, 180, 212],  // lavender
  [220, 170, 160],  // dusty rose
]

export function TrailAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!

    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
    window.addEventListener("resize", () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    })

    let colorPos = 0  // float; advances through palette continuously
    let lastX = -1, lastY = -1
    let rafId: number

    const lerpColor = (pos: number) => {
      const len = PALETTE.length
      const idx = Math.floor(pos % len)
      const t   = pos % 1
      const c0  = PALETTE[idx % len]
      const c1  = PALETTE[(idx + 1) % len]
      return [
        Math.round(c0[0] + (c1[0] - c0[0]) * t),
        Math.round(c0[1] + (c1[1] - c0[1]) * t),
        Math.round(c0[2] + (c1[2] - c0[2]) * t),
      ]
    }

    const paintAt = (x: number, y: number, pos: number) => {
      const [r, g, b] = lerpColor(pos)

      // core mark — where the brush actually touches
      for (let i = 0; i < 5; i++) {
        const ox     = (Math.random() - 0.5) * 18
        const oy     = (Math.random() - 0.5) * 18
        const radius = 10 + Math.random() * 14
        const alpha  = 0.018 + Math.random() * 0.022

        const grad = ctx.createRadialGradient(
          x + ox * 0.2, y + oy * 0.2, 0,
          x + ox,        y + oy,        radius
        )
        grad.addColorStop(0,   `rgba(${r},${g},${b},${alpha * 0.1})`)
        grad.addColorStop(0.4, `rgba(${r},${g},${b},${alpha * 0.6})`)
        grad.addColorStop(0.75, `rgba(${r},${g},${b},${alpha})`)
        grad.addColorStop(1,   `rgba(${r},${g},${b},0)`)

        ctx.beginPath()
        ctx.ellipse(
          x + ox, y + oy,
          radius, radius * (0.55 + Math.random() * 0.45),
          Math.random() * Math.PI,
          0, Math.PI * 2
        )
        ctx.fillStyle = grad
        ctx.fill()
      }

      // bleed layer — ink spreading outward through rice paper
      for (let i = 0; i < 5; i++) {
        const angle  = Math.random() * Math.PI * 2
        const spread = 14 + Math.random() * 28
        const ox     = Math.cos(angle) * spread
        const oy     = Math.sin(angle) * spread
        const radius = 22 + Math.random() * 36
        const alpha  = 0.01 + Math.random() * 0.016

        const grad = ctx.createRadialGradient(
          x + ox * 0.35, y + oy * 0.35, 0,
          x + ox,         y + oy,         radius
        )
        // slight edge concentration — capillary action pools pigment at bleed boundary
        grad.addColorStop(0,   `rgba(${r},${g},${b},${alpha * 0.2})`)
        grad.addColorStop(0.45, `rgba(${r},${g},${b},${alpha})`)
        grad.addColorStop(0.75, `rgba(${r},${g},${b},${alpha * 0.65})`)
        grad.addColorStop(1,   `rgba(${r},${g},${b},0)`)

        ctx.beginPath()
        ctx.ellipse(
          x + ox, y + oy,
          radius, radius * (0.4 + Math.random() * 0.5),
          Math.random() * Math.PI,
          0, Math.PI * 2
        )
        ctx.fillStyle = grad
        ctx.fill()
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX, y = e.clientY

      if (lastX !== -1) {
        const dist  = Math.hypot(x - lastX, y - lastY)
        const steps = Math.max(1, Math.floor(dist / 6))

        for (let i = 0; i <= steps; i++) {
          const t = i / steps
          paintAt(
            lastX + (x - lastX) * t,
            lastY + (y - lastY) * t,
            colorPos + (dist / 300) * t
          )
        }

        colorPos += dist / 300
      }

      lastX = x
      lastY = y
    }

    // very slow fade — erases ~fully in ~90s
    const fade = () => {
      ctx.globalCompositeOperation = "destination-out"
      ctx.fillStyle = "rgba(0,0,0,0.0018)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = "source-over"
      rafId = requestAnimationFrame(fade)
    }

    const onClick = (e: MouseEvent) => {
      if ((e.target as Element).closest("[data-no-clear]")) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("click", onClick)
    rafId = requestAnimationFrame(fade)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("click", onClick)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      aria-hidden
    />
  )
}
