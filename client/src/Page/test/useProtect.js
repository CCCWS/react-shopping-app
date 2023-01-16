import React from "react";

const useProtect = () => {
  const eventFunc = (e) => {
    e.preventDefault();
    e.returnValue = false;
  };

  const protectOn = () => window.addEventListener("beforeunload", eventFunc);
  const protectOff = () =>
    window.removeEventListener("beforeunload", eventFunc);
  return { protectOn, protectOff };
};

export default useProtect;
