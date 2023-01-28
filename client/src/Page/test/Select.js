import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

function SelectBox({
  dataArr,
  width,
  selectValue,
  setSelectValue,
  slide,
  fade,
  searchBar,
}) {
  const selectRef1 = useRef();
  const selectRef2 = useRef();

  const [click, setClick] = useState(false);
  const [searchValue, setSearchValue] = useState("");

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

  const select = (e) => {
    setSelectValue(e.target.innerText);
    setClick(!click);

    searchValue.length > 0 && setSearchValue("");
  };

  const onClickClose = (e) => {
    e.target === e.currentTarget && setClick(!click);
    searchValue.length > 0 && setSearchValue("");
  };

  const onSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <Div width={width}>
      <CurrSelect onClick={onClickClose} ref={selectRef1}>
        {selectValue}
      </CurrSelect>

      <Ul open={click} ref={selectRef2} slide={slide} fade={fade}>
        {click && (
          <>
            {searchBar && (
              <Input>
                <input
                  placeholder="SEARCH"
                  onChange={onSearchValue}
                  value={searchValue}
                />
              </Input>
            )}

            {dataArr.map((item, index) => (
              <React.Fragment key={index}>
                {item.includes(searchValue) && <Li onClick={select}>{item}</Li>}
              </React.Fragment>
            ))}
          </>
        )}
      </Ul>
    </Div>
  );
}

const Div = styled.div`
  position: relative;
  width: ${(props) => props.width};
`;

const CurrSelect = styled.div`
  width: 100%;

  padding: 0.5rem;
  font-size: 1rem;

  background-color: white;
  color: black;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  transition: 0.2s;

  &:hover {
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.5);
  }
`;

const Ul = styled.ul`
  width: 100%;
  padding: 0px;

  position: absolute;
  top: calc(100% + 10px);

  background-color: white;
  border: none;
  list-style: none;
  border-radius: 3px;

  box-shadow: ${(props) => (props.open ? "0 0 5px gray;" : "none")};
  transition: 0.4s;
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
    width: 3px;
  }
`;

const Li = styled.li`
  width: 100%;

  padding: 0.8rem;
  font-size: 1rem;

  color: black;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: all ease 0.3s;

  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Input = styled.div`
  position: sticky;
  top: 10px;
  width: 100%;
  margin-bottom: 10px;
  margin-top: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  input {
    width: 80%;
    border-radius: 50px;
    padding: 5px 5px 5px 10px;
    border: none;
    background-color: #c8c8c8;

    &:focus {
      outline: none;
      box-shadow: 0 0 5px gray;
    }
  }
`;

export default SelectBox;
