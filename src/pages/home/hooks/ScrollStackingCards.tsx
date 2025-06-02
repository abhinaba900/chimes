"use client";

import React, { useRef } from "react";

interface ScrollStackingCardsProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

 const ScrollStackingCards = ({
  children,
  className = "",
}: ScrollStackingCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className={`scroll-stack-container ${className}`}>
      {children}
    </div>
  );
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className={`scroll-stack-card ${className}`}
      style={{
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
};


export default ScrollStackingCards;