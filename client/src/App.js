/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation, Outlet } from "react-router-dom";

import PageTop from "./Components/Utility/PageTop";
import Header from "./Components/Header/Header";

import Main from "./Page/Main/Main";
import Upload from "./Page/Upload_Edit/Upload";
import ProductDetail from "./Page/DetailPage/ProductDetail";
import Cart from "./Page/Cart/Cart";
import CheckOut from "./Page/CheckOut/CheckOut";
import PaymentResult from "./Page/PaymentResult/PaymentResult";
import PurchaseHistory from "./Page/PurchaseHistory/PurchaseHistory";
import ProductManagement from "./Page/ProductManagement/ProductManagement";
import Edit from "./Page/Upload_Edit/Edit";

import Auth from "./hoc/auth";
import GlobalStyle from "./Components/Style/GlobalStyle";

import ServerShutdown from "./Page/ServerShutdown";

import "./Color.css";

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  const [serverClose, setServerClose] = useState(true);

  useEffect(() => {
    // window.onbeforeunload = function pushRefresh() {
    //   window.scrollTo(0, 0);
    // };

    const date = new Date();
    const UTC = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
    const KST = 9 * 60 * 60 * 1000;
    const KR_HOURS = new Date(UTC + KST).getHours();

    if (KR_HOURS >= 8 && KR_HOURS <= 20) {
      setServerClose(false);
    } else {
      setServerClose(true);
    }
  }, []);

  return (
    <>
      {Auth(GlobalStyle, false)}
      <PageTop />

      {serverClose ? (
        <Routes>
          <Route path={`/`} element={<ServerShutdown />} />
        </Routes>
      ) : (
        <>
          <Header />
          <Routes>
            <Route path={`/`} element={Auth(Main, false)} />
            <Route path={`/product/:id`} element={Auth(ProductDetail, false)} />

            <Route path={`/upload`} element={Auth(Upload, true)} />
            <Route path={`/cart`} element={Auth(Cart, true)} />
            <Route path={`/checkOut`} element={Auth(CheckOut, true)} />
            <Route
              path={`/paymentResult`}
              element={Auth(PaymentResult, true)}
            />
            <Route
              path={`/productManagement`}
              element={Auth(ProductManagement, true)}
            />
            <Route
              path={`/purchaseHistory`}
              element={Auth(PurchaseHistory, true)}
            />
            <Route path={`/edit/:id`} element={Auth(Edit, true)} />
          </Routes>
        </>
      )}
    </>
  );
}

export default React.memo(App);
