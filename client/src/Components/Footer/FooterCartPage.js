import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ModalBase from "../Modal/ModalBase";
import useModal from "../../hooks/useModal";

import Footer from "./Footer";

const FooterCartPage = () => {
  const nav = useNavigate();
  const { openModal, contents, setOpenModal, setContents } = useModal();
  const checkProduct = useSelector((state) => state.cart.checkProduct);
  const totalCount = useSelector((state) => state.cart.totalCount);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  //주문서 작성 페이지로 이동
  const goCheckOut = () => {
    //구매 선택한 상품이 없다면 이동 불가
    if (checkProduct.length === 0) return;

    let possible = true;

    //구매 가능 확인
    checkProduct.forEach((data) => {
      if (data.count < data.purchasesCount) {
        possible = false;
        setOpenModal(true);
        setContents({
          title: "구매 불가.",
          message: `수량이 부족한 상품이 포함되어 있습니다.`,
        });
      }
    });
    if (!possible) return;

    nav("/checkOut", {
      state: { product: checkProduct, totalPrice: totalPrice, cart: true },
    });
  };

  return (
    <>
      <ModalBase
        contents={contents}
        modalOpen={openModal}
        setModalOpen={setOpenModal}
      />
      <Footer>
        <Price>
          {`${totalCount}개 상품 ∙ ${totalPrice.toLocaleString()}원`}
        </Price>

        <Button checkProductLength={checkProduct.length}>
          <button onClick={goCheckOut}>구매하기</button>
        </Button>
      </Footer>
    </>
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
