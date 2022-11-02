import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition"; // import "./Test2.css";

function Test2() {
  const header = [
    {
      id: new Date().getTime(),
      title: "제목1",
      subTitle: ["서브1", "서브2", "서브3"],
    },
    {
      id: new Date().getTime(),
      title: "제목2",
      subTitle: ["서브1", "서브2", "서브3", "서브4", "서브5", "서브6"],
    },
    {
      id: new Date().getTime(),
      title: "제목3",
      subTitle: ["서브1", "서브2"],
    },
    {
      id: new Date().getTime(),
      title: "제목4",
      subTitle: ["서브1", "서브2", "서브3", "서브4"],
    },
    {
      id: new Date().getTime(),
      title: "제목5",
      subTitle: ["서브1", "서브2", "서브3"],
    },
    {
      id: new Date().getTime(),
      title: "제목6",
      subTitle: ["서브1", "서브2", "서브3", "서브4", "서브5"],
    },
  ];

  const [open, setOpen] = useState(false);
  return (
    <Page>
      <Div>
        {header.map((item) => (
          <Section>
            <Title>{item.title}</Title>

            <Ul>
              {item.subTitle.map((item) => (
                <Li onClick={() => alert(item)}>{item}</Li>
              ))}
            </Ul>
          </Section>
        ))}
        <Underline />
      </Div>

      <TTTT>
        <Test onClick={() => setOpen(!open)} open={open}></Test>
      </TTTT>
    </Page>
  );
}

const TTTT = styled.section`
  width: 500px;
  height: 500px;
  background-color: blue;
  position: relative;
`;

const Test = styled.div`
  width: ${(props) => (props.open ? "300px" : "50px")};
  height: ${(props) => (props.open ? "100px" : "50px")};
  background-color: red;
  border-radius: 10px;

  /* transform: ${(props) => props.open && "translate(50%, 50%)"}; */
  ${(props) =>
    props.open &&
    css`
      transform: translate(10%, 10%);
    `}

  transition: all ease 0.5s;
`;

const Page = styled.div`
  width: 100%;
  height: 90vh;
  background-color: gray;
  /* padding: 100px; */
`;

const Div = styled.div`
  position: relative;
  width: inherit;
  height: 50px;

  display: flex;
  justify-content: space-between;

  overflow-y: hidden;
  background-color: var(--gray_transparency);
  transition: all ease 0.3s;

  &:hover {
    background-color: var(--gray);
    height: 400px;
  }
`;

const Section = styled.section`
  width: 100%;

  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
  min-height: 50px;
  width: 100%;

  &:hover {
  }
`;

const Ul = styled.ul`
  padding: 0;
  /* padding: 1rem; */
`;

const Li = styled.li`
  list-style: none;
  padding: 1rem;
`;

const Underline = styled.div`
  position: absolute;
  left: 0;
  top: 0px;
  width: 16%;
  height: 5px;
  background: #333;
  transition: all 0.3s ease-in-out;
`;

export default Test2;
