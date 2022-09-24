import { useEffect } from "react";
import styled from "styled-components";
import ReactDom from "react-dom";

const Modal = ({ title, message, modalOpen, setModalOpen }) => {
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
          <div>{title}</div>
        </Header>

        <Message>
          <p>{message}</p>
        </Message>

        <Footer>
          <button onClick={() => setModalOpen(false)}>닫기</button>
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
    background-color: white;
    width: 350px;
    height: 200px;
    border-radius: 15px;
    z-index: 100;
    overflow: hidden;
    position: relative;
    font-size: 16px;
  }
`;

const Header = styled.header`
  background-color: rgba(255, 166, 0, 0.829);
  padding: 1rem;
  font-size: 20px;
`;

const Message = styled.div`
  padding: 1rem;
`;

const Footer = styled.footer`
  position: absolute;
  right: 10px;
  bottom: 10px;
`;

export default Modal;
