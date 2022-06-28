import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";

function PurchaseHistory({ user }) {
  const nav = useNavigate();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPurchaseHistory();
  }, []);

  const getPurchaseHistory = async () => {
    const res = await axios.post("/api/user/purchaseHistory");
    setProduct(res.data.purchaseHistory);
    setLoading(false);
  };

  console.log(product);

  return (
    <div className="page">
      {loading ? (
        <div className="loading">
          <LoadingOutlined />
        </div>
      ) : (
        <>
          <div>{`전체 주문내역 ${product.length}개`}</div>
        </>
      )}
    </div>
  );
}

export default PurchaseHistory;
