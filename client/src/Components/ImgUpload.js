import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import "./ImgUpload.css";
import { CameraOutlined } from "@ant-design/icons";

function ImgUpload() {
  const [img, setImg] = useState([]);
  //////////////////////////////////
  const dropItem = (files) => {
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    }; //header에 파일에 대한 타입을 정의

    formData.append("file", files[0]);
    //formData에 선택한 파일에 대한 정보를 담음

    axios.post("/api/product/img", formData, config).then((res) => {
      if (res.data.success) {
        setImg([...img, res.data.file.filename]);
      }
    });
  };
  /////////////////////////////////

  const onDelete = (e) => {
    const copyImg = [...img];
    setImg(copyImg.filter((data) => data !== e));
  };

  return (
    <>
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
        <div className="test">
          {img.map((data, index) => (
            <div
              style={{
                backgroundImage: `url('http://localhost:3001/uploads/${data}')`,
              }}
              src={`http://localhost:3001/uploads/${data}`}
              key={index}
              alt="img"
              className="upload-img"
              onClick={() => onDelete(data)}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default ImgUpload;
