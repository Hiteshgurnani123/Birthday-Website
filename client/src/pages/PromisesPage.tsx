
import { useState, useEffect } from 'react';
import { SparkleEffect } from '@/components/SparkleEffect';
import { MusicPlayer } from '@/components/MusicPlayer';
import { NextPageButton } from '@/components/NextPageButton';
import { gsap } from 'gsap';

interface Promise {
  id: string;
  title: string;
  icon: string;
  selected: boolean;
}

const promises: Promise[] = [
  { id: 'picnic', title: 'A Surprise Picnic', icon: '🧺', selected: false },
  { id: 'support', title: 'Endless Support', icon: '🤝', selected: false },
  { id: 'letter', title: 'Handwritten Letter', icon: '✉️', selected: false },
  { id: 'movie', title: 'Movie Night with Pizza', icon: '🍕', selected: false },
  { id: 'laughs', title: 'A Day Full of Laughs', icon: '😄', selected: false },
  { id: 'wish', title: 'One Wish Granted', icon: '✨', selected: false },
  { id: 'hug', title: 'A Big Hug in Person', icon: '🤗', selected: false },
  { id: 'yes', title: '24 Hours of Yes', icon: '👑', selected: false }
];

export function PromisesPage() {
  const [items, setItems] = useState<Promise[]>(promises);
  const [showContinue, setShowContinue] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleSelect = (id: string) => {
    setItems(prev => prev.map(item => ({
      ...item,
      selected: item.id === id ? !item.selected : false
    })));
    setShowMessage(true);
    setShowContinue(true);
    
    // Animate the selected card
    gsap.to(`#${id}-card`, {
      scale: 1.05,
      boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
      duration: 0.3
    });
  };

  useEffect(() => {
    // Animate cards on mount
    gsap.from('.promise-card', {
      y: 50,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(1.2)'
    });
  }, []);

  return (
    <div className="min-h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ backgroundImage: "url('/assets/bg-promises.jpg')" }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
      </div>

      {/* Music player */}
      <MusicPlayer audioSrc="/assets/music.mp3" />
      
      {/* Sparkle effect */}
      <SparkleEffect colors={['#ffffff', '#ffde59', '#ff9ed8', '#8a5cf5']} />

      {/* Main content */}
      <main className="relative min-h-screen flex flex-col items-center justify-center p-8 z-20">
        <h1 className="font-dancing-script text-white text-4xl md:text-5xl mb-8 text-center">
          Choose Your Special Birthday Gift 🎁
        </h1>

        {/* Promise cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
          {items.map(item => (
            <button
              key={item.id}
              id={`${item.id}-card`}
              onClick={() => handleSelect(item.id)}
              className={`promise-card p-6 rounded-xl backdrop-blur-md transition-all duration-300 
                ${item.selected 
                  ? 'bg-white bg-opacity-30 border-2 border-[#ffde59] shadow-lg' 
                  : 'bg-white bg-opacity-10 border border-white border-opacity-20 hover:bg-opacity-20'
                }`}
            >
              <div className="text-4xl mb-2">{item.icon}</div>
              <div className="text-white font-quicksand text-sm md:text-base">
                {item.title}
              </div>
            </button>
          ))}
        </div>

        {/* Selection message */}
        {showMessage && (
          <div className="mt-8 text-center text-white font-quicksand text-xl animate-fade-in">
            A magical promise has been made just for you, Tamnna! 💖
          </div>
        )}

        {/* Continue button */}
        {showContinue && (
          <div className="mt-8">
            <NextPageButton to="/final" animate>
              Let's see what's next!
            </NextPageButton>
          </div>
        )}
      </main>
    </div>
  );
}
