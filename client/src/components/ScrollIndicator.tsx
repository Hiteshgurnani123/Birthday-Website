import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function ScrollIndicator() {
  const indicatorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        opacity: 0.8,
        duration: 1,
        delay: 2.5, // Appears after the main content fades in
        ease: "power2.out"
      });
    }
  }, []);
  
  return (
    <div 
      ref={indicatorRef} 
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-white opacity-0 z-20"
    >
      <div className="flex flex-col items-center">
        <p className="font-quicksand mb-2 text-sm">Scroll Down</p>
        <i className="fas fa-chevron-down animate-bounce"></i>
      </div>
    </div>
  );
}
