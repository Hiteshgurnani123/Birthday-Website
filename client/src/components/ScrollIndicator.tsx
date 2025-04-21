import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function ScrollIndicator() {
  const indicatorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (indicatorRef.current) {
      // Create a never-ending bounce animation
      gsap.fromTo(
        indicatorRef.current,
        { y: 0, opacity: 0.4 },
        { 
          y: 10, 
          opacity: 1,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
        }
      );
    }
  }, []);
  
  return (
    <div 
      ref={indicatorRef}
      className="fixed bottom-28 left-1/2 transform -translate-x-1/2 z-30 text-white text-center"
    >
      <div className="flex flex-col items-center">
        <p className="font-quicksand text-sm mb-2">Scroll Down</p>
        <svg 
          width="24" 
          height="24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="animate-pulse"
        >
          <path 
            d="M12 17L4 9h16l-8 8z" 
            fill="white" 
          />
        </svg>
      </div>
    </div>
  );
}