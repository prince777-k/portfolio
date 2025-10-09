"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { User, Briefcase, Code2, GraduationCap, FolderGit2, BookOpen, Mail, Award } from "lucide-react"
import Taskbar from "./taskbar"
import Window from "./window"
import { About } from "./about"
import { Experience } from "./experience"
import { Skills } from "./skills"
import { GithubProjects } from "./github-projects"
import { Achievements } from "./achievements"
import BlogPage from "../app/blog/page"
import ContactPage from "../app/contact/page"

interface DesktopApp {
  id: string
  name: string
  icon: React.ReactNode
  component: React.ReactNode
}

const apps: DesktopApp[] = [
  { id: "about", name: "About Me", icon: <User className="w-12 h-12" />, component: <About /> },
  { id: "experience", name: "Experience", icon: <Briefcase className="w-12 h-12" />, component: <Experience /> },
  { id: "projects", name: "Projects", icon: <FolderGit2 className="w-12 h-12" />, component: <GithubProjects /> },
  { id: "skills", name: "Skills", icon: <Code2 className="w-12 h-12" />, component: <Skills /> },
  { id: "education", name: "Education", icon: <GraduationCap className="w-12 h-12" />, component: null },
  { id: "achievements", name: "Achievements", icon: <Award className="w-12 h-12" />, component: <Achievements /> },
  { id: "blog", name: "Blog", icon: <BookOpen className="w-12 h-12" />, component: <BlogPage /> },
  { id: "contact", name: "Contact", icon: <Mail className="w-12 h-12" />, component: <ContactPage /> },
]

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState<string[]>([])
  const [activeWindow, setActiveWindow] = useState<string | null>(null)

  const openApp = (appId: string) => {
    if (!openWindows.includes(appId)) {
      setOpenWindows([...openWindows, appId])
    }
    setActiveWindow(appId)
  }

  const closeWindow = (appId: string) => {
    setOpenWindows(openWindows.filter((id) => id !== appId))
    if (activeWindow === appId) {
      setActiveWindow(openWindows[openWindows.length - 2] || null)
    }
  }

  const minimizeWindow = (appId: string) => {
    if (activeWindow === appId) {
      setActiveWindow(null)
    }
  }

  return (
    <div className="fixed inset-0 flex flex-col">
      {/* Desktop Background */}
      <div className="flex-1 relative overflow-hidden">
        <Image
          src="/blockchain-developer-with-digital-network-connecti.jpg"
          alt="Desktop Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10" />

        {/* Desktop Icons */}
        <div className="relative z-10 p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 content-start h-full">
          {apps.map((app, index) => (
            <motion.button
              key={app.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => openApp(app.id)}
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-white/10 backdrop-blur-sm transition-all group"
            >
              <div className="text-white drop-shadow-lg group-hover:scale-110 transition-transform">{app.icon}</div>
              <span className="text-white text-sm font-medium drop-shadow-lg text-center">{app.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Windows */}
        {openWindows.map((appId) => {
          const app = apps.find((a) => a.id === appId)
          if (!app) return null

          return (
            <Window
              key={appId}
              id={appId}
              title={app.name}
              isActive={activeWindow === appId}
              onClose={() => closeWindow(appId)}
              onMinimize={() => minimizeWindow(appId)}
              onFocus={() => setActiveWindow(appId)}
            >
              {app.component || (
                <div className="flex items-center justify-center h-full text-gray-500">
                  {app.name} content will be loaded here
                </div>
              )}
            </Window>
          )
        })}
      </div>

      {/* Taskbar */}
      <Taskbar
        openApps={openWindows.map((id) => apps.find((a) => a.id === id)!)}
        activeApp={activeWindow}
        onAppClick={openApp}
        allApps={apps}
      />
    </div>
  )
}
