import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import { postUrl } from "../../PostUrl";

const CartProduct = ({
  product,
  checkProduct,
  onCheckProduct,
  onDelProduct,
}) => {
  const nav = useNavigate();
  return (
    <>
      {product.map((data, index) => (
        <ProductCard key={index}>
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

            <ProductImg
              image={`url('${postUrl}${data.image[0].name}')`}
              onClick={() => nav(`/product/${data._id}`)}
            />

            <ProductTitle onClick={() => nav(`/product/${data._id}`)}>
              <div>{`${data.title}`}</div>
              <div>{`${parseInt(
                data.price * data.purchasesCount,
                10
              ).toLocaleString()}원`}</div>
              <div>{data.purchasesCount}개</div>
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
  box-shadow: 1px 1px 3px 1px rgba(128, 128, 128, 0.507);
  width: 49%;
  height: 150px;
  margin-bottom: 20px;
  padding: 10px;
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
    props.productCheck ? " rgb(255, 118, 118)" : "transparent"};
  border: 1px solid rgb(156, 156, 156);
  font-size: 20px;
  width: 30px;
  height: 30px;
  margin-right: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: all ease 0.5s;

  :hover {
    cursor: pointer;
    background-color: rgb(255, 118, 118);
  }
`;

const ProductImg = styled.div`
  background-image: ${(props) => props.image};
  min-width: 8rem;
  height: 100%;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  border-radius: 5px;
  margin-right: 15px;

  cursor: pointer;
`;

const ProductTitle = styled.div`
  cursor: pointer;
  font-size: 1rem;

  //상품 이름
  & > :first-child {
    font-weight: 800;
    margin-bottom: 0.2rem;
  }

  //상품 가격
  & > :nth-child(2) {
    color: rgba(255, 0, 0, 0.5);
    font-weight: 600;
  }
`;

export default React.memo(CartProduct);
