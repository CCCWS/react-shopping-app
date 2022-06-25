import React, { useEffect } from "react";
import "./Modal.css";

function Modal({ setModalOpen, modalOpen, data, setState }) {
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
            X
          </button>

          <img
            src={`http://localhost:3001/uploads/${data.name}`}
            alt="img"
            id="modalImg"
            className={
              data.width > data.height ? "longer-width" : "longer-height"
            }
          />
        </>
      )}
    </div>
  );
}

export default Modal;
