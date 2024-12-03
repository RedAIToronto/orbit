'use client'

import { useState, useEffect } from "react"
import { NavBar } from "@/components/nav-bar";
import { CyberBackground } from "@/components/cyber-background";
import { VideoPlayer } from "@/components/video-player";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { AboutSection } from "@/components/about-section";
import { QuantumPortal } from "@/components/quantum-portal";
import { GridBackground } from "@/components/grid-background";
import { CyberElements } from "@/components/cyber-elements";
import { Footer } from "@/components/footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <CyberBackground />
      <GridBackground />
      <CyberElements />
      <div className="fixed inset-0 scanline pointer-events-none" />
      <div className={`relative z-10 transition-opacity duration-1000 ${
        isLoading ? 'opacity-0' : 'opacity-100'
      }`}>
        <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
          <NavBar />
          <main className="flex flex-col items-center justify-center gap-8 p-8 animate-fade-in stagger">
            <div className="cyber-card p-1 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00ffff]/0 via-[#00ffff]/10 to-[#00ffff]/0 animate-pulse" />
              <VideoPlayer />
            </div>
            <div className="cyber-card p-1 w-full max-w-3xl relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00ffff]/0 via-[#00ffff]/10 to-[#00ffff]/0 
                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <QuantumPortal />
            </div>
          </main>
          <ScrollIndicator />
        </div>
        <AboutSection />
        <Footer />
      </div>

      {/* Enhanced loading screen */}
      <div className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-1000 ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="text-center max-w-md w-full px-4">
          <div className="text-[#00ffff] font-pixel text-4xl cyber-glow mb-8">
            INITIALIZING ORBIT
          </div>
          <div className="h-1 bg-[#00ffff]/20 rounded-full mb-2">
            <div 
              className="h-full bg-[#00ffff] rounded-full transition-all duration-300"
              style={{ width: `${Math.min(loadingProgress, 100)}%` }}
            />
          </div>
          <div className="text-[#00ffff]/50 font-pixel text-sm">
            {loadingProgress < 100 ? 'Establishing Neural Connection...' : 'Connection Established'}
          </div>
        </div>
      </div>
    </>
  );
}
