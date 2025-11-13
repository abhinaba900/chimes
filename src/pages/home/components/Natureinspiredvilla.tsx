"use client";
import Stack from "@/ReactBits/Stack/Stack";
import TiltedCard from "@/ReactBits/TiltedCard/TiltedCard";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

function Natureinspiredvilla() {
  const images = [
    {
      id: 1,
      img: "assets/Eco-friendly villa made with mud interlocking bricks, close-up of sustainable wall material, architectural design.png",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format",
    },
  ];
  return (
    <div className="natureinspiredvilla" id="highlights">
      <img
        className="background-image"
        src="/assets/nature inspired villa background image.webp"
        alt="nature inspired villa background image"
      />

      <div className="natureinspiredvilla-text-holder-and-content-holder">
        <h3>
          Where every Brick <br /> has a <span>Brain</span>
        </h3>

        <div className="natureinspiredvilla-content-holder-image"></div>

        <div className="natureinspiredvilla-sub-container-content-holder">
          <div className="natureinspiredvilla-sub-container">
            <TiltedCard
              mainBodyClassName="natureinspiredvilla-content-holder-image-2"
              className="section-overlay border-r-2"
              imageSrc="assets/Modern eco-luxury villa private lounge.webp"
              altText="Powered by the Sun, Not the Grid"
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={0}
              scaleOnHover={1}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              overlayContent={
                <section className="natureinspiredvilla-content-holder-text ">
                  <h4>
                    Your own <br /> Private Sanctuary
                  </h4>
                  <p>240 Sq.ft of space for wellness and quiet luxury</p>
                </section>
              }
            />
            <TiltedCard
              mainBodyClassName="natureinspiredvilla-content-holder-image-2"
              className="section-overlay"
              imageSrc="assets/Modern servant’s quarter in a luxury eco-villa – clean, well-lit, living space with a bed, small kitchenette, private bathroom, functional and dignified design, neutral tones, warm ambience.webp"
              altText="Powered by the Sun, Not the Grid"
              captionText="Kendrick Lamar - GNX"
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={0}
              scaleOnHover={1}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              overlayContent={
                <section className="natureinspiredvilla-content-holder-text ">
                  <h4>
                    Space that Respects <br /> every role
                  </h4>
                  <p>Includes a spacious 400 Sq.ft servant’s quarter</p>
                </section>
              }
            />
          </div>
          <TiltedCard
            mainBodyClassName="natureinspiredvilla-content-holder-image-2"
            className="section-overlay "
            imageSrc="assets/Modern eco-friendly villa 2.webp"
            altText="Powered by the Sun, Not the Grid"
            captionText="Kendrick Lamar - GNX"
            containerHeight="100%"
            containerWidth="100%"
            imageHeight="100%"
            imageWidth="100%"
            rotateAmplitude={0}
            scaleOnHover={1}
            showMobileWarning={false}
            showTooltip={false}
            displayOverlayContent={true}
            overlayContent={
              <section className="natureinspiredvilla-content-holder-text ">
                <section className="natureinspiredvilla-content-holder-text-inner">
                  <div className="text-center">
                    <h4 style={{ marginBottom: "1rem", margin: "0 auto" }}>
                      World Bank-Approved <br /> Sustainability
                    </h4>
                    <p style={{ margin: "0 auto", marginTop: "1rem" }}>
                      IFC Green certified for eco-conscious living
                    </p>
                  </div>
                </section>
              </section>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Natureinspiredvilla;
