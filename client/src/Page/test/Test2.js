import React, { useState } from "react";
import Modal from "./modal/Modal";
import styled from "styled-components";
import Notification from "../../Components/Utility/Notification";
import { useSelector, useDispatch } from "react-redux";
import { notificationAction } from "../../store/reducer/notification";

function Test2() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(!open)}>test</button>

      <Div open={open}></Div>
      <Div open={open}></Div>
      <Div open={open}></Div>
      <Div open={open}></Div>
      <Div open={open}></Div>
    </>
  );
}

const Div = styled.div`
  width: ${(props) => (props.open ? "300px" : "0px")};
  height: ${(props) => (props.open ? "300px" : "0px")};
  transform: ${(props) =>
    props.open
      ? "translate(calc(50vw - 150px), calc(50vh - 150px))"
      : "translateX(0)"};
  background-color: red;
  border-radius: 30px;
  transition: 0.5s;
`;

export default Test2;
