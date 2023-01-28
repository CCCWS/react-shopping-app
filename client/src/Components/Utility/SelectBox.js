import React, { useEffect, useRef, useState } from "react";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import styled from "styled-components";
import { useSelector } from "react-redux";

function SelectBox({ data, setData, edit, initData }) {
  const selectRef1 = useRef();
  const selectRef2 = useRef();

  const [title, setTitle] = useState(data[0].name);
  const [click, setClick] = useState(false);
  const darkMode = useSelector((state) => state.darkMode.darkMode);

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
  }, [edit, initData]);

  return (
    <Div onClick={() => setClick(!click)} ref={selectRef1}>
      {title}
      <Icons>{click ? <CaretUpFilled /> : <CaretDownFilled />}</Icons>

      <Ul open={click} onChange={select} ref={selectRef2} darkMode={darkMode}>
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
  width: 8rem;
  height: 2.5rem;
  font-size: 1rem;
  background-color: var(--orange_normal);

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
  margin: 0.3rem;
  transition: all ease 0.3s;

  &:hover {
    cursor: pointer;
    background-color: var(--orange_hover);
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
  max-height: ${(props) => (props.open ? "12rem" : "0px")};
  border: ${(props) =>
    props.open
      ? "2px solid var(--orange_normal);"
      : "0px solid var(--orange_normal);"};
  list-style: none;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  z-index: 10;
  border-radius: 5px;
  transition: all ease 0.4s;
  overflow: overlay;

  background-color: ${(props) =>
    props.darkMode ? "var(--black)" : "var(--white)"};

  &::-webkit-scrollbar {
    width: 0px;
  }

  &:hover::-webkit-scrollbar {
    width: 2px;
  }
`;

const Li = styled.li`
  margin-top: 0.3rem;
  margin-top: 0.3rem;
  padding: 0.6rem;
  width: 100%;
  font-size: 0.9rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 5px;

  transition: all ease 0.3s;

  /* background-color: red; */

  &:hover {
    cursor: pointer;
    background-color: var(--orange_hover);
  }
`;

export default React.memo(SelectBox);
