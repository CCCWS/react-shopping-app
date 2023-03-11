import React, { useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";


const TestModal = () => {
  const nav = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!state) return nav("/test6");

    console.log(state.data);
    window.scrollTo(0, state.scroll);
    document.body.classList.add("not-scroll");
    return () => document.body.classList.remove("not-scroll");
  }, [state, nav]);

  return (
    <>
      {state && (
        <>
          <Div currScroll={state.scroll}>
            <Box>
              <BoxImg img={`url(${state.data.background_image})`}>
                <div>{state.data.name}</div>
              </BoxImg>
              <button onClick={() => nav(-1)}>ㅇㅇ</button>
            </Box>
          </Div>
        </>
      )}
    </>
  );
};

const Div = styled.div`
  top: ${(props) => `${props.currScroll}px`};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.2); */
  backdrop-filter: blur(10px);

  /* display: flex;
  justify-content: center;
  align-items: center; */

  overflow: scroll;
  overflow: overlay;
`;

const Box = styled.div`
  width: 500px;
  height: 600px;
  background-color: #b3b3b3;
  border-radius: 10px;
  border: 1px solid gray;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
`;

const BoxImg = styled.div`
  width: 100%;
  height: 35%;
  background-image: ${(props) => props.img};
  background-size: cover;
  background-position: center;
  position: relative;

  display: flex;
  justify-content: flex-start;
  align-items: flex-end;

  div {
    font-size: 2rem;
    margin: 10px;
    color: black;
    text-shadow: -1px 0px white, 0px 1px white, 1px 0px white, 0px -1px white;
    font-weight: 700;
  }
`;

export default TestModal;
