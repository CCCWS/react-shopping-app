import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";

import PaymentBtn from "../../Components/Product/PaymentBtn";
import Selector from "../../Components/Utility/Selector";
import Carousel1 from "../../Components/Utility/Carousel1";
import CheckOutProduct from "./CheckOutProduct";
import CheckOutInput from "./CheckOutInput";
import FadeAnimation from "../../Components/Utility/Animation/FadeAnimation";

import useAxios from "../../hooks/useAxios";

function CheckOut({ userId }) {
  const nav = useNavigate();
  const { state } = useLocation(); //상품정보, 진입경로, 총합가격을 담은 데이터
  const [loading, setLoading] = useState(false);
  const [searchAddress, setSearchAddress] = useState("");

  const { connectServer: userSuccessBuy } = useAxios("/api/user/successBuy"); //유저정보에 구입내역을 추가
  const { connectServer: removeCart } = useAxios("/api/user/removeCart"); //장바구니에 있는 상품이라면 구매성공시 유저의 카트에서 해당상품 제거
  const { connectServer: productSuccessBuy } = useAxios(
    "/api/product/successBuy"
  ); //상품개수 변경

  const { connectServer: addBuyer } = useAxios("/api/user/addBuyer"); //상품을 동록한 유저의 데이터에 구매자 정보 추가

  const nameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const reqRef = useRef();

  console.log(state);

  useEffect(() => {
    if (state === null) {
      nav("/");
    }
  }, [nav, state]);

  //구매 성공시
  const paymentSeccess = (e, payment) => {
    if (nameRef.current.value < 1) {
      nameRef.current.focus();
      return alert("이름을 입력해주세요.");
    }

    if (phoneRef.current.value < 1) {
      phoneRef.current.focus();
      return alert("전화번호를 입력해주세요.");
    }

    if (searchAddress.length < 1) {
      return alert("주소를 입력해주세요.");
    }

    if (addressRef.current.value < 1) {
      addressRef.current.focus();
      return alert("추가 주소를 입력해주세요.");
    }

    setLoading(true);

    //만약 장바구니 페이지에서 접근했다면  장바구니 상품 제거
    if (state.cart === true) {
      const option = [];
      state.product.forEach((data) => option.push(data._id));
      removeCart({ productId: option, userId: userId });
    }

    const option = {
      userId: userId,
      shippingInfo: {
        name: nameRef.current.value,
        phone: phoneRef.current.value,
        address: addressRef.current.value,
        searchAddress: searchAddress,
        req: reqRef.current.value,
      },
      product: state.product,
      payment: payment && payment,
      price: state.totalPrice,
      date: new Date().getTime(),
    };

    userSuccessBuy(option);
    addBuyer(option);
    productsold();

    setTimeout(() => {
      setLoading(false);
      nav("/paymentResult", {
        state: option,
      });
    }, 2000);
  };

  //구매한 상품의 수량 변경
  const productsold = () => {
    const option = [];
    state.product.forEach((data) => {
      option.push({
        id: data._id,
        purchasesCount: data.purchasesCount,
      });
    });
    productSuccessBuy(option);
  };

  return (
    <div className="page">
      {loading === true ? (
        <CheckOutLoading>
          <LoadingOutlined /> 결제중입니다.
        </CheckOutLoading>
      ) : null}

      {state && (
        <>
          <FadeAnimation>
            <Procedure>
              장바구니 &gt; <strong>주문서</strong> &gt; 결제완료
            </Procedure>
          </FadeAnimation>

          <FadeAnimation>
            <Div>
              <Title>주문상품 {state.product.length}개</Title>
              <hr />
              <CheckOutProduct state={state} />
            </Div>
          </FadeAnimation>

          <FadeAnimation>
            <Div>
              <Title>주문정보</Title>
              <hr />
              <CheckOutInput
                ref={{
                  nameRef: nameRef,
                  phoneRef: phoneRef,
                  addressRef: addressRef,
                  reqRef: reqRef,
                }}
                searchAddress={searchAddress}
                setSearchAddress={setSearchAddress}
              />
            </Div>
          </FadeAnimation>

          <Div>
            <Title>결제수단</Title>
            <hr />

            <Carousel1
              height={"200px"}
              point={true}
              slide={true}
              nextBtn={true}
            >
              <CheckOutDiv>
                <PurchaseBtn onClick={paymentSeccess}>결제하기</PurchaseBtn>
              </CheckOutDiv>

              <CheckOutDiv>
                <PaymentBtn
                  price={state.totalPrice}
                  paymentSeccess={paymentSeccess}
                />
              </CheckOutDiv>
            </Carousel1>

            <ToTalPrice>{`총 결제금액 ${state.totalPrice.toLocaleString()}원`}</ToTalPrice>
          </Div>
        </>
      )}
    </div>
  );
}

const Div = styled.div`
  margin-bottom: 2.5rem;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  padding: 1rem;
`;

const Procedure = styled.div`
  font-size: 1rem;
  padding: 0.5rem;
`;

const PurchaseBtn = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.1rem;
  color: var(--red);
  background-color: var(--white);
  border-radius: 5px;
  border: 2px solid var(--orange_normal);
  padding: 0.3rem;
  width: 70%;

  &:hover {
    cursor: pointer;
    border: 2px solid var(--orange_hover);
  }
`;

const ToTalPrice = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
  width: 100%;
  font-size: 1.5rem;
  font-weight: 700;
`;

const CheckOutLoading = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 100;
  top: 0;
  right: 0;
  position: fixed;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  font-size: 2rem;
  font-weight: 600;

  backdrop-filter: blur(5px);
`;

const CheckOutDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default React.memo(CheckOut);
