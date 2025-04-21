import { SparkleEffect } from '@/components/SparkleEffect';
import { MusicPlayer } from '@/components/MusicPlayer';

// This is a placeholder for the third page (gallery)
export function GalleryPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Background with overlay */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed" 
          style={{ backgroundImage: "url('/assets/bg-welcome.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-overlay"></div>
      </div>
      
      {/* Continue music from previous pages */}
      <MusicPlayer audioSrc="/assets/music.mp3" />
      
      {/* Sparkles */}
      <SparkleEffect />
      
      {/* Content */}
      <main className="relative min-h-screen flex flex-col items-center justify-center p-6 z-20">
        <div className="text-center">
          <h1 className="font-shadows text-white text-4xl md:text-5xl lg:text-6xl mb-4 animate-float">
            <span className="text-[#ffde59]">Photo Gallery</span> {' '}
            <span className="ml-2">✨</span>
          </h1>
          <p className="font-quicksand text-white text-xl md:text-2xl lg:text-3xl mt-4">
            This page will be developed next...
          </p>
        </div>
      </main>
    </div>
  );
}