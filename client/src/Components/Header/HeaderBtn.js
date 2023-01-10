import React, { useMemo, useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";

import ModalBase from "../Modal/ModalBase";
import Login from "./LoginModal/Login";
import Toggle from "../Utility/Toggle";

import useModal from "../../hooks/useModal";

import { notificationAction } from "../../store/reducer/notification";
import { logout } from "../../store/reducer/user/user-action";

export const HeaderBtn = React.memo(({ onSideMenu, setMenuClick }) => {
  //헤더 버튼
  const btn = useMemo(
    () => [
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
    ],
    []
  );

  const nav = useNavigate();
  const { pathname } = useLocation();
  const [path, setPath] = useState("");

  const goPage = (e) => {
    nav(`/${e.target.id}`);

    //사이드메뉴가 열려있으면 버튼클릭시 닫음
    onSideMenu && setMenuClick(false);
  };

  const onSetPathName = (e) => {
    if (onSideMenu) return;

    setPath(`/${e.target.id}`);
  };

  //페이지 경로 저장
  //현재 경로와 일치하는 헤더의 버튼에 하단바 표시를 위해 사용
  const onPathName = useCallback(() => {
    if (onSideMenu) return;

    //버튼에서 경로만 모아놓은 배열
    const path = btn.map((data) => `/${data.id}`);

    //현재 페이지가 버튼의 경로에 포함되어 있다면
    if (path.includes(pathname)) {
      setPath(pathname);
    } else {
      setPath(null);
    }
  }, [onSideMenu, pathname, btn]);

  //페이지 이동할때마다 실행
  useEffect(() => {
    onPathName();
  }, [onSideMenu, pathname, onPathName]);

  return (
    <BtnBox pathname={path} sideMenu={onSideMenu}>
      {btn.map((data) => (
        <HeaderButton
          sideMenu={onSideMenu}
          id={data.id}
          key={data.id}
          onClick={goPage}
          onMouseEnter={onSetPathName}
          onMouseLeave={onPathName}
        >
          {data.value}
        </HeaderButton>
      ))}
      <UnderLine path={path} num={1} sideMenu={onSideMenu} />
      <UnderLine path={path} num={2} sideMenu={onSideMenu} />
      <UnderLine path={path} num={3} sideMenu={onSideMenu} />
    </BtnBox>
  );
});

export const HeaderLogInBtn = ({ onSideMenu }) => {
  const dispatch = useDispatch();

  //리덕스 스토어에서 인증정보 확인
  const authCheck = useSelector((state) => state.user.isAuth);

  const { openModal, setOpenModal } = useModal();

  const onLogin = () => {
    setOpenModal(true);
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

const UnderLine = styled.div`
  ${(props) =>
    !props.sideMenu &&
    css`
      position: absolute;
      display: ${(props) => props.path === null && "none"};
      bottom: -5px;
      width: 20%;
      height: 5px;

      left: ${(props) => props.path === "/" && "0%"};
      left: ${(props) => props.path === "/upload" && "20%"};
      left: ${(props) => props.path === "/cart" && "40%"};
      left: ${(props) => props.path === "/purchaseHistory" && "60%"};
      left: ${(props) => props.path === "/productManagement" && "80%"};

      transition: ${(props) => props.num === 1 && "1s"};
      transition: ${(props) => props.num === 2 && "0.7s"};
      transition: ${(props) => props.num === 3 && "0.4s"};

      background-color: ${(props) => props.num === 1 && "var(--orange_hover)"};
      background-color: ${(props) => props.num === 2 && "var(--orange_normal)"};
      background-color: ${(props) => props.num === 3 && "orange"};
    `}
`;

const BtnBox = styled.div`
  ${(props) =>
    !props.sideMenu &&
    css`
      position: relative;
      width: 500px;
      display: flex;
    `}
`;

const HeaderButton = styled.button`
  position: relative;
  background-color: transparent;
  font-size: 1rem;
  width: 100px;
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
      margin-left: 0px;
      padding: 0;

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
    `}
`;
