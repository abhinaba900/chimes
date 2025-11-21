"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Play } from "lucide-react";

// SSR-safe import
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface VideoShowcaseProps {
  videoUrl: string;
  thumbnailUrl: string;
}

const VideoShowcase: React.FC<VideoShowcaseProps> = ({
  videoUrl,
  thumbnailUrl,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-[95%]  md:w-full h-[220px] md:h-[700px] 2xl:h-[900px] video-showcase-container bg-black mt-[28px] md:mt-[5rem]">
      {/* Video Layer */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
          isPlaying ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
      >
        <ReactPlayer
          src={videoUrl}
          width="100%"
          height="100%"
          playing={isPlaying}
          controls
          onEnded={() => setIsPlaying(false)}
        />
      </div>

      {/* Thumbnail Layer */}
      <div
        className={`absolute inset-0 z-20 flex flex-col items-center justify-center transition-all duration-500 ${
          isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="absolute inset-0 bg-black/40 overlay-in-video-show-case"></div>

        <img
          src={thumbnailUrl}
          alt="Video thumbnail"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />

        {/* Title */}
        <h2 className="relative z-10 text-white text-4xl md:text-6xl font-light text-center video-showcase-title drop-shadow-lg">
          See <span className="font-bold italic font-serif">The Chimes</span>
          <br />
          come alive
        </h2>

        {/* Desktop: Center button */}
        <button
          onClick={() => setIsPlaying(true)}
          className="hidden md:inline-flex mt-6 group relative video-showcase-button items-center gap-3 px-8 py-3 bg-white/20 hover:bg-[#2B851D] backdrop-blur-md border border-white/30 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <Play className="w-5 h-5 text-white" />
          <span className="text-lg text-white font-medium tracking-wide">
            Play Walkthrough
          </span>
        </button>

        {/* Mobile + Desktop bottom-right button */}
        <div className="absolute bottom-5 right-5 md:right-10 md:bottom-10 block md:hidden">
          <button
            onClick={() => setIsPlaying(true)}
            className="group inline-flex items-center video-showcase-button gap-3 px-6 py-2 md:px-8 md:py-3 bg-white/20 hover:bg-[#2B851D] backdrop-blur-md border border-white/30 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Play className="w-4 h-4 md:w-5 md:h-5 text-white" />
            <span className="text-base md:text-lg text-white font-medium tracking-wide">
              Play
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoShowcase;
