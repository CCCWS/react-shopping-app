import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import styled from "styled-components";

import Loading from "../../Components/Utility/Loading";
import ModalBase from "../../Components/Modal/ModalBase";
import FooterCartPage from "../../Components/Footer/FooterCartPage";
import Empty from "../../Components/Utility/Empty";
import CartProduct from "./CartProduct";
import FadeAnimation from "../../Components/Utility/Animation/FadeAnimation";

import useModal from "../../hooks/useModal";
import useAxios from "../../hooks/useAxios";

function Cart({ isAuth, userId }) {
  const nav = useNavigate();

  const [checkProduct, setCheckProduct] = useState([]); //체크한 상품의 목록
  const [totalPrice, setTotalPrice] = useState(0); //체크한 상품의 총합가격
  const [loading, setLoading] = useState(true);

  //user정보에 들어있는 장바구니에 추가한 상품의 개수와
  //해당 상품의 정보를 합친 새로운 상품배열
  const [userProduct, setUserProduct] = useState([]);

  //유저의 카트에 들어있는 상품의 id를 조회
  const { resData: userCartList, connectServer: getUserCartList } =
    useAxios("/api/user/getCart");

  const { connectServer: changeCart } = useAxios("/api/user/changeCart");

  //조회된 id를 가지는 상품의 목록 조회
  const {
    resData: product,
    setResData: setProduct,
    connectServer: getProductList,
  } = useAxios("/api/product/cart");

  const { connectServer: removeCartProduct } = useAxios("/api/user/removeCart");

  //모달창
  const { openModal, contents, setOpenModal, setContents } = useModal();

  //user데이터에서 cart에 들어있는 상품의 id를 조회
  useEffect(() => {
    const titleName = document.getElementsByTagName("title")[0];
    titleName.innerHTML = `장바구니`;

    if (isAuth) {
      getUserCartList({ id: userId });
    }
  }, [getUserCartList, isAuth, userId]);

  //상품 id를 가져왔다면 id를 옵션으로 해당 id와 일치하는 모든 상품 조회
  useEffect(() => {
    if (userCartList) {
      const option = []; //id만 배열로 묶어서 서버에 함께 전송
      userCartList.forEach((data) => option.push(data.id));
      getProductList(option);
    }
  }, [getProductList, userCartList]);

  const onUserProduct = useCallback(() => {
    const temp = [...product];
    const newProductArr = temp.map((data, index) => {
      // ( ) => { }는 새로운 배열을 리턴하기전 어떠한 연산이나 변수선언등 조건을 처리할때 사용하며
      // 반드시 return으로 값을 직접 넘겨줘야함
      // ( ) => ( )는 다른 작업없이 즉시 리턴할때 사용

      //제품 정보를 가져올때 장바구니에 추가한 순서가 아닌 해당 제품이 등록된 순서로 가져오게됨
      //가져온 제품 데이터에 수량을 추가하기 위해 수량을 가지고있는 userCartList를 forEach하여 같은 id 탐색
      userCartList.forEach((cartList) => {
        if (data._id === cartList.id) {
          data.totalPrice = data.price * cartList.purchasesCount;
          data.purchasesCount = cartList.purchasesCount;
        }
      });

      return data;
    });

    setUserProduct(newProductArr);
  }, [product, userCartList]);

  //유저의 카트에서 조회한 데이터에 장바구니에 추가한 상품의 개수가 담겨있음
  //상품정보에 해당 상품의 개수와 총합가격을 데이터로 추가
  useEffect(() => {
    if (product && product.length > 0) {
      onUserProduct();
      setLoading(false);
    }

    if (product && product.length === 0) {
      setLoading(false);
    }
  }, [product, onUserProduct]);

  //선택한 상품의 가격 계산
  useEffect(() => {
    const calcTotalPrice = () => {
      const arr = [];
      checkProduct.forEach((data) => arr.push(data.totalPrice));

      setTotalPrice(arr.reduce((prev, current) => prev + current));
    };

    if (checkProduct.length > 0) {
      calcTotalPrice();
      console.log("test");
    }

    if (checkProduct.length === 0) {
      setTotalPrice(0);
    }
  }, [checkProduct, userProduct]);

  //전체 상품 체크
  const onCheckAll = useCallback(() => {
    //장바구니 상품 개수와 선택된 상품의 개수가 같다면 전체선택된 상태
    if (userProduct.length === checkProduct.length) {
      setCheckProduct([]);

      //그렇지 않다면 하나 이상이 선택이 안된상태임으로 전체선택으로 만듬
    } else {
      setCheckProduct([...userProduct]);
    }
  }, [checkProduct, userProduct]);

  //하나의 상품 체크
  const onCheckProduct = useCallback(
    (data) => {
      //체크목록에 선택한 항목이 있는지 확인
      if (checkProduct.find((item) => item._id === data._id) !== undefined) {
        //이미 있는 항목이면 제외시킴
        setCheckProduct(checkProduct.filter((item) => item._id !== data._id));
      } else {
        //없다면 항목에 추가
        setCheckProduct([...checkProduct, data]);
      }
    },
    [checkProduct]
  );

  //선택한 상품 삭제
  const onCheckDel = () => {
    const delFunc = () => {
      const option = [];
      checkProduct.forEach((data) => option.push(data._id));
      removeCartProduct({ productId: option, userId: userId });

      const temp = [...userProduct];
      setUserProduct(temp.filter((data) => !checkProduct.includes(data)));
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
      removeCartProduct({ productId: [id], userId: userId });
      const temp = [...product];
      setUserProduct(temp.filter((data) => data._id !== id));
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
    if (checkProduct.length === 0) return;

    let possible = true;
    //구매 가능 확인
    checkProduct.forEach((data) => {
      if (data.count < data.purchasesCount) {
        possible = false;
        setOpenModal(true);
        setContents({
          title: "구매 불가.",
          message: `수량이 부족한 상품이 포함되어 있습니다.`,
        });
      }
    });
    if (!possible) return;

    nav("/checkOut", {
      state: { product: checkProduct, totalPrice: totalPrice, cart: true },
    });
  };

  const onChangeCountPlus = (id, purchasesCount) => {
    const newCartList = [...userCartList];
    const newUserProduct = [...userProduct];

    //유저 장바구니 정보에서 해당 상품의 수량을 증가
    for (let i of newCartList) {
      if (i.id === id) {
        i.purchasesCount = purchasesCount + 1;
      }
    }

    //현재 보여지는 화면에 보여지는 상품정보를 업데이트
    for (let i of newUserProduct) {
      if (i._id === id) {
        i.purchasesCount = purchasesCount + 1;
        i.totalPrice = i.purchasesCount * i.price;
      }
    }
    setUserProduct(newUserProduct);

    //수량이 변경된 유저 장바구니 정보를 서버에 전송
    changeCart({ id: userId, cart: newCartList });
  };

  const onChangeCountMinus = (id, purchasesCount) => {
    const newCartList = [...userCartList];
    const newUserProduct = [...userProduct];

    for (let i of newCartList) {
      if (i.id === id) {
        i.purchasesCount = purchasesCount - 1;
      }
    }
    for (let i of newUserProduct) {
      if (i._id === id) {
        i.purchasesCount = purchasesCount - 1;
        i.totalPrice = i.purchasesCount * i.price;
      }
    }
    setUserProduct(newUserProduct);
    changeCart({ id: userId, cart: newCartList });
  };

  return (
    <div className="page">
      <ModalBase
        contents={contents}
        modalOpen={openModal}
        setModalOpen={setOpenModal}
      />

      <FadeAnimation>
        <Procedure>
          <strong>장바구니</strong> &gt; 주문서 &gt; 결제완료
        </Procedure>
      </FadeAnimation>

      {loading ? (
        <Loading />
      ) : (
        <>
          <FadeAnimation>
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
          </FadeAnimation>

          {product === undefined || product.length === 0 ? (
            <Empty>
              <ShoppingCartOutlined />
              장바구니에 추가된 상품이 없습니다.
            </Empty>
          ) : (
            <FadeAnimation>
              <CardBox>
                <CartProduct
                  product={userProduct}
                  checkProduct={checkProduct}
                  onCheckProduct={onCheckProduct}
                  onDelProduct={onDelProduct}
                  onChangeCountPlus={onChangeCountPlus}
                  onChangeCountMinus={onChangeCountMinus}
                />
              </CardBox>
            </FadeAnimation>
          )}

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
  padding: 0.7rem;
  font-size: 1rem;
  height: 3.5rem;

  //전체선택
  & > :first-child {
    margin-right: 0.8rem;
  }

  //선택 박스
  & > :nth-child(2) {
    border: 1px solid var(--gray);
    border-radius: 5px;
    font-size: 20px;
    width: 2rem;
    height: 2rem;
    margin-right: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all ease 0.3s;
    background-color: ${(props) =>
      props.checkLength ? "var(--red_transparency)" : "transparent"};

    :hover {
      cursor: pointer;
      background-color: var(--red_transparency);
    }
  }

  //선택 삭제
  & > :nth-child(3) {
    border: 1px solid var(--gray);
    border-radius: 5px;
    background-color: transparent;
    width: 5rem;
    height: 2rem;
    height: 100%;
    transition: all ease 0.3s;

    &:hover {
      cursor: pointer;
      background-color: var(--red_transparency);
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

export default Cart;
