import React, { useState, useEffect } from "react";
import { MenuOutlined } from "@ant-design/icons";
import styled from "styled-components";

import HeaderBtns from "./HeaderBtn";
import RecentView from "../RecentView";

function SideMenu() {
  const [menuClick, setMenuClick] = useState(false);
  const Btns = HeaderBtns();

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
        menuClick={menuClick}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setMenuClick(false);
          }
        }}
      >
        <div>
          <SideMenuItem>
            <RecentView
              SideMenu={true}
              closeMenu={() => setMenuClick(false)}
              menuClick={menuClick}
            />

            <Btns.HeaderLogInBtn onSideMenu={true} />
            <Btns.HeaderBtn onSideMenu={true} setMenuClick={setMenuClick} />
          </SideMenuItem>
        </div>
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
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

const SideMenuDiv = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100vh;
  width: ${(props) => (props.menuClick ? "100%" : "0")};
  background-color: rgba(102, 102, 102, 0.3);

  & > :first-child {
    position: absolute;

    height: 100%;
    width: ${(props) => (props.menuClick ? "250px" : "0")};
    right: 0;
    top: 50%;

    transform: translate(0%, -50%);
    background-color: rgba(100, 100, 100);
    border-radius: 10px 0px 0px 10px;
    /* overflow: hidden; */
    transition: all ease 0.3s;

    color: white;
  }
`;

const SideMenuItem = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
`;

export default SideMenu;
