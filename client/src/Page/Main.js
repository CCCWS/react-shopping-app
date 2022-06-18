import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Main.css";

function Main() {
  const nav = useNavigate();

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = async () => {
    try {
      const res = await axios.post("api/product/productList");
      setProductList(res.data.productInfo);
    } catch (err) {
      // alert("데이터 조회 실패");
    }
  };

  return (
    <div className="page">
      <div className="productList">
        {productList.map((data, index) => (
          <div key={index} className="productCard">
            <div
              style={{
                backgroundImage: `url('${data.image[0].path}')`,
              }}
              className="productCard-img"
            />
            <div className="productCard-title">
              <div>{data.title}</div>
              <div>{`${parseInt(data.price, 10).toLocaleString()}원`}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
