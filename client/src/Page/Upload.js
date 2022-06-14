import React, { useState } from "react";
import "./Upload.css";

function Upload() {
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [price, setPrice] = useState("");

  const [state, setState] = useState({
    title: "",
    price: "",
    description: "",
  });

  const saveData = (e) => {
    if (e.target.id === "title") {
      setState({ ...state, title: e.target.value });
    }

    if (e.target.id === "price") {
      setState({ ...state, price: e.target.value });
    }

    if (e.target.id === "description") {
      setState({ ...state, description: e.target.value });
    }
  };

  return (
    <div className="page">
      <section className="Upload-section">
        <div>제목</div>
        <input
          className="Upload-title"
          value={state.title}
          onChange={saveData}
          id="title"
          placeholder="제목"
          maxLength={39}
        />
        <div>{`${state.title.length} / 40`}</div>
      </section>

      <hr />

      <section className="Upload-section">
        <div>가격</div>
        <input
          className="Upload-price"
          value={state.price}
          onChange={saveData}
          id="price"
          placeholder="가격"
        />
        <div>원</div>
      </section>

      <hr />

      <section className="Upload-section">
        <div>설명</div>
        <textarea
          className="Upload-description"
          value={state.description}
          onChange={saveData}
          id="description"
          placeholder="설명"
        />
      </section>
    </div>
  );
}

export default Upload;
