import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { CameraOutlined } from "@ant-design/icons";

import { postUrl } from "../../PostUrl";

import styled from "styled-components";

const Test4 = () => {
  const [img, setImg] = useState([]);

  const requestImg = async (files) => {
    const formData = new FormData();
    formData.append("image", files[0]);

    const res = await axios.post("/api/s3/s3Upload", formData);
    setImg((prev) => [...prev, res.data.fileName]);
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

      <Image>
        {img.map((data, index) => (
          <Img img={`url('${postUrl}${data}')`}></Img>
        ))}
      </Image>
    </>
  );
};

const Img = styled.div`
  width: 100px;
  height: 100px;

  background-image: ${(props) => props.img};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Image = styled.div`
  width: 300px;
  height: 500px;
  background-color: beige;
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
