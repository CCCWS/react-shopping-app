import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";

import "./PurchaseHistory.css";

function PurchaseHistory() {
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

  const productDate = (data) => {
    const year = new Date(data.date).getFullYear();
    const month = new Date(data.date).getMonth();
    const date = new Date(data.date).getDate();
    return `${year}.${month + 1}.${date}`;
  };
  const productTime = (data) => {
    const year = new Date(data.date).getHours();
    const month = new Date(data.date).getMinutes();
    return `${year}시 ${month}분 `;
  };

  return (
    <div className="page">
      {loading ? (
        <div className="loading">
          <LoadingOutlined />
        </div>
      ) : (
        <>
          <div className="purchaseHistory-length">{`전체 주문내역 ${product.length}개`}</div>
          <div className="purchaseHistory-product-card-box">
            {product.map((data, index) => (
              <div key={index} className="purchaseHistory-product-card">
                <div className="purchaseHistory-product-date">
                  <div>{productDate(data)}</div>
                  <div>{productTime(data)}</div>
                  <div>{`결제금액 ${data.price.toLocaleString()}원`}</div>
                </div>

                <div className="purchaseHistory-product-list">
                  {data.product.map((data, index) => (
                    <div key={index} className="purchaseHistory-purchase-card">
                      <div>
                        <div
                          style={{
                            backgroundImage: `url('${data.image[0].path}')`,
                          }}
                          className="purchaseHistory-purchase-img"
                        />
                        <div className="purchaseHistory-purchase-card-title">
                          {data.title.length > 20
                            ? `${data.title.slice(0, 20)}...`
                            : `${data.title}`}
                        </div>
                      </div>

                      <div className="purchaseHistory-purchase-card-price">{`${parseInt(
                        data.price,
                        10
                      ).toLocaleString()}원`}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default PurchaseHistory;
