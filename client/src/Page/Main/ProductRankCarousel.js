import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Carousel1 from "../../Components/Utility/Carousel1";
import ZoomAnimation from "../../Components/Utility/Animation/ZoomAnimation";

import useAxios from "../../hooks/useAxios";

import { postUrl } from "../../PostUrl";

const ProductRankCarousel = () => {
  const {
    resData: sold,
    loading: soldLoading,
    connectServer: getSold,
  } = useAxios("api/product/productSort");

  const {
    resData: views,
    loading: viewsLoading,
    connectServer: getViews,
  } = useAxios("api/product/productSort");

  useEffect(() => {
    getSold({ type: "sold", count: 3 });
    getViews({ type: "view", count: 3 });
  }, [getSold, getViews]);

  return (
    <ZoomAnimation>
      {!soldLoading && !viewsLoading && (
        <Carousel1
          height={"500px"}
          point={true}
          fade={true}
          auto={true}
          delay={2000}
        >
          <div>
            <Type>
              <strong>조회수</strong>가 높은 상품
            </Type>
            <CarouselSection data={views} />
          </div>

          <div>
            <Type>
              <strong>판매량</strong>이 많은 상품
            </Type>
            <CarouselSection data={sold} />
          </div>
        </Carousel1>
      )}
    </ZoomAnimation>
  );
};

const CarouselSection = ({ data }) => {
  const nav = useNavigate();

  return (
    <Product>
      {data.map((item, index) => (
        <Card key={index} onClick={() => nav(`/product/${item._id}`)}>
          <Image img={`url('${postUrl}${item.image[0].name}')`}>
            <Rank>{data.indexOf(item) + 1}</Rank>
          </Image>
          <Title>{item.title}</Title>
        </Card>
      ))}
    </Product>
  );
};

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
  height: 430px;
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

const Type = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;
  font-size: 1.5rem;
`;

export default React.memo(ProductRankCarousel);
