import React from "react";
import { Carousel } from "antd";
import "./ImgCarousel.css";
import { postUrl } from "../../PostUrl";

function ImgCarousel({ data, setModalImg, setModalOpen }) {
  return (
    <>
      <Carousel arrows>
        {data.map((item, index) => (
          <div key={index}>
            <div
              className="ImgCarousel-img"
              style={{
                backgroundImage: `url('${postUrl}${item.name}')`,
              }}
              onClick={() => {
                setModalImg(item);
                setModalOpen(true);
              }}
            />
            {data.indexOf(item)}
          </div>
        ))}
      </Carousel>
    </>
  );
}

export default ImgCarousel;
