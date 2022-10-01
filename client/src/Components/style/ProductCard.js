import styled, { css } from "styled-components";

export const Card = styled.div`
  min-height: 10rem;
  width: 100%;
  padding: 1rem;
  border-radius: 5px;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
`;

export const ImgAndTitle = styled.div`
  display: flex;

  &:hover {
    cursor: pointer;
  }

  & > :first-child {
    //상품 이미지
    background-image: ${(props) => props.img};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    min-width: 120px;
    height: 100%;

    border-radius: 5px;
    margin-right: 0.5rem;
  }

  & > :last-child {
    //상품명
    font-weight: 600;
    font-size: 1rem;
    white-space: normal;
  }
`;

export const CountAndPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-items: flex-end;

  min-width: 5rem;
  font-size: 0.8rem;
`;

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: auto;
`;
