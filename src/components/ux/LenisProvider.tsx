"use client"

import { ReactLenis } from "lenis/react"
import type { ReactNode } from "react"

export default function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.4,
        easing: (t: number) => 1 - Math.pow(2, -10 * t),
      }}
    >
      {children}
    </ReactLenis>
  )
}
