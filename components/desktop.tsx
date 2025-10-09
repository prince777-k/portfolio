"use client"

import { useState } from "react"
import { Taskbar } from "./taskbar"
import { DesktopIcon } from "./desktop-icon"
import { WindowManager } from "./window-manager"
import { StartMenu } from "./start-menu"
import { FolderGit2, Code, BookOpen, Mail, User, Briefcase } from "lucide-react"
import Image from "next/image"

interface DesktopProps {
  userName: string
}

export type AppType = "projects" | "skills" | "blog" | "contact" | "about" | "experience" | "education"

export function Desktop({ userName }: DesktopProps) {
  const [openApps, setOpenApps] = useState<AppType[]>([])
  const [activeApp, setActiveApp] = useState<AppType | null>(null)
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)

  const openApp = (app: AppType) => {
    if (!openApps.includes(app)) {
      setOpenApps([...openApps, app])
    }
    setActiveApp(app)
  }

  const closeApp = (app: AppType) => {
    setOpenApps(openApps.filter((a) => a !== app))
    if (activeApp === app) {
      setActiveApp(openApps[openApps.length - 2] || null)
    }
  }

  const minimizeApp = (app: AppType) => {
    if (activeApp === app) {
      setActiveApp(null)
    }
  }

  const desktopIcons = [
    { id: "projects" as AppType, label: "Projects", icon: FolderGit2 },
    { id: "skills" as AppType, label: "Skills", icon: Code },
    { id: "experience" as AppType, label: "Experience", icon: Briefcase },
    { id: "blog" as AppType, label: "Blog", icon: BookOpen },
    { id: "about" as AppType, label: "About Me", icon: User },
    { id: "contact" as AppType, label: "Contact", icon: Mail },
  ]

  return (
    <div className="fixed inset-0 flex flex-col">
      {/* Desktop Background */}
      <div className="flex-1 relative overflow-hidden">
        <Image src="/windows-wallpaper.jpg" alt="Desktop Background" fill className="object-cover" priority />

        {/* Desktop Icons */}
        <div className="absolute inset-0 p-8 grid grid-cols-1 gap-6 content-start auto-rows-min">
          {desktopIcons.map((icon) => (
            <DesktopIcon key={icon.id} label={icon.label} icon={icon.icon} onDoubleClick={() => openApp(icon.id)} />
          ))}
        </div>

        {/* Windows */}
        <WindowManager
          openApps={openApps}
          activeApp={activeApp}
          onClose={closeApp}
          onMinimize={minimizeApp}
          onFocus={setActiveApp}
        />

        {/* Start Menu */}
        <StartMenu isOpen={isStartMenuOpen} onClose={() => setIsStartMenuOpen(false)} onAppClick={openApp} />
      </div>

      {/* Taskbar */}
      <Taskbar
        openApps={openApps}
        activeApp={activeApp}
        onAppClick={(app) => {
          if (activeApp === app) {
            minimizeApp(app)
          } else {
            setActiveApp(app)
          }
        }}
        onStartClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
      />
    </div>
  )
}
