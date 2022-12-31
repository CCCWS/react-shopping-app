import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LeftOutlined, HomeOutlined, SearchOutlined } from "@ant-design/icons";
import styled, { css } from "styled-components";

import RecentView from "../../Components/Product/RecentView";
import Carousel2 from "../../Components/Utility/Carousel2";
import Loading from "../../Components/Utility/Loading";
import ModalBase from "../../Components/Modal/ModalBase";
import FooterDetailPage from "../../Components/Footer/FooterDetailPage";

import getTime from "../../hooks/getTime";
import useAxios from "../../hooks/useAxios";
import useModal from "../../hooks/useModal";

import { postUrl } from "../../PostUrl";
import ProductInfo from "./ProductInfo";

function ProductDetail({ isAuth, userId }) {
  const nav = useNavigate();

  const [purchasesCount, setPurchasesCount] = useState(1); //구매수
  const [cartAddLoading, setCartAddLoading] = useState(false); //장바구니 추가시 로딩
  const [currImg, setCurrImg] = useState(""); //이미지 클릭시 모달로 전달
  const { id } = useParams(); //상품 id

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

  //장바구니 추가
  const { resData: cartAddResponse, connectServer: addProductCart } =
    useAxios("/api/user/addCart");

  //비로그인 경고, 장바구니 추가시 보여지는 모달
  const { openModal, contents, setOpenModal, setContents } = useModal();

  //이미지클릭시 보여지는 모달
  const { openModal: openImgModal, setOpenModal: setOpenImgModal } = useModal();

  //작성된 시간과 현재시간의 차이를 데이터로 받음, 작성일을 n일전으로 표시
  const time = product && getTime(product.createdAt);

  //조회한 상품을 hitory에 등록
  useEffect(() => {
    //모달창이 열린상태로 뒤로가기 혹은 앞으로갈때 모달창이 닫히도록 이동하면 false로 바꿔줌
    if (openImgModal) setOpenImgModal(false);
    if (openModal) setOpenModal(false);

    const get = JSON.parse(localStorage.getItem("productHistory"));

    //LocalStorage에 해당 상품 저장
    const setLocalData = () => {
      //접속한 페이지의 상품을 제외한 나머지 데이터를 가져옴
      const filterGet = get.filter((data) => data.id !== product._id);

      //접속한 페이지의 상품을 LocalStorage에 저장
      //없는 상품이라면 새롭게 추가, 이미 있던 상품이라면 제거후 최상단으로 새롭게 추가
      localStorage.setItem(
        "productHistory",
        JSON.stringify([
          { id: product._id, image: product.image[0] },
          ...filterGet,
        ])
      );
    };

    if (loading === false) {
      //LocalStorage가 비어있을 경우
      if (get === null) {
        localStorage.setItem(
          "productHistory",
          JSON.stringify([{ id: product._id, image: product.image[0] }])
        );

        //LocalStorage에 데이터가 있을 경우
      } else {
        //LocalStorage의 최대 저장길이는 6으로 지정
        if (get.length === 6) {
          //중복 데이터가 이미 있는 경우
          if (get.filter((data) => data.id === product._id).length === 1) {
            setLocalData();

            //중복데이터가 없을경우 하나를 pop하고 추가
          } else {
            get.pop();
            setLocalData();
          }

          //LocalStorage에 저장된 상품이 6미만일 경우
        } else {
          setLocalData();
        }
      }
    }
  }, [id, loading, product, setOpenModal]);

  //상품의 정보를 받아옴
  useEffect(() => {
    getProduct({ id });
  }, [id, getProduct]);

  //제품 정보를 가져왔을때 실행
  useEffect(() => {
    if (product) {
      const titleName = document.getElementsByTagName("title")[0];
      titleName.innerHTML = product.title;

      //작성자 정보
      getWriter({ id: product.writer });

      //같은 카테고리의 다른 상품
      getOtherProduct({
        filterId: id,
        category: product.category,
      });
    }
  }, [product, getOtherProduct, getWriter, id]);

  //장바구니와 구매하기 버튼 클릭시 가능여부 확인
  const onBtnCheck = () => {
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
  };

  //구매 버튼 클릭시 실행
  const onGoCheckOut = () => {
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
  };

  //장바구니 버튼 클릭시 실행
  const onAddCartProduct = () => {
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
  };

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
        <ImgDiv img={`url('${postUrl}${currImg}')`} modal={true} />
      </ModalBase>

      <BackBtn onClick={() => nav("/")}>
        <LeftOutlined />
        <HomeOutlined />
      </BackBtn>

      {loading ? (
        <Loading />
      ) : (
        <>
          <Carousel2 height={"500px"} point={true}>
            {product.image.map((data, index) => (
              <React.Fragment key={index}>
                <ImgDiv carousel={true} img={`url('${postUrl}${data}')`} />
                <OpenModalBtn
                  onClick={() => {
                    setOpenImgModal(true);
                    setCurrImg(data);
                  }}
                >
                  <SearchOutlined />
                </OpenModalBtn>
              </React.Fragment>
            ))}
          </Carousel2>

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

const ImgDiv = styled.div`
  background-image: ${(props) => props.img};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

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

const OpenModalBtn = styled.div`
  position: absolute;
  padding: 10px;
  border-radius: 10px;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2rem;
  opacity: 0.2;
  background-color: var(--gray_transparency);

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

export default React.memo(ProductDetail);
