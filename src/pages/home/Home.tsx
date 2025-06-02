"use client";
import React from "react";
import HeroSection from "./components/HeroSection";
import BuildVillas from "./components/BuildVillas";
import Natureinspiredvilla from "@/pages/home/components/Natureinspiredvilla";
import Infiniteslider from "./components/Infiniteslider";
import NaturallybuiltArea from "./components/NaturallybuiltArea";
import ElevatingeveryMomentSlider from "./components/ElevatingeveryMomentSlider";
import AcreofTheChimes from "./components/AcreofTheChimes";
import FloorPlan from "./components/FloorPlan";

function HomeSection() {
  return (
    <div >
      <HeroSection />
      <BuildVillas />
      <Natureinspiredvilla />
      <Infiniteslider />
      <NaturallybuiltArea />
      <ElevatingeveryMomentSlider />
      <AcreofTheChimes />
      <FloorPlan />
    </div>
  );
}

export default HomeSection;
