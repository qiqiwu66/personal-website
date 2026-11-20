"use client"

import { useEffect, useRef } from "react"

export type BrushStyle = "pencil" | "marker" | "brush" | "wide"

export function TrailAnimation({ palette, brushStyle }: { palette: number[][]; brushStyle: BrushStyle }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const brushRef  = useRef(brushStyle)
  const palRef    = useRef(palette)
  useEffect(() => { brushRef.current  = brushStyle }, [brushStyle])
  useEffect(() => { palRef.current    = palette    }, [palette])

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

    let colorPos = 0
    let lastX = -1, lastY = -1
    let rafId: number

    const lerp = (pos: number) => {
      const pal = palRef.current
      const len = pal.length
      const idx = Math.floor(pos % len)
      const t   = pos % 1
      const c0  = pal[idx % len]
      const c1  = pal[(idx + 1) % len]
      return [
        Math.round(c0[0] + (c1[0] - c0[0]) * t),
        Math.round(c0[1] + (c1[1] - c0[1]) * t),
        Math.round(c0[2] + (c1[2] - c0[2]) * t),
      ]
    }

    const paintAt = (x: number, y: number, pos: number) => {
      const [r, g, b] = lerp(pos)
      const style = brushRef.current

      if (style === "pencil") {
        for (let i = 0; i < 4; i++) {
          const ox = (Math.random() - 0.5) * 1.5
          const oy = (Math.random() - 0.5) * 1.5
          ctx.beginPath()
          ctx.ellipse(
            x + ox, y + oy,
            0.7 + Math.random() * 0.6,
            0.4 + Math.random() * 0.5,
            Math.random() * Math.PI,
            0, Math.PI * 2
          )
          ctx.fillStyle = `rgba(${r},${g},${b},${0.55 + Math.random() * 0.35})`
          ctx.fill()
        }

      } else if (style === "marker") {
        for (let i = 0; i < 5; i++) {
          const ox = (Math.random() - 0.5) * 10
          const oy = (Math.random() - 0.5) * 10
          const rw = 12 + Math.random() * 8
          const rh = 5  + Math.random() * 4
          const a  = 0.045 + Math.random() * 0.035
          const grad = ctx.createRadialGradient(x + ox * 0.3, y + oy * 0.3, 0, x + ox, y + oy, rw)
          grad.addColorStop(0,   `rgba(${r},${g},${b},${a})`)
          grad.addColorStop(0.65,`rgba(${r},${g},${b},${a})`)
          grad.addColorStop(1,   `rgba(${r},${g},${b},0)`)
          ctx.beginPath()
          ctx.ellipse(x + ox, y + oy, rw, rh, 0.25, 0, Math.PI * 2)
          ctx.fillStyle = grad
          ctx.fill()
        }

      } else if (style === "brush") {
        // core mark — 50% narrower
        for (let i = 0; i < 5; i++) {
          const ox     = (Math.random() - 0.5) * 9
          const oy     = (Math.random() - 0.5) * 9
          const radius = 5 + Math.random() * 7
          const alpha  = 0.018 + Math.random() * 0.022
          const grad = ctx.createRadialGradient(x + ox * 0.2, y + oy * 0.2, 0, x + ox, y + oy, radius)
          grad.addColorStop(0,    `rgba(${r},${g},${b},${alpha * 0.1})`)
          grad.addColorStop(0.4,  `rgba(${r},${g},${b},${alpha * 0.6})`)
          grad.addColorStop(0.75, `rgba(${r},${g},${b},${alpha})`)
          grad.addColorStop(1,    `rgba(${r},${g},${b},0)`)
          ctx.beginPath()
          ctx.ellipse(x + ox, y + oy, radius, radius * (0.55 + Math.random() * 0.45), Math.random() * Math.PI, 0, Math.PI * 2)
          ctx.fillStyle = grad
          ctx.fill()
        }
        // tendril bleed — elongated spikes radiating outward unevenly
        const numTendrils = 4 + Math.floor(Math.random() * 3)
        for (let i = 0; i < numTendrils; i++) {
          const angle  = Math.random() * Math.PI * 2
          const start  = 3  + Math.random() * 7
          const length = 10 + Math.random() * 22
          const width  = 1.5 + Math.random() * 2.5
          const alpha  = 0.012 + Math.random() * 0.016
          // gradient anchored at base of tendril, fades to tip
          const gx = x + Math.cos(angle) * start
          const gy = y + Math.sin(angle) * start
          const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, length)
          grad.addColorStop(0,   `rgba(${r},${g},${b},${alpha})`)
          grad.addColorStop(0.55,`rgba(${r},${g},${b},${alpha * 0.45})`)
          grad.addColorStop(1,   `rgba(${r},${g},${b},0)`)
          // narrow ellipse oriented along the angle
          const cx = x + Math.cos(angle) * (start + length / 2)
          const cy = y + Math.sin(angle) * (start + length / 2)
          ctx.beginPath()
          ctx.ellipse(cx, cy, length / 2, width / 2, angle, 0, Math.PI * 2)
          ctx.fillStyle = grad
          ctx.fill()
        }

      } else if (style === "wide") {
        // wide core marks
        for (let i = 0; i < 6; i++) {
          const ox     = (Math.random() - 0.5) * 60
          const oy     = (Math.random() - 0.5) * 60
          const radius = 40 + Math.random() * 60
          const alpha  = 0.01 + Math.random() * 0.014
          const grad = ctx.createRadialGradient(x + ox * 0.2, y + oy * 0.2, 0, x + ox, y + oy, radius)
          grad.addColorStop(0,    `rgba(${r},${g},${b},${alpha * 0.1})`)
          grad.addColorStop(0.4,  `rgba(${r},${g},${b},${alpha * 0.5})`)
          grad.addColorStop(0.75, `rgba(${r},${g},${b},${alpha})`)
          grad.addColorStop(1,    `rgba(${r},${g},${b},0)`)
          ctx.beginPath()
          ctx.ellipse(x + ox, y + oy, radius, radius * (0.4 + Math.random() * 0.5), Math.random() * Math.PI, 0, Math.PI * 2)
          ctx.fillStyle = grad
          ctx.fill()
        }
        // heavy bleed that travels far
        for (let i = 0; i < 10; i++) {
          const angle  = Math.random() * Math.PI * 2
          const spread = 60 + Math.random() * 140
          const ox     = Math.cos(angle) * spread
          const oy     = Math.sin(angle) * spread
          const radius = 70 + Math.random() * 110
          const alpha  = 0.007 + Math.random() * 0.011
          const grad = ctx.createRadialGradient(x + ox * 0.35, y + oy * 0.35, 0, x + ox, y + oy, radius)
          grad.addColorStop(0,    `rgba(${r},${g},${b},${alpha * 0.15})`)
          grad.addColorStop(0.4,  `rgba(${r},${g},${b},${alpha})`)
          grad.addColorStop(0.75, `rgba(${r},${g},${b},${alpha * 0.6})`)
          grad.addColorStop(1,    `rgba(${r},${g},${b},0)`)
          ctx.beginPath()
          ctx.ellipse(x + ox, y + oy, radius, radius * (0.3 + Math.random() * 0.5), Math.random() * Math.PI, 0, Math.PI * 2)
          ctx.fillStyle = grad
          ctx.fill()
        }
      }
    }

    const stepSize = () => brushRef.current === "pencil" ? 2 : brushRef.current === "wide" ? 10 : 6

    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX, y = e.clientY
      if (lastX !== -1) {
        const dist  = Math.hypot(x - lastX, y - lastY)
        const step  = stepSize()
        const steps = Math.max(1, Math.floor(dist / step))
        for (let i = 0; i <= steps; i++) {
          const t = i / steps
          paintAt(lastX + (x - lastX) * t, lastY + (y - lastY) * t, colorPos + (dist / 300) * t)
        }
        colorPos += dist / 300
      }
      lastX = x; lastY = y
    }

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

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[1]" aria-hidden />
}
