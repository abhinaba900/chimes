"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  animationType?:
    | "parallax"
    | "scaleDown"
    | "rotate"
    | "gallery"
    | "catch"
    | "opacity"
    | "fixed";
  hijacking?: "on" | "off";
  index?: number;
  totalSections?: number;
  activeIndex?: number;
  setActiveIndex?: (index: number) => void;
};

type ScrollAnimationComponentProps = {
  children: React.ReactNode;
  animationType?:
    | "parallax"
    | "scaleDown"
    | "rotate"
    | "gallery"
    | "catch"
    | "opacity"
    | "fixed";
  hijacking?: "on" | "off";
  className?: string;
};

const ScrollAnimationSection = ({ 
  children, 
  className = "", 
  activeIndex, 
  index,
  setActiveIndex,
  hijacking
}: SectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const isActive = activeIndex === index;
  
  const sectionClass = `sticky-section ${className} ${isActive ? 'active-section active-viewport-tab' : 'inactive-section'}`;

  const translateY = useTransform(scrollYProgress, [0, 1], ["10%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  // Check visibility when scrolling
  useEffect(() => {
    if (hijacking === "off" && sectionRef.current && setActiveIndex) {
      const handleScroll = () => {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (rect) {
          const isVisible = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
          if (isVisible && index !== undefined) {
            setActiveIndex(index);
          }
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [hijacking, index, setActiveIndex]);

  return (
    <motion.section
      ref={sectionRef}
      className={sectionClass}
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        width: "100%",
        y: translateY,
        scale,
        opacity,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </motion.section>
  );
};

const ScrollStackingCards = ({
  children,
  animationType = "parallax",
  hijacking = "off",
  className = "",
}: ScrollAnimationComponentProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sections = Array.isArray(children) ? children : [children];
  const totalSections = sections.length;

  const goToNext = useCallback(() => {
    if (activeIndex < totalSections - 1) {
      setActiveIndex(activeIndex + 1);
      // Scroll to the next section
      document.getElementById(`section-${activeIndex + 1}`)?.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [activeIndex, totalSections]);

  const goToPrev = useCallback(() => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      // Scroll to the previous section
      document.getElementById(`section-${activeIndex - 1}`)?.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") goToNext();
      else if (e.key === "ArrowUp") goToPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  return (
    <div className={`scroll-stack-container ${className}`}>
      {hijacking === "on" ? (
        <AnimatePresence mode="wait" initial={false} custom={activeIndex}>
          {React.Children.map(
            sections,
            (child, index) =>
              index === activeIndex && (
                <ScrollAnimationSection
                  key={index}
                  animationType={animationType}
                  hijacking={hijacking}
                  index={index}
                  totalSections={totalSections}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                >
                  {child}
                </ScrollAnimationSection>
              )
          )}
        </AnimatePresence>
      ) : (
        React.Children.map(sections, (child, index) => (
          <ScrollAnimationSection
            key={index}
            // id={`section-${index}`}
            animationType={animationType}
            hijacking={hijacking}
            index={index}
            totalSections={totalSections}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          >
            {child}
          </ScrollAnimationSection>
        ))
      )}
    </div>
  );
};

export default ScrollStackingCards;