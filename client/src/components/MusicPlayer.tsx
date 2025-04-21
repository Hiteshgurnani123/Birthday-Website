import { useEffect, useRef, useState } from 'react';

interface MusicPlayerProps {
  audioSrc: string;
}

export function MusicPlayer({ audioSrc }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  
  useEffect(() => {
    // Start playing music when component mounts
    if (audioRef.current) {
      const playPromise = audioRef.current.play();
      
      // Handle promise rejection (browsers require user interaction)
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Autoplay prevented:', error);
          setIsPlaying(false);
        });
      }
    }
  }, []);
  
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.log('Play prevented:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  return (
    <>
      <audio ref={audioRef} src={audioSrc} loop />
      
      <button
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-black bg-opacity-30 backdrop-blur-sm
                 border border-white border-opacity-30 hover:bg-opacity-50 transition-all duration-300"
        onClick={togglePlayPause}
        aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        )}
      </button>
    </>
  );
}