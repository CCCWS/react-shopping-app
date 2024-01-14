import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

import useTheme from "../../hooks/useTheme";
import { Title, Image, Price, Time, Count } from "../Style/ProductCard";
import getTime from "../../hooks/getTime";
import useObserver from "../../hooks/useObserver";

const ProductCard = ({ data, viewType }) => {
  const nav = useNavigate();
  const { darkMode } = useTheme();
  const productRef = useRef(null);
  const { isView } = useObserver(productRef, 0.3, true);

  return (
    <CardDiv
      viewType={viewType}
      isView={isView}
      onClick={() => {
        nav(`/product/${data._id}`);
      }}
      ref={productRef}
    >
      <ImageBox soldOut={data.count === 0 && true}>
        {isView ? (
          <ProductImg
            viewType={viewType}
            src={data.image[0]}
            alt={data.title}
          />
        ) : (
          <ImageLoading></ImageLoading>
        )}
      </ImageBox>

      <Info viewType={viewType}>
        <Title darkMode={darkMode}>{data.title}</Title>

        <TimeAndPrice viewType={viewType}>
          <Price>{`${parseInt(data.price, 10).toLocaleString()}원`}</Price>
          <Time>{getTime(data.createdAt)}</Time>
        </TimeAndPrice>
        <Count>{`남은 수량 ${data.count}개`}</Count>
      </Info>
    </CardDiv>
  );
};

const ImageBox = styled.div`
  width: 100%;
  height: 100%;

  overflow: hidden;
  position: relative;

  border-radius: 10px;
  transition: all cubic-bezier(0, -0.16, 1, 1.9) 0.3s;

  ${(props) =>
    props.soldOut &&
    css`
      &::before {
        content: "판매완료된 상품입니다.";
        font-size: 1rem;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;

        border-radius: inherit;
        z-index: 1;
        background-color: var(--gray_transparency2);
        color: var(--white);
      }
    `}
`;

const CardDiv = styled.div`
  width: ${(props) => (props.viewType ? "25%" : "100%")};
  height: ${(props) => (props.viewType ? "300px" : "300px")};

  transition: 0.5s;
  transform: ${(props) =>
    props.isView ? "translateY(0px)" : "translateY(50px)"};
  opacity: ${(props) => (props.isView ? 1 : 0)};

  display: grid;
  grid-template-rows: 60% 20% 20%;
  gap: 10px 0px;

  ${(props) =>
    !props.viewType &&
    css`
      grid-template-rows: 1fr;
      grid-template-columns: 50% 50%;
    `}

  ${(props) =>
    props.viewType &&
    css`
      @media (max-width: 800px) {
        width: 33%;
      }

      @media (max-width: 650px) {
        width: 50%;
      }

      @media (max-width: 340px) {
        width: 100%;
      }
    `};

  &:hover {
    cursor: pointer;
    ${ImageBox} {
      transform: scale(1.1);
    }
  }
`;

const ImageLoading = styled.div`
  width: 100%;
  height: 100%;
`;

const ProductImg = styled.img`
  width: 100%;
  height: 100%;

  position: absolute;
  object-fit: contain;
`;

const Info = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-weight: 600;
`;

const TimeAndPrice = styled.div`
  display: flex;
  justify-content: space-between;

  ${(props) =>
    !props.viewType &&
    css`
      flex-direction: column;
    `};
`;

export default React.memo(ProductCard);
