"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export default function PageTransition({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(false)
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true))
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname])

  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.35s ease-out, transform 0.35s ease-out",
      }}
    >
      {children}
    </div>
  )
}
