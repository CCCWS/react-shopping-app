import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { postUrl } from "../PostUrl";
import "./ImgUpload.css";
import {
  CameraOutlined,
  ZoomInOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import useAxios from "../hooks/useAxios";

function ImgUpload({
  setModalOpen,
  setImgData,
  setState,
  setImgDelete,
  edit,
  editImg,
}) {
  const [img, setImg] = useState([]);

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

  const openModal = (e) => {
    setImgData(e);
    setModalOpen(true);
  };

  return (
    <div className="ImgUpload-page">
      <div className="drop-box">
        <Dropzone onDrop={dropItem}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "40px",
                  }}
                >
                  <CameraOutlined />
                </div>
                <div>이미지 등록</div>
              </div>
            </div>
          )}
        </Dropzone>
      </div>

      {img.length > 0 && (
        <>
          {img.map((data, index) => (
            <div
              style={{
                backgroundImage: `url('${postUrl}${data.name}')`,
              }}
              key={index}
              alt="img"
              className="upload-img"
            >
              <div onClick={() => openModal(data)}>
                <ZoomInOutlined />
              </div>
              <div className="ImgUpload-delBtn" onClick={() => delImg(data)}>
                <CloseOutlined />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default React.memo(ImgUpload);
