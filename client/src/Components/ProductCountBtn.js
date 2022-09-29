import React from "react";
import styled from "styled-components";

function ProductCountBtn({ purchasesCount, setPurchasesCount, productCount }) {
  return (
    <Div>
      <Button
        onClick={() => {
          if (purchasesCount === 1) return;
          setPurchasesCount(parseInt(purchasesCount, 10) - 1);
        }}
      >
        -
      </Button>

      <Count>{purchasesCount}</Count>

      <Button
        onClick={() => {
          if (productCount === 0) return;
          if (purchasesCount === productCount) return;
          setPurchasesCount(parseInt(purchasesCount, 10) + 1);
        }}
      >
        +
      </Button>
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.5rem;
  font-size: 1rem;
`;

const Count = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 2.5rem;
  height: 2.5rem;
  margin-right: 5px;
  margin-left: 5px;

  border: none;
  border: 1px solid rgb(189, 189, 189);
  border-radius: 5px;
`;

const Button = styled.button`
  width: 2rem;
  height: 2em;
  border: none;
  border-radius: 5px;
  background-color: rgba(255, 166, 0, 0.3);

  &:hover {
    background-color: rgba(255, 166, 0, 0.6);
    cursor: pointer;
  }
`;

export default React.memo(ProductCountBtn);
