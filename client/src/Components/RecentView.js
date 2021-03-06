import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./RecentView.css";
import { postUrl } from "../PostUrl";

function RecentView({ SideMenu, closeMenu, menuClick }) {
  const { id } = useParams();
  const nav = useNavigate();
  const [histoty, setHistory] = useState([]);
  const getProductHistory = JSON.parse(localStorage.getItem("productHistory"));

  useEffect(() => {
    if (getProductHistory !== null) {
      setHistory(getProductHistory);
    }
  }, [id, menuClick]);

  return (
    <>
      {SideMenu ? (
        <>
          <div className="RecentView-div">최근본상품</div>
          <div className="RecentView-sideMenu">
            {histoty.length === 0 ? (
              <div className="RecentView-not">최근본상품이 없습니다.</div>
            ) : (
              <>
                {histoty.map((data) => (
                  <div key={data.id} className="RecentView-img-sideMenu">
                    <div
                      style={{
                        backgroundImage: `url('${postUrl}${data.image}')`,
                      }}
                      onClick={() => {
                        nav(`/product/${data.id}`);
                        closeMenu();
                      }}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      ) : (
        <div className="RecentView">
          <div>
            <div className="RecentView-div">최근본상품</div>
            {histoty.length === 0 ? (
              <div className="RecentView-not">최근본상품이 없습니다.</div>
            ) : (
              <>
                {histoty.map((data) => (
                  <div key={data.id}>
                    <div
                      style={{
                        backgroundImage: `url('${postUrl}${data.image}')`,
                      }}
                      onClick={() => {
                        nav(`/product/${data.id}`);
                      }}
                      className="RecentView-img"
                    />
                  </div>
                ))}
              </>
            )}

            <div className="RecentView-div" onClick={() => window.scroll(0, 0)}>
              맨위로
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default React.memo(RecentView);
