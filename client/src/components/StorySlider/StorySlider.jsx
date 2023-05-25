import React from "react";
import { useEffect } from "react";
import "./StorySlider.css";
import { useState } from "react";
import { useSelector } from "react-redux";

const StorySlider = ({ hide, featuredCount }) => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const slider = user.featured[featuredCount].slider;

  useEffect(() => {
    const sliderTimeout = setTimeout(() => {
      setSliderIndex(sliderIndex + 1);

      if (sliderIndex === slider.length - 1) {
        hide(false);
      }
    }, 3000);
    return () => clearTimeout(sliderTimeout);
  }, [sliderIndex]);

  return (
    <div className="story-slider-wrap">
      {sliderIndex !== 0 ? (
        <div
          className="left-arrow"
          onClick={() => setSliderIndex(sliderIndex - 1)}
        >
          <i class="fa-solid fa-angle-left prev"></i>
        </div>
      ) : (
        <div className="left-arrow"></div>
      )}
      <div className="story-slider">
        <div className="story-slider-item">
          <img src={`slider/${slider[sliderIndex]}`} alt="" />
        </div>

        <div className="story-bars">
          {slider.map((data, index) => (
            <div
              className={`story-bars-item ${
                index === sliderIndex ? "active" : ""
              } ${index < sliderIndex ? "viewed" : ""}`}
              key={index}
            >
              <div className="story-progress"></div>
            </div>
          ))}
        </div>
      </div>
      {sliderIndex < slider.length - 1 ? (
        <div
          className="right-arrow"
          onClick={() => setSliderIndex(sliderIndex + 1)}
        >
          <i class="fa-solid fa-angle-right next"></i>
        </div>
      ) : (
        <div className="right-arrow"></div>
      )}
    </div>
  );
};

export default StorySlider;
