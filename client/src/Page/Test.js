import React, { useState } from "react";
import {
  AppstoreOutlined,
  SearchOutlined,
  AudioOutlined,
  TableOutlined,
} from "@ant-design/icons";
import "./Test.css";

function Test() {
  const [searchValue, setSearchValue] = useState("");
  const [onFocusInput, setOnFocusInput] = useState(false);

  const goPage = (e) => {
    e.preventDefault();
    window.location.href = `http://www.google.com/search?q=${searchValue}`;
  };

  return (
    <div>
      <div className="test-header">
        <div className="test-header-left">
          <div>Google 정보</div>
          <div>스토어</div>
        </div>

        <div className="test-header-right">
          <div>Gmail</div>
          <div>이미지</div>
          <div>
            <AppstoreOutlined />
          </div>

          <button className="test-heaer-login">로그인</button>
        </div>
      </div>

      <div className="test-main">
        <div className="test-logo">
          <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" />
        </div>

        <div
          className={[
            `test-search-bar ${onFocusInput && "test-search-bar-input-focus"}`,
          ].join(" ")}
        >
          <SearchOutlined />
          <form onSubmit={goPage}>
            <input
              className="test-search-bar-input"
              onFocus={() => setOnFocusInput(true)}
              onBlur={() => setOnFocusInput(false)}
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              onSubmit={goPage}
            ></input>
          </form>
          <TableOutlined />
          <AudioOutlined />
        </div>

        <div className="test-otherBtn">
          <div>Google 검색</div>
          <div>I`m Feeling Lucky</div>
        </div>
      </div>

      <div className="test-footer">
        <div className="test-footer-up">대한민국</div>
        <div className="test-footer-down">
          <div className="test-footer-item">
            <div>광고</div>
            <div>비즈니스</div>
            <div>검색의 원리</div>
          </div>

          <div className="test-footer-item">
            <div>개인정보처리방침</div>
            <div>약관</div>
            <div>설정</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;
