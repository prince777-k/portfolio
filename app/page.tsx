"use client"

import { useState } from "react"
import { LoginScreen } from "@/components/login-screen"
import { Desktop } from "@/components/desktop"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")

  const handleLogin = (name: string) => {
    setUserName(name)
    setIsLoggedIn(true)
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />
  }

  return <Desktop userName={userName} />
}
