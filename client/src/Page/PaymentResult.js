import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

import "./PaymentResult.css";

function PaymentResult() {
  const nav = useNavigate();
  const { state } = useLocation();
  console.log(state);

  useEffect(() => {
    if (state === null) {
      nav("/");
    }
  }, []);

  return (
    <div className="page">
      <div className="purchase-procedure">
        장바구니 &gt; 주문서 &gt; <strong>결제완료</strong>
      </div>

      <div className="checkOut-section">
        <div>배송지정보</div>
        <hr />
        <div>
          <div className="Upload-section">
            <div>이름</div>
            <div>{state.shippingInfo.name}</div>
          </div>
          <div className="Upload-section">
            <div>연락처</div>
            <div>{state.shippingInfo.phone}</div>
          </div>
          <div className="Upload-section">
            <div>주소</div>
            <div>{state.shippingInfo.adress}</div>
          </div>
          <div className="Upload-section">
            <div>요구사항</div>
            <div>{state.shippingInfo.req}</div>
          </div>
        </div>
      </div>

      <div className="checkOut-totalPrice">{`총 결제금액 ${parseInt(
        state.price,
        10
      ).toLocaleString()}원`}</div>

      <div className="paymentResult-goBtn">
        <button onClick={() => nav("/purchaseHistory")}>구매내역조회</button>
        <button onClick={() => nav("/")}>쇼핑 계속하기</button>
      </div>
    </div>
  );
}

export default PaymentResult;
