import React from "react";
import "./ImagesStaircase.css";
import Image from "../../../../../assets/large.png";

const ImagesStaircase = function ImagesStaircase() {
  return (
    <div className="images-staircase">
      <div className="images-staircase-content-container">
        <div className="images-staircase-content">
          <div className="large-image-container">
            <img className="large-image" src={Image} alt="large image" />
          </div>
          <div className="medium-image-container">
            <img className="medium-image" src={Image} alt="medium image" />
          </div>
          <div className="small-image-container">
            <img className="small-image" src={Image} alt="small image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagesStaircase;
