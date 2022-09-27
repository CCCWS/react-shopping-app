import { useEffect } from "react";
import styled from "styled-components";
import ReactDom from "react-dom";
import React from "react";
import { useNavigate } from "react-router-dom";

import Login from "./Header/LoginModal/Login";

const Modal = ({ contents, modalOpen, setModalOpen }) => {
  const nav = useNavigate();

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
    <ModalDiv
      modalOpen={modalOpen}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setModalOpen(false);
        }
      }}
    >
      <div>
        {contents.login ? (
          <Login />
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
    </ModalDiv>,
    document.querySelector("#modal-portal")
  );
};

const ModalDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  opacity: ${(props) => (props.modalOpen ? "1" : "0")};
  z-index: ${(props) => (props.modalOpen ? "1000" : "-10")};

  justify-content: center;
  align-items: center;

  transition: 0.3s;

  & > :first-child {
    background-color: rgba(245, 245, 245);
    border: 3px solid white;
    width: 300px;
    border-radius: 15px;
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
  background-color: rgba(255, 166, 0, 0.829);
  padding: 0.7rem;
  font-size: 20px;
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
    background-color: rgba(255, 0, 0, 0.5);
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
