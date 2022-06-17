import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { categoryList } from "../data/CatecoryList";
import Modal from "../Components/Modal";
import ImgUpload from "../Components/ImgUpload";
import SelectBox from "../Components/SelectBox";

import "./Upload.css";
import axios from "axios";

function Upload({ user }) {
  //auth.js에서 받은 user props
  //모든 페이지에 방문할때마다 로그인 체크를 수행.

  const nav = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [imgData, setImgData] = useState([]);
  const [state, setState] = useState({
    title: "",
    price: "",
    description: "",
    category: "카테고리 선택",
    image: [],
  });

  const saveData = (e) => {
    switch (e.target.id) {
      case "title":
        setState({ ...state, title: e.target.value });
        break;

      case "price":
        setState({ ...state, price: e.target.value });
        break;

      case "category":
        setState({ ...state, category: e.target.innerText });
        break;

      case "description":
        setState({ ...state, description: e.target.value });
        break;

      default:
        break;
    }
  };

  const saveImg = (e) => {
    setState({ ...state, image: e });
  };

  const onWrite = (e) => {
    e.preventDefault();
    if (
      state.image.length < 1 ||
      state.title.length < 2 ||
      state.price.length < 1 ||
      state.category === "카테고리 선택" ||
      state.description.length < 10
    ) {
      alert("test");
    }

    const data = {
      //로그인 유저의 id
      writer: user.userData.name,
      title: state.title,
      price: state.price,
      category: state.category,
      description: state.description,
      image: state.image,
    };

    axios.post("/api/product/write", data).then((res) => {
      if (res.data.success) {
        alert("등록 완료");
        nav("/");
      } else {
        alert("등록 실패");
      }
    });
  };

  return (
    <div className="page">
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} data={imgData} />

      <section className="Upload-section">
        <div>
          상품이미지 <div>{`${state.image.length} / 12`}</div>
        </div>

        <ImgUpload
          setModalOpen={setModalOpen}
          setImgData={setImgData}
          setState={saveImg}
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
        <SelectBox
          data={categoryList}
          setValue={saveData}
          value={state.category}
        />
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

      <button onClick={onWrite}>작성</button>
    </div>
  );
}

export default React.memo(Upload);
