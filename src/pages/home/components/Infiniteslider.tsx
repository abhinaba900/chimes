import { TextSlider } from "@/ReactBits/ScrollVelocity/ScrollVelocity";
import React from "react";

function Infiniteslider() {
  const texts = [
    {
      title: "4 BHK/2200",
      description: "Sq.Ft Villas Starting",
    },
    {
      title: "6.5 Acres",
      description: "Of Green Living",
    },
    {
      title: "109 Units",
      description: "G+2.5 Floors",
    },
    {
      title: "240 Sq.Ft",
      description: "Of Extra breathing space",
    },
  ];
  return (
    <div className="scroll-section">
      <img
        width={958}
        src="assets/left-flower-in-scroll.png"
        alt="infiniteslider"
      />
      <TextSlider
        texts={texts}
        minWidth={350}
        padding={10}
        speed={15}
        gradientWidth={300}
      />
      <img
        width={958}
        style={{ position: "relative", right: "0px" }}
        src="assets/right-flower-in-scroll.png"
        alt="infiniteslider"
      />
    </div>
  );
}

export default Infiniteslider;
