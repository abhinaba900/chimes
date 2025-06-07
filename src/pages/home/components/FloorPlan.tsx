import Slider from "react-slick";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";
import GlassDropdown from "../hooks/CustomDropdown";
import { AnimatePresence, motion } from "framer-motion";
const directions = ["North", "South", "East", "West"];

// Default floor data that matches your existing structure
const defaultFloors = [
  {
    id: "ground-floor",
    name: "Ground Floor",
    backgroundImage: "assets/floor-plan-background-image.png",
    sliderContent: [
      {
        image: "assets/Dummy floor plan.jpg",
        alt: "Contemporary house layout",
        caption: "Second Floor - 1,050 sq.ft",
      },
      {
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        alt: "Open concept design",
        caption: "Main Floor - 1,800 sq.ft",
      },
    ],
  },
  {
    id: "first-floor",
    name: "First Floor",
    backgroundImage: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    sliderContent: [
      {
        image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        alt: "Luxury penthouse layout",
        caption: "Penthouse - 2,400 sq.ft",
      },
    ],
  },
  {
    id: "second-floor",
    name: "Second Floor",
    backgroundImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    sliderContent: [
      {
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        alt: "Contemporary house layout",
        caption: "Second Floor - 1,050 sq.ft",
      },
    ],
  },
  {
    id: "third-floor",
    name: "Third Floor",
    backgroundImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    sliderContent: [
      {
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        alt: "Open concept design",
        caption: "Main Floor - 1,800 sq.ft",
      },
    ],
  },
];

function FloorPlan({
  backgroundImage = "assets/floor-plan-background-image.png",
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
  const activeFloor = floors.find((floor) => floor.id === clickedValue) || floors[0];

  // Use either the passed floorPlans or the active floor's slider content
  const plansToShow = floorPlans.length > 0 ? floorPlans : activeFloor.sliderContent;

  // Default slider settings
  const defaultSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className={`relative w-full h-full flex justify-center items-center  ${containerClassName} full-container-holder-floor-plan`} id="floor-plans">
      {/* Use either the passed backgroundImage or the active floor's background */}
      <AnimatePresence mode="wait">{(backgroundImage || activeFloor.backgroundImage) && <motion.img key={activeFloor.id} initial={{ opacity: 0.9, filter: "blur(5px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0.9, filter: "blur(5px)" }} transition={{ duration: 0.2 }} src={activeFloor.backgroundImage} alt="floor plan background" className="w-full h-full object-cover floor-plan-background-image" />}</AnimatePresence>

      <div className="floor-plan-container-holder">
        <div className="bottom-8 left-0 right-0 mx-auto w-full h-full max-w-[569px] px-4 slider-content-holder">
          <div className="bg-white bg-opacity-90 p-4 rounded-[16px] shadow-lg h-full">
            {plansToShow.length > 0 ? (
              <Slider {...defaultSettings} className={sliderClassName}>
                {plansToShow.map((plan: { image: string; alt?: string; caption?: string }, index) => (
                  <div key={index} className="px-2">
                    <AnimatePresence mode="wait">
                    <motion.img key={activeFloor.id} initial={{ opacity: 0.9, filter: "blur(5px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0.9, filter: "blur(5px)" }} transition={{ duration: 0.2 }} src={plan.image} alt={plan.alt || `Floor plan ${index + 1}`} className="w-full h-100 max-h-[461.4649658203125px] object-contain mx-auto object-fit-cover mb-4 " />
                    </AnimatePresence>
                    {/* {plan.caption && (
                        <p className="text-center mt-2 text-sm">
                          {plan.caption}
                        </p>
                      )} */}
                  </div>
                ))}
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
          <h3>
            Designed for Life,
            <br />
            <span> Measured in Space</span>
          </h3>

          <div className="clickid-item-holder-in-floor-plan">
            <div className="floor-item">
              <GlassDropdown options={directions} defaultLabel="Choose facing" />
            </div>
            {/* Dynamically render floor items while preserving your exact styling */}
            {floors.map((floor) => (
              <div key={floor.id} className={"floor-item" + " " + (clickedValue === floor.id ? " floor-active" : "")} onClick={() => setClickedValue(floor.id)}>
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
