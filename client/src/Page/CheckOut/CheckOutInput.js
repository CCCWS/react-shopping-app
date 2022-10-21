import React from "react";
import styled from "styled-components";

import { Section, Input } from "../../Components/Style/InputStyle";
import AddressSearch from "./AddressSearch";

import useTheme from "../../hooks/useTheme";

const CheckOutInput = ({ searchAddress, setSearchAddress }, ref) => {
  const { darkMode } = useTheme();
  return (
    <>
      <Section>
        <div>이름</div>
        <Input
          ref={ref.nameRef}
          inputType="name"
          placeholder="이름을 입력해 주세요."
          darkMode={darkMode}
        />
      </Section>

      <Section>
        <div>전화번호</div>
        <Input
          ref={ref.phoneRef}
          inputType="phone"
          onInput={(e) =>
            (e.target.value = e.target.value.replace(/[^0-9-]/g, ""))
          }
          placeholder="전화번호를 입력해 주세요."
          darkMode={darkMode}
        />
      </Section>

      <Section>
        <div>주소</div>
        <AddressBox>
          <AddressSearch
            searchAddress={searchAddress}
            setSearchAddress={setSearchAddress}
            darkMode={darkMode}
          />
          <Input
            ref={ref.addressRef}
            inputType="address"
            placeholder="추가 주소를 입력해 주세요."
            darkMode={darkMode}
          />
        </AddressBox>
      </Section>

      <Section>
        <div>요청사항</div>
        <Input
          ref={ref.reqRef}
          inputType="req"
          placeholder="요청사항을 입력해 주세요."
          maxLength={40}
          darkMode={darkMode}
        />
        {/* <span>{`${ShippingInfo.req.length} / 40`}</span> */}
      </Section>
    </>
  );
};

const AddressBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default React.memo(React.forwardRef(CheckOutInput));
//forwardRef를 사용하여 부모 컴포넌트에서 정의해준 ref를 props로 받아서 사용가능
