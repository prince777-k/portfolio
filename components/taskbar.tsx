"use client"

import {
  Search,
  Grid3x3,
  FolderGit2,
  Code,
  BookOpen,
  Mail,
  User,
  Briefcase,
  Wifi,
  Volume2,
  Battery,
} from "lucide-react"
import type { AppType } from "./desktop"
import { useState } from "react"

interface TaskbarProps {
  openApps: AppType[]
  activeApp: AppType | null
  onAppClick: (app: AppType) => void
  onStartClick: () => void
}

const appIcons = {
  projects: FolderGit2,
  skills: Code,
  blog: BookOpen,
  contact: Mail,
  about: User,
  experience: Briefcase,
  education: User,
}

const appLabels = {
  projects: "Projects",
  skills: "Skills",
  blog: "Blog",
  contact: "Contact",
  about: "About Me",
  experience: "Experience",
  education: "Education",
}

export function Taskbar({ openApps, activeApp, onAppClick, onStartClick }: TaskbarProps) {
  const [time, setTime] = useState(new Date())

  // Update time every minute
  useState(() => {
    const interval = setInterval(() => setTime(new Date()), 60000)
    return () => clearInterval(interval)
  })

  return (
    <div className="h-12 bg-white/10 backdrop-blur-2xl border-t border-white/20 flex items-center justify-between px-2 shadow-2xl">
      {/* Left Section - Start Button and Search */}
      <div className="flex items-center gap-1">
        <button onClick={onStartClick} className="p-2 hover:bg-white/10 rounded-lg transition-all group">
          <Grid3x3 className="w-5 h-5 text-white group-hover:text-cyan-400 transition-colors" />
        </button>

        <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded-lg transition-all">
          <Search className="w-4 h-4 text-white/70" />
          <span className="text-white/70 text-sm">Search</span>
        </button>
      </div>

      {/* Center Section - Open Apps */}
      <div className="flex items-center gap-1">
        {openApps.map((app) => {
          const Icon = appIcons[app]
          const isActive = activeApp === app

          return (
            <button
              key={app}
              onClick={() => onAppClick(app)}
              className={`relative p-2 rounded-lg transition-all ${isActive ? "bg-white/20" : "hover:bg-white/10"}`}
              title={appLabels[app]}
            >
              <Icon className="w-5 h-5 text-white" />
              {isActive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-cyan-400 rounded-full" />
              )}
            </button>
          )
        })}
      </div>

      {/* Right Section - System Tray */}
      <div className="flex items-center gap-3">
        <button className="p-1.5 hover:bg-white/10 rounded transition-all">
          <Wifi className="w-4 h-4 text-white" />
        </button>
        <button className="p-1.5 hover:bg-white/10 rounded transition-all">
          <Volume2 className="w-4 h-4 text-white" />
        </button>
        <button className="p-1.5 hover:bg-white/10 rounded transition-all">
          <Battery className="w-4 h-4 text-white" />
        </button>

        <div className="text-white text-xs text-right px-2">
          <div className="font-medium">
            {time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}
          </div>
          <div className="text-white/70">
            {time.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" })}
          </div>
        </div>
      </div>
    </div>
  )
}
