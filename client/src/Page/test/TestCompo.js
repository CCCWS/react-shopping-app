import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import TestCompoItem from "./TestCompoItem";

const API_KEY = "17058e11301a4bf892f409d4ea85d5ff";
const SEARCH_SIZE = 30;
let CURR_PAGE = 1;

const TestCompo = ({ loading, setLoading, isView }) => {
  const nav = useNavigate();
  const [apiData, setApiData] = useState([]);

  const getApi = useCallback(async () => {
    setLoading(true);
    const res = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page_size=${SEARCH_SIZE}&page=${CURR_PAGE}`
    );

    CURR_PAGE += 1;
    setApiData((prev) => [...prev, ...res.data.results]);
    setLoading(false);
  }, [setLoading]);

  useEffect(() => {
    if (apiData.length === 0) {
      getApi();
    }
  }, [apiData, getApi]);

  useEffect(() => {
    if (isView) getApi();
  }, [getApi, isView]);

  return (
    <>
      <Div>
        {loading && "로딩중"}
        {/* <button onClick={getApi}>{loading ? "로딩중" : "더보기"}</button> */}
        {apiData.map((data) => (
          <React.Fragment key={data.id}>
            <TestCompoItem data={data} nav={nav} />
          </React.Fragment>
        ))}
      </Div>
      <Outlet />
    </>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
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
