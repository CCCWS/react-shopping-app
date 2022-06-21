import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";

function ProductDetail() {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [image, setImage] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getProduct();
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    if (product.length !== 0) {
      console.log(image);
    }
  }, [product]);

  const getProduct = async () => {
    try {
      const res = await axios.post("/api/product/productDetail", { id });
      setProduct(...res.data.productInfo);
      setImage(res.data.productInfo[0].image);
      setLoading(false);
    } catch (err) {
      console.log("데이터 조회 실패");
    }
  };

  return (
    <div className="page">
      {image.map((data) => (
        <div>
          <img style={{ width: "500px" }} src={data.path} />
        </div>
      ))}
    </div>
  );
}

export default ProductDetail;
