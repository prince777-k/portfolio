"use client"

import { useState } from "react"
import LoginScreen from "@/components/login-screen"
import Desktop from "@/components/desktop"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="h-screen w-screen overflow-hidden bg-black">
      {!isLoggedIn ? <LoginScreen onLogin={() => setIsLoggedIn(true)} /> : <Desktop />}
    </div>
  )
}
