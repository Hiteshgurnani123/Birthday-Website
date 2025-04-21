import { useState, useEffect } from 'react';
import { SparkleEffect } from '@/components/SparkleEffect';
import { MusicPlayer } from '@/components/MusicPlayer';
import { MessageBox } from '@/components/MessageBox';
import { NextPageButton } from '@/components/NextPageButton';

// Birthday messages for Tamnna
const birthdayMessages = [
  { 
    text: "Dear Tamnna, on your special day, may your heart be filled with joy and wonder, just like the magical worlds of Studio Ghibli...", 
    color: "#ff9ed8" 
  },
  { 
    text: "Wishing you a birthday as enchanting as a moonlit forest, where dreams take flight and wishes come true...", 
    color: "#8a5cf5" 
  },
  {
    text: "Like the gentle spirits of nature, may kindness and love surround you on your birthday and throughout the coming year...",
    color: "#ffde59"
  },
  {
    text: "Happy Birthday, Tamnna! May your day be sprinkled with magical moments and your path lined with beautiful adventures...",
    color: "#64e8de"
  },
  {
    text: "In this wonderful journey of life, may your birthday mark the beginning of a year filled with discovery, joy and countless blessings...",
    color: "#ff9ed8"
  },
  {
    text: "As the stars shine bright tonight, they celebrate you, Tamnna. May your birthday be as radiant as your beautiful spirit...",
    color: "#8a5cf5"
  }
];

export function MessagesPage() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  
  useEffect(() => {
    // Add Google Fonts for Dancing Script
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    // Add custom styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      .font-dancing-script {
        font-family: 'Dancing Script', cursive;
      }
    `;
    document.head.appendChild(styleSheet);
    
    // Setup message rotation
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex(prevIndex => 
        prevIndex === birthdayMessages.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000); // Change message every 8 seconds
    
    return () => {
      clearInterval(messageInterval);
      document.head.removeChild(link);
      document.head.removeChild(styleSheet);
    };
  }, []);
  
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Background with overlay */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed" 
          style={{ backgroundImage: "url('/assets/bg-message.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-overlay"></div>
      </div>
      
      {/* Continue music from previous page */}
      <MusicPlayer audioSrc="/assets/music.mp3" />
      
      {/* Sparkles effect */}
      <SparkleEffect colors={['#ffffff', '#ffde59', '#ff9ed8', '#8a5cf5', '#64e8de']} />
      
      {/* Messages container */}
      <main className="relative min-h-screen flex flex-col items-center justify-center p-8 z-20">
        <div className="w-full max-w-lg">
          {birthdayMessages.map((message, index) => (
            <MessageBox 
              key={index}
              message={message}
              isActive={index === currentMessageIndex}
            />
          ))}
        </div>
      </main>
      
      {/* Next page button */}
      <NextPageButton to="/gallery" />
    </div>
  );
}