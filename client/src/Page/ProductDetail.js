import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LeftOutlined, HomeOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import { useDispatch } from "react-redux";
import Fade from "react-reveal/Fade";

import PurchasesCountBtn from "../Components/PurchasesCountBtn";
import ProductCard from "../Components/ProductCard";
import RecentView from "../Components/RecentView";
import Selector from "../Components/Selector";
import Loading from "../Components/Loading";
import Modal from "../Components/Modal";

import getTime from "../hooks/getTime";
import useAxios from "../hooks/useAxios";

import { addCart } from "../_action/user_action";
import "./ProductDetail.css";

function ProductDetail({ user }) {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState([]);
  const [purchasesCount, setPurchasesCount] = useState(1);
  const [writer, setWriter] = useState(false);
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

  console.log(productWriter);

  const { resData, connectServer } = useAxios("/api/user/addCart");

  //작성된 시간과 현재시간의 차이를 데이터로 받음
  const time = getTime(product.createdAt);

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

  useEffect(() => {
    getProduct({ id });
  }, [id]);

  useEffect(() => {
    if (product.category) {
      //제품 정보를 가져왔을때 실행
      getWriter({ id: product.writer });
      getOtherProduct({
        skip: 0,
        limit: 20,
        category: product.category,
      });
    }
  }, [product]);

  useEffect(() => {
    if (user.userData !== undefined) {
      if (user.userData.isAuth) {
        if (product.writer === user.userData._id) {
          //제품의 작성자와 로그인한 유저의 id가 같다면 작성자로 확인
          setWriter(true);
        }
      }
    }
  }, [user]);

  //장바구니 버튼 클릭시 실행
  const onAddCartProduct = async () => {
    if (product.count === 0) {
      return alert("품절입니다.");
    }

    if (user.userData.isAuth === false) {
      return alert("로그인이 필요합니다.");
    }

    const option = {
      id: product._id,
      purchasesCount: purchasesCount,
    };

    connectServer(option);
  };

  //장바구니 버튼 클릭시 실행
  useEffect(() => {
    if (resData.duplication) {
      if (
        window.confirm(
          "장바구니에 이미 있는 상품입니다.\n장바구니로 이동합니다."
        )
      ) {
        nav("/cart");
      }
    }

    if (resData.duplication === false) {
      if (
        window.confirm("장바구니에 추가되었습니다.\n장바구니로 이동합니다.")
      ) {
        nav("/cart");
      }
    }
  }, [resData]);

  // const OnAddCart = () => {
  //   //redux사용
  //   dispatch(addCart(product._id));
  // };

  const goCheckOut = () => {
    if (product.count === 0) {
      return alert("품절입니다.");
    }

    if (user.userData.isAuth === false) {
      return alert("로그인이 필요합니다.");
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

  return (
    <div className="page">
      <RecentView />

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

          <Fade left>
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

              {otherProduct.length > 0 && (
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
          </Fade>

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

export default ProductDetail;
