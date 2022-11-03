import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LeftOutlined, HomeOutlined } from "@ant-design/icons";
import styled from "styled-components";

import RecentView from "../../Components/Product/RecentView";
import Selector from "../../Components/Utility/Selector";
import Loading from "../../Components/Utility/Loading";
import ModalBase from "../../Components/Modal/ModalBase";
import FooterDetailPage from "../../Components/Footer/FooterDetailPage";

import getTime from "../../hooks/getTime";
import useAxios from "../../hooks/useAxios";
import useModal from "../../hooks/useModal";

import ProductInfo from "./ProductInfo";

function ProductDetail({ isAuth, userId }) {
  const nav = useNavigate();

  const [purchasesCount, setPurchasesCount] = useState(1);
  const [cartAddLoading, setCartAddLoading] = useState(false);
  const { id } = useParams();

  //제품의 상세 정보 조회
  const {
    resData: product,
    loading,
    connectServer: getProduct,
  } = useAxios("/api/product/productDetail");

  //제품과 같은 카테고리의 상품 조회
  const {
    resData: otherProduct,
    loading: otherLoading,
    connectServer: getOtherProduct,
  } = useAxios("/api/product/productList");

  //작성자 정보 조회
  const {
    resData: productWriter,
    loading: writerLoading,
    connectServer: getWriter,
  } = useAxios("/api/user/userInfo");

  const { resData: cartAddResponse, connectServer: addProductCart } =
    useAxios("/api/user/addCart");

  const { openModal, contents, setOpenModal, setContents } = useModal();

  //작성된 시간과 현재시간의 차이를 데이터로 받음
  const time = product && getTime(product.createdAt);

  //조회한 상품을 hitory에 등록
  useEffect(() => {
    setOpenModal(false);
    const get = JSON.parse(localStorage.getItem("productHistory"));
    const setLocalData = () => {
      //LocalStorage에 해당 상품의 정보 저장
      const filterGet = get.filter((data) => data.id !== product._id);
      //해당 정보가 이미 LocalStorage에 있다면 해당 정보를 제외한 데이터
      localStorage.setItem(
        "productHistory",
        JSON.stringify([
          { id: product._id, image: product.image[0].name },
          ...filterGet,
        ])
        //이미있는 정보를 제외하고 새롭게 등록하여 데이터를 최상단으로 갱신시킴
      );
    };
    if (loading === false) {
      if (get === null) {
        //LocalStorage가 비어있을 경우 데이터를 추가
        localStorage.setItem(
          "productHistory",
          JSON.stringify([{ id: product._id, image: product.image[0].name }])
        );
      } else {
        ///LocalStorage에 데이터가 있을 경우
        if (get.length === 6) {
          ///LocalStorage의 최대 저장길이는 6으로 지정
          if (get.filter((data) => data.id === product._id).length === 1) {
            setLocalData();
            //중복 데이터가 이미 있는 경우
          } else {
            get.pop();
            setLocalData();
            //새로운 데이터일 경우 하나를 삭제하고 등록
          }
        } else {
          setLocalData();
          //LocalStorage의 데이터가 6미만일 경우
        }
      }
    }
  }, [loading, product]);

  // //상품의 정보를 받아옴
  useEffect(() => {
    getProduct({ id });
  }, [id]);

  // //제품 정보를 가져왔을때 실행, 작성자와 다른 상품의 정보를 받아옴
  useEffect(() => {
    if (product) {
      getWriter({ id: product.writer });
      getOtherProduct({
        filterId: id,
        category: product.category,
      });

      const titleName = document.getElementsByTagName("title")[0];
      titleName.innerHTML = product.title;
    }
  }, [product]);

  //장바구니와 구매하기 버튼 클릭시 가능여부 확인
  const btnCheck = () => {
    let authCheck = true;

    if (!isAuth) {
      authCheck = false;
      setContents({
        title: "사용자 확인 불가",
        message: "로그인을 해주세요.",
      });
      setOpenModal(true);
    }

    if (product.count === 0) {
      authCheck = false;
      setContents({
        title: "품절",
        message: "판매완료된 상품입니다.",
      });
      setOpenModal(true);
    }

    return authCheck;
  };

  //구매 버튼 클릭시 실행
  const goCheckOut = () => {
    if (btnCheck()) {
      nav("/checkOut", {
        state: {
          product: [
            {
              ...product,
              purchasesCount: purchasesCount,
              totalPrice: product.price * purchasesCount,
            },
          ],
          detail: true,
          totalPrice: product.price * purchasesCount,
        },
      });
    }
  };

  //장바구니 버튼 클릭시 실행
  const onAddCartProduct = () => {
    if (btnCheck()) {
      setCartAddLoading(true);
      const option = {
        productId: product._id,
        userId: userId,
        purchasesCount: purchasesCount,
      };

      addProductCart(option);
    }
  };

  //장바구니 버튼 클릭시 실행
  useEffect(() => {
    if (cartAddResponse && cartAddResponse.duplicate) {
      setContents({
        title: "장바구니",
        message: "이미 장바구니에 있는 상품입니다.",
        cartBtn: true,
      });
      setOpenModal(true);
    }

    if (cartAddResponse && cartAddResponse.duplicate === false) {
      setContents({
        title: "장바구니",
        message: "장바구니에 상품이 추가되었습니다.",
        cartBtn: true,
      });
      setOpenModal(true);
    }
    setCartAddLoading(false);
  }, [nav, setContents, setOpenModal, cartAddResponse]);

  return (
    <div className="page">
      <RecentView page={true} />

      {cartAddLoading && (
        <CartLoadingDiv>
          <Loading />
        </CartLoadingDiv>
      )}

      <ModalBase
        contents={contents}
        modalOpen={openModal}
        setModalOpen={setOpenModal}
      />

      <BackBtn onClick={() => nav("/")}>
        <LeftOutlined />
        <HomeOutlined />
      </BackBtn>

      {loading ? (
        <Loading />
      ) : (
        <>
          <Selector
            ProductDetail={true}
            arr={product.image}
            soldOut={product.count === 0 && true}
          />

          <ProductInfo
            writerLoading={writerLoading}
            productWriter={productWriter}
            product={product}
            time={time}
            otherProduct={otherProduct}
            otherLoading={otherLoading}
          />

          <FooterDetailPage
            product={product}
            userId={userId}
            purchasesCount={purchasesCount}
            productWriter={productWriter}
            writerLoading={writerLoading}
            setPurchasesCount={setPurchasesCount}
            onAddCartProduct={onAddCartProduct}
            goCheckOut={goCheckOut}
          />
        </>
      )}
    </div>
  );
}

const CartLoadingDiv = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 100;
  top: 0;
  right: 0;
  position: fixed;
`;

const BackBtn = styled.div`
  font-size: 20px;
  width: 40px;
  cursor: pointer;
`;

export default React.memo(ProductDetail);
