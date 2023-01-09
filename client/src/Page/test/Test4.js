import React, { useState } from "react";
import Switch from "./Switch";

const Test4 = () => {
  const [click, setClick] = useState(false);
  const onClickChange = () => {
    setClick((prev) => !prev);
  };
  return (
    <>
      <Switch viewType={click} onSetMode={onClickChange} />
    </>
  );
};

export default Test4;
