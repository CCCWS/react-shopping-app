import React from "react";
import styled from "styled-components";

import PurchaseHistotyProductList from "./PurchaseHistotyProductList";
import FadeAnimation from "../../Components/Utility/Animation/FadeAnimation";

const PurchaseHistotyProduct = ({ product, onShippingInfo, darkMode }) => {
  const productDate = (data) => {
    const year = new Date(data.date).getFullYear();
    const month = new Date(data.date).getMonth();
    const date = new Date(data.date).getDate();
    return `${year}.${month + 1}.${date}`;
  };

  const productTime = (data) => {
    const year = new Date(data.date).getHours();
    const month = new Date(data.date).getMinutes();
    return `${year}시 ${month}분 `;
  };

  return (
    <Div>
      {product.map((data) => (
        <FadeAnimation key={data.date}>
          <Product darkMode={darkMode}>
            <Info>
              <Value>
                <div>{productDate(data)}</div>
                <div>{productTime(data)}</div>
                <div>{`결제금액 ${data.price.toLocaleString()}원`}</div>
              </Value>

              <div
                onClick={() => {
                  onShippingInfo(data.shippingInfo);
                }}
              >
                배송정보
              </div>
            </Info>

            <PurchaseHistotyProductList data={data} />
          </Product>
        </FadeAnimation>
      ))}
    </Div>
  );
};

const Div = styled.div`
  padding: 0.5rem;
`;

const Product = styled.div`
  display: flex;
  background-color: ${(props) =>
    props.darkMode ? "var(--black)" : "var(--white)"};
  box-shadow: 5px 5px 10px 3px var(--gray_transparency);
  margin-bottom: 2rem;
  border-radius: 5px;
  padding: 0.5rem;

  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 250px;
  font-size: 1rem;
  padding: 0.5rem;

  & > :nth-child(2) {
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      font-weight: 600;
    }
  }

  @media (max-width: 800px) {
    width: 100%;
    flex-direction: row;
  }
`;

const Value = styled.div`
  font-size: 1rem;

  & > :nth-child(2) {
    //결제 시간
    color: var(--gray);
  }

  & > :nth-child(3) {
    //결제 금액
    font-weight: 700;
  }
`;

export default React.memo(PurchaseHistotyProduct);
