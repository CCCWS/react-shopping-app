import React, { useState } from "react";
import styled from "styled-components";

const Drag = () => {
  const [move, setMove] = useState(false);
  const [moveX, setMoveX] = useState(0);
  const [moveY, setMoveY] = useState(0);

  const onMouseDown = (e) => {
    // console.log(e.target.offsetLeft);
    setMove(true);
  };
  const onMouseUp = () => {
    setMove(false);
  };

  const onMouseMove = (e) => {
    if (move) {
      if (moveX === 0) setMoveX(e.clientX);
      console.log(e.clientX);
      //   setMoveX(e.pageX);
      //   setMoveY(e.pageY);
    }
  };
  return (
    <Div>
      <Item
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        moveX={moveX}
        moveY={moveY}
      ></Item>
    </Div>
  );
};

const Div = styled.div`
  width: 500px;
  height: 500px;
  background-color: aliceblue;
`;

const Item = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
  position: absolute;
  transform: ${(props) => `translate(${props.moveX}px, ${props.moveY}px)`};
  /* transform: ${(props) => `translateY(${props.moveY - 50}px)`}; */
`;

export default Drag;
