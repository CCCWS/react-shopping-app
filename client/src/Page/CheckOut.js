import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";

import PaymentBtn from "../Components/PaymentBtn";
import Modal from "../Components/Modal";
import Selector from "../Components/Selector";
import "./CheckOut.css";
import { postUrl } from "../PostUrl";

function CheckOut() {
  const nav = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [ShippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    searchAddress: "",
    address: "",
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

      case "address":
        setShippingInfo({ ...ShippingInfo, address: e.target.value });
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
    setLoading(true);

    if (state.cart === true) {
      const cartArr = [];
      state.product.forEach((data) => cartArr.push(data._id));
      const res = await axios.post("/api/user/removeCart", { cartArr });
    } //만약 카트 페이지에서 들어왔다면 카트의 목록 제거

    const res = await axios.post("/api/user/successBuy", {
      shippingInfo: ShippingInfo,
      product: state.product,
      payment: payment,
      // purchasesCount: purchasesCount,
      price: state.totalPrice,
      date: new Date().getTime(),
    });

    nav("/paymentResult", {
      state: {
        shippingInfo: ShippingInfo,
        product: state.product,
        // payment: payment,
        price: state.totalPrice,
        date: new Date().getTime(),
      },
    });

    setLoading(false);
  };

  const productsold = async () => {
    const option = [];

    state.product.forEach((data) =>
      option.push({
        id: data._id,
        purchasesCount: data.purchasesCount,
      })
    );

    for (let i = 0; i < option.length; i++) {
      const res = await axios.post("/api/product/successBuy", option[i]);
    }
  };

  const onPayment = () => {
    productsold();
    paymentSeccess();
  };

  const onAddress = (data) => {
    setModalOpen(false);

    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setShippingInfo({ ...ShippingInfo, searchAddress: fullAddress });
  };

  return (
    <div className="page">
      <Modal
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        CheckOut={true}
        setState={onAddress}
      />

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
                    backgroundImage: `url('${postUrl}${data.image[0].name}')`,
                  }}
                  className="purchase-img"
                />
                <div className="purchase-card-title">
                  {data.title.length > 20
                    ? `${data.title.slice(0, 20)}...`
                    : `${data.title}`}
                </div>
              </div>

              <div className="purchase-card-price">{`${data.purchasesCount}개 
               ∙ 
              ${parseInt(data.totalPrice, 10).toLocaleString()}원`}</div>
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
            type="tel"
            className="Upload-price"
            value={state.phone}
            onChange={saveData}
            id="phone"
            placeholder="전화번호를 입력해 주세요."
          />
        </section>

        <section className="Upload-section">
          <div>주소</div>
          <div className="Upload-section-address">
            <div onClick={() => setModalOpen(true)}>
              {ShippingInfo.searchAddress.length > 0
                ? ShippingInfo.searchAddress
                : "주소 검색"}
            </div>
            <input
              className="Upload-title"
              value={state.address}
              onChange={saveData}
              id="address"
              placeholder="추가 주소를 입력해 주세요."
            />
          </div>
        </section>

        <section className="Upload-section">
          <div>요청사항</div>
          <input
            className="Upload-title"
            value={state.req}
            onChange={saveData}
            id="req"
            placeholder="요청사항을 입력해 주세요."
            maxLength={40}
          />
          <span>{`${ShippingInfo.req.length} / 40`}</span>
        </section>
      </div>

      <div className="checkOut-section">
        <div>결제수단</div>
        <hr />
        <Selector />
        <button onClick={onPayment}>결제하기</button>
        <div className="checkOut-totalPrice">{`총 결제금액 ${state.totalPrice.toLocaleString()}원`}</div>
        {/* <PaymentBtn
          price={state.totalPrice}
          paymentSeccess={paymentSeccess}
          productsold={productsold}
        /> */}
      </div>

      {loading === true ? (
        <div className="checkOut-loading">
          <LoadingOutlined /> 결제중입니다.
        </div>
      ) : null}
    </div>
  );
}

export default CheckOut;
