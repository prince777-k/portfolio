"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Home,
  User,
  Briefcase,
  FolderGit2,
  Code2,
  BookOpen,
  MessageSquare,
  Search,
  Wifi,
  Volume2,
  Battery,
} from "lucide-react"
import { useWindowManager } from "./window-manager"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { GithubProjects } from "@/components/github-projects"
import { Skills } from "@/components/skills"
import { Hero } from "@/components/hero"

const apps = [
  { id: "home", name: "Home", icon: Home, content: <Hero /> },
  { id: "about", name: "About Me", icon: User, content: <About /> },
  { id: "experience", name: "Experience", icon: Briefcase, content: <Experience /> },
  { id: "projects", name: "Projects", icon: FolderGit2, content: <GithubProjects /> },
  { id: "skills", name: "Skills", icon: Code2, content: <Skills /> },
  { id: "blog", name: "Blog", icon: BookOpen, content: <div>Blog content coming soon</div> },
  { id: "contact", name: "Contact", icon: MessageSquare, content: <div>Contact form coming soon</div> },
]

export function Taskbar() {
  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const { windows, openWindow, focusWindow } = useWindowManager()
  const [time, setTime] = useState(new Date())

  // Update time every minute
  useState(() => {
    const interval = setInterval(() => setTime(new Date()), 60000)
    return () => clearInterval(interval)
  })

  const handleAppClick = (app: (typeof apps)[0]) => {
    const existingWindow = windows.find((w) => w.id === app.id)
    if (existingWindow) {
      focusWindow(app.id)
    } else {
      openWindow({
        id: app.id,
        title: app.name,
        icon: <app.icon className="h-4 w-4 text-blue-600" />,
        content: app.content,
      })
    }
    setStartMenuOpen(false)
  }

  return (
    <>
      {/* Start Menu */}
      {startMenuOpen && (
        <>
          <div className="fixed inset-0 z-[9998]" onClick={() => setStartMenuOpen(false)} />
          <div className="fixed bottom-20 left-4 z-[9999] w-[600px] overflow-hidden rounded-xl border-2 border-white/20 bg-white/90 shadow-2xl backdrop-blur-xl">
            <div className="p-6">
              <div className="mb-4 flex items-center gap-3 rounded-lg bg-white/50 px-4 py-3">
                <Search className="h-5 w-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search apps, settings, and documents"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-500"
                />
              </div>

              <div className="mb-4">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-600">Pinned Apps</h3>
                <div className="grid grid-cols-4 gap-3">
                  {apps.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => handleAppClick(app)}
                      className="flex flex-col items-center gap-2 rounded-lg p-3 transition-all hover:bg-blue-500/10"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg">
                        <app.icon className="h-6 w-6" />
                      </div>
                      <span className="text-xs font-medium text-gray-700">{app.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Hinata Sugimoto</p>
                    <p className="text-xs text-gray-600">Blockchain Developer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 z-[9997] flex h-16 items-center justify-between border-t-2 border-white/20 bg-white/80 px-4 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className={`h-12 w-12 ${startMenuOpen ? "bg-blue-500/20" : ""}`}
            onClick={() => setStartMenuOpen(!startMenuOpen)}
          >
            <div className="h-6 w-6 rounded bg-gradient-to-br from-blue-500 to-cyan-500" />
          </Button>

          <div className="mx-2 h-8 w-px bg-gray-300" />

          {windows
            .filter((w) => !w.isMinimized)
            .map((window) => (
              <Button
                key={window.id}
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 bg-blue-500/10"
                onClick={() => focusWindow(window.id)}
              >
                {window.icon}
                <span className="max-w-[150px] truncate text-xs">{window.title}</span>
              </Button>
            ))}
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Wifi className="h-4 w-4 text-gray-700" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Volume2 className="h-4 w-4 text-gray-700" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Battery className="h-4 w-4 text-gray-700" />
          </Button>
          <div className="text-right">
            <p className="text-xs font-semibold text-gray-800">
              {time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
            </p>
            <p className="text-xs text-gray-600">
              {time.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
