import Slider from "react-slick";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function FloorPlan() {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="relative w-full h-full">
      <img
        src="/assets/floor-plan-background-image.png"
        alt="floor plan background"
        className="w-full h-full object-cover"
      />

      <div className="floor-plan-container-holder">
        <div className="bottom-8 left-0 right-0 mx-auto w-full max-w-[569px] px-4 ">
          <div className="bg-white bg-opacity-90 p-4 rounded-lg shadow-lg">
            <Slider {...settings}>
              <div className="px-2">
                <img
                  src="/assets/floor-image-1.jpg"
                  alt="Floor plan 1"
                  className="w-full h-64 object-contain mx-auto"
                />
              </div>
              <div className="px-2">
                <img
                  src="/assets/floor-image-2.jpg"
                  alt="Floor plan 2"
                  className="w-full h-64 object-contain mx-auto"
                />
              </div>
              <div className="px-2">
                <img
                  src="/assets/floor-image-3.jpg"
                  alt="Floor plan 3"
                  className="w-full h-64 object-contain mx-auto"
                />
              </div>
              <div className="px-2">
                <img
                  src="/assets/floor-image-4.jpg"
                  alt="Floor plan 4"
                  className="w-full h-64 object-contain mx-auto"
                />
              </div>
            </Slider>

            <button>Download Floor Plan</button>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default FloorPlan;
