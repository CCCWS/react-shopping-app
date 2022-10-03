import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import "./ProductManagement.css";
import { postUrl } from "../PostUrl";
import Loading from "../Components/Loading";

function ProductManagement({ user }) {
  const nav = useNavigate();
  const [product, setProduct] = useState([]);
  const [totalSold, setTotalSold] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.isAuth === false) {
      nav("/");
    }
    if (user.isAuth === true) {
      getProduct();
    }
  }, []);

  const getProduct = async () => {
    const res = await axios.post("/api/product/myProduct");

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
  };

  return (
    <div className="page">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="ProductManagement-info">
            <div className="ProductManagement-info-value">
              <div>등록물품</div>
              <div>{product.length}개</div>
            </div>

            <div className="ProductManagement-info-value">
              <div>판매개수</div>
              <div>{totalSold}개</div>
            </div>

            <div className="ProductManagement-info-value">
              <div>판매금액</div>
              <div>{totalPrice.toLocaleString()}원</div>
            </div>
          </div>

          <div className="ProductManagement-product-list">
            {product.map((data, index) => (
              <div
                key={index}
                className="ProductManagement-purchase-card"
                onClick={() => nav(`/product/${data._id}`)}
              >
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

                    <ul>
                      <li>{`등록일 ${new Date(data.createdAt).getFullYear()}. ${
                        new Date(data.createdAt).getMonth() + 1
                      }. ${new Date(data.createdAt).getDate()}`}</li>
                      <li>{`가격 ${data.price.toLocaleString()}원`}</li>
                      <li>{`판매수 ${data.sold}`}개</li>
                      <li>{`판매금액 ${parseInt(
                        data.price * data.sold,
                        10
                      ).toLocaleString()}원`}</li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ProductManagement;
