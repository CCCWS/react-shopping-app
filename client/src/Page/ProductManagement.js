import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Loading from "../Components/Utility/Loading";

import useAxios from "../hooks/useAxios";

import { postUrl } from "../PostUrl";

function ProductManagement({ isAuth, userId }) {
  const nav = useNavigate();
  const [totalSold, setTotalSold] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [loading, setLoading] = useState(true);

  const { resData, connectServer } = useAxios("/api/product/myProduct");

  useEffect(() => {
    if (isAuth) {
      connectServer({ id: userId });
    }

    const titleName = document.getElementsByTagName("title")[0];
    titleName.innerHTML = `상품관리`;
  }, [isAuth, userId, connectServer]);

  useEffect(() => {
    //총 판매개수와 금액 계산
    const calcData = (data) => {
      const sold = [];
      const price = [];

      data.forEach((data) => sold.push(data.sold));
      data.forEach((data) => price.push(data.price * data.sold));

      if (sold.length === 0) {
        setTotalSold(0);
      }

      if (price.length === 0) {
        setTotalPrice(0);
      }

      if (sold.length > 0) {
        setTotalSold(sold.reduce((prev, current) => prev + current));
      }

      if (price.length > 0) {
        setTotalPrice(price.reduce((prev, current) => prev + current));
      }
    };

    //서버로부터 상품 데이터를 받아오고 판매개수와 가격이 아직 계산되지 않았을 경우
    if (resData && !totalSold && !totalPrice) {
      calcData(resData);
    }

    //판매개수와 가격의 계산이 되었을경우
    if (totalSold && totalPrice) {
      setLoading(false);
    }
  }, [resData, totalSold, totalPrice]);

  return (
    <div className="page">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Info>
            <Value>
              <div>등록물품</div>
              <div>{resData.length}개</div>
            </Value>

            <Value>
              <div>판매개수</div>
              <div>{totalSold}개</div>
            </Value>

            <Value>
              <div>판매금액</div>
              <div>{totalPrice.toLocaleString()}원</div>
            </Value>
          </Info>

          <List>
            {resData.map((data, index) => (
              <Card key={index} onClick={() => nav(`/product/${data._id}`)}>
                <div>
                  <Product>
                    <Image img={`url('${postUrl}${data.image[0].name}')`} />
                    <Content>
                      <div>{data.title}</div>

                      <ul>
                        <li>{`등록일 ${new Date(
                          data.createdAt
                        ).getFullYear()}. ${
                          new Date(data.createdAt).getMonth() + 1
                        }. ${new Date(data.createdAt).getDate()}`}</li>
                        <li>{`가격 ${data.price.toLocaleString()}원`}</li>
                        <li>{`판매수 ${data.sold}`}개</li>
                        <li>{`판매금액 ${parseInt(
                          data.price * data.sold,
                          10
                        ).toLocaleString()}원`}</li>
                      </ul>
                    </Content>
                  </Product>
                </div>
              </Card>
            ))}
          </List>
        </>
      )}
    </div>
  );
}

const Info = styled.div`
  width: 100%;
  height: 6rem;
  padding: 0.5rem;
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Value = styled.div`
  background-color: rgba(255, 166, 0, 0.5);
  width: 33%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & > :last-child {
    font-weight: 600;
    font-size: 16px;
  }
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem;
  width: 100%;
  margin: auto;
`;

//상품 목록 전체를 담을 컨테이너
const Card = styled.div`
  height: 15rem;
  width: 50%;
  display: flex;
  justify-content: flex-start;

  @media (max-width: 900px) {
    width: 100%;
  }

  //전체 컨테이너 속에 상품정보를 하나씩 넣어줄 분리된 컨테이너
  & > :first-child {
    width: 100%;
    display: flex;
  }
`;

//전체 컨테이너 속에 분리된 컨테이너에 하나씩 넣어줄 상품 정보
//flex-start를 사용해도 중앙정렬 시키기위해 중첩하여 사용
const Product = styled.div`
  box-shadow: 1px 1px 3px 1px rgba(128, 128, 128, 0.507);
  width: 95%;
  height: 95%;
  padding: 0.5rem;
  margin: auto;
  border-radius: 5px;
  display: flex;
  border: 3px solid transparent;

  &:hover {
    cursor: pointer;
    border: 3px solid orange;
    transition: all ease 0.5s;
  }
`;

const Image = styled.div`
  min-width: 30%;

  background-image: ${(props) => props.img};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  border-radius: 5px;
  margin-right: 1rem;
`;

const Content = styled.div`
  font-size: 1rem;

  //상품명
  & > :first-child {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  //판매정보
  & > ul {
    padding-left: 1.5rem;
  }
`;

export default ProductManagement;
