import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LeftOutlined, HomeOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import { useDispatch } from "react-redux";
import Zoom from "react-reveal/Fade";
import styled from "styled-components";

import PurchasesCountBtn from "../Components/PurchasesCountBtn";
import ProductCard from "../Components/ProductCard";
import RecentView from "../Components/RecentView";
import Selector from "../Components/Selector";
import Loading from "../Components/Loading";
import Modal from "../Components/Modal";
import ModalBase from "../Components/ModalBase";

import getTime from "../hooks/getTime";
import useAxios from "../hooks/useAxios";
import useModal from "../hooks/useModal";

import { addCart } from "../_action/user_action";
import "./ProductDetail.css";

function ProductDetail({ user }) {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState([]);
  const [purchasesCount, setPurchasesCount] = useState(1);
  const [writer, setWriter] = useState(false);
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

  //상품의 정보를 받아옴
  useEffect(() => {
    getProduct({ id });
  }, [id]);

  //제품 정보를 가져왔을때 실행, 작성자와 다른 상품의 정보를 받아옴
  useEffect(() => {
    if (product) {
      getWriter({ id: product.writer });
      getOtherProduct({
        filterId: id,
        category: product.category,
      });
    }
  }, [product]);

  useEffect(() => {
    if (user.userData) {
      if (user.userData.isAuth) {
        if (product && product.writer === user.userData._id) {
          //제품의 작성자와 로그인한 유저의 id가 같다면 작성자로 확인
          setWriter(true);
        }
      }
    }
  }, [user]);

  //구매 버튼 클릭시 실행
  const goCheckOut = () => {
    if (user.userData.isAuth === false) {
      setContents({
        title: "사용자 확인 불가",
        message: "로그인을 해주세요.",
      });
      setOpenModal(true);
      return;
    }

    if (product.count === 0) {
      setContents({
        title: "품절",
        message: "판매완료된 상품입니다.",
      });
      setOpenModal(true);
      return;
    }

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
  };

  //장바구니 버튼 클릭시 실행
  const onAddCartProduct = () => {
    if (product.count === 0) {
      setContents({
        title: "상품 품절",
        message: "판매완료된 상품입니다.",
      });
      setOpenModal(true);
      return;
    }

    if (user.userData.isAuth === false) {
      setContents({
        title: "사용자 확인 불가",
        message: "로그인을 해주세요.",
      });
      setOpenModal(true);
      return;
    }

    setCartAddLoading(true);
    const option = {
      id: product._id,
      purchasesCount: purchasesCount,
    };

    addProductCart(option);
  };

  //장바구니 버튼 클릭시 실행
  useEffect(() => {
    if (cartAddResponse && cartAddResponse.duplication) {
      // if (
      //   window.confirm(
      //     "장바구니에 이미 있는 상품입니다.\n장바구니로 이동합니다."
      //   )
      // ) {
      //   nav("/cart");
      // }
      setContents({
        title: "장바구니",
        message: "이미 장바구니에 있는 상품입니다.",
        cartBtn: true,
      });
      setOpenModal(true);
    }

    if (cartAddResponse && cartAddResponse.duplication === false) {
      // if (
      //   window.confirm("장바구니에 추가되었습니다.\n장바구니로 이동합니다.")
      // ) {
      //   nav("/cart");
      // }
      setContents({
        title: "장바구니",
        message: "장바구니에 상품이 추가되었습니다.",
        cartBtn: true,
      });
      setOpenModal(true);
    }

    setCartAddLoading(false);
  }, [nav, setContents, setOpenModal, cartAddResponse]);

  // const OnAddCart = () => {
  //   //redux사용
  //   dispatch(addCart(product._id));
  // };

  return (
    <div className="page">
      <RecentView />

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

      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        data={modalImg}
        img={true}
      />

      <div className="ProductDetail-backBtn" onClick={() => nav("/")}>
        <LeftOutlined />
        <HomeOutlined />
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="ProductDetail-info">
          {product.count === 0 ? (
            <div className="soldOut">판매완료된 상품입니다.</div>
          ) : null}
          {/* <ImgCarousel
            data={product.image}
            setModalOpen={setModalOpen}
            setModalImg={setModalImg}
          /> */}
          <Selector
            ProductDetail={true}
            arr={product.image}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            setModalImg={setModalImg}
          />

          <Zoom>
            <div>
              <div className="ProductDetail-writer">
                {writerLoading ? (
                  <Skeleton.Button />
                ) : (
                  <>
                    <div>{productWriter.name}</div>
                    <div>{productWriter.email}</div>
                  </>
                )}
              </div>

              <hr />

              <div>
                <div className="ProductDetail-title">
                  <div>{product.title}</div>
                  <div>{`${product.category} ∙ ${time} ∙ 남은수량 ${product.count}개 ∙ 조회수 ${product.views} `}</div>
                </div>

                <div className="ProductDetail-description">
                  {product.description}
                </div>
              </div>
              <hr />

              {otherProduct && otherProduct.length > 0 && (
                <div>
                  <div className="ProductDetail-other">관련 상품</div>
                  {otherLoading ? (
                    <Loading />
                  ) : (
                    <div className="main-productList ProductDetail-productCard">
                      <ProductCard
                        data={otherProduct}
                        click={true}
                        ProductDetail={true}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </Zoom>

          <div className="ProductDetail-footer">
            <div>
              <div className="ProductDetail-footer-price">
                <div>
                  {`${parseInt(
                    product.price * purchasesCount,
                    10
                  ).toLocaleString()}원`}
                </div>

                <PurchasesCountBtn
                  purchasesCount={purchasesCount}
                  setPurchasesCount={setPurchasesCount}
                  productCount={product.count}
                  detail={true}
                />
              </div>

              <div className="ProductDetail-footer-btn">
                {writerLoading ? (
                  <Skeleton.Button />
                ) : (
                  <>
                    {writer ? (
                      <button
                        onClick={() =>
                          nav(`/edit/${product._id}`, {
                            state: { id: product._id },
                          })
                        }
                        className="ProductDetail-cart"
                      >
                        수정하기
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={onAddCartProduct}
                          className="ProductDetail-cart"
                        >
                          장바구니
                        </button>

                        <button
                          className="ProductDetail-purchase-btn"
                          onClick={goCheckOut}
                        >
                          구매하기
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
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

export default ProductDetail;
