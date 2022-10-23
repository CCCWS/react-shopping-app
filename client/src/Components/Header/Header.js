import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import SideMenu from "./SideMenu";
import HeaderBtns from "./HeaderBtn";
import Notification from "../Utility/Notification";

function Header() {
  const notification = useSelector((state) => state.notification.notification);
  const [checkSideMenu, setCheckSideMenu] = useState(
    window.innerWidth >= 800 ? false : true
  );
  const Btns = HeaderBtns();

  //화면의 크기를 감지하여 800이하일 경우 sideMenu를 표시함
  //화면크기가 변할때마다 그 수치를 state에 저장하면 매번 재랜더링이 발생하지만
  //boolean타입으로 조건에 해당할때만 state를 변경시켜서 재랜더링 발생 빈도를 줄임
  window.onresize = () => {
    if (window.innerWidth <= 800) {
      setCheckSideMenu(true);
    } else {
      setCheckSideMenu(false);
    }
  };

  return (
    <>
      {notification && <Notification notification={notification} />}
      <HeaderDiv>
        <HeaderSection>
          <HeaderLogo>로고</HeaderLogo>
          {!checkSideMenu && <Btns.HeaderBtn />}
        </HeaderSection>

        <HeaderSection>
          {checkSideMenu ? <SideMenu /> : <Btns.HeaderLogInBtn />}
        </HeaderSection>
      </HeaderDiv>
    </>
  );
}

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: sticky;
  backdrop-filter: blur(20px);
  padding: 1rem;
  border-bottom: 2px solid var(--orange_normal);

  top: 0;
  width: 100%;
  height: 50px;
  z-index: 20;
`;

const HeaderLogo = styled.span`
  padding-right: 10px;
  font-size: 25px;
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
`;

export default Header;
