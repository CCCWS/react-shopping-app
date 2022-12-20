import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

import useInterval from "../../hooks/useInterval";

const Carousel1 = ({
  children,
  height,
  slide,
  fade,
  nextBtn,
  point,
  auto,
  delay,
  swipe,
}) => {
  if (children.length === undefined) {
    children = [children];
  }

  const [location, setLocation] = useState(0);
  const [user, setUser] = useState("");
  let mouseOver = false;

  //setInterval은 state를 변화시켜 재랜더링이 발생하면
  //처음 설정한 state의 초기값을 계속 참조하여 초기값으로 랜더링이 됨
  //useInterval을 사용하여 참조하는 값을 동적으로 하여 변화된 state가 반영됨
  useInterval(() => {
    if (auto && mouseOver === false && children.length > 1) {
      if (location === children.length - 1) {
        setLocation(0);
      } else {
        setLocation((location) => location + 1);
      }
    }
  }, delay);

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

  const onPrev = () => {
    if (location === 0) {
      setLocation(children.length - 1);
    } else {
      setLocation((location) => location - 1);
    }
  };

  const onNext = () => {
    if (location === children.length - 1) {
      setLocation(0);
    } else {
      setLocation((location) => location + 1);
    }
  };

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
    if (moveX <= -200) {
      onPrev();
    }
    if (moveX >= 200) {
      onNext();
    }
  };

  return (
    <>
      <Div
        onMouseOver={() => (mouseOver = true)}
        onMouseLeave={() => (mouseOver = false)}
        onMouseDown={swipe && user === "pc" ? onDownEvent : null}
        onMouseUp={swipe && user === "pc" ? onUpEvent : null}
        onTouchStart={swipe && user === "mobile" ? onDownEvent : null}
        onTouchEnd={swipe && user === "mobile" ? onUpEvent : null}
      >
        {nextBtn && children.length > 1 && (
          <>
            <Button prev={true} onClick={onPrev}>
              <CaretLeftOutlined />
            </Button>
            <Button next={true} onClick={onNext}>
              <CaretRightOutlined />
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
  overflow: hidden;
  position: relative;

  margin-top: 20px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  position: absolute;
  left: ${(props) => props.prev && "0"};
  right: ${(props) => props.next && "0"};
  z-index: 1;
  height: 100%;
  width: 40px;
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  :hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Section = styled.div`
  width: inherit;
  height: ${(props) => props.height};
  display: flex;
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
    `}
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
`;

const Point = styled.div`
  width: ${(props) => (props.location === props.id ? "20px" : "10px")};
  height: 5px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.location === props.id ? "orange" : "rgba(0,0,0,0.3)"};
  margin: 5px;

  transition: all ease 0.3s;

  :hover {
    cursor: pointer;
  }
`;

export default Carousel1;
