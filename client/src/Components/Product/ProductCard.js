import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

import FadeAnimation from "../Utility/Animation/FadeAnimation";

import useTheme from "../../hooks/useTheme";

import { postUrl } from "../../PostUrl";
import { Title, Image, Price, Time, Count } from "../Style/ProductCard";
import getTime from "../../hooks/getTime";

function ProductCard({ data, viewType }) {
  const nav = useNavigate();
  const { darkMode } = useTheme();

  return (
    <ProductCardDiv>
      {data.map((data, index) => (
        <CardDiv key={index} viewType={viewType}>
          <FadeAnimation>
            <Card
              viewType={viewType}
              id={data._id}
              onClick={() => {
                nav(`/product/${data._id}`);
              }}
            >
              <NewImage
                viewType={viewType}
                img={`url('${postUrl}${data.image[0]}')`}
                soldOut={data.count === 0 && true}
              />

              <Info viewType={viewType}>
                <Title darkMode={darkMode}>{data.title}</Title>

                <TimeAndPrice viewType={viewType}>
                  <Price>{`${parseInt(
                    data.price,
                    10
                  ).toLocaleString()}원`}</Price>
                  <Time>{getTime(data.createdAt)}</Time>
                </TimeAndPrice>
                <Count>{`남은 수량 ${data.count}개`}</Count>
              </Info>
            </Card>
          </FadeAnimation>
        </CardDiv>
      ))}
    </ProductCardDiv>
  );
}

const ProductCardDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 5rem;
`;

const CardDiv = styled.div`
  width: ${(props) => (props.viewType ? "25%" : "100%")};

  ${(props) =>
    props.viewType &&
    css`
      @media (max-width: 800px) {
        width: 33%;
      }

      @media (max-width: 650px) {
        width: 50%;
      }
    `}
`;

const Card = styled.div`
  //상품 카드의 크기
  margin: auto;
  margin-bottom: ${(props) => (props.viewType ? "6rem" : "3rem")};
  width: ${(props) => (props.viewType ? "90%" : "100%")};
  height: ${(props) => (props.viewType ? "20rem" : "15rem")};
  border-radius: 5px;

  &:hover {
    cursor: pointer;
  }
  //viewType가 list일 경우 적용
  ${(props) =>
    !props.viewType &&
    css`
      display: flex;
      justify-content: center;
      flex-direction: row;
    `}
`;

const Info = styled.div`
  width: ${(props) => (props.viewType ? "100%" : "50%")};
  padding: ${(props) => (props.viewType ? "10px" : "0px 10px 0px 10px")};
  height: ${(props) => (props.viewType ? "30%" : "100%")};

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-weight: 600;
`;

const NewImage = styled(Image)`
  border-radius: 5px;
  background-size: ${(props) =>
    props.viewType ? "cover" : "cover"} !important;
  width: ${(props) => (props.viewType ? "100%" : "40%")};
  height: ${(props) => (props.viewType ? "70%" : "100%")};

  transition: all cubic-bezier(0, -0.16, 1, 1.9) 0.3s;
  position: relative;

  &:hover {
    transform: scale(1.1);
  }

  //품절시
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
