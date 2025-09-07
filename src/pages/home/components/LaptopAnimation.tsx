// components/LaptopAnimation.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import ReactPlayer from "react-player"; // Import ReactPlayer

const LaptopAnimation = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Animation variants for the laptop lid
  const laptopVariants = {
    closed: { rotateX: -66, transition: { duration: 0.8, ease: "easeInOut" } },
    open: { rotateX: 15, transition: { duration: 0.8, ease: "easeInOut" } },
  };

  // Intersection Observer to detect when the component is on screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.5 }
    );
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  // Controls animation and video based on view status
  useEffect(() => {
    if (isInView) {
      controls.start("open");
      // NOTE: With the 'light' prop, autoplay on scroll is disabled.
      // The user must click the banner to start the video.
      // This is a feature of 'light' mode for performance.
    } else {
      controls.start("closed");
      // When we scroll away, we ensure the video is paused.
      setIsPlaying(false);
    }
  }, [isInView, controls]);

  return (
    <div ref={ref} className="laptop-container">
      <div className="laptop">
        <motion.div
          className="laptop-lid"
          initial="closed"
          animate={controls}
          variants={laptopVariants}
        >
          <div className="laptop-screen">
            {/* --- React Player Integration --- */}
            <ReactPlayer
              // Adding a wrapper div is recommended for sizing
              className="react-player-wrapper"
              src="/assets/placeholder.mp4"
              width="100%"
              height="100%"
              playIcon={
                <>
                  <img src="/assets/youtube-play-icon.png" width={80} alt="" />
                </>
              }
              // This is the key prop! It shows your banner image first.
              light="/assets/video-poster.jpg"
              playing={isPlaying}
              controls // Shows native controls after play starts
              loop
              playsInline
              autoPlay
              // Sync our state with the player's internal state
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </div>
        </motion.div>
        <div className="laptop-base">
          <img
            src="/assets/laptop-base.png"
            alt="Laptop Base"
            className="w-full h-[700px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LaptopAnimation;
