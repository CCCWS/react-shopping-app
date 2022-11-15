import React, { useState } from "react";
import styled from "styled-components";

const Test4 = () => {
  const [location, setLocation] = useState(0);

  const up = () => {
    if (location === 2) {
      setLocation(0);
    } else {
      setLocation((location) => location + 1);
    }
  };

  const down = () => {
    if (location === 0) {
      setLocation(2);
    } else {
      setLocation((location) => location - 1);
    }
  };

  console.log(location);
  return (
    <>
      <button onClick={down}>{`<`}</button>
      <button onClick={up}>{`>`}</button>
      <Div>
        <Section>
          <Item id={1} location={location}>
            1
          </Item>
          <Item id={2} location={location}>
            2
          </Item>
          <Item id={3} location={location}>
            3
          </Item>
        </Section>
      </Div>
    </>
  );
};

const Div = styled.div`
  width: 100vw;
  height: 500px;
  background-color: gray;
  /* overflow-x: scroll;
  overflow: overlay; */
  overflow: hidden;
`;

const Section = styled.div`
  width: inherit;
  height: 100%;

  display: flex;
`;

const Item = styled.div`
  min-width: 100vw;
  height: 100%;

  transform: ${(props) => props.location === 0 && "translateX(0)"};
  transform: ${(props) => props.location === 1 && "translateX(-100%)"};
  transform: ${(props) => props.location === 2 && "translateX(-200%)"};

  background-color: ${(props) => props.id === 1 && "red"};
  background-color: ${(props) => props.id === 2 && "yellow"};
  background-color: ${(props) => props.id === 3 && "blue"};

  transition: all ease 0.5s;
`;

export default Test4;
