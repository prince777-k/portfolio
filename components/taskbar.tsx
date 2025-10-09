"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Grid3x3, Wifi, Volume2, Battery, ChevronUp } from "lucide-react"
import Image from "next/image"

interface TaskbarProps {
  openApps: Array<{ id: string; name: string; icon: React.ReactNode }>
  activeApp: string | null
  onAppClick: (appId: string) => void
  allApps: Array<{ id: string; name: string; icon: React.ReactNode }>
}

export default function Taskbar({ openApps, activeApp, onAppClick, allApps }: TaskbarProps) {
  const [showStartMenu, setShowStartMenu] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every minute
  useState(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(interval)
  })

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <>
      {/* Start Menu */}
      <AnimatePresence>
        {showStartMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setShowStartMenu(false)}
            />

            {/* Start Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 w-[640px] h-[720px] bg-white/90 backdrop-blur-2xl rounded-xl shadow-2xl border border-gray-200/50 overflow-hidden"
            >
              {/* Search Bar */}
              <div className="p-6 border-b border-gray-200/50">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for apps, settings, and documents"
                    className="w-full pl-10 pr-4 py-3 bg-gray-100/50 rounded-lg border border-gray-200/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                  />
                </div>
              </div>

              {/* Pinned Apps */}
              <div className="p-6">
                <h3 className="text-sm font-semibold text-gray-600 mb-4">Pinned</h3>
                <div className="grid grid-cols-6 gap-4">
                  {allApps.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => {
                        onAppClick(app.id)
                        setShowStartMenu(false)
                      }}
                      className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100/50 transition-all group"
                    >
                      <div className="text-cyan-500 group-hover:scale-110 transition-transform">{app.icon}</div>
                      <span className="text-xs text-gray-700 text-center line-clamp-2">{app.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* User Profile */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200/50 bg-white/50">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image src="/blockchain-developer-avatar.jpg" alt="Profile" fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800">Prince</div>
                    <div className="text-xs text-gray-500">Blockchain Developer</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Taskbar */}
      <div className="h-12 bg-white/80 backdrop-blur-2xl border-t border-gray-200/50 flex items-center justify-between px-2 relative z-30">
        {/* Left Section - Start Button */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowStartMenu(!showStartMenu)}
            className={`p-2 rounded-md transition-all ${showStartMenu ? "bg-gray-200/50" : "hover:bg-gray-100/50"}`}
          >
            <Grid3x3 className="w-5 h-5 text-gray-700" />
          </button>

          <button className="p-2 rounded-md hover:bg-gray-100/50 transition-all">
            <Search className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Center Section - Open Apps */}
        <div className="flex items-center gap-1">
          {openApps.map((app) => (
            <button
              key={app.id}
              onClick={() => onAppClick(app.id)}
              className={`p-2 rounded-md transition-all relative ${
                activeApp === app.id ? "bg-gray-200/50" : "hover:bg-gray-100/50"
              }`}
            >
              <div className="text-cyan-500 scale-75">{app.icon}</div>
              {activeApp === app.id && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-cyan-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Right Section - System Tray */}
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-md hover:bg-gray-100/50 transition-all">
            <ChevronUp className="w-4 h-4 text-gray-700" />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100/50 transition-all">
            <Wifi className="w-4 h-4 text-gray-700" />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100/50 transition-all">
            <Volume2 className="w-4 h-4 text-gray-700" />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100/50 transition-all">
            <Battery className="w-4 h-4 text-gray-700" />
          </button>

          <button className="px-3 py-1 rounded-md hover:bg-gray-100/50 transition-all">
            <div className="text-xs text-gray-700 text-right">
              <div className="font-medium">{formatTime(currentTime)}</div>
              <div className="text-[10px]">{formatDate(currentTime)}</div>
            </div>
          </button>
        </div>
      </div>
    </>
  )
}
