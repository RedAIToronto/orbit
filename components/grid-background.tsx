'use client'

import { useEffect, useRef } from 'react'

export function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')!
    const width = canvas.width = window.innerWidth
    const height = canvas.height = window.innerHeight

    const gridSize = 50
    let frame = 0

    function drawGrid() {
      ctx.clearRect(0, 0, width, height)
      ctx.strokeStyle = '#00ffff20'
      ctx.lineWidth = 1

      // Vertical lines
      for (let x = 0; x < width + gridSize; x += gridSize) {
        const offset = (frame + x) % gridSize
        ctx.beginPath()
        for (let y = 0; y < height + gridSize; y += gridSize) {
          const yOffset = (y + offset) / height
          const projected_x = x + Math.sin(frame * 0.01 + y * 0.01) * 20

          ctx.lineTo(projected_x, y)
        }
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = 0; y < height + gridSize; y += gridSize) {
        const offset = (frame + y) % gridSize
        ctx.beginPath()
        for (let x = 0; x < width + gridSize; x += gridSize) {
          const xOffset = (x + offset) / width
          const projected_y = y + Math.sin(frame * 0.01 + x * 0.01) * 20

          ctx.lineTo(x, projected_y)
        }
        ctx.stroke()
      }

      frame++
      requestAnimationFrame(drawGrid)
    }

    drawGrid()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-20" />
} 