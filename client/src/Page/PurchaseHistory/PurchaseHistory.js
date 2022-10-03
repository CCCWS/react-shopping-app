import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import Loading from "../../Components/Loading";
import ModalBase from "../../Components/Modal/ModalBase";

import PurchaseHistotyProduct from "./PurchaseHistotyProduct";

import useAxios from "../../hooks/useAxios";
import useModal from "../../hooks/useModal";

function PurchaseHistory({ user }) {
  const nav = useNavigate();
  const [shippingInfo, setShippingInfo] = useState([]);
  const { openModal, contents, setOpenModal } = useModal();
  const {
    resData: product,
    loading,
    connectServer,
  } = useAxios("/api/user/purchaseHistory");

  useEffect(() => {
    if (user.isAuth === false) {
      nav("/");
    }
    if (user.isAuth === true) {
      connectServer({ id: user._id });
    }
  }, []);

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

  const ModalShipping = useCallback(() => {
    return (
      <>
        <Header>
          <div>배송정보</div>
        </Header>
        <Message>
          <div>{`이름 : ${shippingInfo.name}`}</div>
          <div>{`전화번호 : ${shippingInfo.phone}`}</div>
          <div>{`주소 : ${shippingInfo.address}`}</div>
          <div>{`요청사항 : ${
            shippingInfo.request.length === 0 ? "없음" : shippingInfo.request
          }`}</div>
        </Message>
      </>
    );
  }, [shippingInfo]);

  return (
    <div className="page">
      <ModalBase
        contents={contents}
        modalOpen={openModal}
        PropComponent={ModalShipping}
        setModalOpen={setOpenModal}
      />

      {loading ? (
        <Loading />
      ) : (
        <>
          <Title>{`전체 주문내역 ${product.length}개`}</Title>

          <PurchaseHistotyProduct
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
  margin-bottom: 2rem;
`;

const Header = styled.header`
  background-color: rgba(255, 166, 0, 0.829);
  padding: 0.7rem;
  font-size: 20px;
`;

const Message = styled.div`
  padding: 1rem;

  div {
    margin-bottom: 0.5rem;
  }
`;

export default React.memo(PurchaseHistory);
