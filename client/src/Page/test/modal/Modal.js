import { useEffect } from "react";
import styled from "styled-components";

const Modal = ({
  children,
  open,
  setOpen,
  onPushEscapeClose,
  onClickBackgroundClose,
  backgroundColor,
  onCloseBtn,
}) => {
  useEffect(() => {
    if (open === true) {
      const escapeCheck = (e) => {
        if (onPushEscapeClose === true) {
          if (e.key === "Escape") {
            setOpen(false);
          }
        }
      };
      window.addEventListener("keydown", escapeCheck);
      return () => window.removeEventListener("keydown", escapeCheck);
    }
  }, [open, setOpen, onPushEscapeClose]);

  const onBackgroundClick = (e) => {
    if (onClickBackgroundClose === true) {
      if (e.target === e.currentTarget) {
        setOpen(false);
      }
    }
  };

  return (
    <ModalDiv
      modalOpen={open}
      onClick={(e) => {
        onBackgroundClick(e);
      }}
      backgroundColor={backgroundColor}
    >
      {open && (
        <ModalContents>
          {children}

          {onCloseBtn === true && (
            <Footer>
              <Button onClick={() => setOpen(false)}>닫기</Button>
            </Footer>
          )}
        </ModalContents>
      )}
    </ModalDiv>
  );
};

const ModalDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "rgba(165, 165, 165, 0.3)"};

  display: flex;
  opacity: ${(props) => (props.modalOpen ? "1" : "0")};
  z-index: ${(props) => (props.modalOpen ? "1000" : "-10")};

  justify-content: center;
  align-items: center;

  transition: 0.3s;
`;

const ModalContents = styled.div`
  background-color: white;
  min-width: 200px;
  border-radius: 2px;
  z-index: 100;
  overflow: hidden;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Footer = styled.footer`
  width: 100%;
  display: flex;
`;

const Button = styled.button`
  position: relative;
  background-color: rgba(100, 100, 100, 0.5);
  width: 100%;
  height: 1.5rem;
  border: none;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    background-color: rgba(255, 0, 0);
    left: 0;
    bottom: 0;
    height: 0;
    width: 100%;
    transition: all ease 0.3s;
    z-index: -1;
  }

  &:hover::before {
    height: 100%;
  }
`;

export default Modal;
