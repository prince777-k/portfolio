"use client"

import type React from "react"

import { useRef, useEffect, type ReactNode } from "react"
import { X, Minus, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWindowManager } from "./window-manager"

interface WindowProps {
  id: string
  title: string
  icon: ReactNode
  children: ReactNode
  isMinimized: boolean
  isMaximized: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
}

export function Window({ id, title, icon, children, isMinimized, isMaximized, position, size, zIndex }: WindowProps) {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindowPosition, updateWindowSize } =
    useWindowManager()
  const windowRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const isResizing = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        const deltaX = e.clientX - dragStart.current.x
        const deltaY = e.clientY - dragStart.current.y
        updateWindowPosition(id, {
          x: position.x + deltaX,
          y: position.y + deltaY,
        })
        dragStart.current = { x: e.clientX, y: e.clientY }
      } else if (isResizing.current) {
        const deltaX = e.clientX - resizeStart.current.x
        const deltaY = e.clientY - resizeStart.current.y
        updateWindowSize(id, {
          width: Math.max(400, resizeStart.current.width + deltaX),
          height: Math.max(300, resizeStart.current.height + deltaY),
        })
      }
    }

    const handleMouseUp = () => {
      isDragging.current = false
      isResizing.current = false
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [id, position, updateWindowPosition, updateWindowSize])

  const handleDragStart = (e: React.MouseEvent) => {
    if (isMaximized) return
    isDragging.current = true
    dragStart.current = { x: e.clientX, y: e.clientY }
    focusWindow(id)
  }

  const handleResizeStart = (e: React.MouseEvent) => {
    if (isMaximized) return
    e.stopPropagation()
    isResizing.current = true
    resizeStart.current = { x: e.clientX, y: e.clientY, width: size.width, height: size.height }
    focusWindow(id)
  }

  if (isMinimized) return null

  const windowStyle = isMaximized
    ? {
        left: 0,
        top: 0,
        width: "100vw",
        height: "calc(100vh - 4rem)",
        zIndex,
      }
    : {
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex,
      }

  return (
    <div
      ref={windowRef}
      className="fixed overflow-hidden rounded-xl border-2 border-white/20 bg-white/90 shadow-2xl backdrop-blur-xl transition-all"
      style={windowStyle}
      onClick={() => focusWindow(id)}
    >
      {/* Title Bar */}
      <div
        className="flex h-12 items-center justify-between border-b border-white/20 bg-white/50 px-4 backdrop-blur-sm"
        onMouseDown={handleDragStart}
        style={{ cursor: isMaximized ? "default" : "move" }}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center">{icon}</div>
          <span className="text-sm font-semibold text-gray-800">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-blue-500/20"
            onClick={(e) => {
              e.stopPropagation()
              minimizeWindow(id)
            }}
          >
            <Minus className="h-4 w-4 text-gray-700" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-blue-500/20"
            onClick={(e) => {
              e.stopPropagation()
              maximizeWindow(id)
            }}
          >
            <Square className="h-4 w-4 text-gray-700" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-red-500/20"
            onClick={(e) => {
              e.stopPropagation()
              closeWindow(id)
            }}
          >
            <X className="h-4 w-4 text-gray-700" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="h-[calc(100%-3rem)] overflow-auto bg-white/80 p-6">{children}</div>

      {/* Resize Handle */}
      {!isMaximized && (
        <div
          className="absolute bottom-0 right-0 h-4 w-4 cursor-nwse-resize"
          onMouseDown={handleResizeStart}
          style={{ background: "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.1) 50%)" }}
        />
      )}
    </div>
  )
}
