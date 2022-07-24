import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { postUrl } from "../PostUrl";

import Modal from "../Components/Modal";
import "./PurchaseHistory.css";

function PurchaseHistory() {
  const nav = useNavigate();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalShippingInfo, setModalShippingInfo] = useState();
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
          <Modal
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            PurchaseHistory={true}
            data={modalShippingInfo}
          />
          <div className="purchaseHistory-length">{`전체 주문내역 ${product.length}개`}</div>
          <div className="purchaseHistory-product-card-box">
            {product.map((data, index) => (
              <div key={index} className="purchaseHistory-product-card">
                <div className="purchaseHistory-product-info">
                  <div className="purchaseHistory-product-info-value">
                    <div>{productDate(data)}</div>
                    <div>{productTime(data)}</div>
                    <div>{`결제금액 ${data.price.toLocaleString()}원`}</div>
                  </div>

                  <div
                    onClick={() => {
                      setModalOpen(true);
                      setModalShippingInfo(data.shippingInfo);
                    }}
                  >
                    배송정보
                  </div>
                </div>

                <div className="purchaseHistory-product-list">
                  {data.product.map((data, index) => (
                    <div key={index} className="purchaseHistory-purchase-card">
                      <div>
                        <div
                          style={{
                            backgroundImage: `url('${postUrl}${data.image[0].name}')`,
                          }}
                          className="purchaseHistory-purchase-img"
                        />
                        <div className="purchaseHistory-purchase-card-title">
                          {data.title.length > 15
                            ? `${data.title.slice(0, 15)}...`
                            : `${data.title}`}
                        </div>
                      </div>

                      <div className="purchaseHistory-purchase-card-price">
                        <>
                          <div>{data.purchasesCount}개</div>
                          <div>
                            {parseInt(data.totalPrice, 10).toLocaleString()}원
                          </div>
                        </>
                      </div>
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
