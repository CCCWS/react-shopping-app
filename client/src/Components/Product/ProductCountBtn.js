import React from "react";
import styled from "styled-components";

function ProductCountBtn({
  purchasesCount,
  setPurchasesCount,
  productCount,
  onChangeCountPlus,
  onChangeCountMinus,
  id,
  cart,
}) {
  return (
    <Div>
      <Button
        onClick={() => {
          if (purchasesCount === 1) return;
          if (cart) {
            onChangeCountMinus(id, purchasesCount);
          } else {
            setPurchasesCount(parseInt(purchasesCount, 10) - 1);
          }
        }}
      >
        -
      </Button>

      <Count>{purchasesCount}</Count>

      <Button
        onClick={() => {
          if (productCount === 0) return;
          if (purchasesCount === productCount) return;
          if (cart) {
            onChangeCountPlus(id, purchasesCount);
          } else {
            setPurchasesCount(parseInt(purchasesCount, 10) + 1);
          }
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

  width: 6rem;
  height: 2.2rem;
  font-size: 1rem;
  /* margin-left: 1rem; */

  border: 2px solid var(--gray_transparency);
  border-radius: 5px;
`;

const Count = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  border: none;
`;

const Button = styled.button`
  min-width: 30%;
  height: 100%;
  border: none;
  background-color: var(--gray_transparency);

  &:hover {
    background-color: var(--orange_hover);
    cursor: pointer;
  }
`;

export default React.memo(ProductCountBtn);
