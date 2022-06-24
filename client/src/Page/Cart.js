import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  LoadingOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import "./Cart.css";

function Cart() {
  const nav = useNavigate();
  const user = useSelector((state) => state.user.userData);
  const [cartData, setCartData] = useState([]);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user !== undefined && cartData.length === 0) {
      setCartData(user.cart);
      return;
    }
  }, [user]);

  useEffect(() => {
    const option = [];
    if (cartData !== undefined && cartData.length > 0) {
      cartData.forEach((data) => option.push(data.id));
      getProduct(option);
    }
  }, [cartData]);

  const getProduct = async (option) => {
    const res = await axios.post("/api/product/cart", option);
    setProduct(res.data.productInfo);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <div className="loading">
          <LoadingOutlined />
        </div>
      ) : (
        <div className="page">
          <div>{`장바구니 ${product.length}개`}</div>

          <div className="cart-card-checkbox-all">
            <div>전체선택</div>
            <div className="cart-card-checkbox">
              <CheckOutlined />
            </div>
            <button>선택삭제</button>
          </div>

          <div className="cart-card-box">
            {product.map((data, index) => (
              <div key={index} className="cart-card">
                <div>
                  <div className="cart-card-checkbox">
                    <CheckOutlined />
                  </div>
                  <div
                    style={{
                      backgroundImage: `url('${data.image[0].path}')`,
                    }}
                    className="cart-img"
                    onClick={() => nav(`/product/${data._id}`)}
                  />

                  <div
                    className="cart-card-title"
                    onClick={() => nav(`/product/${data._id}`)}
                  >
                    <div>
                      {data.title.length > 10
                        ? `${data.title.slice(0, 10)}...`
                        : `${data.title}`}
                    </div>
                    <div>{`${parseInt(
                      data.price,
                      10
                    ).toLocaleString()}원`}</div>
                  </div>
                </div>

                <div className="cart-card-delete">
                  <CloseOutlined />
                </div>
              </div>
            ))}
          </div>

          <div className="ProductDetail-footer">
            <div>
              <div className="ProductDetail-footer-price">
                {parseInt(product[0].price, 10).toLocaleString()}원
              </div>
              <div className="ProductDetail-footer-btn">
                <button>구매하기</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default React.memo(Cart);
