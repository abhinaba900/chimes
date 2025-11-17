import { useState } from "react";

interface AmenitiesItemProps {
  text: string;
  image: string;
}

const AmenitiesHoverSlider = () => {
  const amenities = [
    {
      text: "Indoor Badminton Court",
      image:
        "assets/freepik__candid-photography-with-natural-textures-and-highl__31606.webp",
    },
    {
      text: "Gym",
      image:
        "assets/freepik__candid-photography-with-natural-textures-and-highl__31602.webp",
    },
    {
      text: "Swimming Pool",
      image:
        "assets/freepik__candid-photography-with-natural-textures-and-highl__31601.webp",
    },
    {
      text: "Party Hall",
      image:
        "assets/freepik__candid-photography-with-natural-textures-and-highl__31603.webp",
    },
    {
      text: "Kids",
      image:
        "assets/freepik__candid-photography-with-natural-textures-and-highl__31601.webp",
    },
    {
      text: "Play Area",
      image:
        "assets/freepik__candid-photography-with-natural-textures-and-highl__31600.webp",
    },
    {
      text: "Clubhouse",
      image:
        "assets/freepik__candid-photography-with-natural-textures-and-highl__31605.webp",
    },
    {
      text: "Half Basketball Court",
      image:
        "assets/freepik__candid-photography-with-natural-textures-and-highl__31604.webp",
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

  const [hoveredItem, setHoveredItem] = useState<AmenitiesItemProps | null>({
    text: "",
    image:
      "assets/freepik__candid-photography-with-natural-textures-and-highl__31606.jpeg",
  });

  return (
    <div className="flex justify-center w-full min-h-[500px] ">
      <div className="relative w-full max-w-[1339px] min-h-[500px] left-and-right-padding-in-content all-image-section-container-every-moment overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-0  justify-between items-center">
        {/* Text container - aligned bottom left */}
        <div className="relative z-10 h-full flex items-end pb-8">
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
                        hoveredItem?.text && hoveredItem.text !== amenity.text
                          ? "opacity-50"
                          : "opacity-100"
                      }
                    `}
                    onMouseEnter={() => setHoveredItem(amenity)}
                    onMouseLeave={() =>
                      setHoveredItem({
                        text: "",
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
                        text-[20px]
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
              className="max-w-[350px] md:max-w-[500px] w-full h-full object-contain transition-opacity duration-500 ease-in-out rounded-[32px]"
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
