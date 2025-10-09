"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Wifi, Accessibility, Power } from "lucide-react"
import Image from "next/image"

interface LoginScreenProps {
  onLogin: () => void
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background with blur */}
      <div className="absolute inset-0">
        <Image
          src="/blockchain-developer-with-digital-network-connecti.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 backdrop-blur-2xl bg-black/20" />
      </div>

      {/* Login Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center gap-8"
      >
        {/* Profile Picture */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl"
        >
          <Image src="/blockchain-developer-avatar.jpg" alt="Profile" fill className="object-cover" />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-light text-white drop-shadow-lg"
        >
          Prince
        </motion.h1>

        {/* Password Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onSubmit={handleSubmit}
          className="w-80"
        >
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="submit"
            className="mt-4 w-full py-3 bg-cyan-500/80 hover:bg-cyan-500 backdrop-blur-md text-white rounded-md transition-all font-medium"
          >
            Sign in
          </button>
        </motion.form>

        <button className="text-white/80 hover:text-white text-sm transition-colors">I forgot my PIN</button>
      </motion.div>

      {/* Bottom Icons */}
      <div className="absolute bottom-8 right-8 flex items-center gap-4">
        <button className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all">
          <Wifi className="w-5 h-5 text-white" />
        </button>
        <button className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all">
          <Accessibility className="w-5 h-5 text-white" />
        </button>
        <button className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all">
          <Power className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  )
}
