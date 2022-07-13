import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RecentView.css";

function RecentView({ detail }) {
  const nav = useNavigate();
  const [histoty, setHistory] = useState([]);
  const getProductHistory = JSON.parse(localStorage.getItem("productHistory"));

  useEffect(() => {
    if (getProductHistory !== null) {
      setHistory(getProductHistory);
    }
  }, []);

  return (
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
                    backgroundImage: `url('${data.image}')`,
                  }}
                  onClick={() => {
                    nav(`/product/${data.id}`);
                    {
                      detail && window.location.reload();
                    }
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
  );
}

export default RecentView;
