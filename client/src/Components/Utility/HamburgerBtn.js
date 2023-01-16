import React from "react";
import styled, { css } from "styled-components";

const HamburgerBtn = ({ btnClick, setBtnClick }) => {
  return (
    <Box onClick={() => setBtnClick((prev) => !prev)} btnClick={btnClick}>
      <div />
      <div />
      <div />
    </Box>
  );
};

const Box = styled.div`
  width: 30px;
  height: 30px;

  z-index: 1;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  div {
    transition: all ease 0.5s;
    width: 100%;
    height: 4px;
    background-color: var(--gray);
    border-radius: 30px;

    transform-origin: 0px 0px;
  }

  &:hover {
    cursor: pointer;
  }

  ${(props) =>
    props.btnClick &&
    css`
      & > :first-child {
        transform: rotate(45deg) translate(4px, -4px);
        transform-origin: 0% 0%;
      }

      & > :nth-child(2) {
        transform: translateX(-15px);
        opacity: 0;
      }

      & > :last-child {
        transform: rotate(-45deg) translate(4px, 4px);
        transform-origin: 0% 100%;
      }
    `}
`;

export default HamburgerBtn;
