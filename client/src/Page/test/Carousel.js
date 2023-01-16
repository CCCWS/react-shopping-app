import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";

const CarouselInfiniteLoop = ({
  children,
  height,
  point,
  nextBtn,
  auto,
  autoDelay,
  transitionDuration,
}) => {
  //children의 개수가 하나인지 체크
  const checkOneChildren = children.length === undefined && true;

  //children를 담은 배열
  const [component, setComponent] = useState([]);

  //children가 하나라면 초기위치는 0
  //children이 여러개라면 첫번째 children 앞에 마지막 children이 붙으므로 초기위치는 1
  const [location, setLocation] = useState(checkOneChildren ? 0 : 1);

  //슬라이드 transition
  const [duration, setDuration] = useState(transitionDuration);

  //마우스를 올렸을때 자동이동 일시정지
  const [mouseOver, setMouseOver] = useState(false);

  useEffect(() => {
    const initComponet = () => {
      //children이 하나라면 하나만 배열에 추가
      if (checkOneChildren) {
        return setComponent([children]);
      }

      //슬라이드가 여러개일 경우 배열의 0번째에 마지막 children,
      //배열의 마지막에 첫번째 children추가
      const firstChild = children[0];
      const lastChild = children[children.length - 1];

      setComponent([lastChild, ...children, firstChild]);
    };

    initComponet();
  }, [children, checkOneChildren]);

  useEffect(() => {
    //복사된 배열에 도착했을 경우 특정위치로 이동시켜줌
    //transitionDuration만큼 지난후 실제위치는 1혹은 component.length - 2로 이동시키지만
    //이전에 duration을 0으로 만들어서 transition이 발생하지 않음

    //ex) 마지막 배열로 이동 > delay를 0으로 만듬 > transitionDuration이후 1번째 배열로 이동
    //실제로는 무한히 반복하는것 처럼 보이게됨
    const moveLocation = (n) => {
      setDuration(0);
      setTimeout(() => {
        setLocation(n);
      }, transitionDuration);
    };

    if (checkOneChildren) {
      return;
    } else {
      if (location === 0) moveLocation(component.length - 2);
      if (location === component.length - 1) moveLocation(1);
    }
  }, [children, checkOneChildren, location, component, transitionDuration]);

  //transition 지속시간 초기화
  const resetDuration = useCallback(() => {
    if (duration === 0) setDuration(transitionDuration);
  }, [duration, transitionDuration]);

  //이전버튼 클릭시
  const onPrev = () => {
    //useEffect에서 해당 조건을 탐지하여 위치이동
    if (location === 0) return;

    resetDuration();
    setLocation((prev) => prev - 1);
  };

  //다음버튼 클릭시
  const onNext = useCallback(() => {
    //useEffect에서 해당 조건을 탐지하여 위치이동
    if (location === component.length - 1) return;

    resetDuration();
    setLocation((prev) => prev + 1);
  }, [component, location, resetDuration]);

  //point를 클릭하여 위치 이동
  //복사된 컴포넌트로 이동할때 duration을 0으로 만들어주어서 해당 상태에서 point클릭시 애니매이션이 발생하지 않음
  //그런 상태라면 duration 초기화를 시켜줌
  const clickPoint = (item) => {
    resetDuration();
    setLocation(item);
  };

  //자동 슬라이드
  const savedCallback = useRef();

  useEffect(() => {
    if (auto && autoDelay) savedCallback.current = onNext;
  }, [onNext, auto, autoDelay]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };

    if (!mouseOver && auto && autoDelay) {
      const func = setInterval(tick, autoDelay);
      return () => clearInterval(func);
    }
  }, [auto, autoDelay, mouseOver, location]);

  const testRef = useRef();

  const [moveAble, setMoveAble] = useState(false);
  const [moveX, setMoveX] = useState(0);
  const [left, setLeft] = useState(0);
  const [moveInit, setMoveInit] = useState(0);

  const onMouseMove = (e) => {
    if (moveInit === 0) setMoveInit(e.clientX);
    if (moveAble) {
      // console.log(left);
      if (e.clientX - moveInit > 0) {
        setLeft((prev) => prev + 2);
      }

      if (e.clientX - moveInit < 0) {
        setLeft((prev) => prev - 2);
      }
    }
  };
  const onMouseDown = () => {
    setMoveAble(true);
  };
  const onMouseUp = () => {
    setMoveInit(0);
    setMoveAble(false);
  };

  const test = (e) => {
    console.log(e.target.offsetLeft);
  };

  return (
    <>
      <Div
        height={height}
        onMouseOver={() => auto && setMouseOver(true)}
        onMouseLeave={() => auto && setMouseOver(false)}
      >
        <Section location={location} duration={duration}>
          {component.map((data, index) => (
            <ItemDiv
              ref={testRef}
              key={index}
              location={location}
              duration={duration}
              onMouseMove={onMouseMove}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
            >
              {data}
            </ItemDiv>
          ))}
        </Section>

        {!checkOneChildren && point && (
          <PointBox>
            {children.map((data, index) => (
              <Point
                key={index + 1}
                currLocation={index + 1 === location}
                duration={transitionDuration}
                onClick={() => clickPoint(index + 1)}
              />
            ))}
          </PointBox>
        )}

        {!checkOneChildren && nextBtn && (
          <>
            <Button prev={true} onClick={onPrev}>
              <div />
            </Button>

            <Button next={true} onClick={onNext}>
              <div />
            </Button>
          </>
        )}
      </Div>

      <Test
        onClick={test}
        left={left}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      ></Test>
    </>
  );
};

const Div = styled.div`
  width: 100%;
  height: ${(props) => props.height};

  position: relative;
  overflow: hidden;
`;

const Section = styled.div`
  width: inherit;
  height: inherit;

  display: flex;
  flex-flow: column wrap;
`;

const ItemDiv = styled.div`
  width: inherit;
  height: inherit;

  display: flex;
  justify-content: center;
  align-items: center;

  transform: ${(props) =>
    `translateX(calc(-${props.location}00% + ${props.moveX}px))`};
  transition: ${(props) => `${props.duration}ms`};
`;

const PointBox = styled.div`
  width: 50%;
  height: 50px;

  position: absolute;

  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0%);

  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Point = styled.div`
  width: 10px;
  height: 10px;

  margin: 5px;

  border-radius: 30px;
  border: 1px solid gray;
  transition: ${(props) => `${props.duration}ms`};
  background-color: ${(props) => (props.currLocation ? "black" : "#b4b4b4")};

  cursor: pointer;
`;

const Button = styled.button`
  position: absolute;
  top: 0;
  left: ${(props) => props.prev && "0"};
  right: ${(props) => props.next && "0"};

  width: 40px;
  height: 100%;
  font-size: 2rem;
  padding: 10px;

  border: none;
  background-color: transparent;

  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.3);
  }

  div {
    width: 100%;
    height: 40px;
    background-color: black;
    clip-path: ${(props) =>
      props.prev && "polygon(100% 0, 100% 0%, 100% 100%, 100% 100%, 0% 50%)"};

    clip-path: ${(props) =>
      props.next && "polygon(0 0, 0 0, 0 100%, 0 100%, 100% 50%)"};
  }
`;

const Test = styled.div`
  width: 50px;
  height: 50px;
  background-color: blue;
  position: absolute;
  left: ${(props) => `${props.left}px`};
`;

export default CarouselInfiniteLoop;
