import React from "react";
import { useNavigate } from "react-router-dom";
import Zoom from "react-reveal/Fade";

import { postUrl } from "../PostUrl";
import "./ProductCard.css";
import getTime from "../hooks/getTime";

function ProductCard({ data, click }) {
  const nav = useNavigate();

  return (
    <>
      {data.map((data, index) => (
        <Zoom key={index}>
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
        </Zoom>
      ))}
    </>
  );
}

export default React.memo(ProductCard);
