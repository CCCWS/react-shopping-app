//library
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

//component
import SelectBox from "../Utility/SelectBox";
import ImgUpload from "./ImgUpload";
import Footer from "../Footer/Footer";

//custom hooks
import useAxios from "../../hooks/useAxios";

//etc
import { Section, Input, Textarea } from "../Style/InputStyle";
import { uploadCategoryList } from "../../data/CatecoryList";

function UploadForm({ userId, edit, editData, productId }) {
  const nav = useNavigate();
  const [imgDelete, setImgDelete] = useState([]); //edit페이지일때 삭제할 이미지 임시저장
  const [image, setImage] = useState([]);
  const [category, setCategory] = useState("");

  const titleRef = useRef();
  const priceRef = useRef();
  const countRef = useRef();
  const descriptionRef = useRef();

  const { connectServer: imageDelete } = useAxios(
    "/api/product/delImgEditPage"
  );
  const { connectServer: editProduct } = useAxios("/api/product/edit");
  const { connectServer: writeProduct } = useAxios("/api/product/write");

  useEffect(() => {
    const titleName = document.getElementsByTagName("title")[0];

    //edit페이지로 접근시 기본값을 상품의 정보로 지정
    if (edit) {
      setImage(editData.image);
      setCategory(editData.category);

      titleRef.current.value = editData.title;
      priceRef.current.value = editData.price;
      countRef.current.value = editData.count;
      descriptionRef.current.value = editData.description;

      titleName.innerHTML = `상품 수정`;
    } else {
      titleName.innerHTML = `상품 등록`;
    }
  }, []);

  const maxLengthCheck = (e) => {
    //숫자 이외의 문자 입력 방지
    e.target.value = e.target.value.replace(/[^0-9.]/g, "");

    //글자 길이 체크
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
      writer: userId,
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
        editProduct({ ...data, id: productId });
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
      <Section>
        <div>
          상품이미지 <div>{`${image.length} / 12`}</div>
        </div>

        <ImgUpload
          setState={setImage}
          setImgDelete={setImgDelete}
          edit={edit}
          editImg={editData}
        />
      </Section>

      <hr />
      <Section>
        <div>제목</div>
        <Input
          inputType="title"
          id="title"
          placeholder="2글자 이상 입력해주세요."
          maxLength={40}
          ref={titleRef}
        />
        {/* <span>{`${} / 40`}</span> */}
      </Section>

      <hr />

      <Section>
        <div>가격</div>
        <Input
          inputType="price"
          type="number"
          id="price"
          placeholder="숫자만 입력해주세요."
          ref={priceRef}
          min="1"
          maxLength="8"
          onInput={maxLengthCheck}
        />
        <label>원</label>
      </Section>

      <hr />

      <Section>
        <div>상품 개수</div>
        <Input
          inputType="count"
          type="number"
          id="count"
          placeholder="최대 99개"
          ref={countRef}
          maxLength="2"
          onInput={maxLengthCheck}
        />
        <label>개</label>
      </Section>

      <hr />

      <Section>
        <div>카테고리</div>
        <SelectBox
          data={uploadCategoryList}
          setData={setCategory}
          edit={edit}
          initData={edit && editData.category}
        />
      </Section>

      <hr />

      <Section>
        <div>설명</div>
        <Textarea
          id="description"
          placeholder="10글자 이상 입력해주세요."
          maxLength={500}
          ref={descriptionRef}
        />
        {/* <span>{`${} / 500`}</span> */}
      </Section>

      <hr />

      <Section />

      <Footer>
        <SubmitBtn onClick={onWrite}>
          <button>{edit ? "수정하기" : "등록하기"} </button>
        </SubmitBtn>
      </Footer>
    </div>
  );
}

const SubmitBtn = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  button {
    margin-right: 2rem;
    font-size: 1.5rem;
    border: none;
    border-radius: 5px;
    padding: 0.5rem;
    background-color: var(--red_transparency);
    color: white;
    transition: 0.5s;

    &:hover {
      cursor: pointer;
      background-color: var(--red);
    }
  }
`;

export default React.memo(UploadForm);
