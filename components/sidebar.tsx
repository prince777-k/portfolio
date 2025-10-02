"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  Home,
  User,
  Briefcase,
  FolderGit2,
  Code2,
  BookOpen,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const navigation = [
  { name: "Overview", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Experience", href: "/experience", icon: Briefcase },
  { name: "Projects", href: "/projects", icon: FolderGit2 },
  { name: "Skills", href: "/skills", icon: Code2 },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Contact", href: "/contact", icon: MessageSquare },
]

const socials = [
  { name: "GitHub", icon: Github, href: "https://github.com/prince777-k" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { name: "Email", icon: Mail, href: "mailto:hinata@example.com" },
]

export function Sidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

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

      <div className="fixed left-4 top-4 z-50 hidden lg:block">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="bg-sidebar text-sidebar-foreground"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 transform bg-sidebar border-r-2 border-border shadow-2xl transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${collapsed ? "lg:w-20" : "lg:w-80"}`}
      >
        <div className="flex h-full flex-col px-8 py-12">
          <div className="mb-12">
            {!collapsed && (
              <>
                <div className="mb-6 flex justify-center">
                  <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-primary shadow-lg shadow-primary/30">
                    <Image
                      src="/blockchain-developer-with-digital-network-connecti.jpg"
                      alt="Blockchain Developer"
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                </div>
                <h1 className="text-balance text-4xl font-bold tracking-tight text-sidebar-foreground">
                  Hinata Sugimoto
                </h1>
                <p className="mt-3 text-pretty text-lg font-medium text-primary">Full-Stack & Blockchain Developer</p>
                <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-accent" />
                  <p>Nishi ward, Saitama, Japan</p>
                </div>
              </>
            )}
            {collapsed && (
              <div className="flex justify-center">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-primary shadow-md">
                  <Image
                    src="/blockchain-developer-with-digital-network-connecti.jpg"
                    alt="Avatar"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          <nav className="flex-1 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  } ${collapsed ? "justify-center" : ""}`}
                  title={collapsed ? item.name : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              )
            })}
          </nav>

          {/* Social Links */}
          <div className={`mt-8 flex gap-4 ${collapsed ? "flex-col items-center" : ""}`}>
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-all hover:scale-110 hover:text-primary"
                title={social.name}
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
