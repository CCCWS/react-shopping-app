import React from "react";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";

const SearchBar = ({ onKeywordSearch, searchValue, onSearchValue }) => {
  return (
    <>
      <MainSearchBar onSubmit={onKeywordSearch}>
        <input
          value={searchValue}
          onChange={onSearchValue}
          placeholder="검색어를 입력해주세요."
        />
        <div>
          <SearchOutlined onClick={onKeywordSearch} />
        </div>
      </MainSearchBar>
    </>
  );
};

const MainSearchBar = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all ease 0.5s;

  input {
    background-color: var(--gray_transparency);
    border: 2px solid var(--orange_normal);
    border-radius: 5px;
    width: 300px;
    margin: 1rem;
    padding: 5px;
    outline: none;

    &:focus {
      border: 2px solid var(--orange_hover);
    }
  }

  div {
    font-size: 20px;
    cursor: pointer;
  }
`;

export default React.memo(SearchBar);
