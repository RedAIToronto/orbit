'use client'

import { useEffect, useRef, useState } from 'react'

export function VideoPlayer() {
  const [currentVideo, setCurrentVideo] = useState('/vid1.mp4')
  const [currentAudio, setCurrentAudio] = useState('/new.wav')
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const nextVideoRef = useRef<HTMLVideoElement>(null)
  const nextAudioRef = useRef<HTMLAudioElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isGlitching, setIsGlitching] = useState(false)
  const ambientAudioRef = useRef<HTMLAudioElement>(null)
  const glitchSoundRef = useRef<HTMLAudioElement>(null)

  // Initial video and audio load
  useEffect(() => {
    const video = videoRef.current
    const audio = audioRef.current
    const ambient = ambientAudioRef.current
    if (!video || !audio || !ambient) return

    const handleLoad = () => {
      setIsLoaded(true)
      
      // Start ambient sound at low volume
      ambient.volume = 0.3
      ambient.play().catch(console.warn)
      
      // Start main audio
      audio.volume = 1
      if (audio.duration) {
        audio.currentTime = Math.max(0, audio.duration - 5)
      }
      audio.play().catch(console.warn)
      
      // Start video
      video.play().catch(console.warn)
    }

    video.load()
    audio.load()
    ambient.load()
    
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

  // Preload next video and audio
  useEffect(() => {
    const nextVideo = nextVideoRef.current
    const nextAudio = nextAudioRef.current
    if (!nextVideo || !nextAudio) return

    nextVideo.src = currentVideo === '/vid1.mp4' ? '/talk.mp4' : '/vid1.mp4'
    nextAudio.src = currentAudio === '/new.wav' ? '/2.mp3' : '/new.wav'
    nextVideo.load()
    nextAudio.load()
  }, [currentVideo, currentAudio])

  // Video end handling
  useEffect(() => {
    const video = videoRef.current
    const audio = audioRef.current
    const glitchSound = glitchSoundRef.current
    if (!video || !audio || !glitchSound) return

    const handleEnded = () => {
      setIsGlitching(true)
      setIsPlaying(false)
      
      // Play glitch sound
      glitchSound.currentTime = 0
      glitchSound.play().catch(console.warn)
      
      const glitchBursts = [200, 400, 600]
      glitchBursts.forEach((timing) => {
        setTimeout(() => {
          setIsGlitching(false)
          setTimeout(() => {
            setIsGlitching(true)
            // Play glitch sound again for each burst
            glitchSound.currentTime = 0
            glitchSound.play().catch(console.warn)
          }, 25)
        }, timing)
      })

      setTimeout(() => {
        setCurrentVideo(prev => prev === '/vid1.mp4' ? '/talk.mp4' : '/vid1.mp4')
        setCurrentAudio(prev => prev === '/new.wav' ? '/2.mp3' : '/new.wav')
        setIsGlitching(false)

        const currentVideo = videoRef.current
        const currentAudio = audioRef.current
        if (currentVideo && currentAudio) {
          if (currentAudio.src.includes('new.wav')) {
            // For the talking video
            if (ambientAudioRef.current) {
              ambientAudioRef.current.volume = 0.15 // Lower ambient volume during voice
            }
            currentAudio.volume = 0.85 // Voice louder
          } else {
            // For the first video
            if (ambientAudioRef.current) {
              ambientAudioRef.current.volume = 0.3 // Normal ambient volume
            }
            currentAudio.volume = 1
          }
          
          // Set audio time to last 5 seconds for ambient only
          if (currentAudio.src.includes('new.wav') && currentAudio.duration) {
            currentAudio.currentTime = Math.max(0, currentAudio.duration - 5)
          }
          
          // Play the audio
          Promise.all([
            currentVideo.play(),
            currentAudio.play()
          ])
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
          {/* Hidden elements for preloading */}
          <video
            ref={nextVideoRef}
            className="hidden"
            preload="auto"
            muted
          />
          <audio
            ref={audioRef}
            src={currentAudio}
            preload="auto"
          />
          <audio
            ref={nextAudioRef}
            className="hidden"
            preload="auto"
          />
          <audio
            ref={ambientAudioRef}
            src="/ambient.mp3"
            loop
            preload="auto"
          />
          <audio
            ref={glitchSoundRef}
            src="/glitch.wav"
            preload="auto"
          />
        </div>
      </div>
    </div>
  )
}

