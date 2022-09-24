//library
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  LoadingOutlined,
  AppstoreOutlined,
  BarsOutlined,
  SearchOutlined,
  RollbackOutlined,
} from "@ant-design/icons";

//component
import ProductCard from "../Components/ProductCard";
import SelectBox from "../Components/SelectBox";
import RecentView from "../Components/RecentView";
import ProductRank from "../Components/ProductRank";
import ModalBase from "../Components/ModalBase";

//comstom hooks
import useAxios from "../hooks/useAxios";
import useModal from "../hooks/useModal.js";

//etc
import { categoryList, priceList } from "../data/CatecoryList";
import "./Main.css";

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
      <ModalBase
        title={contents.title}
        message={contents.message}
        modalOpen={openModal}
        setModalOpen={setOpenModal}
      />
      <div className="main-option">
        <div className="main-option-selectBox">
          <SelectBox
            data={categoryList}
            setData={setSelectCategort}
            main={true}
          />
          <SelectBox data={priceList} setData={setPriceRange} main={true} />
        </div>

        <div>
          <button
            onClick={() => view("card")}
            className={[`main-view-btn ${click ? "main-view-on" : null}`]}
          >
            <AppstoreOutlined />
          </button>
          <button
            onClick={() => view("list")}
            className={[`main-view-btn ${click ? null : "main-view-on"}`]}
          >
            <BarsOutlined />
          </button>
        </div>
      </div>

      <form onSubmit={onKeywordSearch} className="main-searchBar">
        <input
          value={searchValue}
          onChange={onSearchValue}
          placeholder="검색어를 입력해주세요."
        />
        <div>
          <SearchOutlined onClick={onKeywordSearch} />
        </div>
      </form>

      {searchTrue ? (
        <div className="main-search-reset">
          <div
            onClick={() => {
              setSearchValue("");
              setSearchTrue(false);
              getProduct(searchOption);
            }}
          >
            <RollbackOutlined />
          </div>
        </div>
      ) : (
        <ProductRank />
      )}

      <div className={click ? "main-productList" : "main-productList-list"}>
        <RecentView />

        {loading ? (
          <div className="loading">
            <LoadingOutlined />
          </div>
        ) : (
          <ProductCard data={productList} click={click} />
        )}
      </div>

      {loading === false && productList.length === limit && (
        <div ref={readRef}></div>
      )}
    </div>
  );
}

export default Main;
