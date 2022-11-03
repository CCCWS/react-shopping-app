import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import styled from "styled-components";

import Loading from "../../Components/Utility/Loading";
import ModalBase from "../../Components/Modal/ModalBase";
import FooterCartPage from "../../Components/Footer/FooterCartPage";
import Empty from "../../Components/Utility/Empty";
import CartProduct from "./CartProduct";

import useModal from "../../hooks/useModal";
import useAxios from "../../hooks/useAxios";

function Cart({ isAuth, userId }) {
  const nav = useNavigate();

  const [checkProduct, setCheckProduct] = useState([]); //체크한 상품의 목록
  const [totalPrice, setTotalPrice] = useState(0); //체크한 상품의 총합가격
  const [loading, setLoading] = useState(true);

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
  }, []);

  //상품 id를 가져왔다면 id를 옵션으로 해당 id와 일치하는 모든 상품 조회
  useEffect(() => {
    if (userCartList) {
      const option = []; //id만 배열로 묶어서 서버에 함께 전송
      userCartList.forEach((data) => option.push(data.id));
      getProductList(option);
    }
  }, [userCartList]);

  //유저의 카트에서 조회한 데이터에 장바구니에 추가한 상품의 개수가 담겨있음
  //상품정보에 해당 상품의 개수와 총합가격을 데이터로 추가
  useEffect(() => {
    const newProduct = () => {
      const temp = [...product];
      const newProductArr = temp.map((data, index) => {
        // ( ) => { }는 새로운 배열을 리턴하기전 어떠한 연산이나 변수선언등 조건을 처리할때 사용하며
        // 반드시 return으로 값을 직접 넘겨줘야함
        // ( ) => ( )는 다른 작업없이 즉시 리턴할때 사용
        data.totalPrice = data.price * userCartList[index].purchasesCount;
        data.purchasesCount = userCartList[index].purchasesCount;
        return data;
      });
    };

    if (product && product.length > 0) {
      newProduct();
      setLoading(false);
    }

    if (product && product.length === 0) {
      setLoading(false);
    }
  }, [product, userCartList]);

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
      removeCartProduct({ productId: [id], userId: userId });
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
    const newProduct = [...product];

    for (let i of newCartList) {
      if (i.id === id) {
        i.purchasesCount = purchasesCount + 1;
      }
    }

    for (let i of newProduct) {
      if (i._id === id) {
        i.purchasesCount = purchasesCount + 1;
      }
    }

    changeCart({ id: userId, cart: newCartList });
  };

  const onChangeCountMinus = (id, purchasesCount) => {
    const newCartList = [...userCartList];
    const newProduct = [...product];

    for (let i of newCartList) {
      if (i.id === id) {
        i.purchasesCount = purchasesCount - 1;
      }
    }

    for (let i of newProduct) {
      if (i._id === id) {
        i.purchasesCount = purchasesCount - 1;
      }
    }

    changeCart({ id: userId, cart: newCartList });
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

          {product === undefined || product.length === 0 ? (
            <Empty>
              <ShoppingCartOutlined />
              장바구니에 추가된 상품이 없습니다.
            </Empty>
          ) : (
            <CardBox>
              <CartProduct
                product={product}
                checkProduct={checkProduct}
                onCheckProduct={onCheckProduct}
                onDelProduct={onDelProduct}
                onChangeCountPlus={onChangeCountPlus}
                onChangeCountMinus={onChangeCountMinus}
              />
            </CardBox>
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

export default React.memo(Cart);
