import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";

import ModalBase from "../Modal/ModalBase";
import Login from "./LoginModal/Login";
import Toggle from "../Utility/Toggle";

import useModal from "../../hooks/useModal";

import { notificationAction } from "../../store/reducer/notification";
import { pathnameAction } from "../../store/reducer/pathname";
import { logout } from "../../store/reducer/user/user-action";

export const HeaderBtn = ({ onSideMenu, setMenuClick }) => {
  const btn = [
    {
      id: "",
      value: "홈",
    },
    {
      id: "upload", //이동할 주소 입력
      value: "판매하기",
    },
    {
      id: "cart",
      value: "장바구니",
    },
    {
      id: "purchaseHistory",
      value: "구매내역",
    },
    {
      id: "productManagement",
      value: "상품관리",
    },
  ];

  const nav = useNavigate();
  const { pathname } = useLocation();
  const [path, setPath] = useState("");

  const goPage = (e) => {
    nav(`/${e.target.id}`);
    //사이드메뉴가 열려있으면 버튼클릭시 닫음

    if (onSideMenu) {
      setMenuClick(false);
    }
  };

  useEffect(() => {
    const path = [
      "/",
      "/upload",
      "/cart",
      "/purchaseHistory",
      "/productManagement",
    ];

    if (path.includes(pathname)) {
      setPath(pathname);
    } else {
      setPath(null);
    }
  }, [pathname]);

  return (
    <ButtonBox pathname={path} sideMenu={onSideMenu}>
      {btn.map((data) => (
        <HeaderButton
          sideMenu={onSideMenu}
          key={data.id}
          id={data.id}
          onClick={goPage}
        >
          {data.value}
        </HeaderButton>
      ))}
    </ButtonBox>
  );
};

export const HeaderLogInBtn = ({ onSideMenu }) => {
  const dispatch = useDispatch();
  const authCheck = useSelector((state) => state.user.isAuth);
  const { openModal, setOpenModal, setContents } = useModal();

  const onLogin = () => {
    setOpenModal(true);
    setContents({ login: true });
  };

  const onLogout = () => {
    dispatch(logout()).then((res) => {
      if (res) {
        dispatch(
          notificationAction.setNotification({
            status: "success",
            message: "로그아웃",
          })
        );
      }
    });
  };

  return (
    <>
      <ModalBase modalOpen={openModal} setModalOpen={setOpenModal}>
        <Login setOpenModal={setOpenModal} />
      </ModalBase>

      <Toggle />

      {authCheck ? (
        <>
          <HeaderButton sideMenu={onSideMenu} onClick={onLogout}>
            로그아웃
          </HeaderButton>
        </>
      ) : (
        <>
          <HeaderButton sideMenu={onSideMenu} onClick={onLogin}>
            로그인·가입
          </HeaderButton>
        </>
      )}
    </>
  );
};

const ButtonBox = styled.div`
  position: relative;

  ${(props) =>
    props.sideMenu
      ? null
      : css`
          &::before {
            position: absolute;
            content: "";
            top: 0px;

            width: ${(props) => (props.pathname === "/" ? "2rem" : "5rem")};
            height: 100%;
            border-radius: 100px;
            background-color: var(--orange_normal);
            display: ${(props) => props.pathname === null && "none"};

            /* transform: translateX(5px); */
            transform: ${(props) =>
              props.pathname === "/" && "translateX(0rem)"};
            transform: ${(props) =>
              props.pathname === "/upload" && "translateX(1.8rem)"};
            transform: ${(props) =>
              props.pathname === "/cart" && "translateX(6.6rem)"};
            transform: ${(props) =>
              props.pathname === "/purchaseHistory" && "translateX(11.4rem)"};
            transform: ${(props) =>
              props.pathname === "/productManagement" && "translateX(16.2rem)"};

            transition: all ease 0.5s;
          }
        `}
`;

const HeaderButton = styled.button`
  position: relative;
  background-color: transparent;
  font-size: 1rem;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  /* margin-right: 20px; */
  border: none;
  z-index: 1;
  cursor: pointer;

  ${(props) =>
    props.sideMenu &&
    css`
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 200px;
      min-height: 50px;
      margin-bottom: 20px;
      margin-right: 0px;
    `}

  &::before {
    content: "";
    position: absolute;
    background-color: var(--orange_normal);
    left: 0;
    bottom: -3px;
    height: 8%;
    width: 0px;
    transition: all ease 0.3s;
    z-index: -1;
  }

  &:hover::before {
    width: 100%;
    border-radius: 0px 5px 5px 0px;
  }
`;
