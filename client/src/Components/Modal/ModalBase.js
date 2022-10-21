import { useEffect } from "react";
import styled from "styled-components";
import ReactDom from "react-dom";
import React from "react";
import { useNavigate } from "react-router-dom";

import useTheme from "../../hooks/useTheme";

const Modal = ({ PropComponent, contents, modalOpen, setModalOpen }) => {
  //PropComponent > 기본 템플릿을 쓰지않고 다른 형태로 사용하려할때
  //                모달창을 열고자하는 스크립트에서 필요한 컴포넌트를 전달하고
  //                전달받은 컴포넌트를 랜더링함.

  const nav = useNavigate();
  const { darkMode } = useTheme();

  useEffect(() => {
    if (modalOpen === true) {
      const escapeCheck = (e) => {
        if (e.key === "Escape") {
          setModalOpen(false);
        }
      };
      window.addEventListener("keydown", escapeCheck);
      return () => window.removeEventListener("keydown", escapeCheck);
    }
  }, [modalOpen, setModalOpen]);

  return ReactDom.createPortal(
    <>
      <ModalDiv
        darkMode={darkMode}
        modalOpen={modalOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setModalOpen(false);
          }
        }}
      >
        {modalOpen && (
          <div>
            {PropComponent ? (
              <PropComponent />
            ) : (
              <ModalContents>
                <Header>
                  <div>{contents.title}</div>
                </Header>

                <Message>
                  <div>{contents.message}</div>
                </Message>
              </ModalContents>
            )}

            <Footer>
              {contents.cartBtn && (
                <Button onClick={() => nav("/cart")}>장바구니 이동</Button>
              )}

              {contents.cartPage && (
                <Button
                  onClick={() => {
                    contents.delFunc();
                    setModalOpen(false);
                  }}
                >
                  삭제
                </Button>
              )}

              <Button onClick={() => setModalOpen(false)}>닫기</Button>
            </Footer>
          </div>
        )}
      </ModalDiv>
    </>,
    document.querySelector("#modal-portal")
  );
};

const ModalDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  backdrop-filter: blur(10px);

  display: flex;
  opacity: ${(props) => (props.modalOpen ? "1" : "0")};
  z-index: ${(props) => (props.modalOpen ? "1000" : "-10")};

  justify-content: center;
  align-items: center;

  transition: 0.3s;

  & > :first-child {
    background-color: ${(props) => (props.darkMode ? "black" : "white")};
    border: 3px solid var(--orange_normal);
    min-width: 300px;
    border-radius: 20px;
    z-index: 100;
    overflow: hidden;
    position: relative;
    font-size: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (max-width: 350px) {
      width: 90%;
    }
  }
`;

const ModalContents = styled.div`
  height: 8rem;
`;

const Header = styled.header`
  background-color: var(--orange_normal);
  padding: 0.6rem;
  font-size: 1.2rem;
`;

const Message = styled.div`
  padding: 1rem;
`;

const Footer = styled.footer`
  width: 100%;
  display: flex;
`;

const Button = styled.button`
  position: relative;
  background-color: rgba(100, 100, 100, 0.3);
  width: 100%;
  height: 2.5rem;
  border: none;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    background-color: var(--red_transparency);
    left: 0;
    bottom: 0;
    height: 0;
    width: 100%;
    transition: all ease 0.2s;
    z-index: -1;
  }

  &:hover::before {
    height: 100%;
  }
`;

export default React.memo(Modal);
