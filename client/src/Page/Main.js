import React, { useEffect, useState } from "react";
import {
  LoadingOutlined,
  AppstoreOutlined,
  BarsOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { categoryList } from "../data/CatecoryList";
import { priceList } from "../data/CatecoryList";
import ProductCard from "../Components/ProductCard";
import SelectBox from "../Components/SelectBox";
import SelectBoxPrice from "../Components/SelecBoxPrice";
import "./Main.css";
import RecentView from "../Components/RecentView";
import ProductRank from "../Components/ProductRank";

function Main() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [click, setClick] = useState(true);
  const [selectCategory, setSelectCategort] = useState("전체");
  const [searchValue, setSearchValue] = useState("");
  const [price, setPrice] = useState({
    priceName: "전체",
    priceRange: [0, 100000000],
  });

  const [skip, setSkip] = useState(0); //현재 가져온 데이터 갯수
  const limit = 8; //한번에 불러올 데이터 갯수

  const getMainView = JSON.parse(localStorage.getItem("mainView"));

  useEffect(() => {
    if (getMainView !== null) {
      setClick(getMainView);
    }
  }, []);

  useEffect(() => {
    const option = {
      skip: 0,
      limit: limit,
      category: selectCategory,
      price: price.priceRange,
      searchValue: searchValue,
    };
    getProductList(option);
    setSkip(0);
  }, [selectCategory, price, searchValue]);

  const getProductList = async (data) => {
    if (data.readMore === undefined) {
      setLoading(true);
    }
    try {
      const res = await axios.post("api/product/productList", data);

      if (data.readMore === true) {
        setProductList([...productList, ...res.data.productInfo]);
      } else {
        setProductList(res.data.productInfo);
      }

      setLoading(false);
    } catch (err) {
      console.log("데이터 조회 실패");
    }
  };

  const readMore = () => {
    const option = {
      skip: skip + limit,
      limit: limit,
      category: selectCategory,
      price: price.priceRange,
      searchValue: searchValue,
      readMore: true,
    };

    getProductList(option);
    setSkip((prev) => prev + limit);
  };

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

  const onSearch = (e) => {
    e.preventDefault();

    const option = {
      skip: 0,
      limit: limit,
      category: selectCategory,
      price: price.priceRange,
      searchValue: searchValue,
    };
    getProductList(option);
    setSkip(0);
  };

  return (
    <div className="page">
      <div className="main-option">
        <div className="main-option-selectBox">
          <SelectBox
            data={categoryList}
            value={selectCategory}
            setSelectCategort={setSelectCategort}
            main={true}
          />

          <SelectBoxPrice data={priceList} price={price} setPrice={setPrice} />
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

      <form onSubmit={onSearch} className="main-searchBar">
        <input
          value={searchValue}
          onChange={onSearchValue}
          onSubmit={onSearch}
          placeholder="검색어를 입력해주세요."
        />
        <div>
          <SearchOutlined onClick={onSearch} />
        </div>
      </form>

      {searchValue.length > 0 ? null : <ProductRank />}

      <div className={click ? "main-productList" : "main-productList-list"}>
        <RecentView />

        {loading ? (
          <div className="loading">
            <LoadingOutlined />
          </div>
        ) : (
          <>
            <ProductCard data={productList} click={click} />
          </>
        )}
      </div>
      <button onClick={readMore}></button>
    </div>
  );
}

export default Main;
