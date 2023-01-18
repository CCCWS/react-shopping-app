import React, { useState } from "react";
import styled, { css } from "styled-components";

const Selector = ({ types, onClickType, currType }) => {
  return (
    <SelectorDiv>
      {types.map((item) => (
        <Type
          key={item.id}
          onClick={() => onClickType(item.id)}
          componentType={item.id}
          currType={currType}
        >
          {item.name}
        </Type>
      ))}
    </SelectorDiv>
  );
};

const SelectorDiv = styled.div`
  width: 100%;
  height: 30px;
  background-color: #1e821e;
  /* background-color: blue; */

  display: flex;
`;

const Type = styled.div`
  color: white;

  width: inherit;
  height: inherit;

  display: flex;
  justify-content: center;
  /* align-items: center; */

  opacity: 0.8;

  &:hover {
    opacity: 1;
    font-weight: 600;
    cursor: pointer;
  }

  ${(props) =>
    props.componentType === props.currType &&
    css`
      opacity: 1;
      font-weight: 600;
      border-bottom: 5px solid white;
    `}
`;

export default Selector;
