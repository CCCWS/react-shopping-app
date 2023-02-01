import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";

const API_KEY = "17058e11301a4bf892f409d4ea85d5ff";
const SEARCH_SIZE = 30;

const Select2 = () => {
  const [value, setValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const debounceFunction = useCallback((callback, delay) => {
    let timer;
    return (...args) => {
      // 실행한 함수(setTimeout())를 취소
      console.log(args);
      clearTimeout(timer);
      // delay가 지나면 callback 함수를 실행
      timer = setTimeout(() => callback(...args), delay);
    };
  }, []);

  useEffect(() => {
    const getApi = async () => {
      const res = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&search=${value}&page_size=${SEARCH_SIZE}`
      );
      setSearchResult(res.data.results);
    };
    if (!value) setSearchResult([]);

    const test = setTimeout(() => {
      if (value) getApi();
    }, 500);
    return () => clearTimeout(test);
  }, [value, debounceFunction]);

  const changeValue = (e) => {
    setValue(e.target.value);
  };

  return (
    <Div>
      <Input onChange={changeValue} />
      <ItemBox value={value}>
        {searchResult.map((data, index) => (
          <SearchData key={index} img={`url('${data.background_image}')`}>
            <div>{data.name}</div>
          </SearchData>
        ))}
      </ItemBox>
    </Div>
  );
};

const Div = styled.div`
  width: 300px;
  height: 50px;
  background-color: gray;

  position: relative;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
`;

const ItemBox = styled.div`
  position: absolute;
  width: 100%;
  max-height: 300px;
  background-color: red;
  overflow-y: scroll;
  overflow: overlay;

  display: ${(props) => !props.value && "none"};
`;

const SearchData = styled.div`
  width: 100%;
  height: 100px;
  background-color: gray;
  margin-bottom: 20px;

  background-image: ${(props) => props.img};
  background-size: cover;
`;

export default Select2;
