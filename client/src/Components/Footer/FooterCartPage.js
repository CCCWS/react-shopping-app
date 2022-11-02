import React from "react";
import styled from "styled-components";

import Footer from "./Footer";

const FooterCartPage = ({ checkProductLength, totalPrice, goCheckOut }) => {
  return (
    <Footer>
      <Price>
        {`${checkProductLength}개 상품 ∙ ${totalPrice.toLocaleString()}원`}
      </Price>

      <Button checkProductLength={checkProductLength}>
        <button onClick={goCheckOut}>구매하기</button>
      </Button>
    </Footer>
  );
};

const Price = styled.div`
  margin-left: 0.8rem;
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;

  @media (max-width: 500px) {
    font-size: 1.3rem;
  }
`;

const Button = styled.div`
  display: flex;
  flex-direction: column;

  button {
    margin-right: 10px;
    font-size: 1.5rem;
    border: none;
    border-radius: 5px;
    padding: 0.5rem;
    background-color: ${(props) =>
      props.checkProductLength > 0 ? "var(--red_transparency)" : "var(--gray)"};
    color: white;
    cursor: pointer;
  }
`;

export default React.memo(FooterCartPage);
