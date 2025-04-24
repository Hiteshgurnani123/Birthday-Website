

import { useState, useEffect } from 'react';
import { SparkleEffect } from '@/components/SparkleEffect';
import { MusicPlayer } from '@/components/MusicPlayer';
import { gsap } from 'gsap';

interface HiddenItem {
  id: string;
  name: string;
  emoji: string;
  found: boolean;
  position: {
    top: string;
    left: string;
  };
}

const hiddenItems: HiddenItem[] = [
  { id: 'cake', name: 'Birthday Cake', emoji: '🎂', found: false, position: { top: '60%', left: '75%' } },
  { id: 'gift', name: 'Gift Box', emoji: '🎁', found: false, position: { top: '40%', left: '25%' } },
  { id: 'balloon', name: 'Balloon', emoji: '🎈', found: false, position: { top: '20%', left: '65%' } },
  { id: 'star', name: 'Star', emoji: '⭐', found: false, position: { top: '70%', left: '35%' } },
  { id: 'cupcake', name: 'Cupcake', emoji: '🧁', found: false, position: { top: '30%', left: '85%' } }
];

export function HuntPage() {
  const [items, setItems] = useState<HiddenItem[]>(hiddenItems);
  const [foundCount, setFoundCount] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const handleItemClick = (itemId: string) => {
    setItems(prevItems => 
      prevItems.map(item => {
        if (item.id === itemId && !item.found) {
          const element = document.getElementById(itemId);
          if (element) {
            gsap.to(element, {
              scale: 1.5,
              rotate: 360,
              opacity: 0,
              duration: 0.5,
              onComplete: () => element.style.display = 'none'
            });
          }
          return { ...item, found: true };
        }
        return item;
      })
    );
  };

  useEffect(() => {
    const newFoundCount = items.filter(item => item.found).length;
    setFoundCount(newFoundCount);

    if (newFoundCount === items.length && !gameComplete) {
      setGameComplete(true);
      gsap.fromTo('.success-message',
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: 'back.out(1.7)' }
      );
    }
  }, [items, gameComplete]);

  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed" 
          style={{ backgroundImage: "url('/assets/bg-hunt.jpg')" }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
      </div>

      {/* Music player */}
      <MusicPlayer audioSrc="/assets/music.mp3" />

      {/* Sparkle effect */}
      <SparkleEffect colors={['#ffffff', '#ffde59', '#ff9ed8', '#8a5cf5']} />

      {/* Main content */}
      <main className="relative min-h-screen flex flex-col items-center justify-center p-8 z-20">
        {/* Progress counter */}
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full">
          <p className="font-quicksand text-white text-lg">
            Found {foundCount}/{items.length} Birthday Surprises!
          </p>
        </div>

        {/* Hidden items */}
        {items.map(item => (
          <button
            key={item.id}
            id={item.id}
            onClick={() => !item.found && handleItemClick(item.id)}
            className={`absolute transform hover:scale-110 transition-transform duration-200 ${
              item.found ? 'opacity-0' : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              top: item.position.top,
              left: item.position.left,
              fontSize: '2.5rem',
              cursor: 'pointer',
              filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))'
            }}
          >
            {item.emoji}
          </button>
        ))}

        {/* Success message + Redirect Button */}
        {gameComplete && (
          <div className="success-message text-center bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-xl border-2 border-[#ffde59] shadow-xl">
            <h2 className="font-dancing-script text-white text-4xl mb-4">
              Yay! You've found all the birthday surprises! 🎉
            </h2>
            <p className="font-quicksand text-white text-xl mb-6">
              Ready for your next magical adventure?
            </p>
            <a 
              href="https://birthday-website-3-1.onrender.com"
              className="inline-block bg-yellow-400 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-500 transition duration-300"
            >
              Continue to Your Final Surprise ✨
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
