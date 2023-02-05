import React, { useEffect, useState } from "react";
import axios from "axios";
import styled, { css } from "styled-components";

import CarouselType1 from "./CarouselType1";

import Carousel from "./Carousel";
import HamburgerBtn from "../../Components/Utility/HamburgerBtn";
import Drag from "./Drag";
import DragEvent from "./DragEvent";

import useAxios from "./useAxios";

const Test4 = () => {
  const [monster, setMonster] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const getApi = async () => {
  //     const res = await axios.get("https://mhw-db.com/monsters");
  //     setMonster(res.data);
  //     setLoading(false);
  //   };

  //   getApi();
  // }, []);

  // const { apiData, loading } = useAxios({
  //   url: "/api/product/productDetail",
  //   type: "post",
  //   body: { id: "62bc572a1973d6509eb5f89b" },
  // });

  const { apiData, loading } = useAxios({
    url: "https://mhw-db.com/monsters",
    type: "get",
  });

  const gett = () => {
    console.log(apiData);
  };

  const [moveValue, setMoveValue] = useState(0);

  return (
    <Box>
      <button onClick={gett}>d</button>
      <div>
        {loading ? (
          "로딩중"
        ) : (
          <>
            {apiData.map((data, index) => (
              <div key={index}>{data.name}</div>
            ))}
          </>
        )}
      </div>
      {/* <Drag>
        <Div color={"red"}></Div>
        <Div color={"blue"}></Div>
        <Div color={"green"}></Div>
      </Drag> */}

      {/* <CarouselType1 slide={true} nextBtn={true} point={true} height={"300px"}>
        <Div color={"red"}></Div>
        <Div color={"blue"}></Div>
        <Div color={"green"}></Div>
      </CarouselType1> */}

      {/* <Carousel
        height={"500px"}
        transitionDuration={100}
        point={true}
        nextBtn={true}
        // auto={true}
        // autoDelay={300}
      >
        <Div color={"red"}></Div>
        <Div color={"blue"}></Div>
        <Div color={"green"}></Div>
      </Carousel> */}

      {/* <Div onMouseDown={onMouseDown} onMouseUp={onMouseUp}></Div> */}

      {/* <DragEvent /> */}
    </Box>
  );
};

const Box = styled.div`
  width: 100vw;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;

  width: 100%;
  height: 100%;

  background-color: ${(props) => props.color};
`;

export default Test4;
