import React from "react";

const useConfirm = (message, confirmAction) => {
  if (typeof confirmAction !== "function") {
    console.log("not a function");
    return;
  }

  const confirmFunc = () => {
    const check = window.confirm(message);
    if (check) {
      confirmAction();
    }
  };

  return confirmFunc;
};

export default useConfirm;
