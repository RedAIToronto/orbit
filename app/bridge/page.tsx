import { BridgeInterface } from "@/components/bridge-interface"
import { CyberBackground } from "@/components/cyber-background"
import { NavBar } from "@/components/nav-bar"

export default function BridgePage() {
  return (
    <>
      <CyberBackground />
      <div className="relative z-10 min-h-screen">
        <NavBar />
        <main className="container mx-auto pt-24">
          <BridgeInterface />
        </main>
      </div>
    </>
  )
} 