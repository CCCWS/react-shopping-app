import React from "react";
import styled from "styled-components";
import {
  MoreOutlined,
  SearchOutlined,
  CameraOutlined,
} from "@ant-design/icons";

const Header = ({ main, messageView, name, setOnMessage }) => {
  return (
    <HeaderDiv>
      {main && (
        <>
          <RightDiv>WhatsApp</RightDiv>
          <LeftDiv>
            <div>
              <CameraOutlined />
            </div>
            <div>
              <SearchOutlined />
            </div>
            <div>
              <MoreOutlined />
            </div>
          </LeftDiv>
        </>
      )}

      {messageView && (
        <>
          <RightDiv messageView={true}>
            <BackButton onClick={() => setOnMessage(false)}>{`<`}</BackButton>
            <NameBox>
              <UserImg />
              <UserName>
                <div>{name}</div>
                <div>Online</div>
              </UserName>
            </NameBox>
          </RightDiv>
          <LeftDiv>
            <div>
              <CameraOutlined />
            </div>
            <div>
              <SearchOutlined />
            </div>
            <div>
              <MoreOutlined />
            </div>
          </LeftDiv>
        </>
      )}
    </HeaderDiv>
  );
};

const HeaderDiv = styled.div`
  width: 100%;
  height: 60px;
  background-color: #1e821e;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 1rem;

  padding: 10px;
`;

const RightDiv = styled.div`
  color: white;

  display: ${(props) => props.messageView && "flex"};
  align-items: center;
`;

const LeftDiv = styled.div`
  display: flex;
  div {
    margin: 8px;
  }
`;

const BackButton = styled.div`
  width: 30px;
  height: 30px;
  /* background-color: red; */
  font-size: 1.8rem;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 5px;

  &:hover {
    cursor: pointer;
  }
`;
const NameBox = styled.div``;
const UserImg = styled.div``;
const UserName = styled.div``;

export default Header;
