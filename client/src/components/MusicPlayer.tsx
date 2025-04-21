import { useState, useEffect, useRef } from 'react';

interface MusicPlayerProps {
  audioSrc: string;
}

export function MusicPlayer({ audioSrc }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.log("Autoplay prevented by browser:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  useEffect(() => {
    // Try to autoplay when component mounts
    const attemptAutoplay = () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.log("Autoplay prevented by browser:", error);
        });
      }
    };
    
    // Try to play the music immediately
    attemptAutoplay();
    
    // Add event listener for the first user interaction to enable music
    const handleFirstInteraction = () => {
      if (!isPlaying) {
        attemptAutoplay();
      }
      document.removeEventListener('click', handleFirstInteraction);
    };
    
    document.addEventListener('click', handleFirstInteraction);
    
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
    };
  }, []);
  
  return (
    <>
      <button 
        onClick={togglePlay}
        className="fixed top-5 right-5 z-30 w-12 h-12 flex items-center justify-center
                  rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300
                  hover:scale-110 hover:bg-white/30 focus:outline-none"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'} text-white text-xl`}></i>
      </button>
      
      <audio ref={audioRef} loop>
        <source src={audioSrc} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </>
  );
}
