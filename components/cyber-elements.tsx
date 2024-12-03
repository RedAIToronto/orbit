'use client'

import { useEffect, useRef } from 'react'

const ELEMENTS = [
  '10', '01', '∆', '◊', '[]', '{|}', '⌘', '⌥', '⇄', '⚡',
  '◈', '◇', '⬡', '⬢', '▲', '△', '□', '▢', '○', '◎'
]

export function CyberElements() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create floating elements
    const elements = Array.from({ length: 30 }, (_, i) => {
      const el = document.createElement('div')
      el.className = 'absolute text-[#00ffff]/20 font-pixel text-sm pointer-events-none'
      el.style.left = `${Math.random() * 100}%`
      el.style.top = `${Math.random() * 100}%`
      el.style.animation = `float ${5 + Math.random() * 10}s linear infinite`
      el.style.animationDelay = `-${Math.random() * 5}s`
      el.textContent = ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)]
      return el
    })

    elements.forEach(el => container.appendChild(el))

    return () => {
      elements.forEach(el => el.remove())
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 overflow-hidden" />
} 