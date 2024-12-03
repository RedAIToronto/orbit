'use client'

import { useState, useEffect } from 'react'

type PhantomEvent = "connect" | "disconnect" | "accountChanged"

interface PhantomProvider {
  connect: () => Promise<{ publicKey: string }>
  disconnect: () => Promise<void>
  on: (event: PhantomEvent, callback: (args: any) => void) => void
  isPhantom: boolean
  isConnected: boolean
  publicKey?: { toString: () => string }
}

declare global {
  interface Window {
    phantom?: {
      solana?: PhantomProvider
    }
  }
}

export function useWallet() {
  const [provider, setProvider] = useState<PhantomProvider | null>(null)
  const [connected, setConnected] = useState(false)
  const [publicKey, setPublicKey] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const provider = window.phantom?.solana
      setProvider(provider || null)

      // Check if already connected
      if (provider?.isConnected && provider.publicKey) {
        setConnected(true)
        setPublicKey(provider.publicKey.toString())
      }
    }
  }, [])

  const connect = async (walletId: string) => {
    try {
      if (walletId === 'phantom') {
        if (!provider) {
          window.open('https://phantom.app/', '_blank')
          throw new Error('Please install Phantom wallet')
        }

        const response = await provider.connect()
        setPublicKey(response.publicKey.toString())
        setConnected(true)
        return true
      }

      // Simulate other wallet connections
      if (['metamask', 'walletconnect'].includes(walletId)) {
        await new Promise(resolve => setTimeout(resolve, 1500))
        setPublicKey('0x' + '1'.repeat(40))
        setConnected(true)
        return true
      }

      return false
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to connect wallet')
      return false
    }
  }

  const disconnect = async () => {
    try {
      if (provider) {
        await provider.disconnect()
      }
      setConnected(false)
      setPublicKey('')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to disconnect wallet')
    }
  }

  return {
    connect,
    disconnect,
    connected,
    publicKey,
    error,
    isPhantomInstalled: !!provider
  }
} 