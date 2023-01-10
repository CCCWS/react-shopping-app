import styled, { css } from "styled-components";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import React from "react";

const Switch = ({ viewType, onSetMode }) => {
  return (
    <Theme onClick={onSetMode}>
      <Div viewType={viewType}>
        <AppstoreOutlined />

        <BarsOutlined />

        <Toggle viewType={viewType} />
      </Div>
    </Theme>
  );
};

const Theme = styled.div`
  cursor: pointer;
  font-size: 20px;
  width: 80px;
  height: 40px;
`;

const Div = styled.div`
  background-color: rgba(255, 207, 148, 0.5);
  width: inherit;
  height: inherit;
  border-radius: 30px;

  display: flex;
  justify-content: space-around;
  align-items: center;

  position: relative;
`;

const Toggle = styled.span`
  background-color: var(--white);
  position: absolute;

  width: 30px;
  height: 30px;
  border-radius: 30px;
  border: 2px solid var(--orange_normal);
  transition: all ease 0.5s;

  left: ${(props) => (props.viewType ? "5px" : "calc(100% - 35px)")};

  &:hover {
    cursor: pointer;
    background-color: var(--orange_hover);
  }
`;

export default React.memo(Switch);
