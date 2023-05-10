import React, { useEffect } from "react";
import styled from "styled-components";

const ServerShutdown = () => {
  return (
    <Page>
      <h2>지금은 서버가 닫혀있어요.</h2>
    </Page>
  );
};

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  /* background-color: gray; */

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ServerShutdown;
