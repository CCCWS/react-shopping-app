//library
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//component
import Modal from "./Modal";
import ImgUpload from "./ImgUpload";
import SelectBox from "./SelectBox";

//etc
import { uploadCategoryList } from "../data/CatecoryList";
import "./UploadForm.css";
import useAxios from "../hooks/useAxios";

function UploadForm({ user, edit, editData, id }) {
  //auth.js에서 받은 user props
  //모든 페이지에 방문할때마다 로그인 체크를 수행.
  const nav = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [imgData, setImgData] = useState([]);
  const [imgDelete, setImgDelete] = useState([]); //edit페이지일때 삭제할 이미지 임시저장

  const [image, setImage] = useState([]);
  const [category, setCategory] = useState("");

  const titleRef = useRef();
  const priceRef = useRef();
  const countRef = useRef();
  const descriptionRef = useRef();

  const { postAxios: imageDelete } = useAxios("/api/product/delImgEditPage");
  const { postAxios: editProduct } = useAxios("/api/product/edit");
  const { postAxios: writeProduct } = useAxios("/api/product/write");

  useEffect(() => {
    if (edit) {
      setImage(editData.image);
      setCategory(editData.category);

      titleRef.current.value = editData.title;
      priceRef.current.value = editData.price;
      countRef.current.value = editData.count;
      descriptionRef.current.value = editData.description;
    }
  }, []);

  const maxLengthCheck = (e) => {
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
  };

  const onWrite = (e) => {
    e.preventDefault();
    if (image.length < 1) {
      return alert("이미지를 등록해주세요.");
    }

    if (titleRef.current.value < 2) {
      titleRef.current.focus();
      return alert("제목을 2글자 이상 입력해주세요.");
    }

    if (priceRef.current.value < 1) {
      priceRef.current.focus();
      return alert("가격을 입력해주세요.");
    }

    if (countRef.current.value < 1) {
      countRef.current.focus();
      return alert("수량을 입력해주세요.");
    }

    if (category === "") {
      return alert("카테고리를 선택해주세요.");
    }

    if (descriptionRef.current.value < 10) {
      descriptionRef.current.focus();
      return alert("설명을 10글자 이상 입력해주세요.");
    }

    uploadData();
  };

  const uploadData = async () => {
    const data = {
      //로그인 유저의 id
      writer: user.userData._id,
      title: titleRef.current.value,
      price: priceRef.current.value,
      description: descriptionRef.current.value,
      count: countRef.current.value,
      image: image,
      category: category,
      sold: 0,
    };

    try {
      if (edit) {
        if (imgDelete.length > 0) {
          imageDelete(imgDelete);
        }
        editProduct({ ...data, id: id });
        alert("수정 완료");
      }

      if (edit === undefined) {
        writeProduct(data);
        alert("등록 완료");
      }

      nav("/");
    } catch (err) {
      alert("등록 실패");
    }
  };

  return (
    <div className="page">
      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        data={imgData}
        img={true}
      />

      <section className="Upload-section">
        <div>
          상품이미지 <div>{`${image.length} / 12`}</div>
        </div>

        <ImgUpload
          setModalOpen={setModalOpen}
          setImgData={setImgData}
          setState={setImage}
          setImgDelete={setImgDelete}
          edit={edit}
          editImg={editData}
        />
      </section>

      <hr />
      <section className="Upload-section">
        <div>제목</div>
        <input
          className="Upload-title"
          id="title"
          placeholder="2글자 이상 입력해주세요."
          maxLength={40}
          ref={titleRef}
        />
        {/* <span>{`${} / 40`}</span> */}
      </section>

      <hr />

      <section className="Upload-section">
        <div>가격</div>
        <input
          type="number"
          className="Upload-price"
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
        <input
          type="number"
          className="Upload-count"
          id="count"
          placeholder="최대 99개"
          ref={countRef}
          maxLength="2"
          onInput={maxLengthCheck}
        />
        <label>개</label>
      </section>

      <hr />

      <section className="Upload-section">
        <div>카테고리</div>
        <SelectBox
          data={uploadCategoryList}
          setData={setCategory}
          edit={edit}
          initData={edit && editData.category}
        />
      </section>

      <hr />

      <section className="Upload-section">
        <div>설명</div>
        <textarea
          className="Upload-description"
          id="description"
          placeholder="10글자 이상 입력해주세요."
          maxLength={500}
          ref={descriptionRef}
        />
        {/* <span>{`${} / 500`}</span> */}
      </section>

      <div className="Upload-submit-btn">
        <button onClick={onWrite}> {edit ? "수정하기" : "등록하기"} </button>
      </div>
    </div>
  );
}

export default React.memo(UploadForm);
