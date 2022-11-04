import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { WarningOutlined } from "@ant-design/icons";
import { useInView } from "react-intersection-observer";

import Loading from "../../Components/Utility/Loading";
import ModalBase from "../../Components/Modal/ModalBase";
import Empty from "../../Components/Utility/Empty";
import PurchaseHistotyProduct from "./PurchaseHistotyProduct";
import FadeAnimation from "../../Components/Utility/Animation/FadeAnimation";

import useAxios from "../../hooks/useAxios";
import useModal from "../../hooks/useModal";

function PurchaseHistory({ isAuth, userId, darkMode }) {
  const [readRef, setReadRef] = useInView();
  const [shippingInfo, setShippingInfo] = useState([]);
  const [skip, setSkip] = useState(0);
  const limit = 4;
  const { openModal, setOpenModal } = useModal();

  const {
    resData: product,
    loading,
    lastData,
    connectServer,
  } = useAxios("/api/user/purchaseHistory");

  useEffect(() => {
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
    const readMore = () => {
      const option = {
        limit: limit,
        skip: skip + limit,
        id: userId,
        readMore: true,
      };
      connectServer(option);
      setSkip((prev) => prev + limit);
    };

    if (setReadRef) {
      readMore();
    }
  }, [setReadRef, userId, connectServer]);

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
          <FadeAnimation>
            <Title>{`최근 주문내역`}</Title>
          </FadeAnimation>

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
              {!lastData && <ReadMore ref={readRef} />}
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
`;

export default React.memo(PurchaseHistory);
