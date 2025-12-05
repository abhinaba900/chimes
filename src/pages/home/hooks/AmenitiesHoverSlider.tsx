import { useState } from "react";

interface AmenitiesItemProps {
  text: string;
  image: string;
}

const AmenitiesHoverSlider = () => {
  const amenities = [
    {
      text: "Squash Court",
      image:
        "assets/freepik__candid-photography-with-natural-textures-and-highl__31606.webp",
    },
    {
      text: "Gym",
      image: "assets/Gym.webp",
    },
    {
      text: "kids pool",
      image:
        "assets/freepik__candid-photography-with-natural-textures-and-highl__31601.webp",
    },
    {
      text: "Multipurpose hall",
      image: "assets/Multipurpose-hall.webp",
    },
    {
      text: "Outdoor gym",
      image: "assets/outdoor-gym.webp",
    },
    {
      text: "Multipurpose court",
      image:
        "assets/freepik__candid-photography-with-natural-textures-and-highl__31600.webp",
    },
    {
      text: "Billiards",
      image:
        "assets/freepik__candid-photography-with-natural-textures-and-highl__31604.webp",
    },
    {
      text: "Cafeteria",
      image:
        "assets/freepik__candid-photography-with-natural-textures-and-highl__31603.webp",
    },
    {
      text: "Table Tennis",
      image:
        "assets/freepik__candid-photography-with-natural-textures-and-highl__31605.webp",
    },
    {
      text: "Foosball",
      image: "assets/Foosball.webp",
    },
    {
      text: "Steam & Sauna",
      image: "assets/Steam & Sauna.webp",
    },
    {
      text: "Walking track",
      image: "assets/Walking track.webp",
    },
    {
      text: "Work pods",
      image: "assets/work pods.webp",
    },
  ];

  const [hoveredItem, setHoveredItem] = useState<AmenitiesItemProps | null>({
    text: "Squash Court",
    image:
      "assets/freepik__candid-photography-with-natural-textures-and-highl__31606.jpeg",
  });

  return (
    <div className="flex justify-center w-full min-h-[500px] ">
      <div className="relative w-full max-w-[1339px] min-h-[500px] left-and-right-padding-in-content all-image-section-container-every-moment overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-[24px] md:gap-0  justify-between items-center">
        {/* Text container - aligned bottom left */}
        <div className="relative z-10 h-full flex items-start pb-8">
          <div className="mx-auto px-4 w-full">
            <div className="flex flex-wrap ">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <span
                    className={`
                      inline-block 
                      font-family-2 
                      font-normal 
                      text-left 
                      text-[24px]
                        sm:text-[24px]
                        md:text-[32px]
                        lg:text-[40px]
                        xl:text-[52px]
                      leading-[140%]
                      sm:leading-[30px]
                      md:leading-[40px]
                      lg:leading-[48px]
                      xl:leading-[60px] 
                      tracking-tighter 
                      transition-opacity 
                      duration-300 
                      cursor-pointer
                      text-[#010701]
                      ${
                        hoveredItem?.text && hoveredItem.text !== amenity.text
                          ? "opacity-50"
                          : "opacity-100"
                      }
                    `}
                    onMouseEnter={() => setHoveredItem(amenity)}
                    onMouseLeave={() =>
                      setHoveredItem({
                        text: "Squash Court",
                        image:
                          "assets/freepik__candid-photography-with-natural-textures-and-highl__31606.jpeg",
                      })
                    }
                  >
                    {amenity.text}
                  </span>
                  {index < amenities.length - 1 && (
                    <span
                      className={`
                        text-[24px]
                        sm:text-[24px]
                        md:text-[32px]
                        lg:text-[40px]
                        xl:text-[52px]
                        mx-1 
                        text-[#010701]
                        ${hoveredItem?.text ? "opacity-50" : "opacity-100"}
                        transition-opacity 
                        duration-300
                      `}
                    >
                      ,&nbsp;
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Background image - aligned to right */}
        {hoveredItem && (
          <div className="w-full flex justify-center lg:justify-end">
            <img
              src={hoveredItem?.image}
              alt="Amenity"
              className="max-w-[450px] md:max-w-[500px] w-full h-[500px] object-cover transition-opacity duration-500 ease-in-out rounded-[32px]"
            />
          </div>
        )}

        {/* CSS for font family */}
        <style jsx global>{`
          .font-family-2 {
            font-family: var(--font-family-2);
          }
        `}</style>
      </div>
    </div>
  );
};

export default AmenitiesHoverSlider;
