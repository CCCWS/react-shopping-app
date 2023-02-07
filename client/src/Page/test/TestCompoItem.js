import React from "react";
import styled from "styled-components";

const TestCompoItem = ({ data, nav }) => {
  return (
    <Items
      img={`url('${data.background_image}')`}
      onClick={() =>
        nav(`${data.id}`, {
          state: {
            scroll: window.scrollY,
            data: data,
          },
        })
      }
    >
      {data.name}
    </Items>
  );
};

const Items = styled.div`
  background-image: ${(props) => props.img};
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 150px;
`;

export default React.memo(TestCompoItem);
