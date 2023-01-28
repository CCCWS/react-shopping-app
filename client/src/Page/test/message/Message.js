import React, { useState } from "react";
import styled from "styled-components";
import {
  MessageOutlined,
  PhoneOutlined,
  CameraOutlined,
  EditOutlined,
} from "@ant-design/icons";

import Header from "./Component/Header";
import Selector from "./Component/Selector";
import TypeView from "./Component/TypeView";
import MessageView from "./Page/MessageView";

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

  const [clickMessage, setClickMessage] = useState([]);
  const [onMessage, setOnMessage] = useState(false);

  return (
    <Div>
      <Header main={true} />
      <Selector types={types} currType={currType} onClickType={onClickType} />
      <TypeView
        currType={currType}
        setOnMessage={setOnMessage}
        setClickMessage={setClickMessage}
      />

      <MessageView
        onMessage={onMessage}
        setOnMessage={setOnMessage}
        clickMessage={clickMessage}
      />

      {!onMessage && (
        <Icon>
          {currType === 0 && <MessageOutlined />}
          {currType === 1 && <CameraOutlined />}

          {currType === 2 && <PhoneOutlined />}
        </Icon>
      )}

      {currType === 1 && <StatusIcon>{<EditOutlined />}</StatusIcon>}
    </Div>
  );
};

const Div = styled.div`
  width: 350px;
  height: 650px;
  background-color: whitesmoke;

  display: flex;
  flex-direction: column;

  position: relative;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

const IconBase = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled(IconBase)`
  background-color: #1e821e;
  width: 50px;
  height: 50px;
  border-radius: 50px;

  bottom: 20px;
  right: 20px;

  font-size: 25px;
`;

const StatusIcon = styled(IconBase)`
  background-color: #aaaaaa;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  right: 25px;
  bottom: 80px;
`;

export default Message;
