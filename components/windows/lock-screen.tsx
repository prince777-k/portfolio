"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Wifi, Volume2, Battery } from "lucide-react"
import Image from "next/image"

interface LockScreenProps {
  onUnlock: () => void
}

export function LockScreen({ onUnlock }: LockScreenProps) {
  const [password, setPassword] = useState("")
  const [time] = useState(new Date())

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Accept any password for demo purposes
    if (password) {
      onUnlock()
    }
  }

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden">
      {/* Wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/.jpg?key=irz5u&height=1080&width=1920&query=beautiful mountain landscape with purple trees and soft lighting windows 11 wallpaper')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Time */}
        <div className="text-center text-white drop-shadow-2xl">
          <h1 className="text-8xl font-light tracking-tight">
            {time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
          </h1>
          <p className="mt-2 text-2xl font-light">
            {time.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>

        {/* Avatar */}
        <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white/50 shadow-2xl">
          <Image
            src="/blockchain-developer-with-digital-network-connecti.jpg"
            alt="User Avatar"
            width={128}
            height={128}
            className="object-cover"
          />
        </div>

        {/* Name */}
        <h2 className="text-2xl font-semibold text-white drop-shadow-lg">Hinata Sugimoto</h2>

        {/* Password Input */}
        <form onSubmit={handleSubmit} className="w-80">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 border-2 border-white/30 bg-white/20 text-center text-white placeholder:text-white/70 backdrop-blur-md"
          />
          <p className="mt-2 text-center text-sm text-white/80">Enter any password to continue</p>
        </form>

        <Button
          onClick={handleSubmit}
          disabled={!password}
          className="mt-4 bg-white/20 text-white backdrop-blur-md hover:bg-white/30"
        >
          Sign In
        </Button>
      </div>

      {/* System Tray */}
      <div className="absolute bottom-8 right-8 flex items-center gap-4 text-white">
        <Wifi className="h-5 w-5 drop-shadow-lg" />
        <Volume2 className="h-5 w-5 drop-shadow-lg" />
        <Battery className="h-5 w-5 drop-shadow-lg" />
      </div>
    </div>
  )
}
