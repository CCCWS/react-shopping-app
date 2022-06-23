import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import "./Cart.css";

function Cart() {
  const user = useSelector((state) => state.user.userData);
  const [cartData, setCartData] = useState([]);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user !== undefined) {
      setCartData(user.cart);
    }
  }, [user]);

  useEffect(() => {
    console.log(cartData);
    const option = [];
    if (cartData !== undefined) {
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
          <div className="cart-card-box">
            {product.map((data, index) => (
              <div key={index} className="cart-card">
                <div
                  style={{
                    backgroundImage: `url('${data.image[0].path}')`,
                  }}
                  className="cart-img"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default React.memo(Cart);
