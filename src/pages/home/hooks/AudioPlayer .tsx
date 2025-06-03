import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false); // Set initial state to true
  const audioRef = useRef<HTMLAudioElement>(null);

  // Replace with your actual audio file path
  const audioSrc = "assets/Healing Chimes (mp3cut.net).mp3";

  const togglePlayPause = async () => {
    if (isPlaying) {
      await audioRef.current?.pause();
    } else if (!isPlaying) {
      console.log("playing");

      await audioRef.current?.play();
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
