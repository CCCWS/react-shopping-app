import React, { useEffect, useState } from "react";
import axios from "axios";
import styled, { css } from "styled-components";

const Test4 = () => {
  const [monster, setMonster] = useState([]);
  const [loading, setLoading] = useState(true);
  const [click, setClick] = useState(false);
  useEffect(() => {
    const getApi = async () => {
      const res = await axios.get("https://mhw-db.com/monsters");
      setMonster(res.data);
      setLoading(false);
    };

    getApi();
  }, []);
  return (
    <>
      {/* {loading ? (
        <div>로딩중</div>
      ) : (
        <>
          {monster.map((data) => (
            <div key={data.id}>{data.name}</div>
          ))}
        </>
      )} */}
      <Box onClick={() => setClick((prev) => !prev)} click={click}>
        <div />
        <div />
        <div />
      </Box>
    </>
  );
};

const Box = styled.div`
  margin: 50px;
  width: 30px;
  height: 30px;
  /* transform: scale(1.1); */

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  div {
    transition: 0.5s;
    width: 100%;
    height: 5px;
    background-color: var(--gray);
    border-radius: 30px;

    transform-origin: 4px 0px;
  }

  &:hover {
    cursor: pointer;
  }

  ${(props) =>
    props.click &&
    css`
      & > :first-child {
        transform: rotate(45deg) translate(4px, -4px);
        transform-origin: 0% 0%;
        width: 100%;
      }

      & > :nth-child(2) {
        opacity: 0;
      }

      & > :last-child {
        transform: rotate(-45deg) translate(4px, 4px);
        transform-origin: 0% 100%;
        width: 100%;
      }
    `}
`;

export default Test4;
