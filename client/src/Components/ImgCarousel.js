import React from "react";
import { Carousel } from "antd";
import "./ImgCarousel.css";

function ImgCarousel({ data }) {
  return (
    <Carousel>
      {data.map((item, index) => (
        <div key={index}>
          <div
            className="ImgCarousel-img"
            style={{
              backgroundImage: `url('${item.path}')`,
            }}
          />
        </div>
      ))}
    </Carousel>
  );
}

export default ImgCarousel;
