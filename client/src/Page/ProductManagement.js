import React, { useEffect, useState } from "react";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
function ProductManagement() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const res = await axios.post("/api/product/test");

    if (res.data.success) {
      setProduct(res.data.productInfo);
      setLoading(false);
    }

    if (res.data.success === false) {
      console.log("error");
    }
  };

  console.log(product);

  return (
    <>
      {loading ? (
        <div className="loading">
          <LoadingOutlined />
        </div>
      ) : (
        <div className="page"></div>
      )}
    </>
  );
}

export default ProductManagement;
