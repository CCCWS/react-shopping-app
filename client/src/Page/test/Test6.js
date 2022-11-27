import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

const Test6 = ({}) => {
  // let onClick = false;
  // const [clientX, setClientX] = useState();
  // const [clientY, setClientY] = useState();

  // const [posX, setPosX] = useState();
  // const [posY, setPosY] = useState();

  // const [offsetLeft, setOffsetLeft] = useState();
  // const [offsetTop, setOffsetTop] = useState();

  // const onDown = (e) => {
  //   setClientX(e.clientX);
  //   setClientY(e.clientY);
  //   onClick = true;
  // };

  // const onMove = (e) => {
  //   if (onClick) {
  //   }
  //   console.log("test");
  //   setPosX(clientX - e.clientX);
  //   setPosY(clientY - e.clientY);

  //   setClientX(e.clientX);
  //   setClientY(e.clientX);

  //   setOffsetLeft(e.target.offsetLeft);
  //   setOffsetTop(e.target.offsetTop);
  // };

  // const onUp = () => {
  //   onClick = false;
  // };

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <>
      <Box>
        <Test
          // onMouseDown={onDown}
          // onMouseMove={onMove}
          // onMouseUp={onUp}
          // posX={posX}
          // posY={posY}
          // offsetLeft={offsetLeft}
          // offsetTop={offsetTop}
        ></Test>
      </Box>
    </>
  );
};
const Box = styled.div`
  width: 500px;
  height: 500px;
  background-color: gray;
  position: relative;
`;

const Test = styled.div`
  width: 30px;
  height: 30px;
  background-color: black;
  border-radius: 30px;

  position: absolute;
  top: ${(props) => `${props.offsetTop - props.posX}px`};
  left: ${(props) => `${props.offsetLeft - props.posY}px`};
`;

export default Test6;
