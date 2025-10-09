"use client"

import type React from "react"

import { useState } from "react"
import { Wifi, Power, UserIcon } from "lucide-react"
import Image from "next/image"

interface LoginScreenProps {
  onLogin: (name: string) => void
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onLogin(name.trim())
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0">
        <Image src="/windows-wallpaper.jpg" alt="Windows Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
      </div>

      {/* Login Form */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Profile Picture */}
        <div className="relative h-32 w-32 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-1 shadow-2xl">
          <div className="h-full w-full rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center overflow-hidden">
            <Image
              src="/blockchain-developer-avatar.jpg"
              alt="Profile"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
        </div>

        {/* Name Input */}
        {!showPassword ? (
          <div className="text-center">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && name.trim()) {
                  setShowPassword(true)
                }
              }}
              placeholder="Enter your name"
              className="bg-transparent text-white text-2xl text-center placeholder:text-white/60 outline-none font-light tracking-wide"
              autoFocus
            />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
            <h2 className="text-white text-2xl font-light">{name}</h2>

            {/* Password Input */}
            <div className="w-80">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-white placeholder:text-white/50 outline-none focus:bg-white/20 focus:border-white/40 transition-all"
                autoFocus
              />
            </div>

            <button type="submit" className="text-white/70 hover:text-white text-sm transition-colors">
              I forgot my PIN
            </button>
          </form>
        )}
      </div>

      {/* Bottom Right Icons */}
      <div className="absolute bottom-8 right-8 flex items-center gap-4">
        <button className="p-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
          <Wifi className="w-5 h-5 text-white" />
        </button>
        <button className="p-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
          <UserIcon className="w-5 h-5 text-white" />
        </button>
        <button className="p-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
          <Power className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Time Display */}
      <div className="absolute bottom-8 left-8 text-white">
        <div className="text-6xl font-light">
          {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}
        </div>
        <div className="text-lg font-light opacity-80">
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </div>
      </div>
    </div>
  )
}
