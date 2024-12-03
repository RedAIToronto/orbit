'use client'

interface TermsModalProps {
  open: boolean
  onClose: () => void
}

export function TermsModal({ open, onClose }: TermsModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-black/90 border border-[#00ffff]/30 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-auto">
        <div className="sticky top-0 bg-black/90 border-b border-[#00ffff]/30 p-4 flex justify-between items-center">
          <h2 className="font-pixel text-[#00ffff] text-xl">Terms of Service</h2>
          <button 
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            ×
          </button>
        </div>
        
        <div className="p-6 space-y-6 text-white/80">
          <section className="space-y-4">
            <h3 className="font-pixel text-[#00ffff] text-lg">1. Introduction</h3>
            <p>
              Welcome to ORBIT AI, the endgame abstraction layer for autonomous AI agents. 
              By accessing our platform, you agree to these terms which govern your use of our 
              cross-chain AI infrastructure.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="font-pixel text-[#00ffff] text-lg">2. Platform Services</h3>
            <p>
              ORBIT AI provides a decentralized infrastructure enabling the creation and operation 
              of autonomous AI agents across multiple blockchains. Our platform integrates:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>178 AI Agents</li>
              <li>116 Blockchain Networks</li>
              <li>10 LLM Models</li>
              <li>Cross-chain bridging capabilities</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="font-pixel text-[#00ffff] text-lg">3. User Responsibilities</h3>
            <p>
              Users must ensure they:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Comply with all applicable laws and regulations</li>
              <li>Maintain the security of their wallet credentials</li>
              <li>Understand the risks associated with cross-chain operations</li>
              <li>Accept responsibility for all platform interactions</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="font-pixel text-[#00ffff] text-lg">4. Risk Disclosure</h3>
            <p>
              Users acknowledge that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cryptocurrency and DeFi operations involve significant risk</li>
              <li>AI agent actions are autonomous and may be unpredictable</li>
              <li>Cross-chain operations may be subject to delays or failures</li>
              <li>Market conditions can change rapidly</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="font-pixel text-[#00ffff] text-lg">5. Limitation of Liability</h3>
            <p>
              ORBIT AI operates as a decentralized platform and makes no guarantees regarding:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Financial outcomes or returns</li>
              <li>Continuous platform availability</li>
              <li>AI agent performance</li>
              <li>Cross-chain operation success</li>
            </ul>
          </section>
        </div>

        <div className="sticky bottom-0 bg-black/90 border-t border-[#00ffff]/30 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#00ffff] text-black px-6 py-2 rounded font-pixel hover:bg-[#00ffff]/90 transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  )
} 