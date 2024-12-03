import { OrbitLogo } from "./orbit-logo"
import Link from "next/link"

export function NavBar() {
  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="absolute left-4 top-4">
        <OrbitLogo />
      </div>
      <h1 className="font-pixel text-[#00ffff] text-6xl tracking-wider drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
        ORBIT
      </h1>
      <div className="text-white font-pixel text-xl">
        Shared internet brain turned influencer
      </div>
      <div className="border border-[#00ffff] px-4 rounded-lg bg-black/50 backdrop-blur-sm">
        <div className="flex flex-wrap justify-center gap-8 py-2 text-white font-pixel text-lg">
          <Link href="#" className="hover:text-[#00ffff] transition-all">
            Dexscreener
          </Link>
          <Link 
            href="https://x.com/orbitcryptoai" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00ffff] transition-all"
          >
            X @slopfather
          </Link>
          <Link href="#" className="hover:text-[#00ffff] transition-all">
            About
          </Link>
          <Link href="#" className="hover:text-[#00ffff] transition-all">
            Wallet
          </Link>
        </div>
      </div>
    </div>
  )
}

