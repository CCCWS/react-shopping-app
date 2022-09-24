import { useEffect } from "react";
import styled from "styled-components";
import ReactDom from "react-dom";
import React from "react";
import { useNavigate } from "react-router-dom";

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
        <Header>
          <div>{contents.title}</div>
        </Header>

        <Message>
          <p>{contents.message}</p>
        </Message>

        <Footer>
          {contents.cartBtn && (
            <Button onClick={() => nav("/cart")}>장바구니 이동</Button>
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

  background-color: rgba(0, 0, 0, 0.445);

  display: flex;
  opacity: ${(props) => (props.modalOpen ? "1" : "0")};
  z-index: ${(props) => (props.modalOpen ? "100" : "-100")};

  justify-content: center;
  align-items: center;

  transition: all ease 0.3s;

  & > :first-child {
    background-color: wheat;
    border: 3px solid white;
    width: 350px;
    height: 200px;
    border-radius: 15px;
    z-index: 100;
    overflow: hidden;
    position: relative;
    font-size: 16px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
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
  background-color: rgba(100, 100, 100, 0.5);
  width: 100%;
  height: 2.5rem;
  border: none;

  &:hover {
    cursor: pointer;
    background-color: rgba(100, 100, 100, 0.8);
  }
`;

export default React.memo(Modal);
