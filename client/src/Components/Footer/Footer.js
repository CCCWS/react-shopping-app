import React from "react";
import styled from "styled-components";
import ReactDom from "react-dom";

const Footer = ({ children }) => {
  return ReactDom.createPortal(
    <Div>
      <div>{children}</div>
    </Div>,
    document.querySelector("#footer-portal")
  );
};
const Div = styled.div`
  backdrop-filter: blur(50px);
  border-top: 2px solid var(--orange_normal);
  width: 100%;
  height: 5rem;
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

export default React.memo(Footer);
