"use client"

import { useEffect, useState } from "react"

export default function GrainOverlay() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShow(false)
    }
  }, [])

  if (!show) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9998] mix-blend-overlay"
      style={{
        opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "256px",
      }}
    />
  )
}
