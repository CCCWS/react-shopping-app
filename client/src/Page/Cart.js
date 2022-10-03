import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  CheckOutlined,
  CloseOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

import Loading from "../Components/Loading";
import ModalBase from "../Components/Modal/ModalBase";

import useModal from "../hooks/useModal";
import useAxios from "../hooks/useAxios";

import { removeCart } from "../_action/user_action";
import { postUrl } from "../PostUrl";
import FooterCartPage from "../Components/Footer/FooterCartPage";

function Cart({ user }) {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [checkProduct, setCheckProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const { resData: userCartList, connectServer: getUserCartList } =
    useAxios("/api/user/getCart");

  const {
    resData: product,
    setResData: setProduct,
    connectServer: getProductList,
  } = useAxios("/api/product/cart");

  const { connectServer: removeCheckProduct } = useAxios(
    "/api/user/removeCart"
  );

  const { connectServer: removeTargetProduct } = useAxios(
    "/api/user/removeCart"
  );

  const { openModal, contents, setOpenModal, setContents } = useModal();

  //user데이터에서 cart에 들어있는 상품의 id를 가져옴
  useEffect(() => {
    if (user.isAuth === false) {
      nav("/");
    }
    if (user.isAuth === true) {
      getUserCartList({ id: user._id });
    }
  }, []);

  //상품 id를 가져왔다면 id를 옵션으로 해당 id와 일치하는 모든 상품 가져옴
  useEffect(() => {
    if (userCartList) {
      const option = [];
      userCartList.forEach((data) => option.push(data.id));
      getProductList(option);
    }
  }, [userCartList]);

  //가져온 상품을 user데이터에서 가져온 cart에 추가한 상품개수를 데이터로 넣어줌
  useEffect(() => {
    if (product && product.length > 0) {
      product.forEach(
        (data, index) => (
          (data.totalPrice = data.price * userCartList[index].purchasesCount),
          (data.purchasesCount = userCartList[index].purchasesCount)
        )
      );
      setLoading(false);
    }

    if (product && product.length === 0) {
      setLoading(false);
    }
  }, [product]);

  //선택한 상품의 가격 계산
  useEffect(() => {
    const calcTotalPrice = () => {
      const arr = [];
      checkProduct.forEach((data) => arr.push(data.totalPrice));
      if (arr.length === 0) {
        setTotalPrice(0);
      }
      if (arr.length > 0) {
        setTotalPrice(arr.reduce((prev, current) => prev + current));
      }
    };

    if (checkProduct.length >= 0) {
      calcTotalPrice();
    }
  }, [checkProduct]);

  //전체 상품 체크
  const onCheckAll = () => {
    if (product.length === checkProduct.length) {
      setCheckProduct([]);
    } else {
      setCheckProduct([...product]);
    }
  };

  //하나의 상품 체크
  const onCheckProduct = (data) => {
    //체크목록에 선택한 항목이 있는지 확인
    if (checkProduct.find((item) => item._id === data._id) !== undefined) {
      //이미 있는 항목이면 제외시킴
      setCheckProduct(checkProduct.filter((item) => item._id !== data._id));
    } else {
      //없다면 항목에 추가
      setCheckProduct([...checkProduct, data]);
    }
  };

  //선택한 상품 삭제
  const onCheckDel = () => {
    const delFunc = () => {
      const option = [];
      checkProduct.forEach((data) => option.push(data._id));
      removeCheckProduct(option);

      const temp = [...product];
      setProduct(temp.filter((data) => !checkProduct.includes(data)));
      setCheckProduct([]);
    };

    if (checkProduct.length !== 0) {
      setOpenModal(true);
      setContents({
        title: "장바구니 삭제",
        message: `${checkProduct.length}개 상품을 삭제합니다.`,
        delFunc: delFunc,
        cartPage: true,
      });
    }
  };

  //하나의 상품 삭제
  const onDelProduct = (id) => {
    const delFunc = () => {
      removeTargetProduct({ id: id });
      const temp = [...product];
      setProduct(temp.filter((data) => data._id !== id));
    };

    setOpenModal(true);
    setContents({
      title: "장바구니 삭제",
      message: `상품을 삭제합니다.`,
      delFunc: delFunc,
      cartPage: true,
    });
  };

  //주문서 작성 페이지로 이동

  const goCheckOut = () => {
    if (checkProduct.length === 0) {
      return;
    }
    nav("/checkOut", {
      state: { product: checkProduct, totalPrice: totalPrice, cart: true },
    });
  };

  return (
    <div className="page">
      <ModalBase
        contents={contents}
        modalOpen={openModal}
        setModalOpen={setOpenModal}
      />

      <Procedure>
        <strong>장바구니</strong> &gt; 주문서 &gt; 결제완료
      </Procedure>

      {loading ? (
        <Loading />
      ) : (
        <>
          {product && product.length > 0 && (
            <Checkbox
              checkLength={
                product.length === checkProduct.length &&
                checkProduct.length !== 0 &&
                true
              }
            >
              <div>전체선택</div>
              <div onClick={onCheckAll}>
                <CheckOutlined />
              </div>
              <button onClick={onCheckDel}>선택삭제</button>
            </Checkbox>
          )}

          <CardBox>
            {product === undefined || product.length === 0 ? (
              <NotProduct>
                <ShoppingCartOutlined />
                장바구니에 상품을 추가해주세요.
              </NotProduct>
            ) : (
              <>
                {product.map((data, index) => (
                  <ProductCard key={index}>
                    <div>
                      <ProductCheckBox
                        productCheck={
                          checkProduct.find((item) => item._id === data._id) !==
                            undefined && true
                        }
                        onClick={() => onCheckProduct(data)}
                      >
                        <CheckOutlined />
                      </ProductCheckBox>

                      <ProductImg
                        image={`url('${postUrl}${data.image[0].name}')`}
                        onClick={() => nav(`/product/${data._id}`)}
                      />

                      <ProductTitle onClick={() => nav(`/product/${data._id}`)}>
                        <div>
                          {data.title.length > 15
                            ? `${data.title.slice(0, 15)}...`
                            : `${data.title}`}
                        </div>
                        <div>{`${parseInt(
                          data.price * data.purchasesCount,
                          10
                        ).toLocaleString()}원`}</div>
                        <div>{data.purchasesCount}개</div>
                      </ProductTitle>
                    </div>

                    <ProductCheckBox onClick={() => onDelProduct(data._id)}>
                      <CloseOutlined />
                    </ProductCheckBox>
                  </ProductCard>
                ))}
              </>
            )}
          </CardBox>

          <hr />

          <FooterCartPage
            checkProductLength={checkProduct.length}
            totalPrice={totalPrice}
            goCheckOut={goCheckOut}
          />
        </>
      )}
    </div>
  );
}

const Procedure = styled.div`
  font-size: 1rem;
  padding: 0.5rem;
`;

const Checkbox = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 16px;
  height: 3.5rem;

  & > :first-child {
    margin-right: 10px;
  }

  & > :nth-child(2) {
    border: 1px solid rgb(156, 156, 156);
    font-size: 20px;
    width: 2rem;
    height: 2rem;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all ease 0.5s;
    background-color: ${(props) =>
      props.checkLength ? "rgb(255, 118, 118)" : "transparent"};

    :hover {
      cursor: pointer;
      background-color: rgb(255, 118, 118);
    }
  }

  & > :nth-child(3) {
    border: 1px solid rgb(156, 156, 156);
    background-color: transparent;
    width: 5rem;
    height: 2rem;
    height: 100%;
    transition: all ease 0.5s;

    &:hover {
      cursor: pointer;
      background-color: rgb(255, 118, 118);
    }
  }
`;

const CardBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0.8rem;
  margin-bottom: 3rem;
`;

const NotProduct = styled.div`
  //cart에 항목이 없을경우
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 2rem;
`;

const ProductCard = styled.div`
  box-shadow: 1px 1px 3px 1px rgba(128, 128, 128, 0.507);
  width: 49%;
  height: 150px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;

  display: flex;
  justify-content: space-between;

  & > :first-child {
    display: flex;
  }

  @media (max-width: 800px) {
    width: 100%;
  }
`;

const ProductCheckBox = styled.div`
  background-color: ${(props) =>
    props.productCheck ? " rgb(255, 118, 118)" : "transparent"};
  border: 1px solid rgb(156, 156, 156);
  font-size: 20px;
  width: 30px;
  height: 30px;
  margin-right: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: all ease 0.5s;

  :hover {
    cursor: pointer;
    background-color: rgb(255, 118, 118);
  }
`;

const ProductImg = styled.div`
  background-image: ${(props) => props.image};
  min-width: 100px;
  height: 100%;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  border-radius: 5px;
  margin-right: 15px;

  cursor: pointer;
`;

const ProductTitle = styled.div`
  cursor: pointer;

  //상품 이름
  & > :first-child {
    font-size: 1.2rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
  }

  //상품 가격
  & > :nth-child(2) {
    color: rgba(255, 0, 0, 0.5);
    font-size: 1rem;
    font-weight: 600;
  }
`;

export default React.memo(Cart);
