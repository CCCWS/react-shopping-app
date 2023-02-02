import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import Select2 from "./Select2";
import TestCompo from "./TestCompo";

const Test6 = () => {
  const observerRef = useRef(null);
  const [isView, setIsView] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!observerRef.current) return;

    const observerCb = (entry) => {
      if (entry[0].isIntersecting) return setIsView(true);
      return setIsView(false);
    };

    const option = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(observerCb, option);

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // useEffect(() => {
  //   console.log(isView);
  // }, [isView]);

  return (
    <>
      <TestCompo loading={loading} setLoading={setLoading} isView={isView} />
      {/* <Div></Div> */}
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
