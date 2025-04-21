import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'wouter';

interface NextPageButtonProps {
  to: string;
  animate?: boolean;
  delay?: number;
}

export function NextPageButton({ to, animate = false, delay = 3 }: NextPageButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (buttonRef.current) {
      // Initial appearance
      gsap.from(buttonRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: delay,
        ease: "power2.out"
      });
      
      // Special animation for when all messages have been shown
      if (animate) {
        // Create a pulsing animation after the button appears
        const timeline = gsap.timeline({ 
          repeat: -1,
          delay: delay + 1,
          repeatDelay: 0.5
        });
        
        timeline
          .to(buttonRef.current, {
            scale: 1.15, 
            boxShadow: '0 0 25px rgba(255, 255, 255, 0.8), 0 0 10px rgba(138, 92, 245, 0.8)',
            duration: 0.8,
            ease: "power2.inOut"
          })
          .to(buttonRef.current, {
            scale: 1,
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1), 0 0 10px rgba(255, 255, 255, 0.3)',
            duration: 0.8,
            ease: "power2.inOut"
          });
      }
    }
    
    return () => {
      // Clean up animations on unmount
      if (buttonRef.current) {
        gsap.killTweensOf(buttonRef.current);
      }
    };
  }, [animate, delay]);
  
  return (
    <div 
      ref={buttonRef} 
      className="fixed bottom-12 left-1/2 transform -translate-x-1/2 z-30"
    >
      <Link to={to}>
        <button
          className="px-6 py-3 rounded-full font-dancing-script text-xl md:text-2xl
                    transition-all duration-300 hover:scale-110 focus:outline-none"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(8px)',
            border: '2px solid rgba(255, 255, 255, 0.5)',
            color: 'white',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1), 0 0 10px rgba(255, 255, 255, 0.3)',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}
        >
          Continue the Journey ✨
        </button>
      </Link>
    </div>
  );
}