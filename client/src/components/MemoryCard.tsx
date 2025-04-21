import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

export interface CardType {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryCardProps {
  card: CardType;
  index: number;
  onClick: (id: number) => void;
  isDisabled: boolean;
}

export function MemoryCard({ card, index, onClick, isDisabled }: MemoryCardProps) {
  const [isFlipping, setIsFlipping] = useState(false);
  
  // Handle flip animation with GSAP
  useEffect(() => {
    if (card.isFlipped || card.isMatched) {
      setIsFlipping(true);
      const flipTl = gsap.timeline();
      flipTl
        .to(`#card-${card.id}`, { 
          rotationY: 90, 
          duration: 0.2, 
          ease: "power1.in",
          onComplete: () => {
            gsap.set(`#card-${card.id} .card-front`, { display: 'none' });
            gsap.set(`#card-${card.id} .card-back`, { display: 'flex' });
          }
        })
        .to(`#card-${card.id}`, { 
          rotationY: 0, 
          duration: 0.2, 
          ease: "power1.out",
          onComplete: () => setIsFlipping(false)
        });
      
      // Add match animation
      if (card.isMatched) {
        gsap.to(`#card-${card.id}`, {
          boxShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(138, 92, 245, 0.6)',
          scale: 1.05,
          duration: 0.5,
          yoyo: true,
          repeat: 1
        });
      }
    } else {
      setIsFlipping(true);
      const flipBackTl = gsap.timeline();
      flipBackTl
        .to(`#card-${card.id}`, { 
          rotationY: 90, 
          duration: 0.2, 
          ease: "power1.in",
          onComplete: () => {
            gsap.set(`#card-${card.id} .card-front`, { display: 'flex' });
            gsap.set(`#card-${card.id} .card-back`, { display: 'none' });
          }
        })
        .to(`#card-${card.id}`, { 
          rotationY: 0, 
          duration: 0.2, 
          ease: "power1.out",
          onComplete: () => setIsFlipping(false)
        });
    }
  }, [card.isFlipped, card.isMatched, card.id]);
  
  // Initial animation when cards appear
  useEffect(() => {
    gsap.from(`#card-${card.id}`, {
      scale: 0.5,
      opacity: 0,
      duration: 0.4,
      delay: index * 0.1,
      ease: "back.out(1.5)"
    });
  }, [card.id, index]);
  
  // Get card colors based on match status
  const getBorderColor = () => {
    if (card.isMatched) return 'rgba(255, 222, 89, 0.8)'; // Golden glow for matches
    if (card.isFlipped) return 'rgba(138, 92, 245, 0.8)'; // Purple for flipped cards
    return 'rgba(255, 255, 255, 0.5)'; // Default white border
  };
  
  return (
    <div
      id={`card-${card.id}`}
      className="relative cursor-pointer transform transition-transform h-28 md:h-32 rounded-xl"
      onClick={() => !isDisabled && !isFlipping && !card.isMatched && onClick(card.id)}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        boxShadow: card.isMatched 
          ? '0 0 15px rgba(255, 222, 89, 0.6), 0 0 25px rgba(255, 222, 89, 0.4)' 
          : '0 4px 10px rgba(0, 0, 0, 0.2)'
      }}
    >
      {/* Card front (face down) */}
      <div
        className="card-front absolute inset-0 flex items-center justify-center rounded-xl"
        style={{
          backfaceVisibility: 'hidden',
          backgroundColor: 'rgba(138, 92, 245, 0.2)',
          backdropFilter: 'blur(8px)',
          border: `2px solid ${getBorderColor()}`,
          display: card.isFlipped || card.isMatched ? 'none' : 'flex'
        }}
      >
        <div className="text-3xl">✨</div>
      </div>
      
      {/* Card back (face up with emoji) */}
      <div
        className="card-back absolute inset-0 flex items-center justify-center rounded-xl"
        style={{
          backfaceVisibility: 'hidden',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(8px)',
          border: `2px solid ${getBorderColor()}`,
          display: card.isFlipped || card.isMatched ? 'flex' : 'none'
        }}
      >
        <div className="text-5xl">{card.emoji}</div>
      </div>
    </div>
  );
}