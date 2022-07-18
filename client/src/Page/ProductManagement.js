import React, { useEffect, useState } from "react";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import "./ProductManagement.css";
import { postUrl } from "../PostUrl";

function ProductManagement() {
  const [product, setProduct] = useState([]);
  const [totalSold, setTotalSold] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const res = await axios.post("/api/product/test");

    if (res.data.success) {
      setProduct(res.data.productInfo);
      calcTotalSold(res.data.productInfo);
      calcTotalPrice(res.data.productInfo);

      setLoading(false);
    }

    if (res.data.success === false) {
      console.log("error");
    }
  };

  const calcTotalSold = (data) => {
    const arr = [];
    data.forEach((data) => arr.push(data.sold));

    if (arr.length === 0) {
      setTotalSold(0);
    }

    if (arr.length > 0) {
      setTotalSold(arr.reduce((prev, current) => prev + current));
    }
  };

  const calcTotalPrice = (data) => {
    const arr = [];
    data.forEach((data) => arr.push(data.price * data.sold));

    if (arr.length === 0) {
      setTotalPrice(0);
    }

    if (arr.length > 0) {
      setTotalPrice(arr.reduce((prev, current) => prev + current));
    }
    console.log(arr);
  };

  return (
    <>
      {loading ? (
        <div className="loading">
          <LoadingOutlined />
        </div>
      ) : (
        <div className="page">
          <div>
            <div>{`등록물품 ${
              product.length
            }개 - 총 판매개수 ${totalSold}개 - 전체 판매금액 ${totalPrice.toLocaleString()}원`}</div>

            <div className="ProductManagement-product-list">
              {product.map((data, index) => (
                <div key={index} className="ProductManagement-purchase-card">
                  <div>
                    <div
                      style={{
                        backgroundImage: `url('${postUrl}${data.image[0].name}')`,
                      }}
                      className="ProductManagement-purchase-img"
                    />
                    <div className="ProductManagement-purchase-card-title">
                      <div>
                        {data.title.length > 25
                          ? `${data.title.slice(0, 25)}...`
                          : `${data.title}`}
                      </div>
                      <div>{`등록일 ${new Date(
                        data.createdAt
                      ).getFullYear()}년 ${
                        new Date(data.createdAt).getMonth() + 1
                      }월 ${new Date(data.createdAt).getDay()}일`}</div>
                      <div>{`가격 ${data.price.toLocaleString()}원`}</div>
                      <div>{`판매수 ${data.sold}`}</div>
                      <div className="ProductManagement-purchase-card-price">{`총 판매금액 ${parseInt(
                        data.price * data.sold,
                        10
                      ).toLocaleString()}원`}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductManagement;
