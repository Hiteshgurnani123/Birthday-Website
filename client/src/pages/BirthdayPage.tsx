import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SparkleEffect } from '@/components/SparkleEffect';
import { MusicPlayer } from '@/components/MusicPlayer';
import { ScrollIndicator } from '@/components/ScrollIndicator';
import { NextPageButton } from '@/components/NextPageButton';

export function BirthdayPage() {
  const mainHeadingRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Fade in the main heading when component mounts
    if (mainHeadingRef.current) {
      gsap.to(mainHeadingRef.current, {
        opacity: 1,
        duration: 2,
        ease: "power2.out"
      });
    }
    
    // Add @keyframes styles to the document for animations
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.textContent = `
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
        100% { transform: translateY(0px); }
      }
      
      @keyframes sparkle {
        0% { transform: scale(0); opacity: 0; }
        50% { transform: scale(1); opacity: 1; }
        100% { transform: scale(0); opacity: 0; }
      }
      
      .font-shadows {
        font-family: 'Shadows Into Light', cursive;
      }
      
      .font-quicksand {
        font-family: 'Quicksand', sans-serif;
      }
      
      .bg-overlay {
        background-color: rgba(0, 0, 0, 0.5);
      }
      
      .sparkle {
        position: absolute;
        width: 15px;
        height: 15px;
        background-image: radial-gradient(circle, #ffffff 0%, rgba(255, 255, 255, 0) 70%);
        border-radius: 50%;
      }
      
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
      
      .animate-float-delay {
        animation: float 3s ease-in-out 1.5s infinite;
      }
    `;
    document.head.appendChild(styleSheet);
    
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);
  
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
      
      {/* Music player */}
      <MusicPlayer audioSrc="/assets/music.mp3" />
      
      {/* Sparkles */}
      <SparkleEffect />
      
      {/* Main content */}
      <main className="relative min-h-screen flex flex-col items-center justify-center p-6 z-20">
        <div ref={mainHeadingRef} className="text-center opacity-0">
          <h1 className="font-shadows text-white text-4xl md:text-5xl lg:text-6xl mb-4 animate-float">
            <span className="text-[#ff9ed8]">Welcome to Your</span> {' '}
            <span className="text-[#ffde59]">Magical</span> {' '}
            <span className="text-[#8a5cf5]">Birthday Journey</span> {' '}
            <span className="ml-2">✨</span>
          </h1>
          <p className="font-quicksand text-white text-xl md:text-2xl lg:text-3xl animate-float-delay">
            Let's start this dreamy adventure together...
          </p>
        </div>
      </main>
      
      {/* Scroll indicator */}
      <ScrollIndicator />
      
      {/* Next page button */}
      <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 z-30">
        <NextPageButton to="/messages" />
      </div>
    </div>
  );
}
