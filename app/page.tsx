import { NavBar } from "@/components/nav-bar";
import { CyberBackground } from "@/components/cyber-background";
import { VideoPlayer } from "@/components/video-player";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { AboutSection } from "@/components/about-section";
import { QuantumPortal } from "@/components/quantum-portal";

export default function Home() {
  return (
    <>
      <CyberBackground />
      <div className="relative z-10">
        <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
          <NavBar />
          <main className="flex flex-col items-center justify-center gap-8 p-8">
            <VideoPlayer />
            <QuantumPortal />
          </main>
          <ScrollIndicator />
        </div>
        <AboutSection />
      </div>
    </>
  );
}
