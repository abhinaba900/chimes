import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TextItem {
  title: string;
  description: string;
}

interface TextSliderProps {
  texts: TextItem[];
  minWidth?: number; // Minimum width for each slide
  padding?: number; // Padding around content
  speed?: number;
  className?: string;
  gradientWidth?: number;
}

export const TextSlider: React.FC<TextSliderProps> = ({
  texts = [],
  minWidth = 400,
  padding = 2,
  speed = 20,
  className = "",
  gradientWidth = 300,
}) => {
  const slideRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    width: minWidth,
    height: 100,
  });
  const duplicatedTexts = [...texts, ...texts, ...texts, ...texts];

  useEffect(() => {
    if (slideRef.current) {
      // Calculate the natural width and height of the content
      const contentWidth = slideRef.current.scrollWidth;
      const contentHeight = slideRef.current.scrollHeight;

      // Use whichever is larger - the content width or the minimum width
      const calculatedWidth = Math.max(contentWidth + padding * 2, minWidth);
      const calculatedHeight = contentHeight + padding * 2;

      setDimensions({
        width: calculatedWidth,
        height: calculatedHeight,
      });
    }
  }, [texts, minWidth, padding]);

  return (
    <div
      className={`slider ${className}`}
      style={{
        height: `${dimensions.height}px`,
        margin: "auto",
        overflow: "hidden",
        position: "relative",
        width: "100%",
      }}
    >
      {/* Gradient overlays */}
      <div
        className="gradient-overlay left"
        style={{
          height: "100%",
          position: "absolute",
          width: `${gradientWidth}px`,
          zIndex: 2,
          left: 0,
          top: 0,
        }}
      />
      <div
        className="gradient-overlay right"
        style={{
          height: "100%",
          position: "absolute",
          width: `${gradientWidth}px`,
          zIndex: 2,
          right: 0,
          top: 0,
          transform: "rotateZ(180deg)",
        }}
      />

      {/* Sliding track */}
      <motion.div
        className="slide-track"
        animate={{
          x: [`0px`, `-${dimensions.width * texts.length}px`],
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{
          display: "flex",
          width: `${dimensions.width * duplicatedTexts.length}px`,
          height: "100%",
        }}
      >
        {duplicatedTexts.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="slide"
            style={{
              height: "100%",
              width: `${dimensions.width}px`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              padding: `${padding}px`,
              boxSizing: "border-box",
            }}
            ref={index === 0 ? slideRef : null}
          >
            <div className="slide-content" style={{ width: "100%" }}>
              <h3>{item.title}</h3>
              <p style={{ margin: 0 }}>{item.description}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
