import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const API_KEY = "17058e11301a4bf892f409d4ea85d5ff";
const SEARCH_SIZE = 5;

const Select2 = () => {
  const [value, setValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const getApi = async () => {
      const res = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&search=${value}&page_size=${SEARCH_SIZE}`
      );
      console.log(res.data.results);
      setSearchResult(res.data.results);
    };

    if (value) getApi();
  }, [value]);
  return (
    <Div>
      <Input onChange={(e) => setValue(e.target.value)} />
      <ItemBox value={value}>
        {searchResult.map((data, index) => (
          <React.Fragment key={index}>{data.name}</React.Fragment>
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
  height: 60px;
  background-color: red;

  display: ${(props) => !props.value && "none"};
`;

export default Select2;
