'use client'

import { useEffect, useRef, useState } from 'react'

export function VideoPlayer() {
  const [currentVideo, setCurrentVideo] = useState('/vid1.mp4')
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isGlitching, setIsGlitching] = useState(false)
  const nextVideoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // Initial video load
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoad = () => {
      setIsLoaded(true)
      video.play().catch(error => {
        console.warn('Initial autoplay failed:', error)
      })
    }

    // Force reload the video
    video.load()
    
    // Add event listeners
    video.addEventListener('loadeddata', handleLoad)
    video.addEventListener('playing', () => setIsPlaying(true))
    video.addEventListener('waiting', () => setIsPlaying(false))
    video.addEventListener('error', (e) => console.error('Video error:', e))

    return () => {
      video.removeEventListener('loadeddata', handleLoad)
      video.removeEventListener('playing', () => setIsPlaying(true))
      video.removeEventListener('waiting', () => setIsPlaying(false))
    }
  }, [])

  // Preload next video
  useEffect(() => {
    const nextVideo = nextVideoRef.current
    if (!nextVideo) return

    nextVideo.src = currentVideo === '/vid1.mp4' ? '/talk.mp4' : '/vid1.mp4'
    nextVideo.load()
  }, [currentVideo])

  // Video end handling
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnded = () => {
      setIsGlitching(true)
      setIsPlaying(false)
      
      const glitchBursts = [200, 400, 600]
      glitchBursts.forEach((timing) => {
        setTimeout(() => {
          setIsGlitching(false)
          setTimeout(() => {
            setIsGlitching(true)
          }, 25)
        }, timing)
      })

      setTimeout(() => {
        setCurrentVideo(prev => prev === '/vid1.mp4' ? '/talk.mp4' : '/vid1.mp4')
        setIsGlitching(false)

        const currentVideo = videoRef.current
        if (currentVideo) {
          currentVideo.load()
          currentVideo.play().then(() => {
            setIsPlaying(true)
          }).catch(error => {
            console.warn('Video autoplay failed:', error)
          })
        }
      }, 800)
    }

    video.addEventListener('ended', handleEnded)
    return () => {
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  return (
    <div className="relative max-w-3xl mx-auto p-4">
      <div className="border-2 border-[#00ffff] bg-black/80 rounded-lg overflow-hidden backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-[#00ffff] px-3 py-2 bg-black/50">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 bg-[#00ffff] rounded-full ${isPlaying ? 'animate-pulse' : ''}`} />
            <span className="text-white font-pixel">VIDEO FEED</span>
          </div>
          <button 
            className="text-white hover:text-[#00ffff] transition-all font-pixel px-2"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="relative bg-black">
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-[#00ffff] font-pixel animate-pulse">
                LOADING FEED...
              </div>
            </div>
          )}
          <video
            ref={videoRef}
            className={`w-full aspect-video ${isGlitching ? 'glitch' : ''} transition-opacity duration-500 ${
              isLoaded && isPlaying ? 'opacity-100' : 'opacity-0'
            }`}
            autoPlay
            playsInline
            muted
            src={currentVideo}
            onLoadedData={() => setIsLoaded(true)}
          />
          <video
            ref={nextVideoRef}
            className="hidden"
            preload="auto"
            muted
          />
        </div>
      </div>
    </div>
  )
}

