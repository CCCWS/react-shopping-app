import React from "react";
import Zoom from "react-reveal/Fade";
import { Skeleton } from "antd";
import styled from "styled-components";

import Loading from "../../Components/Loading";
import ProductCard from "../../Components/ProductCard";

const ProductInfo = ({
  writerLoading,
  productWriter,
  product,
  time,
  otherProduct,
  otherLoading,
}) => {
  return (
    <Zoom>
      <>
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

        <Info>
          <div>{product.title}</div>
          <div>{`${product.category} ∙ ${time} ∙ 남은수량 ${product.count}개 ∙ 조회수 ${product.views} `}</div>
          <hr />
          <div>{product.description}</div>
        </Info>

        {otherProduct && otherProduct.length > 0 && (
          <>
            <OtherProduct>관련 상품</OtherProduct>
            {otherLoading ? (
              <Loading />
            ) : (
              <ProductCard data={otherProduct} viewType={true} />
            )}
          </>
        )}
      </>
    </Zoom>
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
  }
`;

const OtherProduct = styled.div`
  padding: 0.8rem;
  font-size: 1.2rem;
`;

export default React.memo(ProductInfo);
