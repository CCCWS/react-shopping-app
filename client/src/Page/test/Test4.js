import React, { useState } from "react";
import styled from "styled-components";

import Test5 from "./Test5";
import Test6 from "./Test6";
import Test8 from "./Test8";

import SelectBox from "./SelectBox";

const Test4 = () => {
  const [selectValue, setSelectValue] = useState("기본값");
  const [click, setClick] = useState(false);

  return (
    <>
      <SelectBox
        dataArr={[
          "선택1",
          "선택2",
          "선택3",
          "선택4",
          "선택5",
          "선택6",
          "선택7",
        ]}
        width={"200px"}
        selectValue={selectValue}
        setSelectValue={setSelectValue}
        fade={true}
      />

      <Div>
        <Box>
          <Divv />
          <Divv />
          <Divv />
          <Divv />
          <Divv />
          <Divv />
        </Box>
      </Div>
      <button onClick={() => setClick(false)}>맨앞</button>
      <button onClick={() => setClick(true)}>맨뒤</button>
    </>
  );
};

const Div = styled.div`
  width: 600px;
  height: 150px;
  background-color: red;
  display: flex;
  position: relative;
`;

const Box = styled.div`
  display: flex;
  height: 100%;
  overflow-x: scroll;
`;

const Divv = styled.div`
  min-width: 100px;
  height: 100%;
  margin-right: 10px;
  background-color: black;
  /* transform: translateX(-100%); */
`;

export default Test4;
