import React, { useState, useRef, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";

const CarouselType1 = ({
  children,
  height,
  slide,
  fade,
  nextBtn,
  point,
  auto,
  autoDelay,
  swipe,
}) => {
  //넘겨진 자식노드가 하나일 경우 배열로 감싸줌
  if (children.length === undefined) {
    children = [children];
  }

  const savedCallback = useRef();
  const [location, setLocation] = useState(0);
  const [mouseOver, setMouseOver] = useState(false);
  const [user, setUser] = useState("");

  //유저가 접속한 브라우저 환경 확인
  useEffect(() => {
    if (
      navigator.userAgent.match(
        /Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/
      )
    ) {
      setUser("mobile");
    }

    if (
      !navigator.userAgent.match(
        /Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/
      )
    ) {
      setUser("pc");
    }
  }, []);

  //컴포넌트이동 이벤트
  const onPrev = () => {
    if (location === 0) {
      setLocation(children.length - 1);
    } else {
      setLocation((location) => location - 1);
    }
  };
  const onNext = useCallback(() => {
    if (location === children.length - 1) {
      setLocation(0);
    } else {
      setLocation((location) => location + 1);
    }
  }, [location, children]);

  //참조값을 동적으로 하여 변화된 state가 반영되는 setInterval의 개량형
  useEffect(() => {
    if (auto && autoDelay) savedCallback.current = onNext;
  }, [onNext, autoDelay, autoDelay]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };

    if (!mouseOver && auto && autoDelay) {
      const func = setInterval(tick, autoDelay);
      return () => clearInterval(func);
    }
  }, [auto, autoDelay, mouseOver]);

  //스와이프
  let startClientX = 0;
  const onDownEvent = (e) => {
    if (user === "pc") startClientX = e.clientX;
    if (user === "mobile") startClientX = e.changedTouches[0].clientX;
  };

  const onUpEvent = (e) => {
    let endClientX = 0;

    if (user === "pc") endClientX = e.clientX;
    if (user === "mobile") endClientX = e.changedTouches[0].clientX;

    let moveX = startClientX - endClientX;
    if (moveX >= 150) {
      onNext();
    }

    if (moveX <= -150) {
      onPrev();
    }
  };

  return (
    <>
      <Div
        height={height}
        onMouseOver={() => auto && setMouseOver(true)}
        onMouseLeave={() => auto && setMouseOver(false)}
        onMouseDown={swipe && user === "pc" ? onDownEvent : null}
        onMouseUp={swipe && user === "pc" ? onUpEvent : null}
        onTouchStart={swipe && user === "mobile" ? onDownEvent : null}
        onTouchEnd={swipe && user === "mobile" ? onUpEvent : null}
      >
        {nextBtn && children.length > 1 && (
          <>
            <Button prev={true} onClick={onPrev}>
              <div />
            </Button>
            <Button next={true} onClick={onNext}>
              <div />
            </Button>
          </>
        )}

        <Section height={height}>
          {children.map((data, index) => (
            <Item
              key={index}
              id={index}
              location={location}
              slide={slide}
              fade={fade}
            >
              {data}
            </Item>
          ))}
        </Section>

        {point && (
          <PointBox>
            {children.map((data, index) => (
              <Point
                key={index}
                id={index}
                location={location}
                onClick={() => setLocation(index)}
              />
            ))}
          </PointBox>
        )}
      </Div>
    </>
  );
};

const Div = styled.div`
  width: 100%;
  height: ${(props) => props.height};
  overflow: hidden;
  position: relative;
`;

const Section = styled.div`
  width: inherit;
  height: inherit;

  display: flex;
  flex-flow: column wrap;
  position: relative;
`;

const Item = styled.div`
  min-width: 100%;
  height: 100%;
  transition: all ease 0.3s;

  ${(props) =>
    props.slide &&
    css`
      transform: ${(props) => `translateX(-${props.location}00%)`};
    `}

  ${(props) =>
    props.fade &&
    css`
      position: absolute;
      opacity: ${(props) => (props.id === props.location ? "1" : "0")};
      z-index: ${(props) => (props.id === props.location ? "1" : "0")};
    `}
`;

const Button = styled.button`
  position: absolute;
  left: ${(props) => props.prev && "0"};
  right: ${(props) => props.next && "0"};
  z-index: 2;
  height: 100%;
  width: 40px;
  font-size: 3rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: transparent;
  border: none;

  div {
    width: 100%;
    height: 40px;
    background-color: black;
    clip-path: ${(props) =>
      props.prev && "polygon(100% 0, 100% 0%, 100% 100%, 100% 100%, 0% 50%)"};

    clip-path: ${(props) =>
      props.next && "polygon(0 0, 0 0, 0 100%, 0 100%, 100% 50%)"};
  }

  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const PointBox = styled.div`
  width: 70%;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  z-index: 1;
`;

const Point = styled.div`
  width: ${(props) => (props.location === props.id ? "20px" : "10px")};
  height: 5px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.location === props.id ? "orange" : "rgba(0,0,0,0.3)"};
  margin: 10px;

  transition: all ease 0.3s;

  :hover {
    cursor: pointer;
  }
`;

export default CarouselType1;
