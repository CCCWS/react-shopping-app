import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ImageViewer from "./ImageViewer";

// import Folder from "./Folder/Folder";

import Item1 from "./Folder/Item1";
import Item2 from "./Folder/Item2";
import Item3 from "./Folder/Item3";
import Item4 from "./Folder/Item4";
import Item5 from "./Folder/Item5";
import Item6 from "./Folder/Item6";

// const { apiData, loading } = useAxios({
//   url: "https://mhw-db.com/monsters",
//   type: "get",
// });
// const [img, setImg] = useState(null);

// useEffect(() => {
//   const getApi = async () => {
//     const res = await axios.get(
//       `https://api.rawg.io/api/games?key=${API_KEY}&page_size=${SEARCH_SIZE}&page=${CURR_PAGE}`
//     );

//     setImg(res.data.results[0].background_image);
//   };

//   getApi();
// }, []);

const API_KEY = "17058e11301a4bf892f409d4ea85d5ff";
const SEARCH_SIZE = 1;
let CURR_PAGE = 1;

const Test4 = () => {
  const items = [
    { component: Item1, name: "아이템1" },
    { component: Item2, name: "아이템2" },
    { component: Item3, name: "아이템3" },
    { component: Item4, name: "아이템4" },
    { component: Item5, name: "아이템5" },
    { component: Item6, name: "아이템6" },
  ];

  const [full, setFull] = useState(false);

  return (
    <Window full={full}>
      <WindowHeader onDoubleClick={() => setFull((prev) => !prev)} />

      <Box>
        {items.map((item, index) => (
          <Folder key={index} name={item.name}></Folder>
        ))}
      </Box>

      <WindowFooter></WindowFooter>
    </Window>
  );
};

const Window = styled.div`
  background-color: beige;
  width: ${(props) => (props.full ? "100vw" : "50vw")};
  height: ${(props) => (props.full ? "90vh" : "50vw")};

  position: relative;
  transition: 0.5s;
`;

const WindowHeader = styled.div`
  width: 100%;
  height: 30px;
  background-color: red;
`;

const WindowFooter = styled.div`
  width: 100%;
  height: 30px;
  background-color: black;

  position: absolute;
  bottom: 0;
`;

const Box = styled.div`
  width: 100%;
  height: 100%;

  padding: 10px;

  display: flex;
  justify-content: space-around;
`;

const Folder = styled.div`
  width: 50px;
  height: 50px;
  background-color: yellow;

  position: relative;

  ::before {
    content: "${(props) => `${props.name}`}";
    position: absolute;
    bottom: -25px;
  }
`;

export default Test4;
