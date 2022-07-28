import React, { useEffect, useState } from "react";
import { postUrl } from "../PostUrl";
import { PauseOutlined, CaretRightOutlined } from "@ant-design/icons";
import "./Selector.css";

function Selector({
  CheckOut,
  arr,
  ProductDetail,
  setModalImg,
  setModalOpen,
  modalOpen,
}) {
  const [currArr, setCurrArr] = useState(0);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (modalOpen) {
      setPause(true);
      clearInterval(play);
    }
  }, [modalOpen]);

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

  console.log(currArr);

  let intervalCallBack = false;
  const play = setInterval(() => {
    if (!pause) {
      if (!intervalCallBack) {
        plus();
        intervalCallBack = true;
      }
    }
  }, 1100);
  //intervalCallBack으로 실행 여부를 구분하여 쌓여있는 함수의 실행을 방지
  // https://velog.io/@kyjun/javascript-setInterval-%EA%B3%A0%EC%B0%B0

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
        <button 
        className="Selector-box-playBtn"
          onClick={() => {
            if (!pause) {
              setPause(true);
              clearInterval(play);
            }

            if (pause) {
              setPause(false);
              setInterval(play, 1000);
            }
          }}
        >
          {pause ? <CaretRightOutlined /> : <PauseOutlined />}
        </button>

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
            onClick={() => {
              setPause(true);
              clearInterval(play);
              setCurrArr(arr.indexOf(data));
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Selector;
