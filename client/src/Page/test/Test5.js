import { useState, useRef } from "react";
import useConfirm from "./useConfirm";
import useProtect from "./useProtect";
import styled from "styled-components";

const Test5 = () => {
  const confirmAction = () => console.log("확인완료");
  const onClickComfirm = useConfirm("확인", confirmAction);

  const { protectOn, protectOff } = useProtect();
  return <Page></Page>;
};

const Page = styled.div`
  width: 100vw;
  height: 1000vh;
`;

export default Test5;
