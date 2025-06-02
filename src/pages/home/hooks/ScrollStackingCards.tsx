"use client";

import React, { useRef } from "react";

interface ScrollStackingCardsProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

export const ScrollStackingCards = ({
  children,
  className = "",
}: ScrollStackingCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  //   useEffect(() => {
  //     const handleScroll = () => {
  //       if (!containerRef.current) return;

  //       const scrollTop = window.scrollY + offset;
  //       let activeCard: HTMLElement | null = null;

  //       const cards = Array.from(
  //         containerRef.current.querySelectorAll('.scroll-stack-card')
  //       ) as HTMLElement[];

  //       cards.forEach((card) => {
  //         const cardTop = card.offsetTop;
  //         const cardHeight = card.offsetHeight;

  //         // Calculate visibility percentage (0-1)
  //         const visibility = Math.min(1, Math.max(0,
  //           (scrollTop - cardTop + cardHeight) / (cardHeight * 2)
  //         ));

  //         if (visibility > 0.5) {
  //           activeCard = card;
  //         }
  //       });

  //       // Update card classes based on scroll position
  //       cards.forEach((card, index) => {
  //         card.classList.remove('active', 'inactive', 'stacked');

  //         if (card === activeCard) {
  //           card.classList.add('active');
  //         } else if (index < cards.indexOf(activeCard as HTMLElement)) {
  //           card.classList.add('inactive');
  //         } else {
  //           card.classList.add('stacked');
  //         }
  //       });
  //     };

  //     window.addEventListener('scroll', handleScroll);
  //     handleScroll(); // Initialize on mount

  //     return () => window.removeEventListener('scroll', handleScroll);
  //   }, [offset]);

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

  // useEffect(() => {
  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting && cardRef.current) {
  //         // Apply sticky styles directly
  //         cardRef.current.style.position = "sticky";
  //       } else if (cardRef.current) {
  //         // Remove sticky styles
  //         cardRef.current.style.position = "";
  //         cardRef.current.style.top = "";
  //         cardRef.current.style.transform = "";
  //       }
  //     });
  //   }, {
  //     threshold: 0.5 // Trigger when 50% of card is visible
  //   });

  //   if (cardRef.current) {
  //     observer.observe(cardRef.current);
  //   }

  //   return () => {
  //     if (cardRef.current) {
  //       observer.unobserve(cardRef.current);
  //     }
  //   };
  // }, []);

  return (
    <div 
      ref={cardRef}
      className={`scroll-stack-card ${className}`}
      style={{
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform, opacity"
      }}
    >
      {children}
    </div>
  );
};