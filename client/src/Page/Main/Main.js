//library
import React, { useCallback, useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { RollbackOutlined } from "@ant-design/icons";
import styled from "styled-components";
//component
import ProductCard from "../../Components/Product/ProductCard";
import SelectBox from "../../Components/Utility/SelectBox";
import RecentView from "../../Components/Product/RecentView";
import SearchBar from "./SearchBar";
// import ProductRank from "../../Components/Product/ProductRank";
import ModalBase from "../../Components/Modal/ModalBase";
import Loading from "../../Components/Utility/Loading";
import Switch from "../../Components/Utility/Switch";
import ProductRankCarousel from "./ProductRankCarousel";

//comstom hooks
import useAxios from "../../hooks/useAxios";
import useModal from "../../hooks/useModal.js";
import useObserver from "../../hooks/useObserver";

//etc
import { categoryList, priceList } from "../../data/CatecoryList";

function Main() {
  const [readRef, setReadRef] = useInView();

  const [click, setClick] = useState(true); //메인화면 제품카드 카드형 or 리스트형
  const [searchValue, setSearchValue] = useState(""); //검색어
  const [searchTrue, setSearchTrue] = useState(false); //검색 여부
  const [selectCategory, setSelectCategort] = useState(""); //카테고리 필터링
  const [priceRange, setPriceRange] = useState(); //가격 범위 필터링
  const [skip, setSkip] = useState(0); //현재 가져온 데이터 갯수
  const limit = 8; //한번에 불러올 데이터 갯수

  const readMoreRef = useRef(null);
  const { isView } = useObserver(readMoreRef, 1);

  //제품 목록 조회
  const {
    resData: productList,
    loading,
    connectServer: getProduct,
    lastData,
    setLastData,
  } = useAxios("api/product/productList");

  //modal
  const { openModal, contents, setOpenModal, setContents } = useModal();

  useEffect(() => {
    //페이지 접속시 제품 목록 뷰타입 초기 설정
    const getMainView = JSON.parse(localStorage.getItem("mainView"));
    if (getMainView !== null) {
      setClick(getMainView);
    }

    const titleName = document.getElementsByTagName("title")[0];
    titleName.innerHTML = `메인 페이지`;
  }, []);

  //제품 목록 뷰타입 저장
  const view = () => {
    if (!click) {
      localStorage.setItem("mainView", true);
      setClick(true);
    }

    if (click) {
      localStorage.setItem("mainView", false);
      setClick(false);
    }
  };

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
      };
      getProduct(option);
    };

    onCategorySearch();
  }, [selectCategory, priceRange, getProduct]);

  //더보기시 데이터 조회
  useEffect(() => {
    const option = {
      limit: limit,
      skip: skip + limit,
      category: selectCategory,
      price: priceRange,
      searchValue: searchValue,
      readMore: true,
    };

    const readMore = () => {
      getProduct(option);
      setSkip((prev) => prev + limit);
    };

    if (productList === undefined) return;
    if (isView) {
      readMore();
    }
  }, [isView, getProduct]);

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

  //input값 저장
  const onSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  //검색어 입력 초기화
  const onSearchReset = () => {
    setSearchValue("");
    setSkip(0);
    setLastData(false);
    setSearchTrue(false);
    getProduct({
      limit: limit,
      skip: 0,
      category: selectCategory,
      price: priceRange,
      readMore: false,
      searchValue: "",
    });
  };

  return (
    <div className="page">
      <RecentView page={true} />

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

      <SearchBar
        onKeywordSearch={onKeywordSearch}
        searchValue={searchValue}
        onSearchValue={onSearchValue}
      />

      {searchTrue ? (
        <SearchReset>
          <div onClick={onSearchReset}>
            <RollbackOutlined />
          </div>
        </SearchReset>
      ) : (
        <ProductRankCarousel />
      )}

      {loading ? (
        <Loading />
      ) : (
        <ProductCardDiv>
          {productList.map((data, index) => (
            <ProductCard key={index} data={data} viewType={click} />
          ))}
        </ProductCardDiv>
      )}

      {!lastData && <ReadMore ref={readMoreRef} />}
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

const SearchReset = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;

  div {
    font-size: 2rem;
    padding: 0.3rem;
    border-radius: 10px;

    &:hover {
      cursor: pointer;
      background-color: var(--orange_hover);
    }
  }
`;

const ReadMore = styled.div`
  width: 100%;
  height: 20px;
`;

const ProductCardDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 5rem;
`;

export default React.memo(Main);
