import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { WarningOutlined } from "@ant-design/icons";
import { useInView } from "react-intersection-observer";

import Loading from "../../Components/Utility/Loading";
import ModalBase from "../../Components/Modal/ModalBase";
import Empty from "../../Components/Utility/Empty";
import PurchaseHistotyProduct from "./PurchaseHistotyProduct";
import SlideAnimation from "../../Components/Utility/Animation/SlideAnimation";

import useAxios from "../../hooks/useAxios";
import useModal from "../../hooks/useModal";

function PurchaseHistory({ isAuth, userId, darkMode }) {
  const [readRef, setReadRef] = useInView(); //element 감시
  const [shippingInfo, setShippingInfo] = useState([]); //배송정보
  const [skip, setSkip] = useState(0); //받아온 데이터 수
  const limit = 4; //한번에 받아올 데이터 수

  //modal

  const { openModal, setOpenModal } = useModal();

  //구매내역 요청
  const {
    resData: product,
    loading,
    lastData,
    connectServer,
  } = useAxios("/api/user/purchaseHistory");

  useEffect(() => {
    //로그인 인증이 되었을 경우 실행
    if (isAuth) {
      const option = {
        limit: limit,
        skip: 0,
        readMore: false,
        id: userId,
      };

      connectServer(option);
    }

    const titleName = document.getElementsByTagName("title")[0];
    titleName.innerHTML = `구매내역`;
  }, [isAuth, userId, connectServer]);

  useEffect(() => {
    //더보기시 실행
    const readMore = () => {
      const option = {
        limit: limit,
        skip: skip + limit,
        id: userId,
        readMore: true,
      };
      connectServer(option);
    };

    if (setReadRef) {
      readMore();
      setSkip((prev) => prev + limit);
    }
  }, [setReadRef, userId, connectServer]);

  //modal을 열때 배송정보 저장
  const onShippingInfo = useCallback(
    (data) => {
      setShippingInfo({
        name: data.name,
        phone: data.phone,
        address: `${data.searchAddress} ${data.address}`,
        request: data.req,
      });
      setOpenModal(true);
    },
    [setOpenModal]
  );

  return (
    <div className="page">
      <ModalBase modalOpen={openModal} setModalOpen={setOpenModal}>
        <Header>
          <div>배송정보</div>
        </Header>
        <Message darkMode={darkMode}>
          <div>{`이름 : ${shippingInfo.name}`}</div>
          <div>{`전화번호 : ${shippingInfo.phone}`}</div>
          <div>{`주소 : ${shippingInfo.address}`}</div>
          <div>{`요청사항 : ${
            shippingInfo.request === "" ? "없음" : shippingInfo.request
          }`}</div>
        </Message>
      </ModalBase>

      {loading ? (
        <Loading />
      ) : (
        <>
          <SlideAnimation>
            <Title>{`최근 주문내역`}</Title>
          </SlideAnimation>

          {product.length === 0 ? (
            <Empty onClick={(e) => console.log(e)}>
              <WarningOutlined />
              구매한 상품이 없습니다.
            </Empty>
          ) : (
            <>
              <PurchaseHistotyProduct
                darkMode={darkMode}
                product={product}
                onShippingInfo={onShippingInfo}
              />
              {!lastData && product.length >= limit && (
                <ReadMore ref={readRef} />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

const Title = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  padding: 0.5rem;
  /* margin-bottom: 0.5rem; */
`;

const Header = styled.header`
  background-color: var(--orange_normal);
  padding: 0.7rem;
  font-size: 1.2rem;
`;

const Message = styled.div`
  background-color: ${(props) =>
    props.darkMode ? "var(--black)" : "var(--white)"};
  padding: 1rem;

  div {
    margin-bottom: 0.5rem;
  }
`;

const ReadMore = styled.div`
  width: 100%;
  height: 10px;
  background-color: red;
`;

export default React.memo(PurchaseHistory);
