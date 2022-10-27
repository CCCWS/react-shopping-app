import React from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "antd";
import styled from "styled-components";

import Footer from "./Footer";
import ProductCountBtn from "../Product/ProductCountBtn";

const FooterDetailPage = ({
  product,
  purchasesCount,
  setPurchasesCount,
  userId,
  productWriter,
  onAddCartProduct,
  goCheckOut,
  writerLoading,
}) => {
  const nav = useNavigate();

  return (
    <Footer>
      <Price>
        <div>
          {`${parseInt(product.price * purchasesCount, 10).toLocaleString()}원`}
        </div>

        <ProductCountBtn
          purchasesCount={purchasesCount}
          setPurchasesCount={setPurchasesCount}
          productCount={product.count}
        />
      </Price>

      <ButtonBox>
        {!writerLoading ? (
          <>
            {userId === productWriter._id ? (
              <Button
                btnType="edit"
                onClick={() =>
                  nav(`/edit/${product._id}`, {
                    state: { id: product._id },
                  })
                }
              >
                수정하기
              </Button>
            ) : (
              <>
                <Button btnType="cart" onClick={onAddCartProduct}>
                  장바구니
                </Button>

                <Button btnType="purchases" onClick={goCheckOut}>
                  구매하기
                </Button>
              </>
            )}
          </>
        ) : (
          <Skeleton.Button />
        )}
      </ButtonBox>
    </Footer>
  );
};

const Price = styled.div`
  margin-left: 1rem;
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  align-items: center;

  @media (max-width: 500px) {
    font-size: 1.5rem;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  border-radius: 5px;
  border: 2px solid var(--gray_transparency);
  margin-right: 0.5rem;
  /* @media (max-width: 550px) {
    position: fixed;
    bottom: 0px;
    right: 0;
    z-index: 0;
    flex-direction: column;
  } */
`;

const Button = styled.button`
  font-size: 1.2rem;
  border: none;
  padding: 0.5rem;

  background-color: ${(props) => props.btnType === "edit" && "var(--green)"};
  background-color: ${(props) => props.btnType === "cart" && "var(--green);"};
  background-color: ${(props) =>
    props.btnType === "purchases" && "var(--red_transparency)"};

  cursor: pointer;

  /* @media (max-width: 500px) {
    font-size: 1.2rem;
  } */
`;

export default FooterDetailPage;
