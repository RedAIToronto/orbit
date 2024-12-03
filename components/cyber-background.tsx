'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  speed: number
  size: number
  color: string
}

export function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 2 + 1,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? '#00ffff' : '#ff69b4'
      })
    }

    function drawParticle(x: number, y: number, size: number, color: string) {
      if (!ctx) return
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + size, y + size)
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.stroke()
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        drawParticle(particle.x, particle.y, particle.size, particle.color)
        particle.y += particle.speed
        if (particle.y > canvas.height) {
          particle.y = 0
          particle.x = Math.random() * canvas.width
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />
}

