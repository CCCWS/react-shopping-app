import React, { useState } from "react";
import styled from "styled-components";

const Test5 = ({ children, height, point }) => {
  if (children.length === undefined) {
    children = [children];
  }

  const [location, setLocation] = useState(0);

  const onLocation = (index) => {
    setLocation(index);
  };

  return (
    <>
      <Div>
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
