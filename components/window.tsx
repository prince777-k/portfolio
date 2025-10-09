"use client"

import type React from "react"

import { X, Minus, Square } from "lucide-react"
import { useState, useRef, useEffect } from "react"

interface WindowProps {
  title: string
  isActive: boolean
  onClose: () => void
  onMinimize: () => void
  onFocus: () => void
  children: React.ReactNode
}

export function Window({ title, isActive, onClose, onMinimize, onFocus, children }: WindowProps) {
  const [position, setPosition] = useState({ x: 100, y: 50 })
  const [size, setSize] = useState({ width: 900, height: 600 })
  const [isDragging, setIsDragging] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const dragRef = useRef({ startX: 0, startY: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return
    setIsDragging(true)
    dragRef.current = {
      startX: e.clientX - position.x,
      startY: e.clientY - position.y,
    }
    onFocus()
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || isMaximized) return
      setPosition({
        x: e.clientX - dragRef.current.startX,
        y: Math.max(0, e.clientY - dragRef.current.startY),
      })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, isMaximized])

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  const windowStyle = isMaximized
    ? { top: 0, left: 0, right: 0, bottom: 48, width: "100%", height: "calc(100% - 48px)" }
    : { top: position.y, left: position.x, width: size.width, height: size.height }

  return (
    <div
      className={`absolute rounded-lg overflow-hidden shadow-2xl transition-all ${isActive ? "z-40" : "z-30"}`}
      style={windowStyle}
      onClick={onFocus}
    >
      {/* Window Chrome */}
      <div
        className={`h-10 flex items-center justify-between px-4 cursor-move select-none ${
          isActive
            ? "bg-white/20 backdrop-blur-2xl border-b border-white/30"
            : "bg-white/10 backdrop-blur-2xl border-b border-white/20"
        }`}
        onMouseDown={handleMouseDown}
        onDoubleClick={toggleMaximize}
      >
        <span className="text-white text-sm font-medium">{title}</span>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onMinimize()
            }}
            className="p-1.5 hover:bg-white/20 rounded transition-all"
          >
            <Minus className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleMaximize()
            }}
            className="p-1.5 hover:bg-white/20 rounded transition-all"
          >
            <Square className="w-3.5 h-3.5 text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="p-1.5 hover:bg-red-500/80 rounded transition-all"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-[calc(100%-40px)] bg-white/95 backdrop-blur-xl overflow-auto">{children}</div>
    </div>
  )
}
