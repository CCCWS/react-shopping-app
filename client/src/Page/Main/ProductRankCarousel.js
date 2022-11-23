import React, { useEffect } from "react";
import styled from "styled-components";

import Carousel1 from "../../Components/Utility/Carousel1";
import ZoomAnimation from "../../Components/Utility/Animation/ZoomAnimation";

import useAxios from "../../hooks/useAxios";

import { postUrl } from "../../PostUrl";

const ProductRankCarousel = () => {
  const { resData: sold, connectServer: getSold } = useAxios(
    "api/product/productSort"
  );

  const { resData: views, connectServer: getViews } = useAxios(
    "api/product/productSort"
  );

  useEffect(() => {
    getSold({ type: "sold", count: 3 });
    getViews({ type: "view", count: 3 });
  }, [getSold, getViews]);

  return <></>;
};

export default ProductRankCarousel;
