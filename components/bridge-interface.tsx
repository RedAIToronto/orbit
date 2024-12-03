'use client'

import { useState } from 'react'
import { ArrowUpDown, Loader } from 'lucide-react'
import Image from 'next/image'
import { WalletConnector } from './wallet-connector'

export function BridgeInterface() {
  const [isInitializing, setIsInitializing] = useState(true)
  const [fromAmount, setFromAmount] = useState('')
  const [selectedToChain, setSelectedToChain] = useState('ethereum')

  const chains = {
    ethereum: { name: 'Ethereum', icon: 'Ξ', color: 'text-[#627EEA]' },
    bsc: { name: 'BSC', icon: 'BNB', color: 'text-[#F3BA2F]' },
    arbitrum: { name: 'Arbitrum', icon: 'ARB', color: 'text-[#28A0F0]' }
  }

  return (
    <div className="max-w-md w-full mx-auto p-4">
      <div className="border border-[#00ffff] rounded-xl p-6 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[#00ffff] font-pixel text-xl">ORBIT BRIDGE</h2>
          <WalletConnector />
        </div>

        {/* From Chain - ORBIT on Solana */}
        <div className="space-y-2 mb-4">
          <label className="text-white/70 font-pixel text-sm">From (Solana)</label>
          <div className="border border-[#00ffff]/30 rounded-lg p-4 backdrop-blur-md">
            <div className="flex justify-between items-center">
              <input
                type="number"
                placeholder="0.0"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                className="bg-transparent text-white text-2xl outline-none w-full"
                disabled={isInitializing}
              />
              <div className="flex items-center gap-2 px-3 py-1 rounded border border-white/20 backdrop-blur-sm">
                <Image
                  src="/orbit-logo.jpg"
                  alt="ORBIT"
                  width={24}
                  height={24}
                  className="rounded"
                />
                <span className="text-[#14F195] font-pixel">◎</span>
              </div>
            </div>
            <div className="text-white/50 text-sm mt-2">
              Balance: 0.00 $ORBIT
            </div>
          </div>
        </div>

        {/* Swap Direction Button */}
        <div className="flex justify-center -my-2 relative z-10">
          <button 
            className="border border-[#00ffff] rounded-full p-2 hover:bg-[#00ffff]/10 transition-all backdrop-blur-sm"
            disabled={isInitializing}
          >
            <ArrowUpDown className="w-4 h-4 text-[#00ffff]" />
          </button>
        </div>

        {/* To Chain - Selected Network */}
        <div className="space-y-2 mb-6">
          <label className="text-white/70 font-pixel text-sm">To Network</label>
          <div className="border border-[#00ffff]/30 rounded-lg p-4 backdrop-blur-md">
            <div className="flex justify-between items-center">
              <input
                type="number"
                placeholder="0.0"
                value={fromAmount}
                className="bg-transparent text-white text-2xl outline-none w-full"
                disabled
              />
              <select 
                className="border border-white/20 text-white font-pixel px-3 py-1 rounded backdrop-blur-sm"
                value={selectedToChain}
                onChange={(e) => setSelectedToChain(e.target.value)}
                disabled={isInitializing}
              >
                {Object.entries(chains).map(([key, chain]) => (
                  <option key={key} value={key} className="bg-black/80">
                    {chain.icon}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-white/50 text-sm mt-2">
              Estimated: {fromAmount || '0.00'} $ORBIT
            </div>
          </div>
        </div>

        {/* Bridge Button */}
        <button
          className={`w-full py-4 rounded-lg font-pixel text-lg relative overflow-hidden
            ${isInitializing 
              ? 'border border-[#00ffff]/30 text-[#00ffff]/50 cursor-not-allowed backdrop-blur-sm'
              : 'bg-[#00ffff] text-black hover:bg-[#00ffff]/90 transition-all'
            }`}
          disabled={isInitializing}
        >
          <div className="flex items-center justify-center gap-2">
            {isInitializing ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                <span>Initializing Bridge Protocol</span>
              </>
            ) : (
              'Bridge Assets'
            )}
          </div>
        </button>

        {/* Status Messages */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ffff] animate-pulse" />
            <span>Establishing secure cross-chain connection...</span>
          </div>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ffff] animate-pulse" />
            <span>Syncing with Sphere One infrastructure...</span>
          </div>
        </div>
      </div>
    </div>
  )
} 