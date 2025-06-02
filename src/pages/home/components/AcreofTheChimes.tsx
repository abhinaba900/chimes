import React, { useState } from "react";

const sections = [
  { name: "PREMIUM", image: "https://picsum.photos/id/1011/600/400" },
  { name: "UBER EAST", image: "https://picsum.photos/id/1012/600/400" },
  { name: "ULTRA EAST", image: "https://picsum.photos/id/1013/600/400" },
  { name: "UBER WEST", image: "https://picsum.photos/id/1014/600/400" },
  { name: "ULTRA WEST", image: "https://picsum.photos/id/1015/600/400" },
  { name: "BUNGALOW EAST", image: "https://picsum.photos/id/1016/600/400" },
  { name: "BUNGALOW WEST", image: "https://picsum.photos/id/1018/600/400" },
];

const defaultImage = "https://picsum.photos/id/1005/600/400";

function AcreofTheChimes() {
  const [activeImage, setActiveImage] = useState(defaultImage);
  return (
    <div className="py-5 mx-auto acreo-of-the-chimes-section">
      <img
        src="assets/drawing-tree-with-green-yellow-leaves copy 1.svg"
        id="acreo-of-the-chimes-tree-logo-image"
        alt=""
      />
      <p>
        Experience <span>thoughtful design</span> and natural serenity woven
        into every acre of The Chimes
      </p>

      <div className="acreo-of-the-chimes-text-and-image-container">
        {/* Sidebar */}
        <div className="space-y-4 text-lg font-medium text-gray-800 ">
          {sections.map((section) => (
            <div
              key={section.name}
              onMouseEnter={() => setActiveImage(section.image)}
              className="cursor-pointer hover:text-blue-600 transition-colors text-area-inside-text-and-image-container"
            >
              {section.name}
            </div>
          ))}
        </div>

        {/* Image Viewer */}
        <div className="">
          <img
            src={activeImage}
            alt="Map Section Preview"
            className="w-full  rounded-xl "
          />
        </div>
      </div>
    </div>
  );
}

export default AcreofTheChimes;
