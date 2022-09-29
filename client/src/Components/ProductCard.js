import React from "react";
import { useNavigate } from "react-router-dom";
import Zoom from "react-reveal/Fade";
import withReveal from "react-reveal/withReveal";
import styled, { css } from "styled-components";

import { postUrl } from "../PostUrl";
import getTime from "../hooks/getTime";

function ProductCard({ data, viewType }) {
  const nav = useNavigate();

  return (
    <ProductCardDiv>
      {data.map((data, index) => (
        <CardDiv key={index} viewType={viewType}>
          <Card
            viewType={viewType}
            id={data._id}
            onClick={() => {
              nav(`/product/${data._id}`);
            }}
            img={`url('${postUrl}${data.image[0].name}')`}
          >
            <div>
              {data.count === 0 ? (
                <SoldOut>판매완료된 상품입니다.</SoldOut>
              ) : null}
            </div>

            <Info viewType={viewType}>
              <div>
                {viewType ? (
                  <>
                    {/* {data.title.length > 11
                      ? `${data.title.slice(0, 11)}...`
                      : `${data.title}`} */}
                    {data.title}
                  </>
                ) : (
                  `${data.title}`
                )}
              </div>

              <TimeAndPrice viewType={viewType}>
                <div>{`${parseInt(data.price, 10).toLocaleString()}원`}</div>
                <div>{getTime(data.createdAt)}</div>
              </TimeAndPrice>
              <Count>{`남은 수량 ${data.count}개`}</Count>
            </Info>
          </Card>
        </CardDiv>
      ))}
    </ProductCardDiv>
  );
}

const ProductCardDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const CardDiv = styled.div`
  margin-bottom: 1rem;
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

const Card = withReveal(
  styled.div`
    //상품 카드의 크기
    /* background-color: red; */
    margin: auto;
    margin-bottom: ${(props) => (props.viewType ? "6rem" : "1rem")};
    width: ${(props) => (props.viewType ? "90%" : "100%")};
    height: ${(props) => (props.viewType ? "20rem" : "15rem")};
    border-radius: 5px;
    /* box-shadow: 1px 1px 3px 1px rgba(128, 128, 128, 0.507);
    border: 3px solid transparent; */

    &:hover {
      cursor: pointer;
      /* border: 3px solid orange;
      transition: all ease 0.5s; */
    }

    //이미지
    & > :first-child {
      background-image: ${(props) => props.img};
      width: ${(props) => (props.viewType ? "100%" : "40%")};
      height: ${(props) => (props.viewType ? "70%" : "100%")};
      border-radius: 5px;
      background-size: ${(props) => (props.viewType ? "120%" : "90%")};
      background-position: center;
      background-repeat: no-repeat;
      transition: 0.2s;
      position: relative;
    }

    &:hover > :first-child {
      background-size: ${(props) => (props.viewType ? "130%" : "100%")};
    }

    //viewType가 list일 경우 적용
    ${(props) =>
      !props.viewType &&
      css`
        display: flex;
        justify-content: center;
        flex-direction: row;
      `}
  `,
  <Zoom />
);

const SoldOut = styled.div`
  background-color: rgba(0, 0, 0, 0.479);
  width: 100%;
  height: 100%;
  border-radius: 5px;

  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
`;

const Info = styled.div`
  width: ${(props) => (props.viewType ? "100%" : "50%")};
  padding: ${(props) => (props.viewType ? "10px" : "0px 10px 0px 10px")};
  height: ${(props) => (props.viewType ? "30%" : "100%")};

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 5px;
  font-weight: 600;

  //상품명
  & > :first-child {
    border-bottom: 2px solid black;
    padding-bottom: 1px;
    font-size: 1.1rem;
    margin-bottom: 5px;
    white-space: normal;
  }
`;

const TimeAndPrice = styled.div`
  color: rgba(255, 0, 0, 0.644);
  font-size: 1rem;
  display: flex;
  justify-content: space-between;

  //등록 시간
  & > :nth-child(2) {
    font-size: 0.9rem;
    color: rgb(165, 165, 165);
  }

  ${(props) =>
    !props.viewType &&
    css`
      flex-direction: column;
    `};
`;

const Count = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  margin-top: 3px;
  color: rgb(165, 165, 165);
`;

export default React.memo(ProductCard);
