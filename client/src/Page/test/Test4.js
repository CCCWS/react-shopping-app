import React, { useEffect, useState } from "react";
import axios from "axios";
import styled, { css } from "styled-components";

import CarouselType1 from "./CarouselType1";

import Carousel from "./Carousel";
import HamburgerBtn from "../../Components/Utility/HamburgerBtn";
import Drag from "./Drag";
import DragEvent from "./DragEvent";

const Test4 = () => {
  const [monster, setMonster] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const getApi = async () => {
  //     const res = await axios.get("https://mhw-db.com/monsters");
  //     setMonster(res.data);
  //     setLoading(false);
  //   };

  //   getApi();
  // }, []);

  const [moveValue, setMoveValue] = useState(0);

  return (
    <Box>
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

      <DragEvent />
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
