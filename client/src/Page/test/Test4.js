import React, { useState } from "react";
import styled from "styled-components";

import Test5 from "./Test5";

const Test4 = () => {
  return (
    <>
      <Test5 height={"300px"} slide={true}>
        <Div>테</Div>
        <Div>스</Div>
      </Test5>
    </>
  );
};

const Div = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Test4;
