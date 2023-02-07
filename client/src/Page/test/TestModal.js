import React, { useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

const TestModal = () => {
  const nav = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    window.scrollTo(0, state.scroll);

    const body = document.body;
    body.classList.add("not-scroll");
    return body.classList.remove("not-scroll");
  }, [state, nav]);
  return <Div currScroll={state.scroll}>TestModal</Div>;
};

const Div = styled.div`
  top: ${(props) => `${props.currScroll}px`};
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);

  overflow: hidden;
`;

export default TestModal;
