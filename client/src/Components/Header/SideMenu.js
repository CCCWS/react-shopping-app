import React, { useState, useEffect } from "react";
import { MenuOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { HeaderBtn, HeaderLogInBtn } from "./HeaderBtn";
import RecentView from "../Product/RecentView";

import useTheme from "../../hooks/useTheme";

function SideMenu() {
  const { darkMode } = useTheme();
  const [menuClick, setMenuClick] = useState(false);

  useEffect(() => {
    const escapeCheck = (e) => {
      if (e.key === "Escape") {
        setMenuClick(false);
      }
    };

    if (menuClick) {
      //sideMenu가 열려있을때는 body의 클래스에 "not-scroll"
      //"not-scroll"는 app.js에서 작성된 css
      document.querySelector("body").classList.toggle("not-scroll");

      //열려있을때만 이벤트 추가
      //esc클릭시 메뉴 닫기
      window.addEventListener("keydown", escapeCheck);
      return () => window.removeEventListener("keydown", escapeCheck);
    }

    if (menuClick === false) {
      document.querySelector("body").classList.remove("not-scroll");
    }
  }, [menuClick]);

  return (
    <>
      <SideMenuOpenBtn onClick={() => setMenuClick(true)}>
        <MenuOutlined />
      </SideMenuOpenBtn>

      <SideMenuDiv
        darkMode={darkMode}
        menuClick={menuClick}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setMenuClick(false);
          }
        }}
      >
        <SideMenuItem>
          {menuClick && (
            <>
              <RecentView SideMenu={true} setMenuClick={setMenuClick} />
              <HeaderLogInBtn onSideMenu={true} />
              <HeaderBtn onSideMenu={true} setMenuClick={setMenuClick} />
            </>
          )}
        </SideMenuItem>
      </SideMenuDiv>
    </>
  );
}

const SideMenuOpenBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 30px;
  height: 30px;

  font-size: 20px;
  margin-right: 10px;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
    background-color: var(--white);
  }
`;

const SideMenuDiv = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100vh;
  width: ${(props) => (props.menuClick ? "100%" : "0")};
  background-color: var(--gray_transparency);
  /* backdrop-filter: blur(20px); */

  & > :first-child {
    position: absolute;

    height: 100%;
    width: ${(props) => (props.menuClick ? "250px" : "0")};
    right: 0;
    top: 50%;

    transform: translate(0%, -50%);
    background-color: ${(props) =>
      props.darkMode ? "var(--black)" : "var(--white)"};
    border-radius: 10px 0px 0px 10px;
    transition: all ease 0.3s;
    /* overflow: hidden; */
  }
`;

const SideMenuItem = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export default React.memo(SideMenu);
