import React, { useState, useRef, useEffect } from "react";
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
    count: 1,
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

      case "count":
        setState({ ...state, count: e.target.value });
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

  function maxLengthCheck(e) {
    if (e.target.id === "price") {
      if (e.target.value.length > e.target.maxLength) {
        return (e.target.value = e.target.value.slice(0, e.target.maxLength));
      }
    }

    if (e.target.id === "count") {
      if (e.target.value.length > e.target.maxLength) {
        return (e.target.value = e.target.value.slice(0, e.target.maxLength));
      }
    }
  }

  const saveImg = (e) => {
    setState({ ...state, image: e });
  };

  const titleRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const countRef = useRef();

  const onWrite = (e) => {
    e.preventDefault();
    if (state.image.length < 1) {
      return alert("이미지를 등록해주세요.");
    }

    if (state.title.length < 2) {
      titleRef.current.focus();
      return alert("제목을 2글자 이상 입력해주세요.");
    }

    if (state.price.length < 1) {
      priceRef.current.focus();
      return alert("가격을 입력해주세요.");
    }

    if (state.count.length < 1) {
      countRef.current.focus();
      return alert("수량을 입력해주세요.");
    }

    if (state.category === "카테고리 선택") {
      return alert("카테고리를 선택해주세요.");
    }

    if (state.description.length < 10) {
      descriptionRef.current.focus();
      return alert("설명을 10글자 이상 입력해주세요.");
    }

    uploadData();
  };

  const uploadData = async () => {
    const data = {
      //로그인 유저의 id
      writer: user.userData._id,
      title: state.title,
      price: state.price,
      category: state.category,
      description: state.description,
      image: state.image,
      sold: 0,
      count: state.count,
    };

    try {
      await axios.post("/api/product/write", data);
      alert("등록 완료");
      nav("/");
    } catch (err) {
      alert("등록 실패");
    }
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
          placeholder="2글자 이상 입력해주세요."
          maxLength={40}
          ref={titleRef}
        />
        <span>{`${state.title.length} / 40`}</span>
      </section>

      <hr />

      <section className="Upload-section">
        <div>가격</div>
        <input
          type="number"
          className="Upload-price"
          value={state.price}
          onChange={saveData}
          id="price"
          placeholder="숫자만 입력해주세요."
          ref={priceRef}
          min="1"
          maxLength="8"
          onInput={maxLengthCheck}
        />
        <label>원</label>
      </section>

      <hr />

      <section className="Upload-section">
        <div>상품 개수</div>
        <div>
          <button
            onClick={() => {
              if (state.count === 1) {
                return;
              }
              setState({ ...state, count: parseInt(state.count) - 1 });
            }}
            className="Upload-count-btn"
          >
            -
          </button>
          <input
            type="number"
            className="Upload-count"
            value={state.count}
            onChange={saveData}
            id="count"
            ref={countRef}
            maxLength="3"
            onInput={maxLengthCheck}
          />
          <button
            onClick={() => {
              if (state.count === 999) {
                return;
              }

              setState({ ...state, count: parseInt(state.count) + 1 });
            }}
            className="Upload-count-btn"
          >
            +
          </button>
        </div>
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
          placeholder="10글자 이상 입력해주세요."
          maxLength={2000}
          ref={descriptionRef}
        />
        <span>{`${state.description.length} / 2000`}</span>
      </section>

      <div className="Upload-submit-btn">
        <button onClick={onWrite}>등록하기</button>
      </div>
    </div>
  );
}

export default React.memo(Upload);
