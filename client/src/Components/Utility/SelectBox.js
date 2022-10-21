import React, { useEffect, useRef, useState } from "react";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import styled from "styled-components";

function SelectBox({ data, setData, edit, initData }) {
  const selectRef1 = useRef();
  const selectRef2 = useRef();

  const [title, setTitle] = useState(data[0].name);
  const [click, setClick] = useState(false);

  const select = (e) => {
    setTitle(e.target.innerText);
    setData(e.target.id);
    setClick(!click);
  };

  useEffect(() => {
    const clickOutside = ({ target }) => {
      if (
        click &&
        !selectRef1.current.contains(target) &&
        !selectRef2.current.contains(target)
      )
        setClick(false);
    };

    window.addEventListener("click", clickOutside);
    return () => {
      window.removeEventListener("click", clickOutside);
    };
  }, [click]);

  useEffect(() => {
    if (edit) setTitle(initData);
  }, []);

  return (
    <Div onClick={() => setClick(!click)} ref={selectRef1}>
      {title}
      <Icons>{click ? <CaretUpFilled /> : <CaretDownFilled />}</Icons>

      <Ul
        open={click}
        // className={[`${click ? "select-value-open" : "select-value-close"}`]}
        onChange={select}
        ref={selectRef2}
      >
        {data.map((item) => (
          <Li onClick={select} key={item.id} id={item.value}>
            {item.name}
          </Li>
        ))}
      </Ul>
    </Div>
  );
}

const Div = styled.div`
  width: 10rem;
  height: 2.5rem;
  font-size: 1rem;
  background-color: rgba(255, 166, 0, 0.3);

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
  margin: 0.3rem;
  transition: all ease 0.3s;

  &:hover {
    cursor: pointer;
    background-color: rgba(255, 166, 0, 0.6);
  }
`;

//글자옆 화살표 아이콘
const Icons = styled.div`
  position: absolute;
  right: 5px;
`;

const Ul = styled.ul`
  position: absolute;
  width: 100%;
  top: 3rem;
  padding: 0px;
  padding: ${(props) => props.open && "0.5rem"};
  max-height: ${(props) => (props.open ? "15rem" : "0px")};
  background-color: white;
  border: ${(props) =>
    props.open
      ? "2px solid rgba(255, 166, 0, 0.3);"
      : "0px solid rgba(255, 166, 0, 0.3);"};
  list-style: none;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  z-index: 10;
  border-radius: 5px;
  transition: all ease 0.3s;
  overflow: overlay;

  backdrop-filter: blur(10px);

  &::-webkit-scrollbar {
    width: 0px;
  }

  &:hover::-webkit-scrollbar {
    width: 5px;
  }
`;

const Li = styled.li`
  margin-top: 0.3rem;
  margin-top: 0.3rem;
  padding: 0.6rem;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 5px;

  transition: all ease 0.3s;

  &:hover {
    cursor: pointer;
    background-color: rgba(255, 166, 0, 0.3);
  }
`;

export default React.memo(SelectBox);
