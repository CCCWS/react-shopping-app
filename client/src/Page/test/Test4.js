import React, { useState } from "react";
import styled from "styled-components";

import Test5 from "./Test5";

const Test4 = () => {
  return (
    <Test>
      <Test5 height={"300px"} point={true}>
        <Div id={1}>테</Div>
        <Div id={2}>테</Div>
        <Div id={3}>테</Div>
        <Div id={4}>테</Div>
        <Div id={5}>테</Div>
      </Test5>
    </Test>
  );
};

const Test = styled.div`
  width: 100%;
`;

const Div = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.id === 1 && "red"};
  background-color: ${(props) => props.id === 2 && "blue"};
  background-color: ${(props) => props.id === 3 && "green"};
  background-color: ${(props) => props.id === 4 && "yellow"};
  background-color: ${(props) => props.id === 5 && "orange"};
`;

export default Test4;
