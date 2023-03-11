import React, { useCallback, useState } from "react";
import styled from "styled-components";

import image1 from "./lina-angelov-1vNvGY11Lds-unsplash-1024x683.jpg";
import image2 from "./123.PNG";

const ImageViewer = ({ size, img }) => {
  const [viewerPosition, setViewerPosition] = useState(null);
  const [imgBoxPosition, setImgBoxPosition] = useState(null);

  if (!size) throw new Error("size empty");
  if (!img) throw new Error("image empty");

  const onBoxSize = useCallback((component) => {
    if (component) setImgBoxPosition(component.getBoundingClientRect());
  }, []);

  const onMouseMove = (e) => {
    const viewerPosition = { left: 0, top: 0 };

    //e.clientX - boxSize.x => viewer의 위치 변경
    //현재 커서의 위치에서 실제 컴포넌트의 위치를 빼서 컴포넌트 내부에서의 커서 위치를 계산

    //boxSize.width / 4 => 커서가 중앙에 위치하도록 위치 조정
    //viewer의 크기(boxSize.width / 2)에 다시 반을 나눠서 중앙에 위치
    const viewerPosX = e.clientX - imgBoxPosition.x - size / 4;
    const viewerPosY = e.clientY - imgBoxPosition.y - size / 4;

    //viewer가 이동 가능한지 확인
    //viewerPos의 값이 0보다 작거나 viewer의 크기보다 크면 viewer는 이미지를 벗어남
    const checkPosX = viewerPosX >= 0 && viewerPosX <= size / 2;
    const checkPosY = viewerPosY >= 0 && viewerPosY <= size / 2;

    if (checkPosX) {
      //이동 가능하면 죄표값 그대로 사용
      viewerPosition.left = viewerPosX;
    } else {
      //0보다 작아지면 더이상 왼쪽으로 이동 불가
      if (viewerPosX < 0) {
        viewerPosition.left = 0;
      }

      //size / 2(viewer의 크기)보다 커지면 더이상 오른쪽으로 이동 불가
      if (viewerPosX > size / 2) {
        viewerPosition.left = size / 2;
      }
    }

    if (checkPosY) {
      viewerPosition.top = viewerPosY;
    } else {
      //0보다 작아지면 더이상 상단으로 이동 불가
      if (viewerPosY < 0) {
        viewerPosition.top = 0;
      }

      //size / 2(viewer의 크기)보다 커지면 더이상 하단으로 이동 불가
      if (viewerPosY > size / 2) {
        viewerPosition.top = size / 2;
      }
    }

    setViewerPosition(viewerPosition);
  };

  const onMouseLeave = () => {
    setViewerPosition();
  };

  return (
    <Div
      ref={onBoxSize}
      img={`url('${image1}')`}
      size={size}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {imgBoxPosition && viewerPosition && (
        <>
          <Viewer position={viewerPosition} />

          <ZoomDiv>
            <Zoom position={viewerPosition} img={`url('${image1}')`} />
          </ZoomDiv>
        </>
      )}
    </Div>
  );
};

const Div = styled.div`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};

  position: relative;

  background-image: ${(props) => props.img};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const Viewer = styled.span`
  position: absolute;

  width: 50%;
  height: 50%;

  left: ${(props) => `${props.position.left}px`};
  top: ${(props) => `${props.position.top}px`};

  border: 1px solid gray;
  background-color: rgba(0, 0, 0, 0.3);

  cursor: crosshair;
`;

const ZoomDiv = styled.div`
  position: absolute;

  width: 100%;
  height: 100%;

  top: 0;
  left: calc(100% + 20px);

  overflow: hidden;
  border: 1px solid gray;
`;

const Zoom = styled.div`
  width: 100%;
  height: 100%;

  scale: 2;
  transform-origin: left top;

  background-image: ${(props) => props.img};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  transform: ${(props) =>
    `translate(-${props.position.left}px, -${props.position.top}px)`};
`;

export default ImageViewer;
