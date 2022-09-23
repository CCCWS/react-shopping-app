import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  CheckOutlined,
  CloseOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import Loading from "../Components/Loading";

import useAxios from "../hooks/useAxios";

import { removeCart } from "../_action/user_action";
import { postUrl } from "../PostUrl";
import "./Cart.css";

function Cart() {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [checkProduct, setCheckProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const { resData: userCartList, connectServer: getUserCartList } =
    useAxios("/api/user/getCart");

  const {
    resData: product,
    setResData: setProduct,
    connectServer: getProductList,
  } = useAxios("/api/product/cart");

  const { connectServer: removeCheckProduct } = useAxios(
    "/api/user/removeCart"
  );

  const { connectServer: removeTargetProduct } = useAxios(
    "/api/user/removeCart"
  );

  //user데이터에서 cart에 들어있는 상품의 id를 가져옴
  useEffect(() => {
    getUserCartList();
  }, []);

  //상품 id를 가져왔다면 id를 옵션으로 해당 id와 일치하는 모든 상품 가져옴
  useEffect(() => {
    if (userCartList) {
      const option = [];
      userCartList.forEach((data) => option.push(data.id));
      getProductList(option);
    }
  }, [userCartList]);

  //가져온 상품을 user데이터에서 가져온 cart에 추가한 상품개수를 데이터로 넣어줌
  useEffect(() => {
    if (product && product.length > 0) {
      product.forEach(
        (data, index) => (
          (data.totalPrice = data.price * userCartList[index].purchasesCount),
          (data.purchasesCount = userCartList[index].purchasesCount)
        )
      );
      setLoading(false);
    }

    if (product && product.length === 0) {
      setLoading(false);
    }
  }, [product]);

  //선택한 상품의 가격 계산
  useEffect(() => {
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

    if (checkProduct.length > 0) {
      calcTotalPrice();
    }
  }, [checkProduct]);

  //전체 상품 체크
  const onCheckAll = () => {
    if (product.length === checkProduct.length) {
      setCheckProduct([]);
    } else {
      setCheckProduct([...product]);
    }
  };

  //하나의 상품 체크
  const onCheckProduct = (data) => {
    //체크목록에 선택한 항목이 있는지 확인
    if (checkProduct.find((item) => item._id === data._id) !== undefined) {
      //이미 있는 항목이면 제외시킴
      setCheckProduct(checkProduct.filter((item) => item._id !== data._id));
    } else {
      //없다면 항목에 추가
      setCheckProduct([...checkProduct, data]);
    }
  };

  //선택한 상품 삭제
  const onCheckDel = () => {
    //선택한 상품이 있다면
    if (checkProduct.length !== 0) {
      if (window.confirm(`${checkProduct.length}개 상품을 삭제합니다.`)) {
        //선택한 상품의 id만 모아서 option으로 사용
        const option = [];
        checkProduct.forEach((data) => option.push(data._id));

        removeCheckProduct(option);

        const temp = [...product];
        setProduct(temp.filter((data) => !checkProduct.includes(data)));
        setCheckProduct([]);
      }
    }
  };

  //하나의 상품 삭제
  const onDelProduct = (id) => {
    if (window.confirm(`상품을 삭제합니다.`)) {
      // setRemoveProductId(id);
      removeTargetProduct({ id: id });

      const temp = [...product];
      setProduct(temp.filter((data) => data._id !== id));
    }
  };

  //주문서 작성 페이지로 이동
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
      <div className="purchase-procedure">
        <strong>장바구니</strong> &gt; 주문서 &gt; 결제완료
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {product && product.length > 0 && (
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
          )}

          <div className="cart-card-box">
            {product === undefined || product.length === 0 ? (
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
                      onClick={() => onDelProduct(data._id)}
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

export default Cart;
