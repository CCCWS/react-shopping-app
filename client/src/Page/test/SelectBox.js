import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

function SelectBox({
  dataArr,
  width,
  selectValue,
  setSelectValue,
  slide,
  fade,
}) {
  const selectRef1 = useRef();
  const selectRef2 = useRef();

  const [open, setOpen] = useState(false);

  const select = (e) => {
    setSelectValue(e.target.innerText);
    setOpen(false);
  };

  useEffect(() => {
    const clickOutside = ({ target }) => {
      if (
        open &&
        !selectRef1.current.contains(target) &&
        !selectRef2.current.contains(target)
      )
        setOpen(false);
    };

    window.addEventListener("click", clickOutside);
    return () => {
      window.removeEventListener("click", clickOutside);
    };
  }, [open]);

  return (
    <Div width={width} onClick={() => setOpen(!open)} ref={selectRef1}>
      {selectValue}

      <Ul open={open} ref={selectRef2} slide={slide} fade={fade}>
        {dataArr.map((item, index) => (
          <>
            {open && (
              <Li onClick={select} key={index}>
                {item}
              </Li>
            )}
          </>
        ))}
      </Ul>
    </Div>
  );
}

const Div = styled.div`
  width: ${(props) => props.width};
  padding: 0.5rem;

  font-size: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.2);

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 3px;
  margin: 0.3rem;
  transition: all ease 0.2s;

  &:hover {
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.5);
  }
`;

const Ul = styled.ul`
  position: absolute;
  width: 100%;
  top: calc(100% + 10px);
  padding: 0px;

  border: none;
  list-style: none;

  z-index: 99;
  border-radius: 3px;
  transition: 0.5s;
  box-shadow: ${(props) =>
    props.open ? "0px 0px 10px 0px rgba(0, 0, 0, 0.1)" : "none"};

  overflow-y: scroll;

  ${(props) =>
    props.slide &&
    css`
      max-height: ${(props) => (props.open ? "15rem" : "0px")};
    `}

  ${(props) =>
    props.fade &&
    css`
      opacity: ${(props) => (props.open ? "1" : "0")};
      max-height: 15rem;
    `}

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const Li = styled.li`
  padding: 1rem;
  font-size: 1rem;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: all ease 0.2s;

  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export default SelectBox;
