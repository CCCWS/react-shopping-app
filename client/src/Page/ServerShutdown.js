import React, { useEffect } from "react";
import styled from "styled-components";
import closeGif from "../data/serverCloseGif.gif";

import axios from "axios";

const ServerShutdown = () => {
  useEffect(() => {
    const api = async () => {
      const res = await axios.get("/api");

      console.log(res.data);
    };

    api();
  }, []);

  return (
    <Page>
      <h2>지금은 서버가 닫혀있어요.</h2>
      <Time>KST AM 08:00 ~ PM 10:00</Time>

      <CloseGif src={closeGif}></CloseGif>
    </Page>
  );
};

const Page = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: rgba(200, 200, 200);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Time = styled.div`
  font-size: 1.2rem;
  color: red;
`;

const CloseGif = styled.img`
  width: auto;
  height: 300px;

  position: absolute;
  bottom: 10px;
  right: 0px;

  /* background-color: red; */
  object-fit: cover;
`;

export default ServerShutdown;
