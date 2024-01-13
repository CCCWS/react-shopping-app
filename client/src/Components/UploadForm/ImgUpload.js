import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import newAxios from "../../productionCheck";
import styled from "styled-components";
import { CameraOutlined, CloseOutlined } from "@ant-design/icons";

function ImgUpload({ setImage, setImgDelete, edit, editImg }) {
  const [upladeImg, setUploadImg] = useState([]); //현재 페이지에서 업로드된 이미지 목록
  const [imgLoading, setImgLoading] = useState(false);

  //수정페이지일 경우 기존의 이미지를 state에 넣어줌
  useEffect(() => {
    if (edit) {
      setUploadImg(editImg.image);
    }
  }, [edit, editImg]);

  //업로드된 이미지정보를 DB에 저정하기 위해 값을 저장
  useEffect(() => {
    setImage([...upladeImg]);
  }, [setImage, upladeImg]);

  //s3에 이미지 업로드 요청
  const onUploadImgS3 = async (file) => {
    //이미지 개수 제한
    if (imgLoading) return alert("업로드 중입니다.");

    if (upladeImg.length === 12) {
      return alert("사진 첨부는 12개까지 가능합니다.");
    }

    // //이미지 용량 제한 3000000b = 3mb
    // const MAX_SIZE = 15000000;
    // if (file[0].size > MAX_SIZE) {
    //   return alert("15mb 이하의 파일만 업로드 가능합니다.");
    // }

    const formData = new FormData();
    formData.append("image", file[0]);

    await newAxios.post("/api/s3/s3Upload", formData).then((res) => {
      try {
        // alert("이미지 업로드");
        setUploadImg((prev) => [
          ...prev,
          res.data.fileName.transforms[0].location,
        ]);
        setImgLoading(false);
      } catch (err) {
        alert("이미지 업로드 실패");
      }
    });
  };

  //이미지 삭제 요청
  const onDeleteImgS3 = async (img) => {
    try {
      if (!edit) {
        const res = await newAxios.post("/api/s3/s3Delete", { img: img });
      }
      alert("이미지 삭제");
      setUploadImg((prev) => prev.filter((data) => data !== img));
    } catch (err) {
      alert("이미지 삭제 실패");
    }
  };

  // const dropItem = (files) => {
  //   if (upladeImg.length === 12) {
  //     return alert("사진 첨부는 12개까지 가능합니다.");
  //   }

  //   const formData = new FormData();
  //   const config = {
  //     header: { "content-type": "multipart/form-data" },
  //   }; //header에 파일에 대한 타입을 정의

  //   formData.append("file", files[0]);
  //   //formData에 선택한 파일에 대한 정보를 담음

  //   sendServerImageData(formData, config);
  // };

  // const sendServerImageData = async (formData, config) => {
  //   const res = await newAxios.post("/api/product/img", formData, config);
  //   const getImg = new Image();
  //   getImg.onload = function () {
  //     setUploadImg([
  //       ...upladeImg,
  //       {
  //         name: res.data.file.filename,
  //         width: this.width,
  //         height: this.height,
  //         // path: `http://localhost:3001/uploads/${res.data.file.filename}`,
  //       },
  //     ]);
  //   };
  //   getImg.src = `${postUrl}${res.data.file.filename}`;
  // };

  // const delImg = async (e) => {
  //   const copyImg = [...upladeImg];
  //   setUploadImg(copyImg.filter((data) => data !== e));

  //   //edit페이지일 경우 취소했을 경우도 있으니 바로 이미지를 지우면 안됨
  //   if (edit) {
  //     setImgDelete((data) => [...data, e.name]);
  //   }

  //   //등록페이지의 경우 이미지를 바로 삭제해도 무관함
  //   if (edit === undefined) {
  //     const res = await newAxios.post("/api/product/delImg", { image: e.name });
  //     if (res.data.success) {
  //       // alert("삭제 완료");
  //     }

  //     if (res.data.success === false) {
  //       alert("삭제 실패");
  //     }
  //   }
  // };

  return (
    <Section>
      <DropBox>
        <Dropzone onDrop={onUploadImgS3}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <DropzoneIcon>
                <CameraOutlined />
                <div>이미지 등록</div>
                <div>15mb 이하</div>
              </DropzoneIcon>
            </div>
          )}
        </Dropzone>
      </DropBox>

      {upladeImg.length > 0 && (
        <>
          {upladeImg.map((data, index) => (
            <UploadImgBox key={index}>
              <UploadImg src={data} key={index} alt="img" />
              <UploadImgDel onClick={() => onDeleteImgS3(data)}>
                <CloseOutlined />
              </UploadImgDel>
            </UploadImgBox>
          ))}
          {imgLoading ? <UploadImg></UploadImg> : null}
        </>
      )}
    </Section>
  );
}

const Section = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* align-items: center; */
  width: 100%;
  max-height: 20rem;
  overflow-y: auto;
  gap: 5px 5px;
`;

const DropBox = styled.div`
  background-color: transparent;
  width: 10rem;
  height: 10rem;
  border-radius: 5px;
  border: 2px solid var(--gray);

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
  display: flex;
  flex-direction: column;
  text-align: center;

  & > :first-child {
    font-size: 2.5rem;
  }

  & > :nth-child(2) {
    font-size: 1rem;
  }

  & > :last-child {
    font-size: 0.8rem;
    color: gray;
  }
`;

const UploadImgBox = styled.div`
  position: relative;
  width: 10rem;
  height: 10rem;
  border: 2px solid rgba(146, 146, 146, 0.9);
  border-radius: 5px;

  @media (max-width: 550px) {
    width: 6rem;
    height: 6rem;
  }
`;

const UploadImg = styled.img`
  width: 100%;
  height: 100%;
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
