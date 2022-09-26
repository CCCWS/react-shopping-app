import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styled, { css } from "styled-components";

import ModalBase from "../ModalBase";

import useAxios from "../../hooks/useAxios";
import useModal from "../../hooks/useModal";

const HeaderBtns = () => {
  const nav = useNavigate();
  const [userAuth, setUserAuth] = useState(false);
  const [userName, setUserName] = useState("");
  const auth = useSelector((auth_user) => auth_user.user.userData);

  useEffect(() => {
    if (auth && auth.isAuth === true) {
      setUserName(auth.name);
      setUserAuth(auth.isAuth);
    }
  }, [auth]);

  const HeaderBtn = ({ onSideMenu, setMenuClick }) => {
    const { openModal, contents, setOpenModal, setContents } = useModal();
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
          setOpenModal(true);
          setContents({
            title: "사용자 확인 불가",
            message: "회원전용 페이지입니다.",
          });
          return;
        }
      }
      nav(`/${e.target.id}`);

      //사이드메뉴가 열려있으면 버튼클릭시 닫음
      if (onSideMenu) {
        setMenuClick(false);
      }
    };

    return (
      <>
        <ModalBase
          contents={contents}
          modalOpen={openModal}
          setModalOpen={setOpenModal}
        />

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
      </>
    );
  };

  const HeaderLogInBtn = ({ onSideMenu }) => {
    const { openModal, contents, setOpenModal, setContents } = useModal();
    const { resData, connectServer } = useAxios("/api/user/logout");

    const onLogin = () => {
      setOpenModal(true);
      setContents({ title: "test", message: "test", login: true });
    };

    const logout = () => {
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
    }, [resData]);

    return (
      <>
        <ModalBase
          contents={contents}
          modalOpen={openModal}
          setModalOpen={setOpenModal}
        />

        {userAuth ? (
          <>
            <HeaderButton sideMenu={onSideMenu} onClick={logout}>
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

  return { HeaderBtn: HeaderBtn, HeaderLogInBtn: HeaderLogInBtn };
};

export default HeaderBtns;

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
    bottom: 0;
    height: 10%;
    width: 0px;
    transition: all ease 0.3s;
    z-index: -1;
  }

  &:hover::before {
    width: 100%;
    border-radius: 0px 5px 5px 0px;
  }
`;
