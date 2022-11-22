import React, { useState } from "react";
import styled, { css } from "styled-components";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

const Carousel1 = ({ children, height, slide, fade, nextBtn, point }) => {
  if (children.length === undefined) {
    children = [children];
  }

  const [location, setLocation] = useState(0);

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

  const onLocation = (index) => {
    setLocation(index);
  };

  return (
    <>
      <Div>
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
                onClick={() => onLocation(index)}
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
  margin: 10px;

  transition: all ease 0.3s;

  :hover {
    cursor: pointer;
  }
`;

export default Carousel1;
