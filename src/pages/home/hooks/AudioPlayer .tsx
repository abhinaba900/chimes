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
          className={`cursor-pointer mr-3 md:mr-0 relative z-2 button button-padding-remove music-icon-in-nav ${
            isPlaying ? "active-link" : ""
          }`}
        >
          {/* <Image
            onClick={togglePlayPause}
            src="/assets/music-icon.png"
            alt={isPlaying ? "Pause music" : "Play music"}
            width={20}
            height={20}
          /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="relative z-1"

          >
            <path
              d="M6.54053 3.32711C5.6955 2.70776 4.8285 1.94442 4.21144 1.01883L3.67125 0.208575C3.55681 0.0369192 3.3435 -0.0395183 3.14528 0.0199817C2.94753 0.0799505 2.8125 0.262138 2.8125 0.468607V7.82311C2.53563 7.66164 2.21803 7.56236 1.875 7.56236C0.840906 7.56236 0 8.40326 0 9.43736C0 10.4714 0.840906 11.3123 1.875 11.3123C2.90909 11.3123 3.75 10.4714 3.75 9.43733V2.0077C4.41238 2.84495 5.24094 3.53676 5.98619 4.08333C6.35238 4.35158 6.5625 4.76542 6.5625 5.21858C6.5625 5.99401 5.93169 6.62483 5.15625 6.62483C4.89716 6.62483 4.6875 6.83448 4.6875 7.09358C4.6875 7.35267 4.89716 7.56233 5.15625 7.56233C6.44853 7.56233 7.5 6.51086 7.5 5.21858C7.5 4.4747 7.14156 3.76792 6.54053 3.32711Z"
              fill="black"
            />
            <path
              d="M15.4026 3.83023L8.77763 5.70523C8.57622 5.76292 8.4375 5.94692 8.4375 6.15613V12.5106C8.16062 12.3492 7.84303 12.2499 7.5 12.2499C6.46591 12.2499 5.625 13.0908 5.625 14.1249C5.625 15.159 6.46591 15.9999 7.5 15.9999C8.53409 15.9999 9.375 15.159 9.375 14.1249C9.375 14.018 9.375 8.38488 9.375 8.38488L15.0625 6.77773V10.6356C14.7856 10.4742 14.468 10.3749 14.125 10.3749C13.0909 10.3749 12.25 11.2158 12.25 12.2499C12.25 13.284 13.0909 14.1249 14.125 14.1249C15.1591 14.1249 16 13.284 16 12.2499C16 12.143 16 4.28113 16 4.28113C16 3.9711 15.7034 3.74526 15.4026 3.83023Z"
              fill="black"
            />
          </svg>
        </button>
      </GlassSurface>

      {/* Hidden audio element with autoPlay */}
      <audio className="hidden" ref={audioRef} src={audioSrc} loop />
    </>
  );
};

export default AudioPlayer;
