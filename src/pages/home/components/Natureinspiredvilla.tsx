﻿"use client";
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
        src="/assets/nature inspired villa background image.png"
        alt="nature inspired villa background image"
      />

      <div className="natureinspiredvilla-text-holder-and-content-holder">
        <h3>
          Where every Brick <br /> has a <span>Brain</span>
        </h3>

        <TiltedCard
          mainBodyClassName="natureinspiredvilla-content-holder-image"
          imageSrc="assets/Powered by the Sun,Not the Grid.jpg"
          altText="Powered by the Sun, Not the Grid"
          captionText="Kendrick Lamar - GNX"
          containerHeight="100%"
          containerWidth="100%"
          imageHeight="100%"
          imageWidth="100%"
          rotateAmplitude={13}
          scaleOnHover={1}
          showMobileWarning={false}
          showTooltip={false}
          displayOverlayContent={true}
          overlayContent={
            <section className="natureinspiredvilla-content-holder-text">
              <h4>
                Powered by the Sun, <br />
                Not the Grid
              </h4>
              <p>Zero electricity bills. Pure solar living</p>
            </section>
          }
        />

        <div className="natureinspiredvilla-sub-container-content-holder">
          <div className="natureinspiredvilla-sub-container">
            <TiltedCard
              mainBodyClassName="natureinspiredvilla-content-holder-image-2"
              className="section-overlay border-r-2"
              imageSrc="assets/Modern eco-luxury villa private lounge.png"
              altText="Powered by the Sun, Not the Grid"
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={13}
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
              imageSrc="assets/Modern servant’s quarter in a luxury eco-villa – clean, well-lit, living space with a bed, small kitchenette, private bathroom, functional and dignified design, neutral tones, warm ambience.png"
              altText="Powered by the Sun, Not the Grid"
              captionText="Kendrick Lamar - GNX"
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={13}
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
            imageSrc="assets/Modern eco-friendly villa.png"
            altText="Powered by the Sun, Not the Grid"
            captionText="Kendrick Lamar - GNX"
            containerHeight="100%"
            containerWidth="100%"
            imageHeight="100%"
            imageWidth="100%"
            rotateAmplitude={13}
            scaleOnHover={1}
            showMobileWarning={false}
            showTooltip={false}
            displayOverlayContent={true}
            overlayContent={
              <section className="natureinspiredvilla-content-holder-text ">
                <img className="brand-logo" src="/assets/Brand Logo.png" alt="brand logo" />
                <section className="natureinspiredvilla-content-holder-text-inner">
                  <div>
                    <h4>
                      World Bank-Approved <br /> Sustainability
                    </h4>
                    <p>IFC Green certified for eco-conscious living</p>
                  </div>

                  <section className="natureinspiredvilla-content-holder-text-inner-image relative">

                    {images && images.length > 0 ? (
                      <Swiper
                        effect={"cards"}
                        grabCursor={true}
                        modules={[EffectCards]}
                        className="mySwiper"
                      >
                        {images.map((image) => (
                          <SwiperSlide key={image.id}>
                            <div className="slider-image-and-text-section">
                              <img src={image.img} alt={`Image ${image.id}`} />
                              <p className="slider-image-and-text-section-text">
                                Slide To See More
                              </p>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    ) : (
                      <div>No images available</div>
                    )}

                    <a>
                      Mud interlocking bricks that keep your villa cooler in
                      summer, warmer in winter.
                    </a>
                  </section>
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
