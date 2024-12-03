'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface Particle {
  x: number
  y: number
  size: number
  speed: number
  angle: number
  pulse: number
  opacity: number
}

export function QuantumPortal() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const router = useRouter()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')!
    const width = canvas.width = canvas.offsetWidth
    const height = canvas.height = canvas.offsetHeight
    const centerX = width / 2
    const centerY = height / 2

    const particles: Particle[] = []
    const particleCount = 300
    const maxSize = 3

    // Create particles in a spiral pattern
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 / particleCount) * i
      const radius = Math.random() * 150 + 30
      particles.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        size: Math.random() * maxSize,
        speed: Math.random() * 2 + 1,
        angle: angle,
        pulse: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.5 + 0.5
      })
    }

    let hue = 0
    let frame = 0
    let portalPulse = 0

    function drawParticle(x: number, y: number, size: number, opacity: number) {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size)
      gradient.addColorStop(0, `hsla(${hue}, 100%, 50%, ${opacity})`)
      gradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 0)`)
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }

    function drawPortalCore() {
      const coreSize = 50 + Math.sin(portalPulse) * 10
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreSize)
      gradient.addColorStop(0, `hsla(${hue}, 100%, 70%, 0.3)`)
      gradient.addColorStop(0.5, `hsla(${hue}, 100%, 50%, 0.2)`)
      gradient.addColorStop(1, `hsla(${hue}, 100%, 30%, 0)`)
      
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, coreSize, 0, Math.PI * 2)
      ctx.fill()
    }

    function animate() {
      ctx.fillStyle = 'transparent'
      ctx.fillRect(0, 0, width, height)

      // Draw portal core
      drawPortalCore()

      // Update and draw particles
      particles.forEach(particle => {
        // Spiral motion
        particle.angle += 0.02
        const radiusOffset = Math.sin(frame * 0.02) * 30
        const baseRadius = 100 + Math.sin(particle.pulse + frame * 0.05) * 20
        
        particle.x = centerX + Math.cos(particle.angle) * (baseRadius + radiusOffset)
        particle.y = centerY + Math.sin(particle.angle) * (baseRadius + radiusOffset)
        
        // Update pulse and opacity
        particle.pulse += 0.05
        particle.opacity = 0.5 + Math.sin(particle.pulse) * 0.3

        drawParticle(particle.x, particle.y, particle.size, particle.opacity)
      })

      // Draw quantum connections
      ctx.beginPath()
      ctx.strokeStyle = `hsla(${hue}, 100%, 50%, 0.1)`
      particles.forEach((particle, i) => {
        if (i % 3 === 0) {
          const lineOpacity = 0.1 + Math.sin(particle.pulse) * 0.05
          ctx.strokeStyle = `hsla(${hue}, 100%, 50%, ${lineOpacity})`
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(centerX, centerY)
          ctx.stroke()
        }
      })

      hue = (hue + 0.5) % 360
      frame++
      portalPulse += 0.05

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      const newWidth = canvas.offsetWidth
      const newHeight = canvas.offsetHeight
      canvas.width = newWidth
      canvas.height = newHeight
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
        <div className="bg-black/40 backdrop-blur-sm px-8 py-4 rounded-lg border border-[#00ffff]/30
          transform transition-all duration-500 group-hover:scale-110 group-hover:bg-black/60">
          <div className="font-pixel text-[#00ffff] text-3xl text-center 
            opacity-0 group-hover:opacity-100 transition-opacity duration-500 
            drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]
            relative after:content-['ENTER_THE_BRIDGE'] after:absolute after:inset-0 
            after:text-[#00ffff]/50 after:blur-[8px] after:animate-pulse">
            ENTER THE BRIDGE
          </div>
          <div className="text-[#00ffff]/50 text-sm font-pixel mt-2 text-center
            opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            Initialize Cross-Chain Protocol
          </div>
        </div>
      </div>
    </div>
  )
} 