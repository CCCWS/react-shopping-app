//library
import React, { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { SearchOutlined, RollbackOutlined } from "@ant-design/icons";
import styled from "styled-components";

//component
import ProductCard from "../Components/Product/ProductCard";
import SelectBox from "../Components/Utility/SelectBox";
import RecentView from "../Components/Product/RecentView";
import ProductRank from "../Components/Product/ProductRank";
import ModalBase from "../Components/Modal/ModalBase";
import Loading from "../Components/Utility/Loading";
import Switch from "../Components/Utility/Switch";
 
//comstom hooks
import useAxios from "../hooks/useAxios";
import useModal from "../hooks/useModal.js";

//etc
import { categoryList, priceList } from "../data/CatecoryList";

function Main() {
  const [readRef, setReadRef] = useInView();

  const [click, setClick] = useState(true); //메인화면 제품카드 카드형 or 리스트형
  const [searchValue, setSearchValue] = useState(""); //검색어
  const [searchTrue, setSearchTrue] = useState(false); //검색 여부
  const [selectCategory, setSelectCategort] = useState(""); //카테고리 필터링
  const [priceRange, setPriceRange] = useState(); //가격 범위 필터링
  const [skip, setSkip] = useState(0); //현재 가져온 데이터 갯수
  const limit = 8; //한번에 불러올 데이터 갯수

  //제품 목록을 받아옴
  const {
    resData: productList,
    loading,
    connectServer: getProduct,
  } = useAxios("api/product/productList");

  //모달창
  const { openModal, contents, setOpenModal, setContents } = useModal();

  //로컬스토리지에 저장된 제품카드의 형태에 따라 페이지 로딩시 적용
  useEffect(() => {
    const getMainView = JSON.parse(localStorage.getItem("mainView"));
    if (getMainView !== null) {
      setClick(getMainView);
    }

    const titleName = document.getElementsByTagName("title")[0];
    titleName.innerHTML = `메인 페이지`;
  }, []);

  //제품카드의 형태를 로컬스토리지에 저장
  const view = useCallback(() => {
    if (!click) {
      localStorage.setItem("mainView", true);
      setClick(true);
    }

    if (click) {
      localStorage.setItem("mainView", false);
      setClick(false);
    }
  }, [click]);

  //페이지 로딩시 or 카테고리, 가격 목록 선택시 데이터조회
  useEffect(() => {
    setSkip(0);
    const onCategorySearch = () => {
      const option = {
        limit: limit,
        skip: 0,
        category: selectCategory,
        price: priceRange,
        readMore: false,
        searchValue: searchValue,
      };
      getProduct(option);
    };
    onCategorySearch();
  }, [selectCategory, priceRange, getProduct]);

  //더보기 동작시 데이터 조회
  useEffect(() => {
    const readMore = () => {
      const option = {
        limit: limit,
        skip: skip + limit,
        category: selectCategory,
        price: priceRange,
        searchValue: searchValue,
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
    }

    if (searchValue.length > 0) {
      const option = {
        limit: limit,
        skip: 0,
        category: selectCategory,
        price: priceRange,
        readMore: false,
        searchValue: searchValue,
      };
      setSearchTrue(true);
      getProduct(option);
      setSkip(0);
    }
  };

  //검색어 인풋
  const onSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="page">
      <RecentView body={true} />

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

        <Switch viewType={click} onSetMode={view} />
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
              getProduct({
                limit: limit,
                skip: 0,
                category: selectCategory,
                price: priceRange,
                readMore: false,
                searchValue: "",
              });
            }}
          >
            <RollbackOutlined />
          </div>
        </SearchReset>
      ) : (
        <ProductRank />
      )}

      {loading ? (
        <Loading />
      ) : (
        <ProductCard data={productList} viewType={click} />
      )}

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

    @media (max-width: 380px) {
      flex-direction: column;
    }
  }
`;

const ViewBtn = styled.button`
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  font-size: 20px;
  background-color: ${(props) =>
    props.type === "card" && props.click
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

export default React.memo(Main);
