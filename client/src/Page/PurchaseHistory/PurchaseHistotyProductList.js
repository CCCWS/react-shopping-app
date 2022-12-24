import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import {
  Card,
  Image,
  Title,
  Count,
  Price,
} from "../../Components/Style/ProductCard";

import { postUrl } from "../../PostUrl";

const PurchaseHistotyProductList = ({ data }) => {
  const nav = useNavigate();
  return (
    <List>
      {data.product.map((data) => (
        <Card key={data._id}>
          <Div
            onClick={() => {
              nav(`/product/${data._id}`);
            }}
          >
            <NewImage img={`url('${postUrl}${data.image[0]}')`} />
            <Title>{data.title}</Title>
          </Div>

          <CountAndPrice>
            <Count>{data.purchasesCount}개</Count>
            <Price>{parseInt(data.totalPrice, 10).toLocaleString()}원</Price>
          </CountAndPrice>
        </Card>
      ))}
    </List>
  );
};

const Div = styled.div`
  display: flex;
  cursor: pointer;
`;

const NewImage = styled(Image)`
  min-width: 8rem;
  height: 8rem;

  border-radius: 5px;
  margin-right: 0.5rem;
`;

const CountAndPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-items: flex-end;

  min-width: 5.5rem;
  font-size: 1rem;
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: auto;
`;

export default PurchaseHistotyProductList;
