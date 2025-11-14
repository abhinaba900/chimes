import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import GlassSurface from "@/ReactBits/GlassSurface/GlassSurface";

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
    <>
      <GlassSurface
        width={"fit-content"}
        height={"fit-content"}
        borderRadius={40}
        className="desktop-enquire-button"
      >
        <button
          onClick={togglePlayPause}
          className={`cursor-pointer mr-3 md:mr-0 relative z-2 button button-padding-remove ${
            isPlaying ? "active-link" : ""
          }`}
        >
          <Image
            onClick={togglePlayPause}
            src="/assets/music-icon.png"
            alt={isPlaying ? "Pause music" : "Play music"}
            width={20}
            height={20}
            className="relative z-1"
          />
        </button>
      </GlassSurface>

      {/* Hidden audio element with autoPlay */}
      <audio className="hidden" ref={audioRef} src={audioSrc} loop />
    </>
  );
};

export default AudioPlayer;
