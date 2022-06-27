import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import PaymentBtn from "../Components/PaymentBtn";
import "./CheckOut.css";

function CheckOut() {
  const nav = useNavigate();
  const { state } = useLocation();
  const [ShippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    adress: "",
    req: "",
  });

  const saveData = (e) => {
    switch (e.target.id) {
      case "name":
        setShippingInfo({ ...ShippingInfo, name: e.target.value });
        break;

      case "phone":
        setShippingInfo({ ...ShippingInfo, phone: e.target.value });
        break;

      case "adress":
        setShippingInfo({ ...ShippingInfo, adress: e.target.value });
        break;

      case "req":
        setShippingInfo({ ...ShippingInfo, req: e.target.value });
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (state === null) {
      nav("/");
    }
  }, []);

  const paymentSeccess = async (payment) => {
    if (state.cart === true) {
      const cartArr = [];
      state.product.forEach((data) => cartArr.push(data.id));
      const res = await axios.post("/api/user/removeCart", { cartArr });
    }

    const res = await axios.post("/api/user/successBuy", {
      shippingInfo: ShippingInfo,
      product: state.product,
      payment: payment,
      price: state.totalPrice,
      date: new Date(),
    });

    nav("/paymentResult", {
      state: {
        shippingInfo: ShippingInfo,
        product: state.product,
        payment: payment,
        price: state.totalPrice,
        date: new Date(),
      },
    });
  };

  console.log(ShippingInfo);
  return (
    <div className="page">
      <div className="purchase-procedure">
        장바구니 &gt; <strong>주문서</strong> &gt; 결제완료
      </div>
      <div className="checkOut-section">
        <div>주문상품 {state.product.length}개</div>
        <hr />
        <div className="purchase-card-box">
          {state.product.map((data, index) => (
            <div key={index} className="purchase-card">
              <div>
                <div
                  style={{
                    backgroundImage: `url('${data.image[0].path}')`,
                  }}
                  className="purchase-img"
                />
                <div className="purchase-card-title">
                  {data.title.length > 20
                    ? `${data.title.slice(0, 20)}...`
                    : `${data.title}`}
                </div>
              </div>

              <div className="purchase-card-price">{`${parseInt(
                data.price,
                10
              ).toLocaleString()}원`}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="checkOut-section">
        <div>주문정보</div>
        <hr />

        <section className="Upload-section">
          <div>이름</div>
          <input
            className="Upload-price"
            value={state.name}
            onChange={saveData}
            id="name"
            placeholder="이름을 입력해 주세요."
          />
        </section>

        <section className="Upload-section">
          <div>전화번호</div>
          <input
            className="Upload-price"
            value={state.phone}
            onChange={saveData}
            id="phone"
            placeholder="전화번호를 입력해 주세요."
          />
        </section>

        <section className="Upload-section">
          <div>주소</div>
          <input
            className="Upload-title"
            value={state.adress}
            onChange={saveData}
            id="adress"
            placeholder="주소를 입력해 주세요."
          />
        </section>

        <section className="Upload-section">
          <div>요청사항</div>
          <input
            className="Upload-title"
            value={state.req}
            onChange={saveData}
            id="req"
            placeholder="요청사항을 입력해 주세요."
          />
        </section>
      </div>

      <div className="checkOut-section">
        <div>결제수단</div>
        <hr />
        <div className="checkOut-totalPrice">{`총 결제금액 ${parseInt(
          state.totalPrice,
          10
        ).toLocaleString()}원`}</div>
        <PaymentBtn price={state.totalPrice} paymentSeccess={paymentSeccess} />
      </div>
    </div>
  );
}

export default CheckOut;
