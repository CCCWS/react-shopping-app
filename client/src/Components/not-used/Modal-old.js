import React, { useEffect } from "react";
import DaumPostCode from "react-daum-postcode";
import { postUrl } from "../../PostUrl";

import "./Modal.css";

function Modal({
  setModalOpen,
  modalOpen,
  data,
  setState,
  PurchaseHistory,
  CheckOut,
  img,
}) {
  useEffect(() => {
    if (modalOpen) {
      document.querySelector("body").classList.add("not-scroll");
    }

    if (modalOpen === false) {
      document.querySelector("body").classList.remove("not-scroll");
    }
  }, [modalOpen]);

  const modalClose = (event) => {
    if (event.target.className === "modal modal-open") {
      document.querySelector("body").classList.remove("not-scroll");
      setModalOpen(false);
    }
  };

  const modalCloseBtn = () => {
    setModalOpen(false);
  };

  return (
    <div
      className={[`modal ${modalOpen ? "modal-open" : null}`].join(" ")}
      onClick={modalClose}
    >
      {modalOpen && (
        <>
          <button onClick={modalCloseBtn} className="modal-close-btn">
            창닫기
          </button>

          {CheckOut && (
            <div>
              <DaumPostCode onComplete={setState} className="post-code" />
            </div>
          )}

          {PurchaseHistory && (
            <div className="modal-PurchaseHistory">
              <div>
                <strong>이름</strong> : {data.name}
              </div>

              <div>
                <strong>전화번호</strong> : {data.phone}
              </div>

              <div>
                <strong>주소</strong> : {data.searchAddress} {data.address}
              </div>

              <div>
                <strong>요청사항</strong> : {data.req}
              </div>
            </div>
          )}

          {img && (
            <img
              src={`${postUrl}${data.name}`}
              alt="img"
              id="modalImg"
              className={
                data.width > data.height ? "longer-width" : "longer-height"
              }
            />
          )}
        </>
      )}
    </div>
  );
}

export default Modal;
