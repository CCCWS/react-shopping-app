import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import ProductCard from "../Components/ProductCard";
import "./Main.css";

function Main() {
  const nav = useNavigate();

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = async () => {
    try {
      const res = await axios.post("api/product/productList");
      setProductList(res.data.productInfo);
      setLoading(false);
    } catch (err) {
      // alert("데이터 조회 실패");
    }
  };

  return (
    <div className="page">
      <div className="main-productList">
        {loading ? (
          <div className="loading">
            <LoadingOutlined />
          </div>
        ) : (
          <ProductCard data={productList} />
        )}
      </div>
    </div>
  );
}

export default Main;
