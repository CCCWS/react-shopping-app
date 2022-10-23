import { useState, useEffect } from "react";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";
import styled from "styled-components";
import ReactDom from "react-dom";

import "./Notification.css";

const Notification = ({ notification }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);

    let timer = setTimeout(() => {
      setShow(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [notification]);

  return ReactDom.createPortal(
    <>
      <TransitionGroup>
        {show && (
          <CSSTransition timeout={500} classNames="fade">
            <Notice>
              <div>{notification.message}</div>
            </Notice>
          </CSSTransition>
        )}
      </TransitionGroup>
    </>,
    document.querySelector("#components-portal")
  );
};

const Notice = styled.div`
  width: 100%;
  height: 3rem;
  background-color: var(--green);
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 10%;
  align-items: center;
  font-size: 1rem;

  position: fixed;
  top: 0;

  z-index: 10000;
`;

export default Notification;
