"use client"

import { useState } from "react"
import { Github, Linkedin, Mail, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Overview", href: "#overview" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
]

const socials = [
  { name: "GitHub", icon: Github, href: "https://github.com" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { name: "Email", icon: Mail, href: "mailto:hinata@example.com" },
]

export function Sidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed left-4 top-4 z-50 lg:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="bg-sidebar text-sidebar-foreground"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-80 transform bg-sidebar transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-sidebar-foreground">Hinata Sugimoto</h1>
            <p className="mt-3 text-pretty text-lg text-sidebar-foreground/80">Full-Stack & Blockchain Developer</p>
            <p className="mt-2 text-sm text-sidebar-foreground/60">Nishi ward, Saitama, Japan</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-4 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="mt-8 flex gap-4">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sidebar-foreground/60 transition-colors hover:text-sidebar-primary"
              >
                <span className="sr-only">{social.name}</span>
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}
    </>
  )
}
