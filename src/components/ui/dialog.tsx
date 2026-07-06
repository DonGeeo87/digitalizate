import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

const DialogContext = React.createContext<{ open: boolean; onOpenChange: (v: boolean) => void }>({
  open: false,
  onOpenChange: () => {},
})

function Dialog({ open, onOpenChange, children }: { open?: boolean; onOpenChange?: (v: boolean) => void; children: React.ReactNode }) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const isOpen = open ?? internalOpen
  const setOpen = onOpenChange ?? setInternalOpen
  return (
    <DialogContext.Provider value={{ open: isOpen, onOpenChange: setOpen }}>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[85vh] overflow-auto p-6 z-[101]">
            {children}
          </div>
        </div>
      )}
    </DialogContext.Provider>
  )
}

function DialogContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const ctx = React.useContext(DialogContext)
  return (
    <div className={cn("relative", className)} {...props}>
      <button onClick={() => ctx.onOpenChange(false)} className="absolute top-2 right-2 p-1 rounded-full hover:bg-slate-100 text-slate-400">
        <X className="w-4 h-4" />
      </button>
      {children}
    </div>
  )
}

function DialogHeader({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-center space-y-2", className)} {...props}>{children}</div>
}

function DialogTitle({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-xl font-bold text-slate-900", className)} {...props}>{children}</h2>
}

function DialogDescription({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-slate-500 text-sm", className)} {...props}>{children}</p>
}

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription }