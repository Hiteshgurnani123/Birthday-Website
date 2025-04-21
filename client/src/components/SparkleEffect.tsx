import { useEffect, useState } from 'react';

interface SparkleProps {
  colors?: string[];
  density?: number;
}

export function SparkleEffect({ 
  colors = ['#ffffff', '#ffde59', '#ff9ed8'], 
  density = 25 
}: SparkleProps) {
  const [sparkles, setSparkles] = useState<{ id: number; top: string; left: string; size: number; color: string; delay: number }[]>([]);
  
  useEffect(() => {
    // Create initial sparkles
    const initialSparkles = Array.from({ length: density }, (_, i) => createSparkle(i, colors));
    setSparkles(initialSparkles);
    
    // Set up periodic sparkle regeneration
    const interval = setInterval(() => {
      setSparkles(prevSparkles => {
        // Replace a random sparkle with a new one
        const index = Math.floor(Math.random() * prevSparkles.length);
        const newSparkles = [...prevSparkles];
        newSparkles[index] = createSparkle(prevSparkles[index].id, colors);
        return newSparkles;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [density, colors]);
  
  // Function to create a new sparkle
  const createSparkle = (id: number, colorOptions: string[]) => {
    return {
      id,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 10 + 4, // Size between 4px and 14px
      color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
      delay: Math.random() * 4 // Random animation delay for variety
    };
  };
  
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute animate-sparkle rounded-full"
          style={{
            top: sparkle.top,
            left: sparkle.left,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            backgroundColor: sparkle.color,
            boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}`,
            opacity: 0,
            transform: 'scale(0)',
            animation: `sparkle 4s ease-in-out infinite ${sparkle.delay}s`
          }}
        />
      ))}
    </div>
  );
}