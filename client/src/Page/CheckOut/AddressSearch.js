import React from "react";
import DaumPostCode from "react-daum-postcode";
import styled from "styled-components";

import useModal from "../../hooks/useModal";

import ModalBase from "../../Components/Modal/ModalBase";

const AddressSearch = ({ searchAddress, setSearchAddress }) => {
  const { openModal, contents, setOpenModal } = useModal();

  const onAddress = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setSearchAddress(fullAddress);
    setOpenModal(false);
  };

  const searchAddressForKakao = () => {
    return (
      <Div>
        <DaumPostCode onComplete={onAddress} />
      </Div>
    );
  };

  return (
    <>
      <ModalBase
        contents={contents}
        modalOpen={openModal}
        setModalOpen={setOpenModal}
        PropComponent={searchAddressForKakao}
      />

      <Section onClick={() => setOpenModal(true)}>
        {searchAddress.length > 0 ? searchAddress : "주소 검색"}
      </Section>
    </>
  );
};

const Section = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;

  margin-bottom: 1rem;
  height: 3rem;
  padding: 0.5rem;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
  }
`;

const Div = styled.div`
  width: 70vw;
`;
export default React.memo(AddressSearch);
