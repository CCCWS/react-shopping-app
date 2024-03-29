import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styled, { css } from "styled-components";
import newAxios from "../../productionCheck";

import RecentView from "../../Components/Product/RecentView";
import Loading from "../../Components/Utility/Loading";
import ModalBase from "../../Components/Modal/ModalBase";
import FooterDetailPage from "../../Components/Footer/FooterDetailPage";
import ProductCarousel from "./ProductCarousel";

import getTime from "../../hooks/getTime";
import useAxios from "../../hooks/useAxios";
import useModal from "../../hooks/useModal";
import useLocalStorage from "../../hooks/useLocalStorage";
import ProductInfo from "./ProductInfo";

function ProductDetail({ isAuth, userId }) {
  const nav = useNavigate();

  const [purchasesCount, setPurchasesCount] = useState(1); //구매수
  const [cartAddLoading, setCartAddLoading] = useState(false); //장바구니 추가시 로딩
  const [currImg, setCurrImg] = useState(""); //이미지 클릭시 모달로 전달
  const { id } = useParams(); //상품 id

  const [loading, setLoading] = useState(true);
  const [sideLoading, setSideLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [otherProduct, setOtherProduct] = useState([]);
  const [productWriter, setProductWriter] = useState([]);

  //제품의 상세 정보 조회
  // const {
  //   resData: product,
  //   loading,
  //   connectServer: getProduct,
  // } = useAxios("/api/product/productDetail");

  //제품과 같은 카테고리의 상품 조회
  // const {
  //   resData: otherProduct,
  //   loading: otherLoading,
  //   connectServer: getOtherProduct,
  // } = useAxios("/api/product/productList");

  //작성자 정보 조회
  // const {
  //   resData: productWriter,
  //   loading: writerLoading,
  //   connectServer: getWriter,
  // } = useAxios("/api/user/userInfo");

  //장바구니 추가
  const { resData: cartAddResponse, connectServer: addProductCart } =
    useAxios("/api/user/addCart");

  //비로그인 경고, 장바구니 추가시 보여지는 모달
  const { openModal, contents, setOpenModal, setContents } = useModal();

  //이미지클릭시 보여지는 모달
  const { openModal: openImgModal, setOpenModal: setOpenImgModal } = useModal();

  //작성된 시간과 현재시간의 차이를 데이터로 받음, 작성일을 n일전으로 표시
  const time = product && getTime(product.createdAt);

  //최근본 상품에 등록
  useLocalStorage(product, loading);

  // useEffect(() => {
  //   //모달창이 열린상태로 뒤로가기 혹은 앞으로갈때 모달창이 닫히도록 이동하면 false로 바꿔줌
  //   if (!openImgModal && !openModal) return;

  //   if (openImgModal) setOpenImgModal(false);
  //   if (openModal) setOpenModal(false);
  // }, [openImgModal, openModal, setOpenImgModal, setOpenModal]);

  useEffect(() => {
    const init = () => {
      setLoading(true);
      setSideLoading(true);

      setOpenModal(false);
      setOpenImgModal(false);
    };
    init();
  }, [id, setOpenModal, setOpenImgModal]);

  useEffect(() => {
    if (product.title) {
      const titleName = document.getElementsByTagName("title")[0];
      titleName.innerHTML = product.title;
    }
  }, [product.title]);

  useEffect(() => {
    const getOtherProduct = async (PRODUCT_ID, PRODUCT_CATEGORY) => {
      const res = await newAxios.post("/api/product/productList", {
        filterId: PRODUCT_ID,
        category: PRODUCT_CATEGORY,
      });
      setOtherProduct(res.data);
    };

    const getProductWriter = async (PRODUCT_WRITER) => {
      const res = await newAxios.post("/api/user/userInfo", {
        id: PRODUCT_WRITER,
      });
      setProductWriter(res.data);
    };

    const getProduct = async (postId) => {
      const res = await newAxios.post("/api/product/productDetail", {
        id: postId,
      });

      setProduct(res.data);

      const PRODUCT_ID = res.data._id;
      const PRODUCT_CATEGORY = res.data.category;
      const PRODUCT_WRITER = res.data.writer;

      getOtherProduct(PRODUCT_ID, PRODUCT_CATEGORY);
      getProductWriter(PRODUCT_WRITER);

      setLoading(false);
    };
    getProduct(id);
  }, [id]);

  useEffect(() => {
    if (productWriter && otherProduct) setSideLoading(false);
  }, [productWriter, otherProduct]);

  //장바구니와 구매하기 버튼 클릭시 가능여부 확인
  const onBtnCheck = useCallback(() => {
    let authCheck = true;

    //비로그인
    if (!isAuth) {
      authCheck = false;
      setContents({
        title: "사용자 확인 불가",
        message: "로그인을 해주세요.",
      });
      setOpenModal(true);
    }

    //품절
    if (product.count === 0) {
      authCheck = false;
      setContents({
        title: "품절",
        message: "판매완료된 상품입니다.",
      });
      setOpenModal(true);
    }

    return authCheck;
  }, [isAuth, product.count, setContents, setOpenModal]);

  //구매 버튼 클릭시 실행
  const onGoCheckOut = useCallback(() => {
    //onBtnCheck의 결과가 true라면 로그인이 되어있고 품절이 아님
    if (onBtnCheck()) {
      //구매 물품과 수량을 함께 넘겨줌
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
  }, [nav, onBtnCheck, product, purchasesCount]);

  //장바구니 버튼 클릭시 실행
  const onAddCartProduct = useCallback(() => {
    //onBtnCheck의 결과가 true라면 로그인이 되어있고 품절이 아님
    if (onBtnCheck()) {
      setCartAddLoading(true);

      const option = {
        productId: product._id,
        userId: userId,
        purchasesCount: purchasesCount,
      };

      addProductCart(option);
    }
  }, [onBtnCheck, addProductCart, product._id, userId, purchasesCount]);

  //장바구니 추가 api의 res를 받았을때 실행됨
  useEffect(() => {
    //중복상품일 경우
    if (cartAddResponse && cartAddResponse.duplicate) {
      setContents({
        title: "장바구니",
        message: "이미 장바구니에 있는 상품입니다.",
        cartBtn: true,
      });
      setOpenModal(true);
    }

    //중복이 아닐경우
    if (cartAddResponse && !cartAddResponse.duplicate) {
      setContents({
        title: "장바구니",
        message: "장바구니에 상품이 추가되었습니다.",
        cartBtn: true,
      });
      setOpenModal(true);
    }

    //모든 행동이 완료된 이후 로딩 false
    setCartAddLoading(false);
  }, [setContents, setOpenModal, cartAddResponse]);

  const onImgModalOpen = useCallback(
    (data) => {
      setOpenImgModal(true);
      setCurrImg(data);
    },
    [setOpenImgModal, setCurrImg]
  );

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

      <ModalBase modalOpen={openImgModal} setModalOpen={setOpenImgModal}>
        <ImgDiv src={currImg} alt={"img"} modal={true} />
      </ModalBase>

      {loading ? (
        <Loading />
      ) : (
        <>
          <ProductCarousel
            img={product.image}
            onImgModalOpen={onImgModalOpen}
            ImgDiv={ImgDiv}
          />

          <ProductInfo
            writerLoading={sideLoading}
            productWriter={productWriter}
            product={product}
            time={time}
            otherProduct={otherProduct}
            otherLoading={sideLoading}
          />

          <FooterDetailPage
            product={product}
            userId={userId}
            purchasesCount={purchasesCount}
            productWriter={productWriter}
            writerLoading={sideLoading}
            setPurchasesCount={setPurchasesCount}
            onAddCartProduct={onAddCartProduct}
            goCheckOut={onGoCheckOut}
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

const ImgDiv = styled.img`
  object-fit: contain;
  position: relative;

  ${(props) =>
    props.modal &&
    css`
      width: 80vmin;
      height: 80vmin;
    `}

  ${(props) =>
    props.carousel &&
    css`
      width: 100%;
      height: 100%;
    `}
`;

export default ProductDetail;
