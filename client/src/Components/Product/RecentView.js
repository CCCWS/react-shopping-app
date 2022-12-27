import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components";

import { Image } from "../Style/ProductCard";

import { postUrl } from "../../PostUrl";

function RecentView({ SideMenu, setMenuClick, page }) {
  const { id } = useParams();
  const nav = useNavigate();
  const [histoty, setHistory] = useState([]);

  useEffect(() => {
    const getProductHistory = JSON.parse(
      localStorage.getItem("productHistory")
    );

    if (getProductHistory !== null) {
      setHistory(getProductHistory);
    }
  }, [id]);

  const goTop = () => {
    window.scroll(0, 0);
  };

  const goProduct = (id) => {
    nav(`/product/${id}`);

    SideMenu && setMenuClick(false);
  };

  return (
    <Div page={page} SideMenu={SideMenu}>
      {}
      <div>
        <Title>최근본상품</Title>
        {histoty.length === 0 ? (
          <Empty>최근본상품이 없습니다.</Empty>
        ) : (
          <ImageBox page={page} SideMenu={SideMenu}>
            {histoty.map((data) => (
              <NewImage
                page={page}
                SideMenu={SideMenu}
                key={data.id}
                img={`url('${postUrl}${data.image}')`}
                onClick={() => goProduct(data.id)}
              />
            ))}
          </ImageBox>
        )}
        {page && (
          <Title top={true} onClick={goTop}>
            맨위로
          </Title>
        )}
      </div>
    </Div>
  );
}

const Div = styled.div`
  width: ${(props) => props.page && "100px"};
  width: ${(props) => props.SideMenu && "100%"};

  ${(props) =>
    props.page &&
    css`
      position: absolute;
      top: 60px;
      right: -100px;
    `}

  @media (max-width: 1200px) {
    display: ${(props) => props.page && "none"};
  }

  & > :first-child {
    width: inherit;
    height: inherit;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    justify-content: space-between;

    ${(props) =>
      props.page &&
      css`
        position: fixed;
        top: inherit;
      `}
  }
`;

const Title = styled.div`
  background-color: var(--gray_transparency);
  border-radius: 5px;
  font-size: 1rem;
  padding: 0.5rem;
  width: 100px;
  display: flex;
  justify-content: center;

  &:hover {
    cursor: ${(props) => props.top && "pointer"};
  }
`;

const Empty = styled.div`
  font-size: 1rem;
  margin: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1200px) {
    width: 200px;
  }
`;

const ImageBox = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-evenly;

  ${(props) =>
    props.page &&
    css`
      flex-direction: column;
      flex-wrap: wrap;
    `}
  ${(props) =>
    props.SideMenu &&
    css`
      width: 250px;
      flex-direction: row;
      flex-wrap: wrap;
    `};
`;

const NewImage = styled(Image)`
  width: 90px;
  height: 90px;

  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  transition: all cubic-bezier(0, -0.16, 1, 1.9) 0.3s;

  position: relative;

  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`;

export default React.memo(RecentView);
