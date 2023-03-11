import React from "react";
import { Skeleton } from "antd";
import styled from "styled-components";

import FadeAnimation from "../../Components/Utility/Animation/FadeAnimation";
import Loading from "../../Components/Utility/Loading";
import ProductCard from "../../Components/Product/ProductCard";

const ProductInfo = ({
  writerLoading,
  productWriter,
  product,
  time,
  otherProduct,
  otherLoading,
}) => {
  return (
    <>
      <FadeAnimation>
        <Writer>
          {writerLoading ? (
            <Skeleton.Button />
          ) : (
            <>
              <div>{productWriter.name}</div>
              <div>{productWriter.email}</div>
            </>
          )}
        </Writer>
      </FadeAnimation>

      <FadeAnimation>
        <Info>
          <div>{product.title}</div>
          <div>{`${product.category} ∙ ${time} ∙ 남은수량 ${product.count}개 ∙ 조회수 ${product.views} `}</div>
          <hr />
          <div>{product.description}</div>
        </Info>
      </FadeAnimation>

      {otherProduct && otherProduct.length > 0 && (
        <FadeAnimation>
          <OtherProduct>
            <strong>관련 상품</strong>
          </OtherProduct>
          {otherLoading ? (
            <Loading />
          ) : (
            <ProductCardDiv>
              {otherProduct.map((data, index) => (
                <ProductCard key={index} data={data} viewType={true} />
              ))}
            </ProductCardDiv>
          )}
        </FadeAnimation>
      )}
    </>
  );
};

const Writer = styled.div`
  font-size: 1.2rem;
  padding: 0.8rem;

  & > :nth-child(2) {
    font-size: 1rem;
    color: rgb(170, 170, 170);
  }
`;

const Info = styled.div`
  margin-bottom: 50px;
  & > :first-child {
    //제품명
    padding: 0.8rem;
    font-size: 1.5rem;
    font-weight: 600;
    background-color: rgb(255, 237, 179, 0.5);
    border-radius: 5px;
  }

  & > :nth-child(2) {
    //기타 정보
    font-size: 0.8rem;
    color: rgb(170, 170, 170);
    padding: 0.8rem;
  }

  & > :last-child {
    //제품 설명
    padding: 0.8rem;
    font-size: 1rem;
    line-height: 2rem;
    margin-bottom: 1rem;
    white-space: pre;
  }
`;

const OtherProduct = styled.div`
  padding: 0.8rem;
  font-size: 1.2rem;
`;

const ProductCardDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 5rem;
`;

export default React.memo(ProductInfo);
