import { useEffect, useRef } from "react";

interface SparkleProps {
  colors?: string[];
  density?: number;
}

export function SparkleEffect({ 
  colors = ['#ffffff', '#ffde59', '#ff9ed8', '#8a5cf5'],
  density = 40
}: SparkleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sparkles: HTMLDivElement[] = [];
    
    const createSparkle = () => {
      // Create sparkle element
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      
      // Random position
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      
      // Random size
      const size = Math.random() * 10 + 5;
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      
      // Random animation delay and duration
      const animDuration = Math.random() * 3 + 2;
      const animDelay = Math.random() * 5;
      sparkle.style.animation = `sparkle ${animDuration}s linear ${animDelay}s infinite`;
      
      // Random color from palette
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      sparkle.style.backgroundImage = `radial-gradient(circle, ${randomColor} 0%, rgba(255, 255, 255, 0) 70%)`;
      
      container.appendChild(sparkle);
      sparkles.push(sparkle);
      
      // Remove and recreate sparkle after animation cycle
      setTimeout(() => {
        if (container.contains(sparkle)) {
          container.removeChild(sparkle);
          const index = sparkles.indexOf(sparkle);
          if (index > -1) {
            sparkles.splice(index, 1);
          }
          createSparkle();
        }
      }, (animDuration + animDelay) * 1000 + 1000);
    };
    
    // Initial creation of sparkles
    const numberOfSparkles = Math.floor(window.innerWidth / density);
    for (let i = 0; i < numberOfSparkles; i++) {
      createSparkle();
    }
    
    // Handle window resize
    const handleResize = () => {
      // Remove all existing sparkles
      sparkles.forEach(sparkle => {
        if (container.contains(sparkle)) {
          container.removeChild(sparkle);
        }
      });
      sparkles.length = 0;
      
      // Create new sparkles appropriate for the new window size
      const newNumberOfSparkles = Math.floor(window.innerWidth / density);
      for (let i = 0; i < newNumberOfSparkles; i++) {
        createSparkle();
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      sparkles.forEach(sparkle => {
        if (container.contains(sparkle)) {
          container.removeChild(sparkle);
        }
      });
    };
  }, [colors, density]);
  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-10 pointer-events-none"
    />
  );
}
