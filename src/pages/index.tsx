"use client";

import FooterSection from "./components/FooterSection";
import Navbar from "./components/Navbar";
import HomeSection from "@/pages/home/Home";
// import "@/animationjsfile/modernizr"
// import "@/animationjsfile/velocity.min.js"
// import "@/animationjsfile/velocity.ui.min.js"


export default function Home() {
  return (
    <div className="landing-page">
      <Navbar />
      <HomeSection />
      <FooterSection />
    </div>
  );
}
