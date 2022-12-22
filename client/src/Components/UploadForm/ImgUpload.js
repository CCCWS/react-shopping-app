import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import styled from "styled-components";
import { CameraOutlined, CloseOutlined } from "@ant-design/icons";

import { postUrl } from "../../PostUrl";

function ImgUpload({ setState, setImgDelete, edit, editImg }) {
  const [img, setImg] = useState([]);

  console.log(img);
  useEffect(() => {
    if (edit) {
      setImg(editImg.image);
    }
  }, []);

  useEffect(() => {
    setState([...img]);
  }, [img]);

  const dropItem = (files) => {
    if (img.length === 12) {
      return alert("사진 첨부는 12개까지 가능합니다.");
    }

    const formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    }; //header에 파일에 대한 타입을 정의

    formData.append("file", files[0]);
    //formData에 선택한 파일에 대한 정보를 담음

    sendServerImageData(formData, config);
  };

  const sendServerImageData = async (formData, config) => {
    const res = await axios.post("/api/product/img", formData, config);
    const getImg = new Image();
    getImg.onload = function () {
      setImg([
        ...img,
        {
          name: res.data.file.filename,
          width: this.width,
          height: this.height,
          // path: `http://localhost:3001/uploads/${res.data.file.filename}`,
        },
      ]);
    };
    getImg.src = `${postUrl}${res.data.file.filename}`;
  };

  const delImg = async (e) => {
    const copyImg = [...img];
    setImg(copyImg.filter((data) => data !== e));

    //edit페이지일 경우 취소했을 경우도 있으니 바로 이미지를 지우면 안됨
    if (edit) {
      setImgDelete((data) => [...data, e.name]);
    }

    //등록페이지의 경우 이미지를 바로 삭제해도 무관함
    if (edit === undefined) {
      const res = await axios.post("/api/product/delImg", { image: e.name });
      if (res.data.success) {
        // alert("삭제 완료");
      }

      if (res.data.success === false) {
        alert("삭제 실패");
      }
    }
  };

  return (
    <Section>
      <DropBox>
        <Dropzone onDrop={dropItem}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <DropzoneIcon>
                <div>
                  <CameraOutlined />
                </div>
                <div>이미지 등록</div>
              </DropzoneIcon>
            </div>
          )}
        </Dropzone>
      </DropBox>

      {img.length > 0 && (
        <>
          {img.map((data, index) => (
            <UploadImg
              img={`url('${postUrl}${data.name}')`}
              key={index}
              alt="img"
            >
              <UploadImgDel onClick={() => delImg(data)}>
                <CloseOutlined />
              </UploadImgDel>
            </UploadImg>
          ))}
        </>
      )}
    </Section>
  );
}

const Section = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-height: 20rem;
  overflow-y: auto;
`;

const DropBox = styled.div`
  background-color: transparent;
  width: 10rem;
  height: 10rem;
  border-radius: 5px;
  border: 2px solid var(--gray);
  margin: 0.3rem;

  & > :first-child {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    border-radius: 5px;

    &:hover {
      cursor: pointer;
      background-color: var(--gray_transparency);
    }
  }

  @media (max-width: 550px) {
    width: 6rem;
    height: 6rem;
  }
`;

const DropzoneIcon = styled.div`
  & > :first-child {
    display: flex;
    justify-content: center;
    font-size: 2.5rem;
  }

  & > :nth-child(2) {
    font-size: 1rem;
  }
`;

const UploadImg = styled.div`
  background-image: ${(props) => props.img};
  width: 10rem;
  height: 10rem;
  border: 2px solid rgba(146, 146, 146, 0.9);
  border-radius: 5px;

  margin: 0.3rem;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  position: relative;

  @media (max-width: 550px) {
    width: 6rem;
    height: 6rem;
  }
`;

const UploadImgDel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  z-index: 10;
  top: 5px;
  right: 5px;

  background-color: rgba(184, 184, 184, 0.5);
  width: 1.8rem;
  height: 1.8rem;
  font-size: 1.5rem;
  border-radius: 5px;

  cursor: pointer;
`;

export default React.memo(ImgUpload);
