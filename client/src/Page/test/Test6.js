import React, { useState } from "react";
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
  return (
    <Div>
      {/* <Select
        dataArr={dataArr}
        width={"300px"}
        selectValue={selectValue}
        setSelectValue={setSelectValue}
        slide={true}
        // fade={true}
        searchBar={true}
      /> */}
      <Select2 />
    </Div>
  );
};

const Div = styled.div`
  margin: 100px;
`;

export default Test6;
