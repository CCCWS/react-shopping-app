import React, { useState } from "react";
import styled from "styled-components";

function Test2() {
  const [open, setOpen] = useState(false);
  const [num, setNum] = useState();

  const onNum = (e) => {
    setNum(parseInt(e.target.innerText, 10));
  };
  console.log(num);
  return (
    <>
      <button onClick={() => setOpen(!open)}>test</button>

      <Div open={open}></Div>
      <Div open={open}></Div>
      <Div open={open}></Div>
      <Div open={open}></Div>
      <Div open={open}></Div>

      <Test num={num}>
        <Button onClick={(e) => onNum(e)}>1</Button>
        <Button onClick={(e) => onNum(e)}>2</Button>
        <Button onClick={(e) => onNum(e)}>3</Button>
        <Button onClick={(e) => onNum(e)}>4</Button>
        <Button onClick={(e) => onNum(e)}>5</Button>
      </Test>
    </>
  );
}
const Test = styled.div`
  position: relative;
  padding: 20px;

  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    border-radius: 50px;
    background-color: red;

    transition: all ease 0.5s;

    transform: ${(props) => props.num === 1 && "translateX(15px)"};
    transform: ${(props) => props.num === 2 && "translateX(65px)"};
    transform: ${(props) => props.num === 3 && "translateX(115px)"};
    transform: ${(props) => props.num === 4 && "translateX(165px)"};
    transform: ${(props) => props.num === 5 && "translateX(215px)"};
  }
`;

const Button = styled.button`
  min-width: 50px;
  min-height: 20px;
`;

const Test22 = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50px;
  background-color: red;

  transition: all ease 0.5s;

  transform: ${(props) => props.num === 1 && "translateX(15px)"};
  transform: ${(props) => props.num === 2 && "translateX(65px)"};
  transform: ${(props) => props.num === 3 && "translateX(115px)"};
  transform: ${(props) => props.num === 4 && "translateX(165px)"};
  transform: ${(props) => props.num === 5 && "translateX(215px)"};
`;

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
