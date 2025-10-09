"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export interface WindowState {
  id: string
  title: string
  icon: ReactNode
  content: ReactNode
  isMinimized: boolean
  isMaximized: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
}

interface WindowManagerContextType {
  windows: WindowState[]
  openWindow: (window: Omit<WindowState, "isMinimized" | "isMaximized" | "position" | "size" | "zIndex">) => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  focusWindow: (id: string) => void
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void
  updateWindowSize: (id: string, size: { width: number; height: number }) => void
}

const WindowManagerContext = createContext<WindowManagerContextType | undefined>(undefined)

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([])
  const [nextZIndex, setNextZIndex] = useState(1000)

  const openWindow = useCallback(
    (window: Omit<WindowState, "isMinimized" | "isMaximized" | "position" | "size" | "zIndex">) => {
      setWindows((prev) => {
        const existing = prev.find((w) => w.id === window.id)
        if (existing) {
          return prev.map((w) => (w.id === window.id ? { ...w, isMinimized: false, zIndex: nextZIndex } : w))
        }
        return [
          ...prev,
          {
            ...window,
            isMinimized: false,
            isMaximized: false,
            position: { x: 100 + prev.length * 30, y: 50 + prev.length * 30 },
            size: { width: 900, height: 600 },
            zIndex: nextZIndex,
          },
        ]
      })
      setNextZIndex((prev) => prev + 1)
    },
    [nextZIndex],
  )

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id))
  }, [])

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)))
  }, [])

  const maximizeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized, isMinimized: false } : w)))
  }, [])

  const focusWindow = useCallback(
    (id: string) => {
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, zIndex: nextZIndex, isMinimized: false } : w)))
      setNextZIndex((prev) => prev + 1)
    },
    [nextZIndex],
  )

  const updateWindowPosition = useCallback((id: string, position: { x: number; y: number }) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, position } : w)))
  }, [])

  const updateWindowSize = useCallback((id: string, size: { width: number; height: number }) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, size } : w)))
  }, [])

  return (
    <WindowManagerContext.Provider
      value={{
        windows,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
        updateWindowPosition,
        updateWindowSize,
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  )
}

export function useWindowManager() {
  const context = useContext(WindowManagerContext)
  if (!context) {
    throw new Error("useWindowManager must be used within WindowManagerProvider")
  }
  return context
}
