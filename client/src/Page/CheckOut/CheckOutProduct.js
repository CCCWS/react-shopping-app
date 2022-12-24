import React from "react";
import styled from "styled-components";
import {
  Card,
  Image,
  Title,
  Price,
  Count,
} from "../../Components/Style/ProductCard";

import { postUrl } from "../../PostUrl";

const CheckOutProduct = ({ state }) => {
  return (
    <List>
      {state.product.map((data) => (
        <Card key={data._id}>
          <Div>
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
`;

const NewImage = styled(Image)`
  min-width: 120px;
  height: 100%;
  margin-right: 0.5rem;
  border-radius: 5px;
`;

const CountAndPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-items: flex-end;

  min-width: 5rem;
  font-size: 1rem;
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: auto;
`;

export default React.memo(CheckOutProduct);
