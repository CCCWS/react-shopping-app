import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { CameraOutlined, CloseOutlined } from "@ant-design/icons";

import styled from "styled-components";

const Test4 = () => {
  const [img, setImg] = useState();

  const requestImg = async (files) => {
    let formData = new FormData();
    formData.append("image", files[0]);

    const res = await axios.post("/api/s3/test", formData);

    for (let value of formData.values()) {
      console.log(value);
    }
  };

  useEffect(() => {
    console.log(img);
  }, [img]);

  return (
    <>
      <DropBox>
        <Dropzone onDrop={requestImg}>
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
    </>
  );
};

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

export default Test4;

{
  /* <div id="imageEdit">
        <input
          type="file"
          id="image_uploads"
          name="image"
          accept="image/*"
          onChange={requestImg}
        />
      </div> */
}
