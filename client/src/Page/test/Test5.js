import { useState, useRef, useEffect } from "react";

import styled from "styled-components";
import "./test.css";

const Test5 = () => {
  return (
    <Div>
      <Line />
      <ImgBox>
        <div>Z</div>
      </ImgBox>
      <Content>
        <h2>HELLO</h2>
        <p>
          yeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
          eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        </p>
        {/* <div>더보기</div> */}
      </Content>
    </Div>
  );
};
const Line = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  /* background-color: red; */
  overflow: hidden;

  ::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 600px;
    height: 120px;

    background: linear-gradient(
      transparent,
      #45f3ff,
      #45f3ff,
      #45f3ff,
      transparent
    );

    animation: animate 1s linear infinite;
    animation-play-state: paused;
  }

  ::after {
    content: "";
    position: absolute;
    inset: 5px;
    /* top: 5px;
    bottom: 5px;
    right: 5px;
    left:5px; */
    background-color: #292929;
  }

  @keyframes animate {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }

    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

const ImgBox = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  background-color: #000;

  left: 50%;
  top: -60px;
  transform: translateX(-50%);

  transition: 0.5s;
  z-index: 10;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  ::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 500px;
    height: 150px;

    transform: translate(-50%, -50%);

    background: linear-gradient(
      transparent,
      #ff3c7b,
      #45f3ff,
      #15fc7f,
      transparent
    );

    animation: animate 3s linear infinite;
    animation-play-state: paused;
  }

  ::after {
    content: "";
    position: absolute;
    inset: 5px;
    /* top: 5px;
    bottom: 5px;
    right: 5px;
    left:5px; */
    background-color: #292929;
  }

  div {
    z-index: 1;
    width: 100%;
    height: 100%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 5rem;
    opacity: 0.5;

    transition: 0.5s;
  }
`;

const Content = styled.div`
  position: absolute;
  width: 100%;
  height: 35%;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  align-items: center;
  overflow: hidden;

  h2 {
    font-size: 1.5em;
    font-weight: 500;
    color: white;
    transition: 0.5s;
  }

  p {
    color: white;
    /* padding: 30px 20px; */
    text-align: center;
    width: 100%;
    transition: 0.5s;
    transform: translateY(145px);
  }

  div {
    color: white;
  }
`;

const Div = styled.div`
  margin: 150px;

  width: 350px;
  height: 180px;
  background-color: #333;

  transition: 0.5s;

  position: relative;

  display: flex;
  justify-content: center;
  align-items: flex-end;

  &:hover {
    height: 450px;

    ${ImgBox} {
      top: 25px;
      width: 250px;
      height: 250px;
      ::before {
        animation-play-state: running;
      }

      div {
        font-size: 10rem;
        opacity: 1;
      }
    }

    ${Line} {
      ::before {
        animation-play-state: running;
      }
    }

    ${Content} {
      p {
        transform: translateY(0px);
      }

      h2 {
        font-size: 2rem;
      }
    }
  }
`;

export default Test5;
