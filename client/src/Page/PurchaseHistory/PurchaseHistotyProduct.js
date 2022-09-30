import React from "react";
import styled from "styled-components";

import PurchaseHistotyProductList from "./PurchaseHistotyProductList";

const PurchaseHistotyProduct = ({ product, onShippingInfo }) => {
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
    <Test>
      {product.map((data) => (
        <Product key={data.date}>
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
      ))}
    </Test>
  );
};

const Test = styled.div`
  padding: 2vmin;
`;

const Product = styled.div`
  display: flex;
  background-color: rgba(205, 205, 205, 0.1);
  box-shadow: 0px 0px 10px 5px rgba(255, 207, 118, 0.3);
  margin-bottom: 4rem;
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
    color: rgba(151, 151, 151, 0.904);
  }

  & > :nth-child(3) {
    //결제 금액
    font-weight: 700;
  }
`;

export default React.memo(PurchaseHistotyProduct);
