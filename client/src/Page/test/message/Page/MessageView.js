import React from "react";
import styled from "styled-components";
import Header from "../Component/Header";

const MessageView = ({ onMessage, setOnMessage, clickMessage }) => {
  return (
    <>
      {onMessage && (
        <>
          <Div>
            <Header
              messageView={true}
              name={clickMessage.name}
              setOnMessage={setOnMessage}
            />

            <MessageBox>
              <Input></Input>
            </MessageBox>
          </Div>
        </>
      )}
    </>
  );
};

const Div = styled.div`
  position: absolute;
  inset: 0;
`;

const MessageBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: blue;
  position: relative;
`;

const Input = styled.div`
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0;
  background-color: green;
`;

export default MessageView;
