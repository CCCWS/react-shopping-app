import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import newAxios from "../../productionCheck";

import useTheme from "../../hooks/useTheme";

import ProductCountBtn from "../../Components/Product/ProductCountBtn";
import ModalBase from "../../Components/Modal/ModalBase";

import { Image, Title, Price } from "../../Components/Style/ProductCard";

import { postUrl } from "../../PostUrl";

import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../../store/reducer/cart";
import useModal from "../../hooks/useModal";

const CartProduct = ({ product, userCartList, userId }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { darkMode } = useTheme();

  const { openModal, contents, setOpenModal, setContents } = useModal();
  const checkProduct = useSelector((state) => state.cart.checkProduct);

  const onChangeCountPlus = async () => {
    //유저 장바구니 정보에서 해당 상품의 수량을 증가
    for (let i of userCartList) {
      if (i.id === product._id) {
        i.purchasesCount = product.purchasesCount + 1;
      }
    }

    dispatch(
      cartAction.onIncreaseCartCount({
        product: product,
        userCartList: userCartList,
        userId: userId,
      })
    );
  };

  //장바구니 상품 수량 감소
  const onChangeCountMinus = async () => {
    for (let i of userCartList) {
      if (i.id === product._id) {
        i.purchasesCount = product.purchasesCount - 1;
      }
    }

    dispatch(
      cartAction.onDecreaseCartCount({
        product: product,
        userCartList: userCartList,
        userId: userId,
      })
    );
  };

  //하나의 상품 삭제
  const onDelProduct = (id) => {
    const delFunc = async () => {
      //전체 삭제시 id를 배열에 담아서 보내주었기 때문에 하나의 상품도 배열에 담아서 전송
      await newAxios.post("/api/user/removeCart", {
        productId: [id],
        userId: userId,
      });

      dispatch(cartAction.onRemoveCart([id]));
    };

    setOpenModal(true);
    setContents({
      title: "장바구니 삭제",
      message: `상품을 삭제합니다.`,
      delFunc: delFunc,
      cartPage: true,
    });
  };

  //하나의 상품 체크
  const onCheckProduct = (product) => {
    dispatch(cartAction.onAddCheckProduct(product));
  };

  return (
    <>
      <ModalBase
        contents={contents}
        modalOpen={openModal}
        setModalOpen={setOpenModal}
      />

      <ProductCard
        darkMode={darkMode}
        purchasesFail={product.count < product.purchasesCount && true}
      >
        <div>
          <ProductCheckBox
            productCheck={checkProduct.find((data) => data._id === product._id)}
            onClick={() => onCheckProduct(product)}
          >
            <CheckOutlined />
          </ProductCheckBox>

          <NewImage
            img={`url('${postUrl}${product.image[0]}')`}
            onClick={() => nav(`/product/${product._id}`)}
          />

          <ProductTitle>
            <Title>{`${product.title}`}</Title>
            <Price>{`${parseInt(
              product.price * product.purchasesCount,
              10
            ).toLocaleString()}원`}</Price>

            <ProductCountBtn
              onChangeCountPlus={onChangeCountPlus}
              onChangeCountMinus={onChangeCountMinus}
              productCount={product.count}
              purchasesCount={product.purchasesCount}
              cart={true}
            />
          </ProductTitle>
        </div>

        <ProductCheckBox onClick={() => onDelProduct(product._id)}>
          <CloseOutlined />
        </ProductCheckBox>
      </ProductCard>
    </>
  );
};

const ProductCard = styled.div`
  background-color: ${(props) =>
    props.darkMode ? "var(--black)" : "var(--white)"};
  box-shadow: 5px 5px 10px 3px var(--gray_transparency);
  width: 49%;
  height: 12rem;
  margin-bottom: 2rem;
  padding: 0.5rem;
  border-radius: 5px;
  position: relative;

  display: flex;
  justify-content: space-between;

  & > :first-child {
    display: flex;
  }

  @media (max-width: 800px) {
    width: 100%;
  }

  ${(props) =>
    props.purchasesFail &&
    css`
      &::before {
        content: "구매가 불가능합니다.";
        font-size: 1rem;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        background-color: var(--gray_transparency2);
        color: var(--white);
        left: 0;
        top: 0;
      }
    `}
`;

const ProductCheckBox = styled.div`
  background-color: ${(props) =>
    props.productCheck ? "var(--red_transparency)" : "transparent"};
  border: 1px solid var(--gray);
  border-radius: 5px;
  font-size: 1rem;
  min-width: 2rem;
  height: 2rem;
  margin-right: 5px;
  z-index: 2;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: all ease 0.3s;

  :hover {
    cursor: pointer;
    background-color: var(--red_transparency);
  }
`;

const NewImage = styled(Image)`
  min-width: 8rem;
  height: 100%;

  border-radius: 5px;
  margin-right: 10px;

  cursor: pointer;
`;

const ProductTitle = styled.div`
  font-size: 1rem;
`;

export default React.memo(CartProduct);
