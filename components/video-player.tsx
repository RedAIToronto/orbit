'use client'

import { useEffect, useRef, useState } from 'react'

export function VideoPlayer() {
  const [currentVideo, setCurrentVideo] = useState('/vid1.mp4')
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isGlitching, setIsGlitching] = useState(false)
  const nextVideoRef = useRef<HTMLVideoElement>(null)

  // Preload the next video
  useEffect(() => {
    const nextVideo = nextVideoRef.current
    if (nextVideo) {
      nextVideo.src = currentVideo === '/vid1.mp4' ? '/talk.mp4' : '/vid1.mp4'
      nextVideo.load()
    }
  }, [currentVideo])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnded = () => {
      setIsGlitching(true)
      
      // Multiple glitch bursts
      const glitchBursts = [200, 400, 600]
      glitchBursts.forEach((timing) => {
        setTimeout(() => {
          setIsGlitching(false)
          setTimeout(() => {
            setIsGlitching(true)
          }, 25)
        }, timing)
      })

      // Switch video after effects
      setTimeout(() => {
        setCurrentVideo(prev => prev === '/vid1.mp4' ? '/talk.mp4' : '/vid1.mp4')
        setIsGlitching(false)
      }, 800)
    }

    video.addEventListener('ended', handleEnded)
    return () => video.removeEventListener('ended', handleEnded)
  }, [])

  return (
    <div className="relative max-w-3xl mx-auto p-4">
      <div className="border-2 border-[#00ffff] bg-black/80 rounded-lg overflow-hidden backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-[#00ffff] px-3 py-2 bg-black/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#00ffff] rounded-full animate-pulse" />
            <span className="text-white font-pixel">VIDEO FEED</span>
          </div>
          <button 
            className="text-white hover:text-[#00ffff] transition-all font-pixel px-2"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="relative">
          <video
            ref={videoRef}
            className={`w-full aspect-video ${isGlitching ? 'animate-glitch' : ''}`}
            autoPlay
            playsInline
            loop
            src={currentVideo}
          />
          {/* Hidden video for preloading */}
          <video
            ref={nextVideoRef}
            className="hidden"
            preload="auto"
          />
        </div>
      </div>
    </div>
  )
}

