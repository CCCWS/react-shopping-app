import React, { useRef } from "react";
import { Carousel } from "antd";
import "./ImgCarousel.css";

function ImgCarousel({ data, setModalImg, setModalOpen }) {
  return (
    <>
      <Carousel arrows>
        {data.map((item, index) => (
          <div key={index}>
            <div
              className="ImgCarousel-img"
              style={{
                backgroundImage: `url('${item.path}')`,
              }}
              onClick={() => {
                setModalImg(item);
                setModalOpen(true);
              }}
            />
          </div>
        ))}
      </Carousel>
    </>
  );
}

export default ImgCarousel;
