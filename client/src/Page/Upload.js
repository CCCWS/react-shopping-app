import React, { useState } from "react";

import { categoryList } from "../data/CatecoryList";
import Modal from "../Components/Modal";
import ImgUpload from "../Components/ImgUpload";

import "./Upload.css";

function Upload() {
  const [modalOpen, setModalOpen] = useState(false);
  const [imgCount, setImgCount] = useState(0);
  const [imgData, setImgData] = useState([]);
  const [state, setState] = useState({
    title: "",
    price: "",
    description: "",
    category: "카테고리 선택",
  });

  const saveData = (e) => {
    if (e.target.id === "title") {
      setState({ ...state, title: e.target.value });
    }

    if (e.target.id === "price") {
      setState({ ...state, price: e.target.value });
    }

    if (e.target.id === "category") {
      setState({ ...state, category: e.target.innerText });
      setModalOpen(false);
    }

    if (e.target.id === "description") {
      setState({ ...state, description: e.target.value });
    }
  };

  const openModal = () => {
    setModalOpen(true);
    console.log(imgData);
  };

  return (
    <div className="page">
      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        // data={categoryList}
        // setState={saveData}
        data={imgData}
      />

      <section className="Upload-section">
        <div>
          상품이미지 <div>{`${imgCount} / 12`}</div>
        </div>

        <ImgUpload
          setImgCount={setImgCount}
          setModalOpen={setModalOpen}
          setImgData={setImgData}
        />
      </section>

      <hr />
      <section className="Upload-section">
        <div>제목</div>
        <input
          className="Upload-title"
          value={state.title}
          onChange={saveData}
          id="title"
          placeholder="제목"
          maxLength={40}
        />
        <span>{`${state.title.length} / 40`}</span>
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
        <label>원</label>
      </section>

      <hr />

      <section className="Upload-section">
        <div>카테고리</div>
        <button onClick={openModal} className="btn">
          {state.category}
        </button>
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
          maxLength={2000}
        />
        <span>{`${state.description.length} / 2000`}</span>
      </section>
    </div>
  );
}

export default Upload;
