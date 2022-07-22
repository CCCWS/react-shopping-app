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

function ImgUpload({
  setModalOpen,
  setImgData,
  setState,
  imgDelete,
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
  //////////////////////////////////
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

    axios.post("/api/product/img", formData, config).then((res) => {
      if (res.data.success) {
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
      }
    });
  };
  /////////////////////////////////

  useEffect(() => {
    setState(img);
  }, [img]);

  const openModal = (e) => {
    setImgData(e);
    setModalOpen(true);
  };

  const delImg = async (e) => {
    const copyImg = [...img];
    setImg(copyImg.filter((data) => data !== e));

    if (edit) {
      const data = [...imgDelete];
      setImgDelete([...data, e.name]);
    }

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
