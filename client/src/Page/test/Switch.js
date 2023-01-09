import styled from "styled-components";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import React from "react";

const Switch = ({ viewType, onSetMode }) => {
  return (
    <Theme>
      <Div viewType={viewType}>
        <div>
          <AppstoreOutlined />
        </div>
        <div>
          <BarsOutlined />
        </div>

        <Toggle viewType={viewType} onClick={onSetMode} />
      </Div>
    </Theme>
  );
};

const Theme = styled.div`
  /* right: 1rem;
  bottom: 1rem; */
`;

const Div = styled.div`
  background-color: rgba(255, 207, 148, 0.5);
  width: 80px;
  height: 40px;
  border-radius: 30px;
  border: 2px solid orange;

  display: flex;
  justify-content: space-around;
  align-items: center;

  position: relative;

  transition: all ease 0.5s;

  & div {
    width: 20px;
    height: 100%;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }
`;

const Toggle = styled.span`
  background-color: var(--white);
  position: absolute;
  left: 5px;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  border: 2px solid var(--orange_normal);
  transition: all ease 0.5s;

  transform: ${(props) =>
    props.viewType ? "translateX(0)" : "translateX(38px)"};

  &:hover {
    cursor: pointer;
    background-color: var(--orange_hover);
  }
`;

export default React.memo(Switch);
