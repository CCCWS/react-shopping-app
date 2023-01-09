import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import ScrollContainer from "react-indiana-drag-scroll";

const Test3 = () => {
  const [click, setClick] = useState(false);
  const [focus, setFocus] = useState(false);
  const [list, setList] = useState([]);
  const inputRef = useRef();

  const addList = (e) => {
    e.preventDefault();
    setList((list) => [...list, inputRef.current.value]);
  };

  const test = () => {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let temp = "";

    for (let i = 0; i <= 11; i++) {
      temp += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    console.log(temp);
  };

  return (
    <div className="page">
      <Box>
        <Img />
        <Word>
          <Description>
            Set more than a decade after the events of the first film, learn...
          </Description>

          <Title>Avatar: The Way of Water</Title>

          <Info>movie . 2022-12-14 .3777</Info>
        </Word>
      </Box>
      {/* <Div>
        <button onClick={test}>test</button>
        <form onSubmit={addList}>
          <Input onFocus={() => setFocus(true)} ref={inputRef}></Input>
        </form>

        <InputBox focus={focus}>
          <button onClick={() => setFocus(false)}>X</button>
          <ul>
            {list.map((list, index) => (
              <li key={index} onClick={() => alert(list)}>
                {list}
              </li>
            ))}
          </ul>
        </InputBox>
      </Div> */}
    </div>
  );
};

const Description = styled.div`
  margin-bottom: 5px;
`;
const Title = styled.div``;
const Info = styled.div`
  opacity: 0;
`;

const Box = styled.div`
  width: 500px;
  height: 300px;
  background-color: gray;

  margin: 50px;

  transition: 0.5s;

  &:hover {
    scale: 1.1;

    ${Title} {
      font-weight: 800;
    }

    ${Info} {
      opacity: 1;
    }
  }
`;

const Img = styled.div`
  width: 100%;
  height: 70%;
  background-color: blue;
`;

const Word = styled.div`
  width: 100%;
  height: 30%;
  padding: 5px;
`;

const Input = styled.input`
  width: 100%;
`;
const InputBox = styled.div`
  display: ${(props) => !props.focus && "none"};
  width: 100%;
  /* height: 60px; */
  background-color: red;
`;

const Div = styled.div`
  width: 300px;
  height: 600px;
  border-radius: 10px;
  background-color: gray;
  padding: 10px;
  overflow-y: ${(props) => (props.click ? "hidden" : "scroll")};

  /* overflow: overlay; */
  position: relative;
  margin-bottom: 10px;
`;

export default Test3;
