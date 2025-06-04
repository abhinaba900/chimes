"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

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

const ScrollAnimationSection = ({ children, className = "" }: SectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], ["10%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  return (
    <motion.section
      ref={sectionRef}
      className={`sticky-section ${className}`}
      style={{
        position: "sticky",
        top: 0,
        y: translateY,
        scale,
        opacity,
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
  const [hasScrolledPastLast, setHasScrolledPastLast] = useState(false);
  const [hasScrolledPastFirst, setHasScrolledPastFirst] = useState(false);
  const sections = Array.isArray(children) ? children : [children];

  const totalSections = sections.length;

  // Navigation logic
  const goToNext = () => {
    if (activeIndex < totalSections - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setHasScrolledPastLast(true); // Transition beyond last section
    }
  };

  const goToPrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else {
      setHasScrolledPastFirst(true); // Transition to a previous section
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") goToNext();
      else if (e.key === "ArrowUp") goToPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  return (
    <div className={`scroll-stack-container ${className}`}>
      {hijacking === "on" ? (
        <AnimatePresence mode="wait">
          {hasScrolledPastLast ? (
            <motion.div className="extra-section">
              <h2>You've reached the extra section!</h2>
            </motion.div>
          ) : hasScrolledPastFirst ? (
            <motion.div className="top-section">
              <h2>Welcome to the upper section!</h2>
            </motion.div>
          ) : (
            sections.map((child, index) =>
              index === activeIndex && (
                <ScrollAnimationSection
                  key={index}
                  animationType={animationType}
                  hijacking={hijacking}
                  index={index}
                  totalSections={totalSections}
                >
                  {child}
                </ScrollAnimationSection>
              )
            )
          )}
        </AnimatePresence>
      ) : (
        sections.map((child, index) => (
          <ScrollAnimationSection
            key={index}
            animationType={animationType}
            hijacking={hijacking}
            index={index}
            totalSections={totalSections}
          >
            {child}
          </ScrollAnimationSection>
        ))
      )}
    </div>
  );
};

export default ScrollStackingCards;