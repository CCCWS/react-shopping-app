import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeCart } from "../_action/user_action";
import {
  LoadingOutlined,
  CheckOutlined,
  CloseOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { postUrl } from "../PostUrl";
import "./Cart.css";

function Cart() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [product, setProduct] = useState([]);
  const [checkProduct, setCheckProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   if (user !== undefined) {
  //     if (user.cart !== undefined) {
  //       if (user.cart.length === 0) {
  //         setLoading(false);
  //         return;
  //       }
  //       setCartData(user.cart); //user redux에서 장바구니 id를 받아옴
  //     }
  //   }
  // }, [user]);

  // useEffect(() => {
  //   if (cartData.length > 0) {
  //     const option = [];
  //     if (cartData !== undefined && cartData.length > 0) {
  //       cartData.forEach((data) => option.push(data.id));
  //       getProduct(option); //cartData에서 id만 배열로 묶음
  //     }
  //   }
  // }, [cartData]);

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    setCheckProduct([]);
  }, [product]);

  useEffect(() => {
    calcTotalPrice();
  }, [checkProduct]);

  const calcTotalPrice = () => {
    const arr = [];
    checkProduct.forEach((data) => arr.push(data.totalPrice));

    if (arr.length === 0) {
      setTotalPrice(0);
    }

    if (arr.length > 0) {
      setTotalPrice(arr.reduce((prev, current) => prev + current));
    }
  };

  const getProduct = async (option) => {
    //redux에서 유저정보의 cart의 id를 가져옴
    //가져온 id로 DB에서 데이터를 가져옴
    //상품목록에서 특정 상품만 추출
    const res = await axios.post("/api/product/cart", option);
    setProduct(res.data.productInfo);
    //cartData의 id를 사용하여 해당 id의 상품을 받아옴
    setLoading(false);
  };

  const getCart = async () => {
    //로그인 유저의 id를 찾고 해당 데이터의 cart를 가져옴
    const cartId = await axios.post("/api/user/getCart");
    //user의 cart에 들어있는 상품의 Id를 가져옴

    const option = [];
    cartId.data.cart.forEach((data) => option.push(data.id));
    //cartId에서 받는 데이터에는 상품의 id와 구매수량이 담겨있음
    //Id만 뽑아서 새로운 배열 생성

    const productData = await axios.post("/api/product/cart", option);
    //Id만 담음 배열로 해당 id의 상품정보를 가져옴

    // console.log(productData.data.productInfo);

    const arr = [];

    productData.data.productInfo.forEach((productDataFor) =>
      cartId.data.cart.forEach(
        (cartIdFor) =>
          cartIdFor.id === productDataFor._id &&
          arr.push({
            ...productDataFor,
            purchasesCount: cartIdFor.purchasesCount,
            totalPrice: cartIdFor.purchasesCount * productDataFor.price,
          })
      )
    );

    setProduct(arr);
    setLoading(false);
  };

  const onCheckDel = async () => {
    if (checkProduct.length !== 0) {
      if (window.confirm(`${checkProduct.length}개 상품을 삭제합니다.`)) {
        const cartArr = [];
        checkProduct.forEach((data) => cartArr.push(data._id));

        const res = await axios.post("/api/user/removeCart", { cartArr });

        if (res.data.success) {
          const temp = [...product];
          setProduct(temp.filter((data) => !checkProduct.includes(data)));
        }
      }
    }
  };

  const onCheckAll = () => {
    if (product.length === checkProduct.length) {
      setCheckProduct([]);
    } else {
      setCheckProduct([...product]);
    }
  };

  const onCheckProduct = (data) => {
    if (checkProduct.find((item) => item._id === data._id) !== undefined) {
      setCheckProduct(checkProduct.filter((item) => item._id !== data._id));
    } else {
      setCheckProduct([...checkProduct, data]);
    }
  };

  const onCartDel = (id) => {
    dispatch(removeCart(id));
    if (product.length > 0) {
      const data = [...product];
      setProduct(data.filter((item) => item._id !== id));
    }
  };

  const goCheckOut = () => {
    if (checkProduct.length === 0) {
      return;
    }
    nav("/checkOut", {
      state: { product: checkProduct, totalPrice: totalPrice, cart: true },
    });
  };

  return (
    <div className="page">
      {loading ? (
        <div className="loading">
          <LoadingOutlined />
        </div>
      ) : (
        <>
          <div className="purchase-procedure">
            <strong>장바구니</strong> &gt; 주문서 &gt; 결제완료
          </div>
          <div className="cart-card-checkbox-all">
            <div>전체선택</div>
            <div
              className={[
                `cart-card-checkbox ${
                  product.length === checkProduct.length &&
                  checkProduct.length !== 0 &&
                  "cart-card-checkbox-check"
                }`,
              ].join(" ")}
              onClick={onCheckAll}
            >
              <CheckOutlined />
            </div>
            <button onClick={onCheckDel}>선택삭제</button>
          </div>

          <div className="cart-card-box">
            {product.length === 0 ? (
              <div className="cart-card-not-item">
                <ShoppingCartOutlined />
                장바구니에 상품을 추가해주세요.
              </div>
            ) : (
              <>
                {product.map((data, index) => (
                  <div key={index} className="cart-card">
                    <div>
                      <div
                        className={[
                          `cart-card-checkbox ${
                            checkProduct.find(
                              (item) => item._id === data._id
                            ) !== undefined && "cart-card-checkbox-check"
                          }`,
                        ].join(" ")}
                        onClick={() => onCheckProduct(data)}
                      >
                        <CheckOutlined />
                      </div>
                      <div
                        style={{
                          backgroundImage: `url('${postUrl}${data.image[0].name}')`,
                        }}
                        className="cart-img"
                        onClick={() => nav(`/product/${data._id}`)}
                      />

                      <div
                        className="cart-card-title"
                        onClick={() => nav(`/product/${data._id}`)}
                      >
                        <div>
                          {data.title.length > 15
                            ? `${data.title.slice(0, 15)}...`
                            : `${data.title}`}
                        </div>
                        <div>{`${parseInt(
                          data.price * data.purchasesCount,
                          10
                        ).toLocaleString()}원`}</div>
                        <div>{data.purchasesCount}개</div>
                      </div>
                    </div>

                    <div
                      className="cart-card-delete"
                      onClick={() => onCartDel(data._id)}
                    >
                      <CloseOutlined />
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <hr />

          <div className="ProductDetail-footer">
            <div>
              <div className="ProductDetail-footer-price">
                {`${
                  checkProduct.length
                }개 상품 ∙ ${totalPrice.toLocaleString()}원`}
              </div>
              <div className="ProductDetail-footer-btn">
                <button
                  className={
                    checkProduct.length > 0
                      ? "cart-purchase-btn-activate"
                      : "cart-purchase-btn-disabled"
                  }
                  onClick={goCheckOut}
                >
                  구매하기
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default React.memo(Cart);
