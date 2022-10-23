import React, { useState } from "react";
import Modal from "./modal/Modal";
import styled from "styled-components";
import Notification from "../../Components/Utility/Notification";
import { useSelector, useDispatch } from "react-redux";
import { notificationAction } from "../../store/reducer/notification";

function Test2() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification.notification);
  const [modalOpen, setModalOpen] = useState(false);

  const onModalOpen = () => {
    setModalOpen(true);
  };

  const test = () => {
    dispatch(
      notificationAction.setNotification({ status: "success", message: "test" })
    );
  };

  const option = {
    // backgroundColor: "rgba(100, 100, 100, 0.1)",
    // onCloseBtn: false,
    // onClickBackgroundClose: false,
    // onPushEscapeClose: false,
  };

  return (
    <>
      {notification && <Notification notification={notification} />}

      <Modal open={modalOpen} setOpen={setModalOpen} option={option}>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
      </Modal>

      <button onClick={test}>Modal Open</button>
    </>
  );
}

const Div = styled.div`
  width: 300px;

  @media (max-width: 350px) {
    width: 200px;
  }
`;

export default Test2;
