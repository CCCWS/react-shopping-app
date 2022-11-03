import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition"; // import "./Test2.css";
import { useInView } from "react-intersection-observer";

function Test2() {
  const header = [
    {
      id: 0,
      title: "제목1",
      subTitle: ["서브1", "서브2", "서브3"],
    },
    {
      id: 1,
      title: "제목2",
      subTitle: ["서브1", "서브2", "서브3", "서브4", "서브5", "서브6"],
    },
    {
      id: 2,
      title: "제목3",
      subTitle: ["서브1", "서브2"],
    },
    {
      id: 3,
      title: "제목4",
      subTitle: ["서브1", "서브2", "서브3", "서브4"],
    },
    {
      id: 4,
      title: "제목5",
      subTitle: ["서브1", "서브2", "서브3"],
    },
    {
      id: 5,
      title: "제목6",
      subTitle: ["서브1", "서브2", "서브3", "서브4", "서브5"],
    },
  ];

  const [open, setOpen] = useState(false);
  const [ref1, inView1] = useInView();
  const [ref2, inView2] = useInView();
  const [ref3, inView3] = useInView();
  const [ref4, inView4] = useInView();
  const [ref5, inView5] = useInView();
  const [ref6, inView6] = useInView();

  return (
    <Page>
      <Div>
        {header.map((item) => (
          <Section key={item.id}>
            {/* <Title>{item.title}</Title>

            <Ul>
              {item.subTitle.map((item) => (
                <Li onClick={() => alert(item)}>{item}</Li>
              ))}
            </Ul> */}
          </Section>
        ))}
        <Underline />
      </Div>

      <Test onClick={() => setOpen(!open)} open={open}></Test>

      <Item ref={ref1} inView={inView1}>
        테스트테스트
      </Item>
      <Item2 ref={ref2} inView={inView2}>
        asdfasdfasdfasdf
      </Item2>

      {/* <Item ref={ref2} inView={inView2}>
        테스트테스트
      </Item>
      <Item ref={ref3} inView={inView3}>
        테스트테스트
      </Item>
      <Item ref={ref4} inView={inView4}>
        테스트테스트
      </Item>
      <Item ref={ref5} inView={inView5}>
        테스트테스트
      </Item>
      <Item ref={ref6} inView={inView6}>
        테스트테스트
      </Item> */}
    </Page>
  );
}

const Item = styled.div`
  width: 100%;
  height: 100px;
  /* margin-bottom: 1500px; */
  display: flex;
  justify-content: center;
  font-size: 5rem;
  align-items: center;
  opacity: ${(props) => (props.inView ? "1" : "0")};
  /* transform: ${(props) => props.inView && "rotate(360deg)"}; */
  transform: ${(props) =>
    props.inView ? "translateY(0px)" : "translateY(-100px)"};
  /* transform: translateY(50px); */
  transition: all ease 1.5s;
`;

const Item2 = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  opacity: ${(props) => (props.inView ? "1" : "0")};
  transition: all ease 5s;
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
  height: 1000vh;
  background-color: gray;
  overflow-y: hidden;
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
