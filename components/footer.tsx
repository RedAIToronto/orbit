'use client'

import Link from 'next/link'
import { useState } from 'react'
import { TermsModal } from './terms-modal'

export function Footer() {
  const [showTerms, setShowTerms] = useState(false)

  return (
    <footer className="border-t border-[#00ffff]/20 bg-black/40 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="font-pixel text-[#00ffff] text-xl">ORBIT AI</h3>
            <p className="text-white/60 text-sm">
              The endgame abstraction layer for autonomous AI agents
            </p>
            <div className="flex space-x-4">
              <Link 
                href="https://x.com/orbitcryptoai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#00ffff] transition-colors"
              >
                𝕏
              </Link>
              {/* Add more social links as needed */}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-pixel text-[#00ffff] text-xl">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/bridge" className="text-white/60 hover:text-[#00ffff] transition-colors">
                  Bridge
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => setShowTerms(true)}
                  className="text-white/60 hover:text-[#00ffff] transition-colors"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <h3 className="font-pixel text-[#00ffff] text-xl">Network Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/20 p-3 rounded border border-[#00ffff]/10">
                <div className="text-[#00ffff] font-pixel">Agents</div>
                <div className="text-white text-2xl">178</div>
              </div>
              <div className="bg-black/20 p-3 rounded border border-[#00ffff]/10">
                <div className="text-[#00ffff] font-pixel">Chains</div>
                <div className="text-white text-2xl">116</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#00ffff]/10 text-center text-white/40 text-sm">
          © {new Date().getFullYear()} ORBIT AI. All rights reserved.
        </div>
      </div>

      <TermsModal open={showTerms} onClose={() => setShowTerms(false)} />
    </footer>
  )
} 