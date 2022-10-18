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
  const component = () => {
    return (
      <>
        <Price>
          <div>
            {`${parseInt(
              product.price * purchasesCount,
              10
            ).toLocaleString()}원`}
          </div>

          <ProductCountBtn
            purchasesCount={purchasesCount}
            setPurchasesCount={setPurchasesCount}
            productCount={product.count}
            detail={true}
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
      </>
    );
  };

  return <Footer component={component} />;
};

const Price = styled.div`
  margin-left: 1rem;
  font-size: 1.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
`;

const ButtonBox = styled.div`
  display: flex;

  @media (max-width: 550px) {
    position: fixed;
    bottom: 0px;
    right: 0;
    z-index: 0;
    flex-direction: column;
  }
`;

const Button = styled.button`
  margin-right: 1rem;
  font-size: 1.3rem;
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 5px;
  padding: 0.5rem;

  background-color: ${(props) =>
    props.btnType === "edit" && "rgba(62, 172, 62, 0.8)"};
  background-color: ${(props) =>
    props.btnType === "cart" && "rgb(248, 206, 189);"};
  background-color: ${(props) =>
    props.btnType === "purchases" && "rgb(255, 48, 48)"};

  cursor: pointer;
  color: black;
  margin-bottom: 5px;
`;

export default FooterDetailPage;
