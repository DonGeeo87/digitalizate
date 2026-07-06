"use client"

import { useEffect, useRef, useState } from "react"

interface ParallaxBlobProps {
  className?: string
  color?: string
}

export default function ParallaxBlob({
  className = "",
  color = "rgba(245,158,11,0.08)",
}: ParallaxBlobProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true)
      return
    }

    const el = ref.current
    if (!el) return

    let visible = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
      },
      { threshold: 0 }
    )
    observer.observe(el)

    const onScroll = () => {
      if (!visible) return
      setOffset(window.scrollY * 0.15)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute w-96 h-96 rounded-full blur-3xl ${className}`}
      style={{
        background: color,
        transform: reducedMotion ? "none" : `translateY(${-offset}px)`,
        willChange: reducedMotion ? "auto" : "transform",
      }}
    />
  )
}
