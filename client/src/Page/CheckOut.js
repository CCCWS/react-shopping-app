import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import PaymentBtn from "../Components/PaymentBtn";

function CheckOut() {
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
      <PaymentBtn price={state.totalPrice} />
    </div>
  );
}

export default CheckOut;
