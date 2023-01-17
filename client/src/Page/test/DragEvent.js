import React, { useState, useRef } from "react";
import styled from "styled-components";

const DragEvent = () => {
  const [location, setLocation] = useState(0);

  const carouselRef = useRef(null);
  const scrollRef = useRef(null);
  const itemRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();

  const onDragStart = (e) => {
    //기본 이벤트의 수행을 막음으로써 스크롤시 마우스 경고표시 뜨는거 막음
    e.preventDefault();
    setIsDrag(true);

    //스크롤 시작위치
    //내부 슬라이드의 left의 위치만 아니라 컴포넌트 자체의 위치도 고려
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const onDragEnd = (e) => {
    setIsDrag(false);
  };

  const onDragMove = (e) => {
    if (isDrag) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;

      scrollRef.current.scrollLeft = startX - e.pageX;

      if (scrollLeft === 0) {
        setStartX(e.pageX);
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft);
      }
    }
  };

  const test = (e) => {
    if (scrollRef.current.scrollLeft === 0) {
      return (scrollRef.current.scrollLeft = itemRef.current.offsetWidth);
    }

    if (scrollRef.current.scrollLeft === itemRef.current.offsetWidth) {
      return (scrollRef.current.scrollLeft = 0);
    }

    // scrollRef.current.scrollTo({
    //   left: 200,
    //   behavior: "smooth",
    // });
  };

  const prev = (e) => {
    // scrollRef.current.scrollLeft -= itemRef.current.offsetWidth;
    setLocation((prev) => prev - 1);
  };
  const next = (e) => {
    // scrollRef.current.scrollLeft += itemRef.current.offsetWidth;
    setLocation((prev) => prev + 1);
  };

  return (
    <>
      <Div ref={carouselRef}>
        <ItemBox
          onMouseDown={onDragStart}
          onMouseMove={onDragMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          // onClick={test}
          ref={scrollRef}
          location={location}
        >
          <Item ref={itemRef} location={location} color={"red"} />
          <Item ref={itemRef} location={location} color={"blue"} />
          <Item ref={itemRef} location={location} color={"green"} />
        </ItemBox>
      </Div>

      {/* <input value={onLeft} onChange={(e) => setLeft(e.target.value)}></input> */}
      <button onClick={prev}>뒤</button>
      <button onClick={next}>앞</button>
    </>
  );
};

const Div = styled.div`
  width: 50vw;
  height: 300px;
  background-color: gray;
  position: relative;
`;

const ItemBox = styled.div`
  position: absolute;
  width: inherit;
  height: inherit;

  display: flex;
  flex-flow: column wrap;

  overflow: hidden;
  overflow: overlay;

  /* scroll-behavior: smooth; */
  transition: all ease 0.5s;
  /* left: ${(props) => `-${props.location}00%`}; */
`;

const Item = styled.div`
  width: 100%;
  height: 100%;
  transition: 0.5s;
  transform: ${(props) => `translateX(-${props.location}00%, 0px, 0px)`};
  background-color: ${(props) => props.color};
`;

export default DragEvent;
