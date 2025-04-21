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
      if (isActive) {
        // Animate in when active
        gsap.fromTo(
          boxRef.current,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1,
            ease: "power2.out"
          }
        );
      } else {
        // Animate out when not active
        gsap.to(boxRef.current, { 
          opacity: 0, 
          duration: 0.5,
          ease: "power2.in"
        });
      }
    }
  }, [isActive]);
  
  return (
    <div 
      ref={boxRef}
      className={`absolute inset-0 flex items-center justify-center p-6 ${isActive ? '' : 'invisible'}`}
      style={{ opacity: 0 }} // Start invisible for GSAP to animate
    >
      <div 
        className="bg-black bg-opacity-40 backdrop-blur-sm p-6 md:p-8 rounded-xl"
        style={{
          border: `2px solid ${message.color}`,
          boxShadow: `0 0 15px ${message.color}, inset 0 0 10px rgba(255, 255, 255, 0.2)`,
        }}
      >
        <p 
          className="font-dancing-script text-white text-xl md:text-2xl lg:text-3xl text-center"
          style={{ textShadow: `0 2px 4px rgba(0, 0, 0, 0.5), 0 0 10px ${message.color}` }}
        >
          {message.text}
        </p>
      </div>
    </div>
  );
}