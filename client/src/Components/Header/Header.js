import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux"; ////

import { useNavigate } from "react-router-dom";

import SideMenu from "./SideMenu";
import { HeaderBtn, HeaderLogInBtn } from "./HeaderBtn";

import useAxios from "../../hooks/useAxios"; ////

import "./Header.css";

function Header() {
  const nav = useNavigate(); ////
  const [userAuth, setUserAuth] = useState(false); 
  const [userName, setUserName] = useState("");
  const auth = useSelector((auth_user) => auth_user.user.userData); //redux에 담긴 데이터를 가져옴

  const [menuClick, setMenuClick] = useState(false);
  const [checkSideMenu, setCheckSideMenu] = useState(
    window.innerWidth >= 800 ? false : true
  );

  const { resData, connectServer } = useAxios("/api/user/logout");

  //auth값이 있다면 > 로그인이 되어 있다면
  useEffect(() => {
    if (auth && auth.isAuth === true) {
      setUserName(auth.name);
      setUserAuth(auth.isAuth);
    }
  }, [auth]);

  const logOut = () => {
    connectServer();
  };

  useEffect(() => {
    if (resData) {
      if (resData.success) {
        setUserAuth(false);
        setUserName("");
        localStorage.removeItem("userId");
        nav("/");
        window.location.reload();
      } else {
        alert("fail");
      }
    }
  }, [nav, resData]);

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

  console.log(checkSideMenu);
  return (
    <>
      <div className="header">
        <div className="header-left">
          <span className="logoImg">로고</span>

          {!checkSideMenu && (
            <HeaderBtn userAuth={userAuth} checkSideMenu={checkSideMenu} />
          )}
        </div>

        <div className="header-right">
          {checkSideMenu ? (
            <>
              <SideMenu
                menuClick={menuClick}
                setMenuClick={setMenuClick}
                userAuth={userAuth}
                logOut={logOut}
              />
            </>
          ) : (
            <>
              <HeaderLogInBtn userAuth={userAuth} logOut={logOut} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default React.memo(Header);
