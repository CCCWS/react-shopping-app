import React, { useState } from "react";
import "./Selector.css";

function Selector() {
  const [currArr, setCurrArr] = useState(0);

  const test1 = () => {
    return <div onClick={() => alert("test1")}>test1</div>;
  };

  const test2 = () => {
    return <div onClick={() => alert("test2")}>test2</div>;
  };

  const test3 = () => {
    return <div onClick={() => alert("test3")}>test3</div>;
  };

  const arr = [test1(), test2(), test3()];

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
    <div className="Selector-box">
      <button onClick={minus}>&lt;</button>
      <div>{arr[currArr]}</div>
      <button onClick={plus}>&gt;</button>
    </div>
  );
}

export default Selector;
