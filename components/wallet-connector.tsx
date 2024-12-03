'use client'

import { useState } from 'react'
import { Wallet, Loader } from 'lucide-react'
import { PhantomIcon, WalletConnectIcon } from './wallet-icons'
import { useWallet } from '@/hooks/use-wallet'

const WALLETS = [
  {
    id: 'phantom',
    name: 'Phantom',
    icon: PhantomIcon,
    color: '#AB9FF2'
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    icon: WalletConnectIcon,
    color: '#3B99FC'
  }
]

export function WalletConnector() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [connecting, setConnecting] = useState<string | null>(null)
  const { connect, disconnect, connected, publicKey, error, isPhantomInstalled } = useWallet()

  const handleConnect = async (walletId: string) => {
    setConnecting(walletId)
    try {
      const success = await connect(walletId)
      if (success) {
        setIsModalOpen(false)
      }
    } finally {
      setConnecting(null)
    }
  }

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  return (
    <>
      {connected ? (
        <button
          onClick={disconnect}
          className="px-4 py-2 rounded-lg font-pixel text-sm flex items-center gap-2 bg-[#00ffff]/10 text-[#00ffff] border border-[#00ffff]/30 hover:bg-[#00ffff]/20 transition-all"
        >
          <Wallet className="w-4 h-4" />
          {shortenAddress(publicKey)}
        </button>
      ) : (
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-lg font-pixel text-sm flex items-center gap-2 bg-[#00ffff] text-black hover:bg-[#00ffff]/90 transition-all"
        >
          <Wallet className="w-4 h-4" />
          Connect Wallet
        </button>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black/90 border border-[#00ffff] rounded-xl max-w-sm w-full p-6 relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-white/60 hover:text-white"
            >
              ×
            </button>

            <h3 className="text-[#00ffff] font-pixel text-xl mb-6">
              Connect Wallet
            </h3>

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded text-red-200 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-3">
              {WALLETS.map(wallet => {
                const Icon = wallet.icon
                const isPhantom = wallet.id === 'phantom'
                const showInstallWarning = isPhantom && !isPhantomInstalled

                return (
                  <button
                    key={wallet.id}
                    onClick={() => handleConnect(wallet.id)}
                    disabled={!!connecting || (isPhantom && !isPhantomInstalled)}
                    className={`w-full p-4 rounded-lg border border-[#00ffff]/20 
                      bg-black/40 backdrop-blur-sm flex items-center justify-between
                      hover:border-[#00ffff]/50 transition-all
                      ${connecting === wallet.id ? 'border-[#00ffff] animate-pulse' : ''}
                      ${showInstallWarning ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8">
                        <Icon />
                      </div>
                      <div>
                        <span className="font-pixel text-white">
                          {wallet.name}
                        </span>
                        {showInstallWarning && (
                          <span className="block text-xs text-[#00ffff]/70">
                            Click to install
                          </span>
                        )}
                      </div>
                    </div>
                    {connecting === wallet.id ? (
                      <Loader className="w-5 h-5 text-[#00ffff] animate-spin" />
                    ) : (
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: wallet.color }}
                      />
                    )}
                  </button>
                )
              })}
            </div>

            <p className="text-white/60 text-sm mt-6 text-center">
              By connecting your wallet, you agree to the Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      )}
    </>
  )
} 