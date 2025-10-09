"use client"

import { useState } from "react"
import { LockScreen } from "@/components/windows/lock-screen"
import { Desktop } from "@/components/windows/desktop"
import { WindowManagerProvider } from "@/components/windows/window-manager"

export default function Home() {
  const [isLocked, setIsLocked] = useState(true)

  if (isLocked) {
    return <LockScreen onUnlock={() => setIsLocked(false)} />
  }

  return (
    <WindowManagerProvider>
      <Desktop />
    </WindowManagerProvider>
  )
}
