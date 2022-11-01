import React from "react";
import { Spin } from "antd";
import styled from "styled-components";

function Loading() {
  return (
    <Div>
      <Spin size="large" />
    </Div>
  );
}

const Div = styled.div`
  position: fixed;
  top: 0;
  width: inherit;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
`;

export default Loading;
