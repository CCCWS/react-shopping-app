import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  LoadingOutlined,
  AppstoreOutlined,
  BarsOutlined,
  SearchOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import ProductCard from "../Components/ProductCard";
import SelectBox from "../Components/SelectBox";
import SelectBoxPrice from "../Components/SelecBoxPrice";
import RecentView from "../Components/RecentView";
import ProductRank from "../Components/ProductRank";

import useAxios from "../hooks/useAxios";

import "./Main.css";

function Main() {
  const [readRef, setReadRef] = useInView();
  const [click, setClick] = useState(true);
  const [selectCategory, setSelectCategort] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchTrue, setSearchTrue] = useState(false);
  const [priceRange, setPriceRange] = useState("");
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

  // useEffect(() => {
  //   window.onbeforeunload = function pushRefresh() {
  //     window.scrollTo(0, 0);
  //   };
  // }, []);

  const { productList, loading, getProduct } = useAxios(
    "api/product/productList"
  );

  const searchOption = {
    skip: 0,
    limit: limit,
    category: selectCategory,
    price: priceRange,
    searchValue: "",
    readMore: false,
  };

  useEffect(() => {
    const onCategorySearch = () => {
      const option = { ...searchOption };
      getProduct(option);
    };
    onCategorySearch();
  }, [selectCategory, priceRange]);

  useEffect(() => {
    const readMore = () => {
      const option = {
        ...searchOption,
        skip: skip + limit,
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

  const onKeywordSearch = (e) => {
    e.preventDefault();
    if (searchValue.length === 0) {
      return alert("한글자 이상 입력해주세요.");
    }
    const option = {
      ...searchOption,
      searchValue: searchValue,
    };
    setSearchTrue(true);
    getProduct(option);
    setSkip(0);
  };

  return (
    <div className="page">
      <div className="main-option">
        <div className="main-option-selectBox">
          <SelectBox setSelectCategort={setSelectCategort} main={true} />
          <SelectBoxPrice setPriceRange={setPriceRange} />
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
              getProduct("api/product/productList");
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

      {productList.length === limit && <div ref={readRef}></div>}
    </div>
  );
}

export default Main;
