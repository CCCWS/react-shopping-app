import React, { useEffect, useState } from "react";
import {
  LoadingOutlined,
  AppstoreOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { categoryList } from "../data/CatecoryList";
import { priceList } from "../data/CatecoryList";
import ProductCard from "../Components/ProductCard";
import SelectBox from "../Components/SelectBox";
import SelectBoxPrice from "../Components/SelecBoxPrice";
import "./Main.css";

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
      setClick(true);
    }

    if (e === "list") {
      setClick(false);
    }
  };

  const onSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="page">
      <div className="main-option">
        <div>
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
      <input value={searchValue} onChange={onSearchValue}></input>
      <div className={click ? "main-productList" : "main-productList-list"}>
        {loading ? (
          <div className="loading">
            <LoadingOutlined />
          </div>
        ) : (
          <ProductCard data={productList} click={click} />
        )}
      </div>
      <button onClick={readMore}>더보기</button>
    </div>
  );
}

export default Main;
