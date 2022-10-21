import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "antd";
import styled from "styled-components";

import useAxios from "../../hooks/useAxios";

import { postUrl } from "../../PostUrl";

function ProductRank() {
  const { resData: sold, connectServer: getSold } = useAxios(
    "api/product/productSort"
  );

  const { resData: views, connectServer: getViews } = useAxios(
    "api/product/productSort"
  );

  useEffect(() => {
    getSold({ type: "sold", count: 3 });
    getViews({ type: "view", count: 3 });
  }, []);

  return (
    <Div>
      <Carousel effect="fade" autoplay>
        <Section>
          <div>
            <strong>조회수</strong>가 높은 상품
          </div>
          {views && <ProductSection items={views} />}
        </Section>

        <Section>
          <div>
            <strong>판매량</strong>이 많은 상품
          </div>
          {sold && <ProductSection items={sold} />}
        </Section>
      </Carousel>
    </Div>
  );
}

const ProductSection = ({ items }) => {
  const nav = useNavigate();
  return (
    <Product>
      {items.map((data, index) => (
        <Card key={index} onClick={() => nav(`/product/${data._id}`)}>
          <Image img={`url('${postUrl}${data.image[0].name}')`}>
            <Rank>{items.indexOf(data) + 1}</Rank>
          </Image>

          <Title>{data.title}</Title>
        </Card>
      ))}
    </Product>
  );
};

const Div = styled.div`
  height: 30rem;
  margin-bottom: 50px;
`;

const Section = styled.section`
  height: 30rem;

  //제목
  & > :first-child {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const Product = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Card = styled.div`
  box-shadow: 5px 5px 10px 3px var(--gray_transparency);
  background-color: var(--orange_normal);
  border: 3px solid transparent;
  border-radius: 5px 30px 5px 30px;
  width: 30%;
  height: 25rem;
  transition: all ease 0.5s;

  &:hover {
    border: 3px solid var(--orange_hover);
    cursor: pointer;
  }
`;

const Image = styled.div`
  background-image: ${(props) => props.img};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 70%;
  border-radius: 0px 30px 0px 0px;
  position: relative;
`;

const Rank = styled.div`
  position: absolute;
  color: var(--red_transparency);
  font-size: 3rem;
  font-style: oblique;
  font-weight: 600;
  top: 0px;
  left: 0.5rem;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  font-size: 0.8rem;
  height: 30%;
`;

export default React.memo(ProductRank);
