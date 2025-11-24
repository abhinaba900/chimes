import Slider from "react-slick";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";
import GlassDropdown from "../hooks/CustomDropdown";
import { AnimatePresence, motion } from "framer-motion";
import GlassSurface from "@/ReactBits/GlassSurface/GlassSurface";
const directions = ["East", "West"];
const isInMobileView = () => {
  if (typeof window !== "undefined") {
    return window.innerWidth <= 768; // Example breakpoint for mobile
  }
  return false;
};

// Default floor data that matches your existing structure
const defaultFloors = [
  {
    numberId: 1,
    id: "ground-floor",
    name: isInMobileView() ? "Ground" : "Ground",
    backgroundImage: "assets/floor-plan-background-image.webp",
    sliderContent: [
      {
        image: "assets/Dummy floor plan.webp",
        alt: "Contemporary house layout",
        caption: "Second Floor - 1,050 sq.ft",
      },
      {
        image:
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        alt: "Open concept design",
        caption: "Main Floor - 1,800 sq.ft",
      },
    ],
  },
  {
    numberId: 2,
    id: "first-floor",
    name: isInMobileView() ? "First" : "First",
    backgroundImage:
      "assets/ECUMENE_CHIMES(2773-V)DINING_V2_25-07-2025-1st-flore.webp",
    sliderContent: [
      {
        image:
          "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        alt: "Luxury penthouse layout",
        caption: "Penthouse - 2,400 sq.ft",
      },
    ],
  },
  {
    numberId: 3,
    id: "second-floor",
    name: isInMobileView() ? "Second" : "Second",
    backgroundImage:
      "assets/ECUMENE_CHIMES(2773-V)LIVING_V2_25-07-2025-2nd-flore.webp",
    sliderContent: [
      {
        image:
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        alt: "Contemporary house layout",
        caption: "Second Floor - 1,050 sq.ft",
      },
    ],
  },
  {
    numberId: 4,
    id: "third-floor",
    name: isInMobileView() ? "Third" : "Third",
    backgroundImage:
      "assets/Ecumene_Chimes_(2773_N)_Cam 13_Master Bedroom_Ver 01_25-07-2025-3rd-flore.webp",
    sliderContent: [
      {
        image:
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        alt: "Open concept design",
        caption: "Main Floor - 1,800 sq.ft",
      },
    ],
  },
];

