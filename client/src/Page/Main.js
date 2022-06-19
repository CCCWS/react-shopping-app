import React, { useEffect, useState } from "react";
import {
  LoadingOutlined,
  AppstoreOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { categoryList } from "../data/CatecoryList";
import ProductCard from "../Components/ProductCard";
import SelectBox from "../Components/SelectBox";
import "./Main.css";

function Main() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [click, setClick] = useState(true);
  const [selectCategory, setSelectCategort] = useState("전체");
  const [skip, setSkip] = useState(0); //현재 가져온 데이터 갯수
  const limit = 8; //한번에 불러올 데이터 갯수

  useEffect(() => {
    getProductList();
  }, [skip]);

  const getProductList = async () => {
    const option = {
      skip: skip,
      limit: limit,
      category: selectCategory,
    };
    try {
      const res = await axios.post("api/product/productList", option);
      setProductList([...productList, ...res.data.productInfo]);
      setLoading(false);
    } catch (err) {
      // alert("데이터 조회 실패");
    }
  };

  const getCategoryFilter = async () => {
    const option = {
      skip: 0,
      limit: 20,
      category: selectCategory,
    };
    try {
      const res = await axios.post("api/product/productList", option);
      setProductList(res.data.productInfo);
      setLoading(false);
    } catch (err) {
      // alert("데이터 조회 실패");
    }
  };

  const view = (e) => {
    if (e === "card") {
      setClick(true);
    }

    if (e === "list") {
      setClick(false);
    }
  };

  const readMore = () => {
    setSkip((prev) => prev + limit);
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
