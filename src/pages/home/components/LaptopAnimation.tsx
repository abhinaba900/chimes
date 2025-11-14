"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import ReactPlayer from "react-player";

const LaptopAnimation = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  // New state to track if video has been played once
  const [playedOnce, setPlayedOnce] = useState(false);

  // Laptop lid open/close animation variants
  const laptopVariants = {
    closed: { rotateX: -66, transition: { duration: 0.8, ease: "easeInOut" } },
    open: { rotateX: 15, transition: { duration: 0.8, ease: "easeInOut" } },
  };

  // IntersectionObserver to toggle isInView when ~50% visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.5 } // 50% visibility triggers
    );
    const current = ref.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  // Animate lid and pause video on close
  useEffect(() => {
    if (isInView) {
      controls.start("open");
    } else {
      controls.start("closed");
      setIsPlaying(false); // pause video when out of view
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      className="laptop-container"
      initial={{ scale: 0.5 }}
      animate={{ scale: isInView ? 1 : 0.5 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="laptop">
        <motion.div
          className="laptop-lid"
          initial="closed"
          animate={controls}
          variants={laptopVariants}
        >
          <div className="laptop-screen">
            <ReactPlayer
              className="react-player-wrapper relative z-99"
              src="/assets/placeholder.mp4"
              width="100%"
              height="100%"
              // Show thumbnail only before first play; then load actual player
              light={playedOnce ? false : "/assets/video-poster.jpg"}
              // Custom play icon centered on thumbnail
              playIcon={
                <img
                  src="/assets/youtube-play-icon.png"
                  width={80}
                  alt="Play"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    cursor: "pointer",
                  }}
                />
              }
              playing={isPlaying}
              controls
              loop
              playsInline
              onPlay={() => {
                setIsPlaying(true);
                setPlayedOnce(true); // mark that video has been played
              }}
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
    </motion.div>
  );
};

export default LaptopAnimation;
