import React, { useState } from "react";
import { postUrl } from "../PostUrl";
import "./Selector.css";

function Selector({ CheckOut, arr, ProductDetail, setModalImg, setModalOpen }) {
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

  return (
    <div
      className={[
        `Selector-box 
        ${CheckOut && "Selector-box-CheckOut"} 
        ${ProductDetail && "Selector-box-ProductDetail"}`,
      ].join(" ")}
    >
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
            setModalImg(arr[currArr]);
            setModalOpen(true);
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
            ].join(" ")}
            onClick={() => setCurrArr(arr.indexOf(data))}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Selector;
