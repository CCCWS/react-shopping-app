import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { LeftOutlined, HomeOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addCart } from "../_action/user_action";
import Fade from "react-reveal/Fade";

import ImgCarousel from "../Components/ImgCarousel";
import ProductCard from "../Components/ProductCard";
import Modal from "../Components/Modal";
import PurchasesCountBtn from "../Components/PurchasesCountBtn";
import RecentView from "../Components/RecentView";
import Selector from "../Components/Selector";

import "./ProductDetail.css";
import Loading from "../Components/Loading";

function ProductDetail({ user }) {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [otherProduct, setOtherProduct] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState([]);
  const [purchasesCount, setPurchasesCount] = useState(1);
  const [writer, setWriter] = useState(false);
  const { id } = useParams();

  const get = JSON.parse(localStorage.getItem("productHistory"));

  useEffect(() => {}, [loading]);

  const setLocalData = () => {
    const filterGet = get.filter((data) => data.id !== product._id);
    localStorage.setItem(
      "productHistory",
      JSON.stringify([
        { id: product._id, image: product.image[0].name },
        ...filterGet,
      ])
    );
  };

  useEffect(() => {
    if (loading === false) {
      if (get === null) {
        localStorage.setItem(
          "productHistory",
          JSON.stringify([{ id: product._id, image: product.image[0].name }])
        );
      } else {
        if (get.length === 6) {
          if (get.filter((data) => data.id === product._id).length === 1) {
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
  }, [id]);

  useEffect(() => {
    if (product.category) {
      getOtherProduct();
    }
  }, [product]);

  const getProduct = async () => {
    setLoading(true);
    const res = await axios.post("/api/product/productDetail", { id });
    setProduct(res.data.productInfo);
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

      if (user.userData.isAuth) {
        if (product.writer._id === user.userData._id) {
          setWriter(true);
        }
      }

      setLoading(false);
    } catch (err) {
      console.log("????????? ?????? ??????");
    }
  };

  const getTime = (time) => {
    const second = Math.floor(
      (new Date().getTime() - new Date(time).getTime()) / 1000
    ); // ???

    if (second <= 1200) {
      return `${Math.floor(second / 60)}??? ???`;
    }

    if (1200 < second && second <= 86400) {
      return `${Math.floor(second / 60 / 60)}?????? ???`;
    }

    if (86400 < second) {
      return `${Math.floor(second / 60 / 60 / 24)}??? ???`;
    }
  };

  const OnAddCart = () => {
    //redux??????
    dispatch(addCart(product._id));
  };

  const onAddCartProduct = async () => {
    if (product.count === 0) {
      return alert("???????????????.");
    }

    if (user.userData.isAuth === false) {
      return alert("???????????? ???????????????.");
    }

    //redux??? ??????????????? ?????? ????????? ??????
    const option = {
      id: product._id,
      purchasesCount: purchasesCount,
    };

    const res = await axios.post("/api/user/addCart", option);
    if (res.data.duplication) {
      if (
        window.confirm(
          "??????????????? ?????? ?????? ???????????????.\n??????????????? ???????????????."
        )
      ) {
        nav("/cart");
      }
    }

    if (res.data.duplication === false) {
      if (
        window.confirm("??????????????? ?????????????????????.\n??????????????? ???????????????.")
      ) {
        nav("/cart");
      }
    }
  };

  const goCheckOut = () => {
    if (product.count === 0) {
      return alert("???????????????.");
    }

    if (user.userData.isAuth === false) {
      return alert("???????????? ???????????????.");
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
      <RecentView detail={true} />
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
            <div className="soldOut">??????????????? ???????????????.</div>
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

          <Fade bottom>
            <div>
              <div className="ProductDetail-writer">
                {product.writer === undefined ? (
                  "??????"
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
                  <div>{`${product.category} ??? ${getTime(
                    product.createdAt
                  )} ??? ???????????? ${product.count}??? ??? ????????? ${
                    product.views
                  } `}</div>
                </div>

                <div className="ProductDetail-description">
                  {product.description}
                </div>
              </div>
              <hr />

              {otherProduct.length > 0 && (
                <>
                  <div>
                    <div className="ProductDetail-other">?????? ??????</div>
                    <div className="main-productList ProductDetail-productCard">
                      <ProductCard
                        data={otherProduct}
                        click={true}
                        ProductDetail={true}
                      />
                    </div>
                  </div>
                  <hr />
                </>
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
                  ).toLocaleString()}???`}
                </div>

                <PurchasesCountBtn
                  purchasesCount={purchasesCount}
                  setPurchasesCount={setPurchasesCount}
                  productCount={product.count}
                  detail={true}
                />
              </div>

              <div className="ProductDetail-footer-btn">
                {writer ? (
                  <button
                    onClick={() =>
                      nav(`/edit/${product._id}`, {
                        state: { id: product._id },
                      })
                    }
                    className="ProductDetail-cart"
                  >
                    ????????????
                  </button>
                ) : (
                  <>
                    <button
                      onClick={onAddCartProduct}
                      className="ProductDetail-cart"
                    >
                      ????????????
                    </button>
                    <button
                      className="ProductDetail-purchase-btn"
                      onClick={goCheckOut}
                    >
                      ????????????
                    </button>
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
