import React from "react";
import {
  Card,
  ImgAndTitle,
  CountAndPrice,
  List,
} from "../../Components/style/ProductCard";

import { postUrl } from "../../PostUrl";

const CheckOutProduct = ({ state }) => {
  return (
    <List>
      {state.product.map((data) => (
        <Card key={data._id}>
          <ImgAndTitle img={`url('${postUrl}${data.image[0].name}')`}>
            <div />
            <div>
              {/* {data.title.length > 20
                  ? `${data.title.slice(0, 20)}...`
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

export default React.memo(CheckOutProduct);
