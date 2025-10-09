"use client"

import type { AppType } from "./desktop"
import { Window } from "./window"
import { ProjectsApp } from "./apps/projects-app"
import { SkillsApp } from "./apps/skills-app"
import { BlogApp } from "./apps/blog-app"
import { ContactApp } from "./apps/contact-app"
import { AboutApp } from "./apps/about-app"
import { ExperienceApp } from "./apps/experience-app"

interface WindowManagerProps {
  openApps: AppType[]
  activeApp: AppType | null
  onClose: (app: AppType) => void
  onMinimize: (app: AppType) => void
  onFocus: (app: AppType) => void
}

export function WindowManager({ openApps, activeApp, onClose, onMinimize, onFocus }: WindowManagerProps) {
  const appComponents = {
    projects: ProjectsApp,
    skills: SkillsApp,
    blog: BlogApp,
    contact: ContactApp,
    about: AboutApp,
    experience: ExperienceApp,
    education: AboutApp,
  }

  const appTitles = {
    projects: "Projects",
    skills: "Skills",
    blog: "Blog",
    contact: "Contact",
    about: "About Me",
    experience: "Experience",
    education: "Education",
  }

  return (
    <>
      {openApps.map((app) => {
        const AppComponent = appComponents[app]
        const isActive = activeApp === app

        return (
          <Window
            key={app}
            title={appTitles[app]}
            isActive={isActive}
            onClose={() => onClose(app)}
            onMinimize={() => onMinimize(app)}
            onFocus={() => onFocus(app)}
          >
            <AppComponent />
          </Window>
        )
      })}
    </>
  )
}
