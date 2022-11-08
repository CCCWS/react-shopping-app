import React, { useState } from "react";
import styled from "styled-components";

const BuyerList = ({ buyerList }) => {
  const [click, setClick] = useState();

  const onOpen = (index) => {
    if (click === index) {
      setClick();
    } else {
      setClick(index);
    }
  };

  const productDate = (data) => {
    const year = new Date(data).getFullYear();
    const month = new Date(data).getMonth();
    const date = new Date(data).getDate();
    return `${year}.${month + 1}.${date}`;
  };

  const productTime = (data) => {
    const year = new Date(data).getHours();
    const month = new Date(data).getMinutes();
    return `${year}시 ${month}분 `;
  };

  return (
    <>
      {buyerList.length === 0 ? null : (
        <Div>
          {buyerList.map((data, index) => (
            <List
              key={index}
              index={index}
              click={click}
              onClick={() => onOpen(index)}
            >
              <NotOpen>
                <Section date={true}>
                  <div>{productDate(data.date)}</div>
                  <div>{productTime(data.date)}</div>
                </Section>

                <Section titleName={true}> {data.title}</Section>

                <Section count={true}>{data.purchasesCount}개</Section>
              </NotOpen>

              <Open>
                <div>{`이름 : ${data.shippingInfo.name}`}</div>
                <div>{`전화번호 : ${data.shippingInfo.phone}`}</div>
                <div>{`주소 : ${data.shippingInfo.address}`}</div>
                <div>{`요청사항 : ${
                  data.shippingInfo.req === "" ? "없음" : data.shippingInfo.req
                }`}</div>
              </Open>
            </List>
          ))}
        </Div>
      )}
    </>
  );
};

const Div = styled.div`
  width: 100%;
  min-height: 300px;
  max-height: 300px;
  overflow-y: scroll;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
`;

const List = styled.div`
  width: 100%;
  font-size: 1rem;
  height: ${(props) => (props.click === props.index ? "15rem" : "5rem")};
  background-color: var(--orange_normal);
  border-radius: inherit;
  margin-bottom: 1rem;
  overflow: hidden;

  cursor: pointer;
  transition: all ease 0.5s;
`;

const NotOpen = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
`;

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0.4rem;

  min-width: ${(props) => props.date && "6rem"};
  min-width: ${(props) => props.titleName && "50%"};
  min-width: ${(props) => props.count && "3rem"}; ;
`;

const Open = styled.div`
  width: 100%;
  height: 10rem;
  padding: 1rem;
  & > div {
    margin-bottom: 0.5rem;
  }
`;

export default BuyerList;
