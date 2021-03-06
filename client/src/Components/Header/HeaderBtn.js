import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function HeaderBtn({ onSideMenu, setMenuClick }) {
  const nav = useNavigate();
  const user = useSelector((state) => state.user.userData);

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

  const goPage = (event) => {
    if (
      event.target.id === "upload" ||
      event.target.id === "cart" ||
      event.target.id === "purchaseHistory" ||
      event.target.id === "productManagement"
    ) {
      if (user.isAuth === false) {
        return alert("로그인이 필요합니다.");
      }
    }
    nav(`/${event.target.id}`);
    if (onSideMenu) {
      setMenuClick(false);
    }
  };

  return (
    <>
      {btn.map((data) => (
        <button
          key={data.id}
          id={data.id}
          className={onSideMenu ? "side-menu-btn" : "btn"}
          onClick={goPage}
        >
          {data.value}
          {onSideMenu && <span />}
        </button>
      ))}
    </>
  );
}

export function HeaderLogInBtn({ onSideMenu, setModalOpen, userAuth, logOut }) {
  const onLogIn = () => {
    setModalOpen(true);
  };
  return (
    <>
      {userAuth ? (
        <>
          <button
            className={onSideMenu ? "side-menu-btn" : "btn"}
            onClick={logOut}
          >
            로그아웃
            {onSideMenu && <span />}
          </button>
        </>
      ) : (
        <>
          <button
            className={onSideMenu ? "side-menu-btn" : "btn"}
            onClick={onLogIn}
          >
            로그인·가입
            {onSideMenu && <span />}
          </button>
        </>
      )}
    </>
  );
}
