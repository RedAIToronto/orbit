import Image from "next/image"

export function OrbitLogo() {
  return (
    <div className="w-16 h-16 relative">
      <Image
        src="/orbit-logo.jpg"
        alt="Orbit AI Logo"
        width={64}
        height={64}
        className="rounded-lg"
      />
    </div>
  )
}

