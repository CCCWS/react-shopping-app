import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "antd";
import { postUrl } from "../PostUrl";
import "./ProductRank.css";

function ProductRank() {
  const [sold, setSold] = useState([]);
  const [views, setViews] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const getSold = await axios.post("api/product/soldSort");
      const getViews = await axios.post("api/product/viewSort");

      setSold(getSold.data.productInfo);
      setViews(getViews.data.productInfo);
    } catch (err) {
      console.log(err, "조회실패");
    }
  };

  return (
    <div className="ProductRank">
      <Carousel effect="fade">
        <div className="ProductRank-section">
          <div>
            <strong>조회수</strong>가 높은 상품
          </div>
          <ProductSection items={views} />
        </div>

        <div className="ProductRank-section">
          <div>
            <strong>판매량</strong>이 많은 상품
          </div>
          <ProductSection items={sold} />
        </div>
      </Carousel>
    </div>
  );
}

const ProductSection = ({ items }) => {
  const nav = useNavigate();
  return (
    <div className="ProductRank-product">
      {items.map((data, index) => (
        <div
          className="ProductRank-product-item"
          key={index}
          onClick={() => nav(`/product/${data._id}`)}
        >
          <div
            className="ProductRank-product-item-img"
            style={{
              backgroundImage: `url('${postUrl}${data.image[0].name}')`,
            }}
          >
            <div className="ProductRank-product-item-number">
              {items.indexOf(data) + 1}
            </div>
          </div>

          <div className="ProductRank-product-item-title">{data.title}</div>
        </div>
      ))}
    </div>
  );
};

export default ProductRank;
