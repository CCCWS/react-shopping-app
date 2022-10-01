import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import {
  Card,
  ImgAndTitle,
  CountAndPrice,
  List,
} from "../../Components/style/ProductCard";

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

export default PurchaseHistotyProductList;
