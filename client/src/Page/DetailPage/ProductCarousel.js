import React from "react";
import styled from "styled-components";

import Carousel2 from "../../Components/Utility/Carousel2";
import { SearchOutlined } from "@ant-design/icons";

const ProductCarousel = ({ img, postUrl, onImgModalOpen, ImgDiv }) => {
  return (
    <Carousel2 height={"500px"} point={true}>
      {img.map((data, index) => (
        <React.Fragment key={index}>
          <ImgDiv carousel={true} img={`url('${postUrl}${data}')`} />
          <OpenModalBtn
            onClick={() => {
              onImgModalOpen(data);
            }}
          >
            <SearchOutlined />
          </OpenModalBtn>
        </React.Fragment>
      ))}
    </Carousel2>
  );
};

const OpenModalBtn = styled.div`
  position: absolute;
  padding: 10px;
  border-radius: 10px;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2rem;
  opacity: 0.2;
  background-color: var(--gray_transparency);

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

export default React.memo(ProductCarousel);
