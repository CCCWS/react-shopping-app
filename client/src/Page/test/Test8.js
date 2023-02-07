import React, { useState, useRef } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import styled, { css } from "styled-components";

import { Link, useLocation } from "react-router-dom";

import TestModal from "./TestModal";

const Test8 = () => {
  const nav = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  // console.log(location);
  return (
    <Page>
      <div
        onClick={() =>
          nav("modal", {
            state: {
              modalOpen: true,
            },
          })
        }
      >
        Open Modal
      </div>
      <Outlet />
    </Page>
  );
};

const Page = styled.div`
  width: 500px;
  height: 500px;
  background-color: gray;
`;

export default Test8;
