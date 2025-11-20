"use client";

import GradualBlurMemo from "@/ReactBits/GradualBlur/GradualBlur";
import FooterSection from "./components/FooterSection";
import Navbar from "./components/Navbar";
import HomeSection from "@/pages/home/Home";

export default function Home() {
  return (
    <div className="landing-page">
      <Navbar />
      <GradualBlurMemo
        className="gradualblurmemo-section"
        target="page"
        position="bottom"
        height="16rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential={true}
        opacity={1}
      />
      <HomeSection />
      <FooterSection />
    </div>
  );
}
