import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true); // Set initial state to true
  const audioRef = useRef<HTMLAudioElement>(null);

  // Replace with your actual audio file path
  const audioSrc = "assets/Healing Chimes (mp3cut.net).mp3";

  useEffect(() => {
    // Ensure audio plays when component mounts
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error("Autoplay was prevented:", error);
        // Handle autoplay restrictions (might need user interaction)
      });
    }
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <button onClick={togglePlayPause} className="cursor-pointer">
        <Image 
          src="assets/music-icon.svg" 
          alt={isPlaying ? "Pause music" : "Play music"} 
          width={44} 
          height={44} 
        />
      </button>

      {/* Hidden audio element with autoPlay */}
      <audio 
        className="hidden" 
        ref={audioRef} 
        src={audioSrc} 
        autoPlay 
        loop // Optional: add if you want the audio to loop
      />
    </div>
  );
};

export default AudioPlayer;