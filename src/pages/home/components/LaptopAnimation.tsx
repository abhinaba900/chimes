"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import ReactPlayer from "react-player";

const LaptopAnimation = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Laptop lid open/close variants
  const laptopVariants = {
    closed: { rotateX: -66, transition: { duration: 0.8, ease: "easeInOut" } },
    open: { rotateX: 15, transition: { duration: 0.8, ease: "easeInOut" } },
  };

  // Intersection Observer
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

  // Laptop lid animation & video control
  useEffect(() => {
    if (isInView) {
      controls.start("open");
    } else {
      controls.start("closed");
      setIsPlaying(false);
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
              className="react-player-wrapper"
              src="/assets/placeholder.mp4"
              width="100%"
              height="100%"
              playIcon={
                <img src="/assets/youtube-play-icon.png" width={80} alt="Play" />
              }
              light="/assets/video-poster.jpg"
              playing={isPlaying}
              controls
              loop
              playsInline
              autoPlay
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
    </motion.div>
  );
};

export default LaptopAnimation;
