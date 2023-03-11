import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import axios from "axios";

const API_KEY = "17058e11301a4bf892f409d4ea85d5ff";
const SEARCH_SIZE = 8;
let CURR_PAGE = 1;

const Test8 = () => {
  const [curr, setCurr] = useState("");
  const [data, setData] = useState([]);
  const item = [
    { id: 1, color: "red" },
    { id: 2, color: "blue" },
    { id: 3, color: "green" },
    { id: 4, color: "orange" },
    { id: 5, color: "white" },
    { id: 6, color: "yellow" },
    { id: 7, color: "purple" },
    { id: 8, color: "pink" },
  ];

  useEffect(() => {
    const getApi = async () => {
      const res = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page_size=${SEARCH_SIZE}&page=${CURR_PAGE}`
      );

      setData(res.data.results);
    };

    getApi();
  }, []);

  return (
    <Page>
      {data.map((data) => (
        <Item
          key={data.id}
          img={`url('${data.background_image}')`}
          curr={curr === data.id}
          onClick={() => {
            if (curr === data.id) {
              setCurr("");
            } else {
              setCurr(data.id);
            }
          }}
        />
      ))}
    </Page>
  );
};

const Page = styled.div`
  width: 700px;
  height: 300px;
  background-color: gray;
  overflow-y: scroll;
  overflow: overlay;
  padding: 10px;

  display: flex;
`;

const Item = styled.div`
  min-width: ${(props) => (props.curr ? "40%" : "20%")};
  height: 100%;
  background-image: ${(props) => props.img};
  background-size: cover;
  background-position: center;
  margin-right: 5px;
  margin-left: 5px;
  border-radius: 5px;

  transition: 0.3s;
`;

export default Test8;