function FloorPlan({
  backgroundImage = "assets/floor-plan-background-image.webp",
  floorPlans = [],
  sliderSettings = {},
  containerClassName = "",
  sliderClassName = "",
  buttonText = "Download Floor Plan",
  onDownloadClick = () => {},
  showDownloadButton = true,
  // New prop for dynamic floors
  floors = defaultFloors,
  defaultActiveFloor = "ground-floor",
}) {
  const [clickedValue, setClickedValue] = React.useState(defaultActiveFloor);

  // Find the active floor data
  const activeFloor =
    floors.find((floor) => floor.id === clickedValue) || floors[0];

  // Use either the passed floorPlans or the active floor's slider content
  const plansToShow =
    floorPlans.length > 0 ? floorPlans : activeFloor.sliderContent;

  // Default slider settings
  const defaultSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  React.useEffect(() => {
    floors.forEach((floor) => {
      const img = new Image();
      img.src = floor.backgroundImage;
    });
  }, [floors]);

  return (
    <div
      className={`relative w-full h-[733px] flex justify-center items-center overflow-hidden  ${containerClassName} `}
      id="floor-plans"
    >
      {/* Use either the passed backgroundImage or the active floor's background */}
      <AnimatePresence mode="wait">
        {(backgroundImage || activeFloor.backgroundImage) && (
          <motion.img
            key={activeFloor.id + activeFloor.backgroundImage + "bg"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            src={activeFloor.backgroundImage}
            alt="floor plan background"
            className="w-full h-screen object-cover floor-plan-background-image will-change-transform"
          />
        )}
      </AnimatePresence>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.44) 0%, rgba(0,0,0,0.22) 65%, rgba(0,0,0,0) 100%)",
          pointerEvents: "none", // allows click-through
          zIndex: 1,
        }}
      ></div>

      <div className="floor-plan-container-holder left-and-right-padding-in-content ">
        <div className="bottom-8 left-0 right-0 mx-auto w-full h-full max-w-[569px] flex flex-col gap-5 md:gap-0 px-4 slider-content-holder">
          <h3 className="mobile-text-top-designed-for-life">
            Designed for Life,
            <br />
            <span> Measured in Space</span>
          </h3>
          <div className="bg-white bg-opacity-90 p-4 rounded-[16px] shadow-lg  w-full h-full slider-contener-parent">
            {plansToShow.length > 0 ? (
              <Slider {...defaultSettings} className={sliderClassName}>
                {plansToShow.map(
                  (
                    plan: { image: string; alt?: string; caption?: string },
                    index
                  ) => (
                    <div key={index} className="px-2">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={activeFloor.id}
                          initial={{ opacity: 0.9, filter: "blur(5px)" }}
                          animate={{ opacity: 1, filter: "blur(0px)" }}
                          exit={{ opacity: 0.9, filter: "blur(5px)" }}
                          transition={{ duration: 0.2 }}
                          src={plan.image}
                          alt={plan.alt || `Floor plan ${index + 1}`}
                          className="w-full h-100 max-h-[461.4649658203125px] object-cover mx-auto mb-4  floor-plan-section-optimization-image"
                        />
                      </AnimatePresence>
                      {/* {plan.caption && (
                        <p className="text-center mt-2 text-sm">
                          {plan.caption}
                        </p>
                      )} */}
                    </div>
                  )
                )}
              </Slider>
            ) : (
              <div className="text-center py-8">No floor plans available</div>
            )}

            {showDownloadButton && (
              <div className="text-center mt-4">
                <button className="download-button" onClick={onDownloadClick}>
                  {buttonText}
                </button>
              </div>
            )}
          </div>
        </div>
        <section className="right-side-section-inFloor-plan">
          <h3 className="bouttom-h3-in-designed-for-life">
            Designed for Life,
            <br />
            <span> Measured in Space</span>
          </h3>
          <GlassSurface
            width={"fit-content"}
            height={"fit-content"}
            borderRadius={16}
            className="flex justify-center items-center overflow-visible px-2 desktop-view floor-plan-text-container-parent"
          >
            <div className="clickid-item-holder-in-floor-plan">
              <div className="floor-item and-this-is-dropdown-floor-plan">
                <GlassDropdown
                  options={directions}
                  defaultLabel="Choose facing"
                />
              </div>
              {/* Dynamically render floor items while preserving your exact styling */}
              {floors.map((floor) => (
                <div
                  key={floor.id}
                  className={
                    "floor-item" +
                    " " +
                    (clickedValue === floor.id ? " floor-active" : "")
                  }
                  onClick={() => setClickedValue(floor.id)}
                >
                  {floor.name}
                </div>
              ))}
            </div>
          </GlassSurface>

          <div className="mobile-view clickid-item-holder-in-floor-plan grid grid-cols-3 grid-rows-2 gap-4 items-stretch  overflow-visible px-2">
            <div className="floor-item and-this-is-dropdown-floor-plan row-span-2 flex justify-start items-start">
              <GlassDropdown
                options={directions}
                defaultLabel="Choose facing"
              />
            </div>
            {/* Dynamically render floor items while preserving your exact styling */}
            {floors.slice(0, 4).map((floor, index) => (
              <div
                key={floor.id}
                className={
                  "floor-item flex justify-center items-center " +
                  (clickedValue === floor.id ? "floor-active" : "")
                }
                onClick={() => setClickedValue(floor.id)}
              >
                {floor.name}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

FloorPlan.propTypes = {
  backgroundImage: PropTypes.string,
  floorPlans: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      alt: PropTypes.string,
      caption: PropTypes.string,
    })
  ),
  sliderSettings: PropTypes.object,
  containerClassName: PropTypes.string,
  sliderClassName: PropTypes.string,
  buttonText: PropTypes.string,
  onDownloadClick: PropTypes.func,
  showDownloadButton: PropTypes.bool,
  // New prop types
  floors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      backgroundImage: PropTypes.string,
      sliderContent: PropTypes.arrayOf(
        PropTypes.shape({
          image: PropTypes.string.isRequired,
          alt: PropTypes.string,
          caption: PropTypes.string,
        })
      ).isRequired,
    })
  ),
  defaultActiveFloor: PropTypes.string,
};

export default FloorPlan;
