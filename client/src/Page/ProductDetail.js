import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { LoadingOutlined, LeftOutlined, HomeOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addCart } from "../_action/user_action";

import ImgCarousel from "../Components/ImgCarousel";
import ProductCard from "../Components/ProductCard";
import Modal from "../Components/Modal";

import "./ProductDetail.css";

function ProductDetail({ user }) {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [otherProduct, setOtherProduct] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState([]);
  const { id } = useParams();

  const get = JSON.parse(localStorage.getItem("productHistory"));
  const setLocalData = () => {
    const filterGet = get.filter((data) => data._id !== product._id);
    localStorage.setItem(
      "productHistory",
      JSON.stringify([{ ...product }, ...filterGet])
    );
  };

  useEffect(() => {
    if (loading === false) {
      if (get === null) {
        localStorage.setItem(
          "productHistory",
          JSON.stringify([{ ...product }])
        );
      } else {
        if (get.length === 6) {
          if (get.filter((data) => data._id === product._id).length === 1) {
            setLocalData();
          } else {
            get.pop();
            setLocalData();
          }
        } else {
          setLocalData();
        }
      }
    }
  }, [loading]);

  useEffect(() => {
    getProduct();
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    if (product.category) {
      getOtherProduct();
    }
  }, [product]);

  const getProduct = async () => {
    try {
      const res = await axios.post("/api/product/productDetail", { id });
      setProduct(...res.data.productInfo);
    } catch (err) {
      console.log("데이터 조회 실패");
    }
  };

  const getOtherProduct = async () => {
    const option = {
      skip: 0,
      limit: 20,
      category: product.category,
    };
    try {
      const res = await axios.post("/api/product/productList", option);
      setOtherProduct(res.data.productInfo.filter((data) => data._id !== id));
      setLoading(false);
    } catch (err) {
      console.log("데이터 조회 실패");
    }
  };

  const getTime = (time) => {
    const second = Math.floor(
      (new Date().getTime() - new Date(time).getTime()) / 1000
    ); // 초

    if (second <= 1200) {
      return `${Math.floor(second / 60)}분 전`;
    }

    if (1200 < second && second <= 86400) {
      return `${Math.floor(second / 60 / 60)}시간 전`;
    }

    if (86400 < second) {
      return `${Math.floor(second / 60 / 60 / 24)}일 전`;
    }
  };

  const OnAddCart = () => {
    //redux사용
    dispatch(addCart(product._id));
  };

  const onAddCartProduct = async () => {
    if (user.userData.isAuth === false) {
      return alert("로그인이 필요합니다.");
    }

    //redux를 거치지않고 바로 서버와 연결
    const option = {
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
      createdAt: product.createdAt,
      views: product.views,
    };

    const res = await axios.post("/api/user/addCart", option);
    if (res.data.duplication) {
      if (
        window.confirm(
          "장바구니에 이미 있는 상품입니다.\n장바구니로 이동합니다."
        )
      ) {
        nav("/cart");
      }
    }

    if (res.data.duplication === false) {
      if (
        window.confirm("장바구니에 추가되었습니다.\n장바구니로 이동합니다.")
      ) {
        nav("/cart");
      }
    }
  };

  const goCheckOut = () => {
    if (user.userData.isAuth === false) {
      return alert("로그인이 필요합니다.");
    }
    nav("/checkOut", {
      state: { product: [product], totalPrice: product.price, detail: true },
    });
  };

  return (
    <div className="page">
      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        data={modalImg}
      />
      <div className="ProductDetail-backBtn" onClick={() => nav("/")}>
        <LeftOutlined />
        <HomeOutlined />
      </div>
      {loading ? (
        <div className="loading">
          <LoadingOutlined />
        </div>
      ) : (
        <div className="ProductDetail-info">
          <ImgCarousel
            data={product.image}
            setModalOpen={setModalOpen}
            setModalImg={setModalImg}
          />
          <div>
            <div className="ProductDetail-writer">
              {product.writer === undefined ? (
                "익명"
              ) : (
                <>
                  <div>{product.writer.name}</div>
                  <div>{product.writer.email}</div>
                </>
              )}
            </div>

            <hr />

            <div>
              <div className="ProductDetail-title">
                <div>{product.title}</div>
                <div>{`${product.category} ∙ ${getTime(
                  product.createdAt
                )} ∙ 조회수 ${product.views} `}</div>
              </div>

              <div className="ProductDetail-description">
                {product.description}
              </div>
            </div>
            <hr />
            <div className="ProductDetail-other">관련 상품</div>
            <div className="main-productList ProductDetail-productCard">
              <ProductCard
                data={otherProduct}
                click={true}
                ProductDetail={true}
              />
            </div>
            <hr />
          </div>

          <div className="ProductDetail-footer">
            <div>
              <div className="ProductDetail-footer-price">
                {parseInt(product.price, 10).toLocaleString()}원
              </div>
              <div className="ProductDetail-footer-btn">
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
