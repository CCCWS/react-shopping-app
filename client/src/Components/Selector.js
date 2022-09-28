import React, { useState } from "react";
import { postUrl } from "../PostUrl";

import ModalBase from "./ModalBase";

import useModal from "../hooks/useModal";

import "./Selector.css";

function Selector({ CheckOut, arr, ProductDetail }) {
  const { openModal, contents, setOpenModal, setContents } = useModal();
  const [currArr, setCurrArr] = useState(0);

  const minus = () => {
    if (currArr === 0) {
      return setCurrArr(arr.length - 1);
    }
    setCurrArr((prev) => prev - 1);
  };

  const plus = () => {
    if (currArr === arr.length - 1) {
      return setCurrArr(0);
    }
    setCurrArr((prev) => prev + 1);
  };

  const onModalImage = (image) => {
    setContents({
      image: true,
      imageInfo: image,
    });
    setOpenModal(true);
  };

  return (
    <div
      className={[
        `Selector-box 
        ${CheckOut && "Selector-box-CheckOut"} 
        ${ProductDetail && "Selector-box-ProductDetail"}`,
      ]}
    >
      <ModalBase
        contents={contents}
        modalOpen={openModal}
        setModalOpen={setOpenModal}
      />

      {arr.length > 1 && (
        <button className="Selector-box-leftBtn" onClick={minus}>
          &lt;
        </button>
      )}

      {CheckOut && <div>{arr[currArr]}</div>}

      {ProductDetail && (
        <div
          className="Selector-box-img"
          style={{
            backgroundImage: `url('${postUrl}${arr[currArr].name}')`,
          }}
          onClick={() => {
            // setModalImg(arr[currArr]);
            // setModalOpen(true);
            onModalImage(arr[currArr]);
          }}
        />
      )}

      {arr.length > 1 && (
        <button className="Selector-box-rightBtn" onClick={plus}>
          &gt;
        </button>
      )}

      <div className="Selector-box-point">
        {arr.map((data, index) => (
          <div
            key={index}
            className={[
              `Selector-box-point-item ${
                arr.indexOf(data) === currArr
                  ? "Selector-box-point-item-on"
                  : null
              }`,
            ]}
            onClick={() => {
              setCurrArr(arr.indexOf(data));
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default React.memo(Selector);
