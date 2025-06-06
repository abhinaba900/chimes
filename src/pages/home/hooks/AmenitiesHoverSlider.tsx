import { useState } from "react";

interface AmenitiesItemProps {
  text: string;
  image: string;
}

const AmenitiesHoverSlider = () => {
  const amenities = [
    { text: "Clubhouse", image: "https://picsum.photos/id/318/1200/800" },
    { text: "Gym", image: "https://picsum.photos/id/306/1200/800" },
    { text: "Party Hall", image: "https://picsum.photos/id/325/1200/800" },
    { text: "Indoor Games", image: "https://picsum.photos/id/247/1200/800" },
    { text: "Badminton Court", image: "https://picsum.photos/id/192/1200/800" },
    { text: "Swimming Pool", image: "https://picsum.photos/id/258/1200/800" },
    { text: "Kids' Play Area", image: "https://picsum.photos/id/294/1200/800" },
    {
      text: "Half Basketball Court",
      image: "https://picsum.photos/id/240/1200/800",
    },
    {
      text: "Senior Citizen Park",
      image: "https://picsum.photos/id/212/1200/800",
    },
    {
      text: "Multipurpose Court",
      image: "https://picsum.photos/id/274/1200/800",
    },
  ];

  const [hoveredItem, setHoveredItem] = useState<AmenitiesItemProps | null>(
    null
  );

  return (
    <div className="flex justify-center w-full min-h-[500px]">
      <div className="relative w-full max-w-[1339px] min-h-[500px] overflow-hidden ">
        {/* Background image - aligned to right */}
        {hoveredItem && (
          <div className="absolute inset-0 flex justify-end">
            <img
              src={hoveredItem?.image}
              alt="Amenity"
              className="h-full max-w-[500px] object-cover object-center transition-opacity duration-500 ease-in-out rounded-[32px]"
              style={{ opacity: 1 }}
            />
          </div>
        )}

        {/* Text container - aligned bottom left */}
        <div className="relative z-10 h-full flex items-end pb-8">
          <div className="mx-auto px-4 w-full">
            <div className="flex flex-wrap">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <span
                    className={`
                      inline-block 
                      font-family-2 
                      font-normal 
                      text-left 
                      text-[20px]
                        sm:text-[24px]
                        md:text-[32px]
                        lg:text-[40px]
                        xl:text-[52px]
                      leading-[24px]
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
                        hoveredItem && hoveredItem.text !== amenity.text
                          ? "opacity-50"
                          : "opacity-100"
                      }
                    `}
                    onMouseEnter={() => setHoveredItem(amenity)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {amenity.text}
                  </span>
                  {index < amenities.length - 1 && (
                    <span
                      className={`
                        text-[20px]
                        sm:text-[24px]
                        md:text-[32px]
                        lg:text-[40px]
                        xl:text-[52px]
                        mx-1 
                        text-[#010701]
                        ${hoveredItem ? "opacity-50" : "opacity-100"}
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
