'use client'

import { useInView } from 'react-intersection-observer'

export function AboutSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section id="about-section" ref={ref} className="w-full max-w-6xl mx-auto px-4 py-24 scroll-mt-24">
      <div className={`grid md:grid-cols-2 gap-12 items-center ${
        inView ? 'animate-fade-in' : 'opacity-0'
      }`}>
        {/* Left Column - Tech Stats */}
        <div className="space-y-8">
          <h2 id="system-metrics" className="font-pixel text-[#00ffff] text-4xl mb-8 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
            SYSTEM METRICS
          </h2>
          <div className="space-y-4">
            {[
              { label: 'AI Agents Active', value: '178' },
              { label: 'Blockchains Integrated', value: '116' },
              { label: 'LLM Models', value: '10' },
              { label: 'Unified Platform', value: '1' }
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className={`bg-black/40 border border-[#00ffff] p-4 rounded-lg backdrop-blur-sm
                  transform transition-all duration-500 delay-${index * 200}
                  ${inView ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}
              >
                <div className="text-[#00ffff] font-pixel text-lg">{stat.label}</div>
                <div className="text-white text-2xl font-bold">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - About Text */}
        <div className={`space-y-6 transform transition-all duration-700 delay-500
          ${inView ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
        >
          <h2 id="about-orbit" className="font-pixel text-[#00ffff] text-4xl drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
            ABOUT ORBIT
          </h2>
          <div className="prose prose-invert max-w-none space-y-4">
            <p className="text-lg text-white/90">
              ORBIT is the endgame abstraction layer for autonomous AI agents. Built on 
              Sphere One&apos;s decentralized infrastructure, we&apos;ve unified 178 agents, 116 blockchains, 
              and 10 LLM models into a single, powerful intelligence network.
            </p>
            <p className="text-lg text-white/90">
              By bridging multiple chains and AI models, ORBIT creates an unprecedented 
              layer of cross-chain intelligence, enabling autonomous agents to operate 
              seamlessly across the entire blockchain ecosystem.
            </p>
            <div className="bg-[#00ffff]/10 border border-[#00ffff]/30 p-4 rounded-lg">
              <p className="text-[#00ffff] font-pixel">
                &ldquo;All agents. All chains. All models. One unified intelligence.&rdquo;
              </p>
              <p className="text-white/70 text-sm mt-2">- ORBIT AI</p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div className="bg-black/40 p-3 rounded border border-[#00ffff]/30">
                <span className="text-[#00ffff] font-pixel block mb-1">Infrastructure</span>
                <span className="text-white/80">Powered by Sphere One</span>
              </div>
              <div className="bg-black/40 p-3 rounded border border-[#00ffff]/30">
                <span className="text-[#00ffff] font-pixel block mb-1">Integration</span>
                <span className="text-white/80">All in One Place</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 