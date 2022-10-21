import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { darkModeAction } from "../../store/reducer/darkMode";

const Toggle = () => {
  const dispatch = useDispatch();
  const click = () => {
    dispatch(darkModeAction.onMode());
  };
  return <div onClick={click}>Toggle</div>;
};

export default Toggle;
