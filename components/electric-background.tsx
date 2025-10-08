"use client"

import { useEffect, useRef, useState } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  energy: number
}

export function ElectricBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const mouseVelocity = useRef({ x: 0, y: 0 })
  const lastMousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX
      const newY = e.clientY
      mouseVelocity.current = {
        x: newX - lastMousePos.current.x,
        y: newY - lastMousePos.current.y,
      }
      lastMousePos.current = { x: newX, y: newY }
      setMousePos({ x: newX, y: newY })
    }
    window.addEventListener("mousemove", handleMouseMove)

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const particles: Particle[] = []
    const particleCount = window.innerWidth < 768 ? 50 : window.innerWidth < 1024 ? 75 : 100

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        energy: Math.random(),
      })
    }

    let animationFrameId: number
    const animate = () => {
      ctx.fillStyle = "rgba(255, 255, 255, 0.12)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, i) => {
        const dx = mousePos.x - particle.x
        const dy = mousePos.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 250) {
          const force = (250 - distance) / 250
          const velocityBoost = Math.sqrt(mouseVelocity.current.x ** 2 + mouseVelocity.current.y ** 2) * 0.01
          particle.vx += (dx / distance) * force * (0.08 + velocityBoost)
          particle.vy += (dy / distance) * force * (0.08 + velocityBoost)
        }

        particle.x += particle.vx
        particle.y += particle.vy

        particle.vx *= 0.985
        particle.vy *= 0.985

        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.8
          particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.8
          particle.y = Math.max(0, Math.min(canvas.height, particle.y))
        }

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${0.5 + particle.energy * 0.5})`
        ctx.shadowBlur = 8
        ctx.shadowColor = "rgba(59, 130, 246, 0.6)"
        ctx.fill()
        ctx.shadowBlur = 0

        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            const opacity = (1 - distance / 150) * 0.5
            ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`
            ctx.lineWidth = 1.5
            ctx.shadowBlur = 4
            ctx.shadowColor = "rgba(34, 211, 238, 0.4)"
            ctx.stroke()
            ctx.shadowBlur = 0
          }
        })
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [mousePos])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" style={{ opacity: 0.6 }} />
}
