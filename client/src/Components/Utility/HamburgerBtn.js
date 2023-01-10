import React from "react";
import styled, { css } from "styled-components";

const HamburgerBtn = ({ menuClick, setMenuClick }) => {
  return (
    <Box onClick={() => setMenuClick((prev) => !prev)} menuClick={menuClick}>
      <div />
      <div />
      <div />
    </Box>
  );
};

const Box = styled.div`
  width: 30px;
  height: 30px;
  /* transform: scale(1.1); */

  z-index: 1;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  div {
    transition: 0.3s;
    width: 100%;
    height: 5px;
    background-color: var(--gray);
    border-radius: 30px;

    transform-origin: 4px 0px;
  }

  &:hover {
    cursor: pointer;
  }

  ${(props) =>
    props.menuClick &&
    css`
      & > :first-child {
        transform: rotate(45deg) translate(4px, -4px);
        transform-origin: 0% 0%;
        width: 100%;
      }

      & > :nth-child(2) {
        opacity: 0;
      }

      & > :last-child {
        transform: rotate(-45deg) translate(4px, 4px);
        transform-origin: 0% 100%;
        width: 100%;
      }
    `}
`;

export default HamburgerBtn;
