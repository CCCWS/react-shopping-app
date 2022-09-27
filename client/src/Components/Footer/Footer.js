import React from "react";
import styled from "styled-components";

const Footer = ({ component }) => {
  return (
    <Div>
      <div>{component()}</div>
    </Div>
  );
};

const Div = styled.div`
  background-color: rgb(255, 255, 255);
  border-top: 2px solid rgb(173, 173, 173);
  width: 100%;
  height: 60px;
  position: fixed;
  display: flex;
  justify-content: center;
  bottom: 0;
  right: 0;
  z-index: 10;

  & > :first-child {
    width: 900px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    @media (max-width: 900px) {
      width: 100%;
    }
  }
`;

export default Footer;
