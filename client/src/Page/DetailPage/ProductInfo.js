import React from "react";
import Fade from "react-reveal/Fade";
// import Spin from "react-reveal/Spin";
// import Flip from "react-reveal/Flip";
import { Skeleton } from "antd";
import styled from "styled-components";

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
      <Fade bottom>
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
      </Fade>

      <Fade bottom>
        <Info>
          <div>{product.title}</div>
          <div>{`${product.category} ∙ ${time} ∙ 남은수량 ${product.count}개 ∙ 조회수 ${product.views} `}</div>
          <hr />
          <div>{product.description}</div>
        </Info>
      </Fade>

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
