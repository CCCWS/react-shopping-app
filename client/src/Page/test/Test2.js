import React, { useState } from "react";
import Modal from "./modal/Modal";
import styled from "styled-components";

function Test2() {
  const [modalOpen, setModalOpen] = useState(false);

  const onModalOpen = () => {
    setModalOpen(true);
  };

  const option = {
    // backgroundColor: "rgba(100, 100, 100, 0.1)",
    // onCloseBtn: false,
    // onClickBackgroundClose: false,
    // onPushEscapeClose: false,
  };

  return (
    <>
      <Modal open={modalOpen} setOpen={setModalOpen} option={option}>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
      </Modal>

      <button onClick={onModalOpen}>Modal Open</button>
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
