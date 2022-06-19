import React from "react";

import "./ProductList.css";

function ProductCard({ data }) {
  const getTime = (time) => {
    const second = Math.floor(
      (new Date().getTime() - new Date(time).getTime()) / 1000
    ); // 초

    if (second <= 1200) {
      return `${Math.ceil(second / 60)}분 전`;
    }

    if (1200 < second && second <= 86400) {
      return `${Math.ceil(second / 60 / 60)}시간 전`;
    }

    if (86400 < second) {
      return `${Math.ceil(second / 60 / 60 / 24)}일 전`;
    }
  };

  return (
    <>
      {data.map((data, index) => (
        <div key={index} className="productCard">
          <div
            style={{
              backgroundImage: `url('${data.image[0].path}')`,
            }}
            className="productCard-img"
          />
          <div className="productCard-title">
            <div>
              {data.title.length > 12
                ? `${data.title.slice(0, 12)}...`
                : `${data.title}`}
            </div>

            <div className="price-time">
              <div>{`${parseInt(data.price, 10).toLocaleString()}원`}</div>
              <div>{getTime(data.createdAt)}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ProductCard;
