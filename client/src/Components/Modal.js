import React, { useEffect } from "react";
import "./Modal.css";

function Modal({ setModalOpen, modalOpen, data, setState }) {
  useEffect(() => {
    if (modalOpen) {
      document.querySelector("body").classList.toggle("not-scroll");
    }
  }, [modalOpen]);

  const modalClose = (event) => {
    if (event.target.className === "modal modal-open") {
      setModalOpen(false);
      document.querySelector("body").classList.toggle("not-scroll");
    }
  };

  const modalCloseBtn = () => {
    setModalOpen(false);
    document.querySelector("body").classList.toggle("not-scroll");
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
          <div className="item-box">
            {data.map((data) => (
              <div
                key={data.id}
                onClick={setState}
                id="category"
                className="btn"
              >
                {data.name}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Modal;
