import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { postUrl } from "../../PostUrl";

const PurchaseHistotyProductList = ({ data }) => {
  const nav = useNavigate();
  return (
    <List>
      {data.product.map((data) => (
        <Card key={data._id}>
          <ImgAndTitle
            img={`url('${postUrl}${data.image[0].name}')`}
            onClick={() => {
              nav(`/product/${data._id}`);
            }}
          >
            <div />
            <div>
              {/* {data.title.length > 15
                      ? `${data.title.slice(0, 15)}...`
                      : `${data.title}`} */}
              {data.title}
            </div>
          </ImgAndTitle>

          <CountAndPrice>
            <div>{data.purchasesCount}개</div>
            <div>{parseInt(data.totalPrice, 10).toLocaleString()}원</div>
          </CountAndPrice>
        </Card>
      ))}
    </List>
  );
};

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: auto;
`;

const Card = styled.div`
  min-height: 8rem;
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
`;

const ImgAndTitle = styled.div`
  display: flex;

  &:hover {
    cursor: pointer;
  }

  & > :first-child {
    //상품 이미지
    background-image: ${(props) => props.img};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    min-width: 100px;
    height: 100%;

    border-radius: 5px;
    margin-right: 0.5rem;
  }

  & > :last-child {
    //상품명
    font-weight: 600;
    font-size: 1rem;
    white-space: normal;
  }
`;

const CountAndPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-items: flex-end;

  min-width: 5rem;
  font-size: 0.8rem;
`;

export default PurchaseHistotyProductList;
