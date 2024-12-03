'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export function QuantumPortal() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const router = useRouter()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: { x: number; y: number; size: number; speed: number; angle: number }[] = []
    const particleCount = 200
    const maxSize = 2
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // Create particles in a circular pattern
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 / particleCount) * i
      const radius = Math.random() * 100 + 50
      particles.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        size: Math.random() * maxSize,
        speed: Math.random() * 2 + 1,
        angle: angle
      })
    }

    let hue = 0
    let frame = 0

    function drawParticle(x: number, y: number, size: number) {
      ctx.beginPath()
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size)
      gradient.addColorStop(0, `hsla(${hue}, 100%, 50%, 1)`)
      gradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 0)`)
      ctx.fillStyle = gradient
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }

    function animate() {
      ctx.fillStyle = 'transparent'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach(particle => {
        particle.angle += 0.02
        particle.x = centerX + Math.cos(particle.angle) * (100 + Math.sin(frame * 0.02) * 30)
        particle.y = centerY + Math.sin(particle.angle) * (100 + Math.sin(frame * 0.02) * 30)
        
        drawParticle(particle.x, particle.y, particle.size)
      })

      // Create quantum connection lines
      ctx.beginPath()
      ctx.strokeStyle = `hsla(${hue}, 100%, 50%, 0.1)`
      particles.forEach((particle, i) => {
        if (i % 3 === 0) {
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(centerX, centerY)
        }
      })
      ctx.stroke()

      hue = (hue + 0.5) % 360
      frame++
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="relative w-full h-[300px] my-12 cursor-pointer group"
         onClick={() => router.push('/bridge')}>
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="font-pixel text-[#00ffff] text-2xl text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
          ENTER THE BRIDGE
        </div>
      </div>
    </div>
  )
} 