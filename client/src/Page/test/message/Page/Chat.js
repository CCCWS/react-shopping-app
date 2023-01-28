import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Chat = ({ userList, setOnMessage, setClickMessage }) => {
  const onClickMessage = (data) => {
    setOnMessage(true);
    setClickMessage(data);
  };
  return (
    <Div>
      {userList.map((userList) => (
        <ChatDiv key={userList.id} onClick={() => onClickMessage(userList)}>
          <LeftBox>
            <ProfileImg />
            <ProfileName>
              <div>{userList.name}</div>
              <div>{userList.username}</div>
            </ProfileName>
          </LeftBox>

          <ProfileId>{userList.id}</ProfileId>
        </ChatDiv>
      ))}
    </Div>
  );
};

const Div = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow: overlay;

  font-size: 1rem;
`;

const ChatDiv = styled.div`
  width: 100%;
  height: 17%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 20px;

  &:hover {
    background-color: #dcdcdc;
    cursor: pointer;
  }
`;

const LeftBox = styled.div`
  display: flex;
`;

const ProfileImg = styled.div`
  width: 50px;
  height: 50px;
  background-color: beige;
  border-radius: 50px;
  margin-right: 10px;
  border: 2px solid green;
`;

const ProfileName = styled.div`
  & > :first-child {
    font-size: 1.1rem;
    font-weight: 600;
  }

  & > :last-child {
    opacity: 0.8;
  }
`;

const ProfileId = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 30px;
  background-color: #82eb5a;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid green;
`;

export default Chat;
