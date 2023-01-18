import React, { useState } from "react";
import styled from "styled-components";
import {
  MessageOutlined,
  PhoneOutlined,
  CameraOutlined,
} from "@ant-design/icons";

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

      <Icon>
        {currType === 0 && <MessageOutlined />}
        {currType === 1 && <CameraOutlined />}
        {currType === 2 && <PhoneOutlined />}
      </Icon>
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

  background-color: #1e821e;

  width: 50px;
  height: 50px;
  border-radius: 50px;

  bottom: 20px;
  right: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;

  color: red;
`;

export default Message;
