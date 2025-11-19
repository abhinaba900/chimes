"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Play } from "lucide-react";

// 1. Dynamically import ReactPlayer to avoid SSR Hydration errors
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface VideoShowcaseProps {
  videoUrl: string;
  thumbnailUrl: string; // URL for the background image
}

const VideoShowcase: React.FC<VideoShowcaseProps> = ({
  videoUrl,
  thumbnailUrl,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full  h-[400px] md:h-[700px] video-showcase-container  bg-black" >
      
      {/* 2. The Video Player Layer */}
      {/* We keep it mounted but hidden until playing to ensure smooth playback start */}
      <div className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${isPlaying ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
        <ReactPlayer
          src={videoUrl}
          width="100%"
          height="100%"
          playing={isPlaying}
          controls={true}
          // When video ends, bring back the cover
          onEnded={() => setIsPlaying(false)}
        />
      </div>

      {/* 3. The Custom UI Layer (Thumbnail) */}
      {/* This sits on top (z-20) and fades out when playing */}
      <div
        className={`absolute inset-0 z-20 flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
          isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <img
          src={thumbnailUrl}
          alt="The Chimes Thumbnail"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />

        {/* Text Content */}
        <div className="relative z-10 text-center text-white space-y-6">
          <h2 className="text-4xl md:text-6xl tracking-tight font-light drop-shadow-lg video-showcase-title">
            See{" "}
            <span className="font-bold italic font-serif">The Chimes</span>
            <br />
            come alive
          </h2>

          {/* The "Play Walkthrough" Button */}
          <button
            onClick={() => setIsPlaying(true)}
            className="group/btn video-showcase-button relative inline-flex items-center gap-3 px-8 py-3 bg-white/20 hover:bg-[#2B851D] backdrop-blur-md border border-white/30 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {/* Play Icon Container */}
            <div className="flex items-center justify-center w-6 h-6 bg-transparent text-white fill-white">
               <Play className="w-5 h-5 fill-current" />
            </div>
            
            <span className="text-lg font-medium tracking-wide">
              Play Walkthrough
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoShowcase;