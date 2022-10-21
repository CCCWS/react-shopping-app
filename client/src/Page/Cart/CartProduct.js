import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import useTheme from "../../hooks/useTheme";

import { Image, Title, Price, Count } from "../../Components/Style/ProductCard";

import { postUrl } from "../../PostUrl";

const CartProduct = ({
  product,
  checkProduct,
  onCheckProduct,
  onDelProduct,
}) => {
  const nav = useNavigate();
  const { darkMode } = useTheme();
  return (
    <>
      {product.map((data, index) => (
        <ProductCard key={index} darkMode={darkMode}>
          <div>
            <ProductCheckBox
              productCheck={
                checkProduct.find((item) => item._id === data._id) !==
                  undefined && true
              }
              onClick={() => onCheckProduct(data)}
            >
              <CheckOutlined />
            </ProductCheckBox>

            <NewImage
              img={`url('${postUrl}${data.image[0].name}')`}
              onClick={() => nav(`/product/${data._id}`)}
            />

            <ProductTitle onClick={() => nav(`/product/${data._id}`)}>
              <Title>{`${data.title}`}</Title>
              <Price>{`${parseInt(
                data.price * data.purchasesCount,
                10
              ).toLocaleString()}원`}</Price>
              <Count>{data.purchasesCount}개</Count>
            </ProductTitle>
          </div>

          <ProductCheckBox onClick={() => onDelProduct(data._id)}>
            <CloseOutlined />
          </ProductCheckBox>
        </ProductCard>
      ))}
    </>
  );
};

const ProductCard = styled.div`
  background-color: ${(props) =>
    props.darkMode ? "var(--black)" : "var(--white)"};
  box-shadow: 5px 5px 10px 3px var(--gray_transparency);
  width: 49%;
  height: 11rem;
  margin-bottom: 2rem;
  padding: 0.5rem;
  border-radius: 5px;

  display: flex;
  justify-content: space-between;

  & > :first-child {
    display: flex;
  }

  @media (max-width: 800px) {
    width: 100%;
  }
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
  cursor: pointer;
  font-size: 1rem;
`;

export default React.memo(CartProduct);
