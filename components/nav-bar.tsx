'use client'

import { OrbitLogo } from "./orbit-logo"
import Link from "next/link"
import { useEffect, useState } from "react"

export function NavBar() {
  const [glowIntensity, setGlowIntensity] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(prev => (prev + 1) % 20)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <Link href="/" className="absolute left-4 top-4 hover:opacity-80 transition-opacity">
        <OrbitLogo />
      </Link>
      <Link href="/" className="hover:opacity-80 transition-opacity">
        <h1 className={`font-pixel text-[#00ffff] text-6xl tracking-wider
          animate-text-glow relative
          after:content-['ORBIT'] after:absolute after:inset-0
          after:text-[#00ffff] after:blur-[${glowIntensity}px]
          after:animate-pulse`}>
          ORBIT
        </h1>
      </Link>
      <div className="text-white font-pixel text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#00ffff] to-[#ff69b4] animate-gradient">
        Shared internet brain turned influencer
      </div>
      <div className="border border-[#00ffff] px-4 rounded-lg bg-black/50 backdrop-blur-sm">
        <div className="flex flex-wrap justify-center gap-8 py-2 text-white font-pixel text-lg">
          <Link href="#" className="hover:text-[#00ffff] transition-all">
            Dexscreener
          </Link>
          <Link 
            href="https://x.com/orbitcryptoai" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00ffff] transition-all"
          >
            X @orbitcryptoai
          </Link>
          <button 
            onClick={() => {
              const aboutSection = document.getElementById('about-section')
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="hover:text-[#00ffff] transition-all"
          >
            About
          </button>
          <Link 
            href="https://solscan.io/account/FuuufJNqmoWr2M4JiA7FFM5yKF6DgRpyLSMMwXhCYggQ"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00ffff] transition-all"
          >
            Wallet
          </Link>
          <Link href="/bridge" className="hover:text-[#00ffff] transition-all">
            Bridge
          </Link>
        </div>
      </div>
    </div>
  )
}

