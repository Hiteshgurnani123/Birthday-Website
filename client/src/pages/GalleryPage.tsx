import { useState, useEffect, useCallback } from 'react';
import { SparkleEffect } from '@/components/SparkleEffect';
import { MusicPlayer } from '@/components/MusicPlayer';
import { NextPageButton } from '@/components/NextPageButton';
import { MemoryCard, CardType } from '@/components/MemoryCard';
import { gsap } from 'gsap';

// Emoji pairs for the memory game
const emojis = ['🌙', '🌟', '🌈', '🦋', '🌸', '🌻'];

// Shuffle the cards
const shuffleCards = () => {
  // Double the emojis to create pairs
  const pairedEmojis = [...emojis, ...emojis];
  
  // Shuffle algorithm (Fisher-Yates)
  for (let i = pairedEmojis.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairedEmojis[i], pairedEmojis[j]] = [pairedEmojis[j], pairedEmojis[i]];
  }
  
  // Create the cards array with ids and initial states
  return pairedEmojis.map((emoji, index) => ({
    id: index,
    emoji,
    isFlipped: false,
    isMatched: false
  }));
};

export function GalleryPage() {
  const [cards, setCards] = useState<CardType[]>(shuffleCards);
  const [turns, setTurns] = useState(0);
  const [firstChoice, setFirstChoice] = useState<CardType | null>(null);
  const [secondChoice, setSecondChoice] = useState<CardType | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Handle a card choice
  const handleChoice = (id: number) => {
    const clickedCard = cards.find(card => card.id === id);
    if (!clickedCard || disabled) return;
    
    if (firstChoice === null) {
      setFirstChoice(clickedCard);
    } else if (secondChoice === null) {
      setSecondChoice(clickedCard);
    }
    
    // Flip the card
    setCards(prevCards => 
      prevCards.map(card => 
        card.id === id ? { ...card, isFlipped: true } : card
      )
    );
  };
  
  // Reset choices & increment turn
  const resetTurn = useCallback(() => {
    setFirstChoice(null);
    setSecondChoice(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }, []);
  
  // Check for a match
  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      
      if (firstChoice.emoji === secondChoice.emoji) {
        // We have a match
        setCards(prevCards => {
          const newCards = prevCards.map(card => {
            if (card.id === firstChoice.id || card.id === secondChoice.id) {
              return { ...card, isMatched: true };
            }
            return card;
          });
          
          // Check if all cards are matched
          const allMatched = newCards.every(card => card.isMatched);
          if (allMatched) {
            // Game is won
            setGameWon(true);
          }
          
          return newCards;
        });
        resetTurn();
      } else {
        // No match, flip back after a delay
        setTimeout(() => {
          setCards(prevCards => 
            prevCards.map(card => {
              if (card.id === firstChoice.id || card.id === secondChoice.id) {
                return { ...card, isFlipped: false };
              }
              return card;
            })
          );
          resetTurn();
        }, 1000);
      }
    }
  }, [firstChoice, secondChoice, resetTurn]);
  
  // Reset the game
  const resetGame = () => {
    setCards(shuffleCards());
    setFirstChoice(null);
    setSecondChoice(null);
    setTurns(0);
    setDisabled(false);
    setGameWon(false);
    setShowSuccessMessage(false);
  };
  
  // Show success message when game is won
  useEffect(() => {
    if (gameWon) {
      setTimeout(() => {
        setShowSuccessMessage(true);
        
        // Animate the success message
        gsap.fromTo(".success-message", {
          y: -50,
          opacity: 0,
          scale: 0.8
        }, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)"
        });
        
        // Create celebratory sparkle bursts
        gsap.to(".celebratory-sparkle", {
          scale: 1.5,
          opacity: 1,
          stagger: 0.1,
          duration: 0.4,
          repeat: 2,
          yoyo: true
        });
      }, 500);
    }
  }, [gameWon]);
  
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Background with overlay */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed" 
          style={{ backgroundImage: "url('/assets/bg-memory.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>
      
      {/* New music for this page */}
      <MusicPlayer audioSrc="/assets/music1.mp3" />
      
      {/* Sparkles with different colors */}
      <SparkleEffect colors={['#ffffff', '#ffde59', '#ff9ed8', '#8a5cf5']} density={15} />
      
      {/* Main content */}
      <main className="relative min-h-screen flex flex-col items-center justify-center p-6 z-20">
        {/* Game header */}
        <div className="w-full max-w-2xl mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <h1 className="font-dancing-script text-white text-3xl md:text-4xl mb-4 md:mb-0 text-center md:text-left">
              Magical Memory Match
            </h1>
            
            <div className="flex items-center gap-4">
              <span className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-quicksand">
                Turns: {turns}
              </span>
              
              <button 
                className="bg-[#8a5cf5] bg-opacity-70 hover:bg-opacity-90 backdrop-blur-sm px-4 py-2 rounded-full text-white font-quicksand transition-all duration-300"
                onClick={resetGame}
              >
                Reset Game
              </button>
            </div>
          </div>
        </div>
        
        {/* Game grid */}
        <div className="w-full max-w-2xl grid grid-cols-3 md:grid-cols-4 gap-4">
          {cards.map((card, index) => (
            <MemoryCard
              key={card.id}
              card={card}
              index={index}
              onClick={handleChoice}
              isDisabled={disabled}
            />
          ))}
        </div>
        
        {/* Success message overlay */}
        {showSuccessMessage && (
          <div className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="success-message bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-xl border-2 border-[#ffde59] shadow-xl max-w-md text-center">
              <h2 className="font-dancing-script text-white text-4xl mb-4">
                You've Unlocked the Magic Memory!
              </h2>
              <p className="font-quicksand text-white text-xl mb-6">
                Congratulations! You matched all the magical pairs in {turns} turns.
              </p>
              
              {/* Celebratory sparkles */}
              <div className="flex justify-center mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="celebratory-sparkle opacity-0 mx-2 text-4xl"
                  >
                    ✨
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  className="px-6 py-3 rounded-full bg-[#8a5cf5] bg-opacity-70 hover:bg-opacity-90 text-white font-quicksand transition-all duration-300"
                  onClick={resetGame}
                >
                  Play Again
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Back to welcome page button */}
      <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 z-30">
        <NextPageButton to="/">
          Return to the Beginning
        </NextPageButton>
      </div>
    </div>
  );
}