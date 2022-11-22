import React, { useState } from "react";
import styled from "styled-components";

import Test5 from "./Test5";
import Test6 from "./Test6";

const Test4 = () => {
  return (
    <Test>
      <Test1>
        <Test5 height={"400px"} point={true}>
          <Div id={1}></Div>
          <Div id={2}></Div>
          <Div id={3}></Div>
          <Div id={4}></Div>
          <Div id={5}></Div>
        </Test5>
      </Test1>
      <HR />

      <Test1>
        <Test6 height={"400px"} point={true} slide={true} nextBtn={true}>
          <Div id={1}></Div>
          <Div id={2}></Div>
          <Div id={3}></Div>
          <Div id={4}></Div>
          <Div id={5}></Div>
        </Test6>
      </Test1>
      <HR />

      <Test1>
        <Test6 height={"400px"} point={true} fade={true} nextBtn={true}>
          <Div id={1}></Div>
          <Div id={2}></Div>
          <Div id={3}></Div>
          <Div id={4}></Div>
          <Div id={5}></Div>
        </Test6>
      </Test1>
      <HR />
    </Test>
  );
};

const Test1 = styled.div`
  width: 800px;
`;

const Test = styled.div`
  width: 100%;
  margin-top: 30px;
`;

const HR = styled.div`
  width: 300px;
  height: 300px;
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
