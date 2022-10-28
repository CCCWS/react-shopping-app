import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

import ModalBase from "../Modal/ModalBase";

import useModal from "../../hooks/useModal";

import { postUrl } from "../../PostUrl";

function Selector({ ProductDetail, CheckOut, arr }) {
  const { openModal, contents, setOpenModal } = useModal();
  const [currArr, setCurrArr] = useState(0);
  const [currImg, setCurrImg] = useState("");

  const minus = () => {
    if (currArr === 0) {
      return setCurrArr(arr.length - 1);
    }
    setCurrArr((prev) => prev - 1);
  };

  const plus = () => {
    if (currArr === arr.length - 1) {
      return setCurrArr(0);
    }
    setCurrArr((prev) => prev + 1);
  };

  return (
    <SelectorBox ProductDetail={ProductDetail} CheckOut={CheckOut}>
      <ModalBase modalOpen={openModal} setModalOpen={setOpenModal}>
        <ModalImage img={`url('${postUrl}${currImg}')`} />
      </ModalBase>

      {arr.length > 1 && (
        <NextBtn onClick={minus} left={true}>
          <CaretLeftOutlined />
        </NextBtn>
      )}

      {CheckOut && <BoxCheckOut>{arr[currArr]}</BoxCheckOut>}

      {ProductDetail && (
        <BoxImage
          img={`url('${postUrl}${arr[currArr].name}')`}
          onClick={() => {
            setOpenModal(true);
            setCurrImg(arr[currArr].name);
          }}
        />
      )}

      {arr.length > 1 && (
        <NextBtn onClick={plus} right={true}>
          <CaretRightOutlined />
        </NextBtn>
      )}

      <BoxPoint>
        {arr.map((data, index) => (
          <BoxPonintItem
            key={index}
            location={arr.indexOf(data) === currArr}
            onClick={() => {
              setCurrArr(arr.indexOf(data));
            }}
          />
        ))}
      </BoxPoint>
    </SelectorBox>
  );
}

const ModalImage = styled.div`
  background-image: ${(props) => props.img};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  width: 90vmin;
  height: 90vmin;
`;

const SelectorBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin: auto;

  width: ${(props) => props.ProductDetail && "100%"};
  width: ${(props) => props.CheckOut && "80%"};

  height: ${(props) => props.ProductDetail && "500px"};
  height: ${(props) => props.CheckOut && "100px"};
`;

const NextBtn = styled.button`
  background-color: transparent;
  position: absolute;
  z-index: 1;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  border: none;
  border-radius: 5px;
  transition: 0.3s;

  left: ${(props) => props.letf && "0"};
  right: ${(props) => props.right && "0"};

  &:hover {
    background-color: var(--orange_hover);
    cursor: pointer;
  }
`;

const BoxImage = styled.div`
  width: 100%;
  height: 100%;

  background-image: ${(props) => props.img};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  border-radius: 10px;
`;

const BoxCheckOut = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin: auto;
`;

const BoxPoint = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const BoxPonintItem = styled.div`
  background-color: ${(props) =>
    props.location ? "var(--orange_normal)" : "transparent"};
  width: 1rem;
  height: 1rem;
  border: 2px solid var(--orange_normal);
  border-radius: 5px;
  margin-right: 5px;
  margin-left: 5px;

  cursor: pointer;
`;

export default React.memo(Selector);
