"use client"

import type { LucideIcon } from "lucide-react"
import { useState } from "react"

interface DesktopIconProps {
  label: string
  icon: LucideIcon
  onDoubleClick: () => void
}

export function DesktopIcon({ label, icon: Icon, onDoubleClick }: DesktopIconProps) {
  const [clicks, setClicks] = useState(0)

  const handleClick = () => {
    setClicks((prev) => prev + 1)

    setTimeout(() => {
      if (clicks === 0) {
        onDoubleClick()
      }
      setClicks(0)
    }, 300)
  }

  return (
    <button
      onClick={handleClick}
      className="group flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 backdrop-blur-sm transition-all w-24"
    >
      <div className="p-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-white/20 transition-all">
        <Icon className="w-8 h-8 text-white drop-shadow-lg" />
      </div>
      <span className="text-white text-sm font-medium drop-shadow-lg text-center leading-tight">{label}</span>
    </button>
  )
}
