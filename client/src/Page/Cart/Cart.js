import React, { useCallback, useEffect, useState } from "react";
import { CheckOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Loading from "../../Components/Utility/Loading";
import ModalBase from "../../Components/Modal/ModalBase";
import FooterCartPage from "../../Components/Footer/FooterCartPage";
import Empty from "../../Components/Utility/Empty";
import CartProduct from "./CartProduct";
import FadeAnimation from "../../Components/Utility/Animation/FadeAnimation";
import SlideAnimation from "../../Components/Utility/Animation/SlideAnimation";

import useModal from "../../hooks/useModal";
import useAxios from "../../hooks/useAxios";

import { cartAction } from "../../store/reducer/cart";

function Cart({ isAuth, userId }) {
  const dispatch = useDispatch();
  const userCartProduct = useSelector((state) => state.cart.cartList);
  const checkProduct = useSelector((state) => state.cart.checkProduct);
  const [loading, setLoading] = useState(true);

  //유저의 카트에 들어있는 상품의 id를 조회
  const { resData: userCartList, connectServer: getUserCartList } =
    useAxios("/api/user/getCart");

  //조회된 id를 가지는 상품의 목록 조회
  const { resData: product, connectServer: getProductList } =
    useAxios("/api/product/cart");

  const { connectServer: removeCartProduct } = useAxios("/api/user/removeCart");

  //모달창
  const { openModal, contents, setOpenModal, setContents } = useModal();

  //user데이터에서 cart에 들어있는 상품의 id를 조회
  useEffect(() => {
    const titleName = document.getElementsByTagName("title")[0];
    titleName.innerHTML = `장바구니`;
    dispatch(cartAction.cartInit());

    if (isAuth) {
      getUserCartList({ id: userId });
    }
  }, [dispatch, getUserCartList, isAuth, userId]);

  //상품 id를 가져왔다면 id를 옵션으로 해당 id와 일치하는 모든 상품 조회
  useEffect(() => {
    if (userCartList) {
      const option = []; //id만 배열로 묶어서 서버에 함께 전송
      userCartList.forEach((data) => option.push(data.id));
      getProductList(option);

      return () => getProductList(option);
    }
  }, [getProductList, userCartList]);

  //유저 장바구니 데이터의 장바구니 개수와
  //해당 상품의 정보를 합한 새로운 유저 상품 배열 생성
  const onUserProduct = useCallback(() => {
    //product에는 장바구니 개수가 포함되지 않은 순수 상품 정보만 담김
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

    dispatch(cartAction.onAddCart(newProductArr));
  }, [dispatch, product, userCartList]);

  //상품 정보를 가져온후 새로운 상품 배열 생성
  useEffect(() => {
    if (product && product.length > 0) {
      onUserProduct();
      setLoading(false);
    }

    if (product && product.length === 0) {
      setLoading(false);
    }
  }, [product, onUserProduct]);

  //전체 상품 체크
  const onCheckAll = () => {
    dispatch(cartAction.onAddCheckProductAll(userCartProduct));
  };

  //선택한 상품 삭제
  const onCheckDel = () => {
    //modal창에서 삭제버튼을 클릭시 실행
    const delFunc = () => {
      const option = [];

      //선택된 상품의 id만 뽑아서 배열에 추가
      checkProduct.forEach((data) => option.push(data._id));

      //id만 담겨있는 배열을 option으로 api요청
      removeCartProduct({ productId: option, userId: userId });
      dispatch(
        cartAction.onRemoveCart({ checkProduct: checkProduct, id: option })
      );
    };

    //선택된 상품이 하나이상일때 실행가능
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

  return (
    <div className="page">
      <ModalBase
        contents={contents}
        modalOpen={openModal}
        setModalOpen={setOpenModal}
      />

      <SlideAnimation>
        <Procedure>
          <strong>장바구니</strong> &gt; 주문서 &gt; 결제완료
        </Procedure>
      </SlideAnimation>

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
                {userCartProduct.map((data) => (
                  <React.Fragment key={data._id}>
                    <CartProduct
                      product={data}
                      checkProduct={
                        checkProduct.find((item) => item._id === data._id) &&
                        true
                      }
                      // onCheckProduct={onCheckProduct}
                      userCartList={userCartList}
                      userId={userId}
                    />
                  </React.Fragment>
                ))}
              </CardBox>
            </FadeAnimation>
          )}

          <FooterCartPage />
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
