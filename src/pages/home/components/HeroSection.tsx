import Image from "next/image";
import React from "react";

function HeroSection() {
  return (
    <div className="hero-section">
      <img src="/assets/Hero Section.jpg" alt="hero" />

      <div className="text-section">
        <p>Large on Life. Light on the Planet</p>
        <h2>THE CHIMES</h2>
      </div>
    </div>
  );
}

export default HeroSection;
