'use client'

import { useState, useEffect } from "react"
import { NavBar } from "@/components/nav-bar";
import { CyberBackground } from "@/components/cyber-background";
import { VideoPlayer } from "@/components/video-player";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { AboutSection } from "@/components/about-section";
import { QuantumPortal } from "@/components/quantum-portal";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate minimum loading time for smooth transition
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  return (
    <>
      <CyberBackground />
      <div className={`relative z-10 transition-opacity duration-1000 ${
        isLoading ? 'opacity-0' : 'opacity-100'
      }`}>
        <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
          <NavBar />
          <main className="flex flex-col items-center justify-center gap-8 p-8 animate-fade-in">
            <VideoPlayer />
            <QuantumPortal />
          </main>
          <ScrollIndicator />
        </div>
        <AboutSection />
      </div>
      {/* Loading overlay */}
      <div className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-1000 ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="text-[#00ffff] font-pixel text-4xl animate-pulse">
          INITIALIZING ORBIT
        </div>
      </div>
    </>
  );
}
