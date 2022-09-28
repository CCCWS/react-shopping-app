import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components";

import { postUrl } from "../PostUrl";

function RecentView({ SideMenu, setMenuClick, menuClick }) {
  const { id } = useParams();
  const nav = useNavigate();
  const [histoty, setHistory] = useState([]);

  useEffect(() => {
    const getProductHistory = JSON.parse(
      localStorage.getItem("productHistory")
    );
    if (getProductHistory !== null) {
      setHistory(getProductHistory);
    }
  }, [id, menuClick]);

  return (
    <>
      {SideMenu ? (
        <>
          <Div>최근본상품</Div>
          <SideDiv>
            {histoty.length === 0 ? (
              <Div empty={true}>최근본상품이 없습니다.</Div>
            ) : (
              <>
                {histoty.map((data) => (
                  <SideImg key={data.id}>
                    <Image
                      img={`url('${postUrl}${data.image}')`}
                      onClick={() => {
                        nav(`/product/${data.id}`);
                        setMenuClick(false);
                      }}
                    />
                  </SideImg>
                ))}
              </>
            )}
          </SideDiv>
        </>
      ) : (
        <RecentViewBox>
          <div>
            <Div>최근본상품</Div>
            {histoty.length === 0 ? (
              <Div empty={true}>최근본상품이 없습니다.</Div>
            ) : (
              <>
                {histoty.map((data) => (
                  <React.Fragment key={data.id}>
                    <Image
                      img={`url('${postUrl}${data.image}')`}
                      onClick={() => {
                        nav(`/product/${data.id}`);
                      }}
                    />
                  </React.Fragment>
                ))}
              </>
            )}

            <Div goTop={true} onClick={() => window.scroll(0, 0)}>
              맨위로
            </Div>
          </div>
        </RecentViewBox>
      )}
    </>
  );
}

const RecentViewBox = styled.div`
  background-color: red;
  position: absolute;
  right: -50px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > :first-child {
    top: 60px;
    width: 100px;
    position: fixed;
  }

  @media (max-width: 1100px) {
    display: none;
  }
`;

const Div = styled.div`
  display: flex;
  justify-content: center;

  width: ${(props) => (props.empty ? "100%" : "6rem")};
  font-size: ${(props) => (props.empty ? "0.8rem" : "1rem")};
  border-radius: 5px;
  padding: 0.5rem;

  color: black;
  background-color: ${(props) =>
    props.empty ? "rgba(200, 200, 200, 0.5)" : "rgba(200, 200, 200, 0.9)"};

  ${(props) =>
    props.empty &&
    css`
      margin-top: 0.7em;
      margin-bottom: 0.7rem;
      white-space: pre-line;
      align-items: center;
    `}

  ${(props) =>
    props.goTop &&
    css`
      &:hover {
        cursor: pointer;
      }
    `}
`;

const Image = styled.div`
  background-image: ${(props) => props.img};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  width: 100%;
  height: 100px;

  border-radius: 10px;
  border: 3px solid rgb(253, 253, 253);

  &:hover {
    cursor: pointer;
    border: 3px solid orange;
    transition: all ease 0.5s;
  }
`;

const SideDiv = styled.div`
  width: 250px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
`;

const SideImg = styled.div`
  width: 40%;
  margin: 5px;
`;

export default React.memo(RecentView);
