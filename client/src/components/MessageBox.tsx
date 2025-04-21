import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface MessageBoxProps {
  message: {
    text: string;
    color: string;
  };
  isActive: boolean;
}

export function MessageBox({ message, isActive }: MessageBoxProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (boxRef.current) {
      const timeline = gsap.timeline();
      
      if (isActive) {
        // Reset state
        gsap.set(boxRef.current, { opacity: 0, y: 20 });
        
        // Animate in
        timeline.to(boxRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out"
        });
      } else {
        // Animate out if not active
        timeline.to(boxRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.8,
          ease: "power2.in"
        });
      }
    }
  }, [isActive]);
  
  return (
    <div 
      ref={boxRef}
      className={`max-w-md mx-auto p-6 rounded-2xl ${isActive ? 'block' : 'hidden'}`}
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(8px)',
        border: `2px solid ${message.color}`,
        boxShadow: `0 4px 20px rgba(0, 0, 0, 0.15), 0 0 15px ${message.color}40`,
        opacity: 0
      }}
    >
      <p 
        className="text-white text-center font-dancing-script text-2xl md:text-3xl"
        style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}
      >
        {message.text}
      </p>
    </div>
  );
}