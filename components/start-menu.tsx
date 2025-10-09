"use client"

import { FolderGit2, Code, BookOpen, Mail, User, Briefcase, Power, Settings } from "lucide-react"
import type { AppType } from "./desktop"
import Image from "next/image"

interface StartMenuProps {
  isOpen: boolean
  onClose: () => void
  onAppClick: (app: AppType) => void
}

const apps = [
  { id: "projects" as AppType, label: "Projects", icon: FolderGit2, color: "from-blue-500 to-cyan-500" },
  { id: "skills" as AppType, label: "Skills", icon: Code, color: "from-purple-500 to-pink-500" },
  { id: "experience" as AppType, label: "Experience", icon: Briefcase, color: "from-orange-500 to-red-500" },
  { id: "blog" as AppType, label: "Blog", icon: BookOpen, color: "from-green-500 to-emerald-500" },
  { id: "about" as AppType, label: "About Me", icon: User, color: "from-indigo-500 to-purple-500" },
  { id: "contact" as AppType, label: "Contact", icon: Mail, color: "from-pink-500 to-rose-500" },
]

export function StartMenu({ isOpen, onClose, onAppClick }: StartMenuProps) {
  if (!isOpen) return null

  const handleAppClick = (app: AppType) => {
    onAppClick(app)
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Start Menu */}
      <div className="fixed bottom-14 left-2 z-50 w-[600px] rounded-xl bg-white/20 backdrop-blur-3xl border border-white/30 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-white/30">
              <Image
                src="/blockchain-developer-avatar.jpg"
                alt="Profile"
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-white font-semibold">Blockchain Developer</h3>
              <p className="text-white/70 text-sm">Portfolio</p>
            </div>
          </div>
        </div>

        {/* Apps Grid */}
        <div className="p-6">
          <h4 className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-4">Pinned</h4>
          <div className="grid grid-cols-3 gap-4">
            {apps.map((app) => {
              const Icon = app.icon
              return (
                <button
                  key={app.id}
                  onClick={() => handleAppClick(app.id)}
                  className="group flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-white/10 transition-all"
                >
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${app.color} shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white text-sm font-medium text-center">{app.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/20 flex items-center justify-between">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-all text-white">
            <Settings className="w-4 h-4" />
            <span className="text-sm">Settings</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-500/20 transition-all text-white">
            <Power className="w-4 h-4" />
            <span className="text-sm">Shut down</span>
          </button>
        </div>
      </div>
    </>
  )
}
