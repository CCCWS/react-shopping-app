//library
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  AppstoreOutlined,
  BarsOutlined,
  SearchOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

//component
import ProductCard from "../Components/ProductCard";
import SelectBox from "../Components/SelectBox";
import RecentView from "../Components/RecentView";
import ProductRank from "../Components/ProductRank";
import ModalBase from "../Components/ModalBase";
import Loading from "../Components/Loading";

//comstom hooks
import useAxios from "../hooks/useAxios";
import useModal from "../hooks/useModal.js";

//etc
import { categoryList, priceList } from "../data/CatecoryList";

function Main() {
  const [readRef, setReadRef] = useInView();
  const [click, setClick] = useState(true);
  const [selectCategory, setSelectCategort] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchTrue, setSearchTrue] = useState(false);
  const [priceRange, setPriceRange] = useState();
  const [skip, setSkip] = useState(0); //현재 가져온 데이터 갯수
  const limit = 8; //한번에 불러올 데이터 갯수

  useEffect(() => {
    const getMainView = JSON.parse(localStorage.getItem("mainView"));
    if (getMainView !== null) {
      setClick(getMainView);
    }
  }, []);

  const view = (e) => {
    if (e === "card") {
      localStorage.setItem("mainView", true);
      setClick(true);
    }

    if (e === "list") {
      localStorage.setItem("mainView", false);
      setClick(false);
    }
  };

  const onSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const {
    resData: productList,
    loading,
    connectServer: getProduct,
  } = useAxios("api/product/productList");

  const { openModal, contents, setOpenModal, setContents } = useModal();

  const searchOption = {
    limit: limit,
    category: selectCategory,
    price: priceRange,
    readMore: false,
  };

  //페이지 로딩시 or 카테고리, 가격 목록 선택시 데이터조회
  useEffect(() => {
    setSkip(0);
    const onCategorySearch = () => {
      const option = { ...searchOption, skip: 0, searchValue: searchValue };
      getProduct(option);
    };
    onCategorySearch();
  }, [selectCategory, priceRange]);

  //더보기 동작시 데이터 조회
  useEffect(() => {
    const readMore = () => {
      const option = {
        ...searchOption,
        searchValue: searchValue,
        skip: skip + limit,
        readMore: true,
      };
      getProduct(option);
      setSkip((prev) => prev + limit);
    };

    if (setReadRef) {
      readMore();
    }
  }, [setReadRef]);

  //검색시 데이터 조회
  const onKeywordSearch = (e) => {
    e.preventDefault();
    if (searchValue.length === 0) {
      setContents({
        title: "상품 검색",
        message: "검색어를 입력해주세요.",
      });
      setOpenModal(true);
    } else {
      const option = {
        ...searchOption,
        searchValue: searchValue,
        skip: 0,
      };
      setSearchTrue(true);
      getProduct(option);
      setSkip(0);
    }
  };

  return (
    <div className="page">
      <RecentView />
      <ModalBase
        contents={contents}
        modalOpen={openModal}
        setModalOpen={setOpenModal}
      />

      <MainOption>
        <div>
          <SelectBox
            data={categoryList}
            setData={setSelectCategort}
            main={true}
          />
          <SelectBox data={priceList} setData={setPriceRange} main={true} />
        </div>

        <div>
          <ViewBtn click={click} type={"card"} onClick={() => view("card")}>
            <AppstoreOutlined />
          </ViewBtn>

          <ViewBtn click={click} type={"list"} onClick={() => view("list")}>
            <BarsOutlined />
          </ViewBtn>
        </div>
      </MainOption>

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

      {searchTrue ? (
        <SearchReset>
          <div
            onClick={() => {
              setSearchValue("");
              setSearchTrue(false);
              getProduct(searchOption);
            }}
          >
            <RollbackOutlined />
          </div>
        </SearchReset>
      ) : (
        <ProductRank />
      )}

      <MainProduct viewType={click}>
        {loading ? (
          <Loading />
        ) : (
          <ProductCard data={productList} click={click} />
        )}
      </MainProduct>

      {loading === false && productList.length === limit && (
        <div ref={readRef}></div>
      )}
    </div>
  );
}

const MainOption = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > :first-child {
    display: flex;
  }
`;

const ViewBtn = styled.button`
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  font-size: 20px;
  background-color: ${(props) =>
    (props.type === "card") === props.click
      ? "rgb(255, 120, 120)"
      : "transparent"};
  margin: 5px;
  cursor: pointer;
`;

const MainSearchBar = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    background-color: rgba(200, 200, 200, 0.2);
    border: 2px solid orange;
    border-radius: 5px;
    width: 300px;
    margin: 1rem;
    padding: 5px;
    outline: none;
  }

  div {
    font-size: 20px;
    cursor: pointer;
  }
`;

const SearchReset = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  div {
    font-size: 2rem;
    padding: 0.5rem;
    border-radius: 10px;

    &:hover {
      cursor: pointer;
      background-color: rgba(255, 166, 0, 0.61);
    }
  }
`;

const MainProduct = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default Main;
