import React, { useState } from "react";
import styled from "styled-components";

import Header from "./Component/Header";
import Selector from "./Component/Selector";
import TypeView from "./Component/TypeView";

const Message = () => {
  const types = [
    { id: 0, name: "CHATS" },
    { id: 1, name: "STATUS" },
    { id: 2, name: "CALLS" },
  ];
  const [currType, setCurrType] = useState(0);

  const onClickType = (data) => {
    setCurrType(data);
  };

  return (
    <Div>
      <Header />
      <Selector types={types} currType={currType} onClickType={onClickType} />
      <TypeView currType={currType} types={types} />

      <Icon></Icon>
    </Div>
  );
};

const Div = styled.div`
  margin: 100px;
  width: 350px;
  height: 650px;
  background-color: beige;

  display: flex;
  flex-direction: column;

  position: relative;
`;

const Icon = styled.div`
  position: absolute;

  background-color: red;

  top: 10px;
  bottom: 10px;
  left: 50px;
  right: 30px;
`;

export default Message;
