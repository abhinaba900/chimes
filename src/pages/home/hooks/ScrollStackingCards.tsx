"use client";

import React, { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

// Types

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  animationType?:
    | "scaleDown"
    | "rotate"
    | "gallery"
    | "catch"
    | "opacity"
    | "fixed"
    | "parallax";
  hijacking?: "on" | "off";
  index?: number;
  totalSections?: number;
};

type ScrollAnimationComponentProps = {
  children: React.ReactNode;
  animationType?:
    | "scaleDown"
    | "rotate"
    | "gallery"
    | "catch"
    | "opacity"
    | "fixed"
    | "parallax";
  hijacking?: "on" | "off";
  className?: string;
};

// Scroll Animation Section Component

const ScrollAnimationSection = ({
  children,
  className = "",
  animationType = "parallax",
  hijacking = "off",
  index = 0,
  totalSections = 1,
}: SectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Animation values
  const translateY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const getAnimationProps = () => {
    switch (animationType) {
      case "scaleDown":
        return { style: { scale } };
      case "rotate":
        return {
          style: {
            rotateX: useTransform(scrollYProgress, [0, 1], ["0deg", "90deg"]),
          },
        };
      case "gallery":
        return {
          style: {
            scale,
            translateY,
            boxShadow: useTransform(
              scrollYProgress,
              [0, 0.5, 1],
              [
                "0px 0px 0px rgba(0,0,0,0)",
                "0px 10px 40px rgba(0,0,0,0.3)",
                "0px 0px 0px rgba(0,0,0,0)",
              ]
            ),
          },
        };
      case "catch":
        return {
          style: {
            translateY: useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]),
            boxShadow: useTransform(
              scrollYProgress,
              [0, 0.5, 1],
              [
                "0px 0px 0px rgba(0,0,0,0)",
                "0px 5px 20px rgba(0,0,0,0.2)",
                "0px 0px 0px rgba(0,0,0,0)",
              ]
            ),
          },
        };
      case "opacity":
        return {
          style: {
            scale: useTransform(scrollYProgress, [0, 1], [1, 1.2]),
          },
        };
      case "parallax":
      default:
        return {
          style: {
            translateY: useTransform(scrollYProgress, [0, 1], ["0%", "0%"]),
          },
        };
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      className={`cd-section sticky top-0 h-screen ${className}`}
      data-animation={animationType}
      data-hijacking={hijacking}
      {...getAnimationProps()}
    >
      <div className="w-full h-full">{children}</div>
    </motion.section>
  );
};

// Scroll Stacking Cards Component

const ScrollStackingCards = ({
  children,
  animationType = "parallax",
  hijacking = "off",
  className = "",
}: ScrollAnimationComponentProps) => {
  const sections = React.Children.toArray(children);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;
    const handleWheel = (e: WheelEvent) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollTop = container.scrollTop;
        const sectionHeight = window.innerHeight;
        const index = Math.round(scrollTop / sectionHeight);
        const nextSectionTop = (index + (e.deltaY > 0 ? 1 : -1)) * sectionHeight;
        container.scrollTo({ top: nextSectionTop, behavior: "smooth" });
        ticking = false;
      });
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`scroll-stack-container relative h-screen overflow-y-scroll snap-y snap-mandatory ${className}`}
    >
      <AnimatePresence mode="wait">
        {sections.map((child, i) => (
          <ScrollAnimationSection
            key={i}
            animationType={animationType}
            hijacking={hijacking}
            index={i}
            totalSections={sections.length}
            className="snap-start"
          >
            {child}
          </ScrollAnimationSection>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ScrollStackingCards;