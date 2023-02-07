import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import styled, { css } from "styled-components";
import Select2 from "./Select2";
import TestCompo from "./TestCompo";

import useObserver from "../../hooks/useObserver";

const Test6 = () => {
  const nav = useNavigate();
  const observerRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const { isView } = useObserver(observerRef, 1);

  return (
    <>
      <TestCompo loading={loading} setLoading={setLoading} isView={isView} />
      <Observer ref={observerRef} isView={isView}>
        {loading ? "로딩중" : "대기중"}
      </Observer>
    </>
  );
};

const Div = styled.div`
  height: 200vh;
`;

const Observer = styled.div`
  width: 200px;
  height: 200px;
  background-color: red;

  display: flex;
  align-items: flex-start;

  /* ${(props) =>
    !props.isView &&
    css`
      position: fixed;
      bottom: 0;
      right: 0;
    `} */
`;

export default Test6;
