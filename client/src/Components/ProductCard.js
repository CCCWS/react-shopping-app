import React from "react";
import { useNavigate } from "react-router-dom";
import { postUrl } from "../PostUrl";
import Fade from "react-reveal/Fade";

import "./ProductCard.css";

function ProductCard({ data, click }) {
  const nav = useNavigate();
  const getTime = (time) => {
    const second = Math.floor(
      (new Date().getTime() - new Date(time).getTime()) / 1000
    ); // 초

    if (second <= 1200) {
      return `${Math.floor(second / 60)}분 전`;
    }

    if (1200 < second && second <= 86400) {
      return `${Math.floor(second / 60 / 60)}시간 전`;
    }

    if (86400 < second) {
      return `${Math.floor(second / 60 / 60 / 24)}일 전`;
    }
  };

  return (
    <>
      {data.map((data, index) => (
        <Fade left key={index}>
          <div
            className={click ? "productCard" : "productCard-list"}
            id={data._id}
            onClick={() => {
              nav(`/product/${data._id}`);
            }}
          >
            <div
              style={{
                backgroundImage: `url('${postUrl}${data.image[0].name}')`,
              }}
              className={click ? "productCard-img" : "productCard-img-list"}
            >
              {data.count === 0 ? (
                <div className="productCard-soldOut">
                  판매완료된 상품입니다.
                </div>
              ) : null}
            </div>
            <div
              className={click ? "productCard-title" : "productCard-title-list"}
            >
              <div>
                {click ? (
                  <>
                    {data.title.length > 11
                      ? `${data.title.slice(0, 11)}...`
                      : `${data.title}`}
                  </>
                ) : (
                  `${data.title}`
                )}
              </div>

              <div className={click ? "price-time" : "price-time-list"}>
                <div>{`${parseInt(data.price, 10).toLocaleString()}원`}</div>
                <div>{getTime(data.createdAt)}</div>
              </div>
              <div className="productCard-count">{`남은 수량 ${data.count}개`}</div>
            </div>
          </div>
        </Fade>
      ))}
    </>
  );
}

export default React.memo(ProductCard);
