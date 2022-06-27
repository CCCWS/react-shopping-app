import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

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
    </div>
  );
}

export default PaymentResult;
