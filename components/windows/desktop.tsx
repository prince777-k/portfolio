"use client"

import { useWindowManager } from "./window-manager"
import { Window } from "./window"
import { Taskbar } from "./taskbar"
import { User, Briefcase, FolderGit2, Code2, Github } from "lucide-react"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { GithubProjects } from "@/components/github-projects"
import { Skills } from "@/components/skills"

const desktopIcons = [
  { id: "about", name: "About Me", icon: User, content: <About /> },
  { id: "experience", name: "Experience", icon: Briefcase, content: <Experience /> },
  { id: "projects", name: "Projects", icon: FolderGit2, content: <GithubProjects /> },
  { id: "skills", name: "Skills", icon: Code2, content: <Skills /> },
  {
    id: "github",
    name: "GitHub",
    icon: Github,
    content: <div>Opening GitHub...</div>,
    isExternal: true,
    url: "https://github.com/prince777-k",
  },
]

export function Desktop() {
  const { windows, openWindow } = useWindowManager()

  const handleIconDoubleClick = (icon: (typeof desktopIcons)[0]) => {
    if (icon.isExternal && icon.url) {
      window.open(icon.url, "_blank")
    } else {
      openWindow({
        id: icon.id,
        title: icon.name,
        icon: <icon.icon className="h-4 w-4 text-blue-600" />,
        content: icon.content,
      })
    }
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/.jpg?key=irz5u&height=1080&width=1920&query=beautiful mountain landscape with purple trees and soft lighting windows 11 wallpaper')",
        }}
      />

      {/* Desktop Icons */}
      <div className="relative z-10 grid grid-cols-1 gap-4 p-8">
        {desktopIcons.map((icon) => (
          <button
            key={icon.id}
            onDoubleClick={() => handleIconDoubleClick(icon)}
            className="flex w-24 flex-col items-center gap-2 rounded-lg p-3 transition-all hover:bg-white/10"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white/90 shadow-lg backdrop-blur-sm">
              <icon.icon className="h-7 w-7 text-blue-600" />
            </div>
            <span className="text-center text-xs font-medium text-white drop-shadow-lg">{icon.name}</span>
          </button>
        ))}
      </div>

      {/* Windows */}
      {windows.map((window) => (
        <Window key={window.id} {...window} />
      ))}

      {/* Taskbar */}
      <Taskbar />
    </div>
  )
}
