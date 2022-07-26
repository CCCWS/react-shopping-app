import React, { useState } from "react";
import PaymentBtn from "./PaymentBtn";
import "./Selector.css";

function Selector({ price, paymentSeccess, productsold, onPayment }) {
  const [currArr, setCurrArr] = useState(0);

  const PurchaseBtnNormal = () => {
    return (
      <button className="Selector-PurchaseBtnNormal" onClick={onPayment}>
        결제하기
      </button>
    );
  };

  const PurchaseBtnPayPal = () => {
    return (
      <PaymentBtn
        price={price}
        paymentSeccess={paymentSeccess}
        productsold={productsold}
      />
    );
  };

  const arr = [PurchaseBtnNormal(), PurchaseBtnPayPal()];

  const minus = () => {
    if (currArr === 0) {
      return setCurrArr(arr.length - 1);
    }

    setCurrArr((prev) => prev - 1);
  };

  const plus = () => {
    if (currArr === arr.length - 1) {
      return setCurrArr(0);
    }

    setCurrArr((prev) => prev + 1);
  };

  return (
    <div className="Selector-box">
      <button onClick={minus}>&lt;</button>
      <div>{arr[currArr]}</div>
      <button onClick={plus}>&gt;</button>
    </div>
  );
}

export default Selector;
