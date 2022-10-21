import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import darkModeImg from "./ToggleImage/dark_mode.png";
import lightModeImg from "./ToggleImage/light_mode.png";

import { darkModeAction } from "../../store/reducer/darkMode";

const Toggle = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const click = () => {
    dispatch(darkModeAction.onMode());
  };
  return (
    <Div onClick={click}>
      {darkMode ? (
        <Img src={darkModeImg} alt="다크모드" />
      ) : (
        <Img src={lightModeImg} alt="다크모드" />
      )}
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 30px;
  margin-right: 10px;
  background-color: var(--gray_transparency);
  transition: all ease 0.5s;

  &:hover {
    cursor: pointer;
    transform: rotate(360deg);
    background-color: var(--gray);
  }
`;

const Img = styled.img`
  width: 70%;
`;

export default Toggle;
