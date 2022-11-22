import React, { useState } from "react";
import Modal from "./modal/Modal";
import styled from "styled-components";

const Test7 = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        onPushEscapeClose={true}
        onClickBackgroundClose={true}
        onCloseBtn={true}
        backgroundColor={"rgba(0,0,0,0.5)"}
      >
        <Div>TEST</Div>
      </Modal>

      <button onClick={() => setOpenModal(!openModal)}>열기</button>
    </>
  );
};

const Div = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Test7;
