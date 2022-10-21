import React, { useEffect } from "react";
import styled from "styled-components";

function Test2() {
  useEffect(() => {}, []);

  return (
    <Div id="my-scrollbar">
      <Red />
      <Blue />
      <Green />
    </Div>
  );
}

const Div = styled.div`
  background-color: gray;
  width: 100%;
  height: 300vh;
`;

const Red = styled.div`
  background-color: red;
  width: 100%;
  height: 100vh;
`;

const Blue = styled.div`
  background-color: blue;
  width: 100%;
  height: 100vh;
`;

const Green = styled.div`
  background-color: green;
  width: 100%;
  height: 100vh;
`;

export default Test2;
