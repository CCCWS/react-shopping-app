import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";

const API_KEY = "17058e11301a4bf892f409d4ea85d5ff";
const SEARCH_SIZE = 30;
let CURR_PAGE = 1;

const TestCompo = ({ loading, setLoading, isView }) => {
  const [apiData, setApiData] = useState([]);
  //   const [currPage, setCurrPage] = useState(1);

  //   useEffect(() => {
  //     if (apiData.length === 0) getApi();
  //   }, [apiData, getApi]);

  useEffect(() => {
    const getApi = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page_size=${SEARCH_SIZE}&page=${CURR_PAGE}`
      );

      CURR_PAGE += 1;
      setApiData((prev) => [...prev, ...res.data.results]);
      setLoading(false);
    };

    if (isView) getApi();
  }, [setLoading, isView]);

  return (
    <>
      <Div>
        {loading && "로딩중"}
        {/* <button onClick={getApi}>{loading ? "로딩중" : "더보기"}</button> */}
        {apiData.map((data) => (
          <Items key={data.id} img={`url('${data.background_image}')`}>
            {data.name}
          </Items>
        ))}
      </Div>
    </>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  background-color: gray;
`;

const Items = styled.div`
  background-image: ${(props) => props.img};
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 150px;
`;

export default React.memo(TestCompo);
