import Image from "next/image";
import { NavBar } from "@/components/nav-bar";
import { CyberBackground } from "@/components/cyber-background";
import { VideoPlayer } from "@/components/video-player";
import { ScrollIndicator } from "@/components/scroll-indicator";

export default function Home() {
  return (
    <>
      <CyberBackground />
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
        <NavBar />
        <main className="flex flex-col items-center justify-center gap-8 p-8">
          <VideoPlayer />
        </main>
        <ScrollIndicator />
      </div>
    </>
  );
}
