"use client";

import Navbar from "./components/Navbar";
import HomeSection from "@/pages/home/Home";

export default function Home() {
  return (
    <div className="landing-page">
      <Navbar />
      <HomeSection />
    </div>
  );
}
