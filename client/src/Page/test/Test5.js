import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Test5 = ({ children, height, point, auto, delay }) => {
  if (children.length === undefined) {
    children = [children];
  }

  const [location, setLocation] = useState(0);
  const [mouseOver, setMouseOver] = useState(false);
  const savedCallback = useRef();
  let clientX = 0;

  useEffect(() => {
    const autoNext = () => {
      if (location === children.length - 1) {
        setLocation(0);
      } else {
        setLocation((location) => location + 1);
      }
    };

    savedCallback.current = autoNext;
  }, [children, location]);

  useEffect(() => {
    if (auto && mouseOver === false && children.length > 1) {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }
  }, [children, auto, delay, mouseOver]);

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

  const onMouseDown = (e) => {
    clientX = e.clientX;
  };

  const onMouseUp = (e) => {
    // setLocation(2);
    let moveX = clientX - e.clientX;

    if (moveX >= 100) {
      if (location === children.length - 1) {
        setLocation(0);
      } else {
        setLocation((location) => location + 1);
      }
    }

    if (moveX <= -100) {
      if (location === 0) {
        setLocation(children.length - 1);
      } else {
        setLocation((location) => location - 1);
      }
    }
    console.log(moveX);
    clientX = 0;
  };

  return (
    <>
      <Div
        // onMouseOver={() => setMouseOver(true)}
        // onMouseLeave={() => setMouseOver(false)}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        <Section height={height}>
          {children.map((data, index) => (
            <Item key={index} id={index} location={location}>
              <div onClick={() => setLocation(index)}>{data}</div>
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
`;

const Section = styled.div`
  width: inherit;
  height: ${(props) => props.height};
  display: flex;

  position: relative;

  margin-left: 15%;
`;

const Item = styled.div`
  min-width: 70%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: flex-end;

  transition: all ease 0.3s;
  transform: ${(props) => `translateX(-${props.location}00%)`};

  & > div {
    width: ${(props) => (props.location === props.id ? "100%" : "80%")};
    height: ${(props) => (props.location === props.id ? "100%" : "80%")};
    transition: all ease 0.3s;
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

export default Test5;
