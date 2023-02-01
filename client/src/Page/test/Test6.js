import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Select from "./Select";
import Select2 from "./Select2";

const Test6 = () => {
  const [selectValue, setSelectValue] = useState("기본값");
  const dataArr = [
    "선택값 1",
    "선택값 2",
    "선택값 3",
    "선택값 4",
    "선택값 5",
    "선택값 6",
    "선택값 7",
  ];

  const observerRef = useRef(null);

  useEffect(() => {
    if (!observerRef.current) return;

    const io = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        console.log("test");
      }
    });
    io.observe(observerRef.current);

    return () => {
      io.disconnect();
    };
  }, []);

  const now = "shipping";
  return (
    <>
      <Div>
        <Select2 />
      </Div>
      <div ref={observerRef}>test</div>

      <div>
        {
          {
            info: <p>상품정보</p>,
            shipping: <p>배송관련</p>,
            refund: <p>환불약관</p>,
          }[now]
        }
      </div>
    </>
  );
};

const Div = styled.div`
  height: 200vh;
`;

export default Test6;
