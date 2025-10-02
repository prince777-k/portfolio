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
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let targetMousePos = { x: 0, y: 0 }
    const currentMousePos = { x: 0, y: 0 }

    const handleMouseMove = (e: MouseEvent) => {
      targetMousePos = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", handleMouseMove)

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    if (particlesRef.current.length === 0) {
      const particleCount = 80
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          energy: Math.random(),
        })
      }
    }

    const particles = particlesRef.current

    const animate = () => {
      // Smooth mouse position interpolation
      currentMousePos.x += (targetMousePos.x - currentMousePos.x) * 0.1
      currentMousePos.y += (targetMousePos.y - currentMousePos.y) * 0.1

      ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, i) => {
        const dx = currentMousePos.x - particle.x
        const dy = currentMousePos.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 250) {
          const force = (250 - distance) / 250
          particle.vx += (dx / distance) * force * 0.05
          particle.vy += (dy / distance) * force * 0.05
        }

        particle.x += particle.vx
        particle.y += particle.vy

        particle.vx *= 0.98
        particle.vy *= 0.98

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${0.5 + particle.energy * 0.4})`
        ctx.fill()

        // Draw connections
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            const opacity = (1 - distance / 120) * 0.3
            ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" style={{ opacity: 0.6 }} />
}
