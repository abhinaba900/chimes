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
        "assets/freepik__candid-photography-with-natural-textures-and-highl__31606.jpeg",
    },
    {
      text: "Gym",
      image:
        "assets/freepik__candid-photography-with-natural-textures-and-highl__31602.jpeg",
    },
    {
      text: "Swimming Pool",
      image:
        "assets/freepik__candid-photography-with-natural-textures-and-highl__31601.jpeg",
    },
    {
      text: "Party Hall",
      image:
        "assets/freepik__candid-photography-with-natural-textures-and-highl__31603.jpeg",
    },
    {
      text: "Kids",
      image:
        "assets/freepik__candid-photography-with-natural-textures-and-highl__31601.jpeg",
    },
    {
      text: "Play Area",
      image:
        "assets/freepik__candid-photography-with-natural-textures-and-highl__31600.jpeg",
    },
    {
      text: "Clubhouse",
      image:
        "assets/freepik__candid-photography-with-natural-textures-and-highl__31605.jpeg",
    },
    {
      text: "Half Basketball Court",
      image:
        "assets/freepik__candid-photography-with-natural-textures-and-highl__31604.jpeg",
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
    <div className="flex justify-center w-full min-h-[500px]">
      <div className="relative w-full max-w-[1339px] min-h-[500px] overflow-hidden grid grid-cols-2  justify-between">
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
          <div className="ml-auto mr-0 block relative right-0">
            <img
              src={hoveredItem?.image}
              alt="Amenity"
              className="h-full max-w-[500px] object-cover object-center transition-opacity duration-500 ease-in-out rounded-[32px]"
              style={{ opacity: 1, marginLeft: "auto" }}
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
