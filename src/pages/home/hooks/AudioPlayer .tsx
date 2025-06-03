import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true); // Set initial state to true
  const audioRef = useRef<HTMLAudioElement>(null);

  // Replace with your actual audio file path
  const audioSrc = "assets/Healing Chimes (mp3cut.net).mp3";

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
      <button onClick={togglePlayPause} className="cursor-pointer relative z-2">
        <Image
          onClick={togglePlayPause}
          src="assets/music-icon.svg"
          alt={isPlaying ? "Pause music" : "Play music"}
          width={44}
          height={44}
          className="relative z-1"
        />
      </button>

      {/* Hidden audio element with autoPlay */}
      <audio className="hidden" ref={audioRef} src={audioSrc} loop />
    </div>
  );
};

export default AudioPlayer;
