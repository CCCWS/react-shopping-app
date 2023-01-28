import React from "react";
import styled, { css } from "styled-components";

const Status = ({ userList }) => {
  return (
    <Div>
      <ChatDiv>
        <LeftBox>
          <ProfileImg myStatus={true} />
          <ProfileName>
            <div>My Status</div>
            <div>Tap to add status update</div>
          </ProfileName>
        </LeftBox>
      </ChatDiv>

      <Recent>Recent Updates</Recent>

      {userList.map((userList) => (
        <ChatDiv key={userList.id}>
          <LeftBox>
            <ProfileImg />
            <ProfileName>
              <div>{userList.username}</div>
              <div>{userList.phone}</div>
            </ProfileName>
          </LeftBox>
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
  height: 14%;

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
  position: relative;

  ${(props) =>
    props.myStatus &&
    css`
      &::before {
        content: "+";
        width: 25px;
        height: 25px;
        border-radius: 20px;
        font-size: 1.3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        border: 2px solid white;

        background-color: #1e821e;
        position: absolute;

        bottom: -5px;
        right: -5px;
      }
    `}
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

const Recent = styled.div`
  width: 100%;
  /* height: 20px; */
  padding: 3px 3px 3px 20px;

  font-size: 1rem;
  opacity: 0.7;
`;

export default Status;
