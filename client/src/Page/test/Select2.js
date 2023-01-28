import React, { useState } from "react";
import styled from "styled-components";

const Select2 = () => {
  const [value, setValue] = useState("");
  return (
    <Div>
      <Input onChange={(e) => setValue(e.target.value)} />
      <ItemBox value={value} />
    </Div>
  );
};

const Div = styled.div`
  width: 300px;
  height: 50px;
  background-color: gray;

  position: relative;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
`;

const ItemBox = styled.div`
  position: absolute;
  width: 100%;
  height: 60px;
  background-color: red;

  display: ${(props) => !props.value && "none"};
`;

export default Select2;
