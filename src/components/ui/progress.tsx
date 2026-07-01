import * as React from "react"
import { cn } from "@/lib/utils"

const Progress = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value?: number }>(
  ({ className, value = 0, ...props }, ref) => (
    <div ref={ref} className={cn("h-2 bg-green-500/10 rounded-full overflow-hidden", className)} {...props}>
      <div
        className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
)
Progress.displayName = "Progress"

export { Progress }
