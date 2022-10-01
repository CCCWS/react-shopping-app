import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Section } from "../Components/style/InputStyled";

function PaymentResult() {
  const nav = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state === null) {
      nav("/");
    }
  }, [nav, state]);

  return (
    <div className="page">
      <Procedure>
        장바구니 &gt; 주문서 &gt; <strong>결제완료</strong>
      </Procedure>

      <ToTalPrice>{`총 결제금액 ${parseInt(
        state.price,
        10
      ).toLocaleString()}원`}</ToTalPrice>

      <PageBtn>
        <button onClick={() => nav("/purchaseHistory")}>구매내역 조회</button>
        <button onClick={() => nav("/")}>쇼핑 계속하기</button>
      </PageBtn>

      <Title>배송 정보</Title>
      <hr />

      <Section>
        <div>이름</div>
        <div>{state.shippingInfo.name}</div>
      </Section>

      <Section>
        <div>연락처</div>
        <div>{state.shippingInfo.phone}</div>
      </Section>

      <Section>
        <div>주소</div>
        <div>{`${state.shippingInfo.searchAddress} ${state.shippingInfo.address}`}</div>
      </Section>

      <Section>
        <div>요구사항</div>
        <div>
          {state.shippingInfo.req.length === 0
            ? "없음"
            : state.shippingInfo.req}
        </div>
      </Section>
    </div>
  );
}

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  padding: 0.5rem;
`;

const Procedure = styled.div`
  font-size: 1rem;
  padding: 0.5rem;
`;

const ToTalPrice = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
  width: 100%;
  font-size: 1.5rem;
  font-weight: 700;
`;

const PageBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  & > :first-child {
    margin-right: 10px;
  }

  button {
    padding: 10px;
    border: 2px solid gray;
    width: 150px;
    font-size: 16px;
    margin-bottom: 20px;

    &:hover {
      cursor: pointer;
    }
  }
`;

export default PaymentResult;
