"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { X, Minus, Square, Maximize2 } from "lucide-react"

interface WindowProps {
  id: string
  title: string
  children: React.ReactNode
  isActive: boolean
  onClose: () => void
  onMinimize: () => void
  onFocus: () => void
}

export default function Window({ id, title, children, isActive, onClose, onMinimize, onFocus }: WindowProps) {
  const [position, setPosition] = useState({ x: 100, y: 100 })
  const [size, setSize] = useState({ width: 900, height: 700 })
  const [isMaximized, setIsMaximized] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  // Center window on mount with responsive sizing
  useEffect(() => {
    const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1200
    const windowHeight = typeof window !== "undefined" ? window.innerHeight : 800

    // Responsive window sizing
    const responsiveWidth = Math.min(900, windowWidth * 0.9)
    const responsiveHeight = Math.min(700, windowHeight * 0.85)

    setSize({ width: responsiveWidth, height: responsiveHeight })

    const centerX = (windowWidth - responsiveWidth) / 2
    const centerY = (windowHeight - responsiveHeight - 48) / 2
    setPosition({ x: Math.max(0, centerX), y: Math.max(0, centerY) })
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
    onFocus()
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && !isMaximized) {
      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y
      setPosition({
        x: Math.max(0, Math.min(newX, window.innerWidth - size.width)),
        y: Math.max(0, Math.min(newY, window.innerHeight - size.height - 48)),
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setIsResizing(false)
  }

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, isResizing, dragStart, position, size])

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  const windowStyle = isMaximized
    ? { x: 0, y: 0, width: "100%", height: "calc(100vh - 48px)" }
    : { x: position.x, y: position.y, width: size.width, height: size.height }

  return (
    <motion.div
      ref={windowRef}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        ...windowStyle,
        zIndex: isActive ? 50 : 40,
      }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl bg-white/95 border border-gray-200/50"
      onClick={onFocus}
      style={{ minWidth: 400, minHeight: 300 }}
    >
      {/* Title Bar */}
      <div
        className={`flex items-center justify-between px-4 py-3 border-b border-gray-200/50 cursor-move select-none transition-colors ${
          isActive ? "bg-white/90" : "bg-gray-50/90"
        }`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-3">
          <div className="text-sm font-medium text-gray-800">{title}</div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onMinimize()
            }}
            className="p-1.5 rounded-md hover:bg-gray-200/50 transition-colors group"
          >
            <Minus className="w-4 h-4 text-gray-600 group-hover:text-gray-800" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleMaximize()
            }}
            className="p-1.5 rounded-md hover:bg-gray-200/50 transition-colors group"
          >
            {isMaximized ? (
              <Square className="w-4 h-4 text-gray-600 group-hover:text-gray-800" />
            ) : (
              <Maximize2 className="w-4 h-4 text-gray-600 group-hover:text-gray-800" />
            )}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="p-1.5 rounded-md hover:bg-red-500/10 transition-colors group"
          >
            <X className="w-4 h-4 text-gray-600 group-hover:text-red-600" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-[calc(100%-52px)] overflow-auto bg-white">
        <div className="p-6">{children}</div>
      </div>

      {/* Resize Handle */}
      {!isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          onMouseDown={(e) => {
            e.stopPropagation()
            setIsResizing(true)
            onFocus()
          }}
        />
      )}
    </motion.div>
  )
}
