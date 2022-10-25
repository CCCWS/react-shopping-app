import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import Loading from "../../Components/Utility/Loading";
import ModalBase from "../../Components/Modal/ModalBase";

import PurchaseHistotyProduct from "./PurchaseHistotyProduct";

import useAxios from "../../hooks/useAxios";
import useModal from "../../hooks/useModal";
import useTheme from "../../hooks/useTheme";

function PurchaseHistory({ isAuth, userId }) {
  const [shippingInfo, setShippingInfo] = useState([]);
  const { openModal, contents, setOpenModal } = useModal();
  const { darkMode } = useTheme();

  const {
    resData: product,
    loading,
    connectServer,
  } = useAxios("/api/user/purchaseHistory");

  useEffect(() => {
    if (isAuth) {
      connectServer({ id: userId });
    }

    const titleName = document.getElementsByTagName("title")[0];
    titleName.innerHTML = `구매내역`;
  }, [isAuth, userId, connectServer]);

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
        <>
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
        </>
      </ModalBase>

      {loading ? (
        <Loading />
      ) : (
        <>
          <Title>{`전체 주문내역 ${product.length}개`}</Title>

          <PurchaseHistotyProduct
            darkMode={darkMode}
            product={product}
            onShippingInfo={onShippingInfo}
          />
        </>
      )}
    </div>
  );
}

const Title = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  padding: 0.5rem;
  margin-bottom: 1em;
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

export default React.memo(PurchaseHistory);
