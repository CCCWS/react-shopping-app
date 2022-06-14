import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  const nav = useNavigate();

  const goPage = () => {
    nav("/upload");
  };
  return (
    <div className="page">
      <button className="btn" onClick={goPage}>
        판매하기
      </button>
    </div>
  );
}

export default Main;
