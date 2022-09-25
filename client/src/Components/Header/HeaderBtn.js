import React from "react";
import { useNavigate } from "react-router-dom";

import styled, { css } from "styled-components";

import ModalBase from "../ModalBase";

import useModal from "../../hooks/useModal";

export const HeaderBtn = React.memo(
  ({ userAuth, onSideMenu, setMenuClick }) => {
    const nav = useNavigate();
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
        id: "cart", //이동할 주소 입력
        value: "장바구니",
      },
      {
        id: "purchaseHistory", //이동할 주소 입력
        value: "구매내역",
      },
      {
        id: "productManagement",
        value: "상품관리",
      },
    ];

    const goPage = (e) => {
      //해당 페이지에 접근시 로그인하지 않으면 접근불가 처리
      if (
        e.target.id === "upload" ||
        e.target.id === "cart" ||
        e.target.id === "purchaseHistory" ||
        e.target.id === "productManagement"
      ) {
        if (!userAuth) {
          return alert("로그인이 필요합니다.");
        }
      }
      nav(`/${e.target.id}`);

      if (onSideMenu) {
        setMenuClick(false);
      }
    };

    return (
      <>
        {btn.map((data) => (
          <HeaderButton
            sideMenu={onSideMenu}
            key={data.id}
            id={data.id}
            className={onSideMenu ? "side-menu-btn" : "btn"}
            onClick={goPage}
          >
            {data.value}
          </HeaderButton>
        ))}
      </>
    );
  }
);

export const HeaderLogInBtn = ({
  onSideMenu,
  setModalOpen,
  userAuth,
  logOut,
}) => {
  const { openModal, contents, setOpenModal, setContents } = useModal();

  const onLogIn = () => {
    setOpenModal(true);
    setContents({ title: "test", message: "test" });
  };
  return (
    <>
      <ModalBase
        contents={contents}
        modalOpen={openModal}
        setModalOpen={setOpenModal}
      />
      {userAuth ? (
        <>
          <HeaderButton
            sideMenu={onSideMenu}
            className={onSideMenu ? "side-menu-btn" : "btn"}
            onClick={logOut}
          >
            로그아웃
          </HeaderButton>
        </>
      ) : (
        <>
          <HeaderButton
            sideMenu={onSideMenu}
            className={onSideMenu ? "side-menu-btn" : "btn"}
            onClick={onLogIn}
          >
            로그인·가입
          </HeaderButton>
        </>
      )}
    </>
  );
};

const HeaderButton = styled.button`
  position: relative;
  background-color: transparent;
  font-size: 1rem;
  margin-right: 20px;
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
    `}

  &::before {
    content: "";
    position: absolute;
    background-color: orange;
    left: 0;
    top: 0;
    height: 100%;
    width: 3px;
    transition: all ease 0.3s;
    z-index: -1;
  }

  &:hover::before {
    width: 100%;
    border-radius: 0px 5px 5px 0px;
  }
`;
