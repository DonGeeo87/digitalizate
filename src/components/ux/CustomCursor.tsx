"use client"

import { useEffect, useRef, useState } from "react"

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [active, setActive] = useState(false)
  const pos = useRef({ x: -100, y: -100 })

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.innerWidth <= 768) return

    setActive(true)
    document.body.style.cursor = "none"

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }

    let raf: number
    const animate = () => {
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    const onHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]")
      ) {
        setIsHovering(true)
      }
    }
    const onHoverEnd = () => setIsHovering(false)

    window.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseover", onHoverStart)
    document.addEventListener("mouseout", onHoverEnd)

    return () => {
      document.body.style.cursor = ""
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseover", onHoverStart)
      document.removeEventListener("mouseout", onHoverEnd)
    }
  }, [])

  if (!active) return null

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f59e0b]"
        style={{ width: 8, height: 8, willChange: "transform" }}
      />
      <div
        ref={followerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f59e0b]/50 backdrop-blur-sm"
        style={{
          width: 40,
          height: 40,
          transform: "translate(-100px, -100px)",
          transition: "width 0.2s, height 0.2s, border-color 0.2s, box-shadow 0.2s",
          ...(isHovering
            ? {
                width: 60,
                height: 60,
                borderColor: "rgba(245,158,11,0.8)",
                boxShadow: "0 0 24px rgba(245,158,11,0.4)",
              }
            : {}),
          willChange: "transform",
        }}
      />
    </>
  )
}
