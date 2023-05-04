/* eslint-disable */
import React, { useEffect } from "react";
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

import Test from "./Page/Test";

import "./Color.css";

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, []);
  return (
    <>
      {Auth(GlobalStyle, false)}
      <Header />
      <PageTop />
      <Routes>
        <Route path={`/`} element={Auth(Main, false)} />
        <Route path={`/product/:id`} element={Auth(ProductDetail, false)} />

        <Route path={`/upload`} element={Auth(Upload, true)} />
        <Route path={`/cart`} element={Auth(Cart, true)} />
        <Route path={`/checkOut`} element={Auth(CheckOut, true)} />
        <Route path={`/paymentResult`} element={Auth(PaymentResult, true)} />
        <Route
          path={`/productManagement`}
          element={Auth(ProductManagement, true)}
        />
        <Route
          path={`/purchaseHistory`}
          element={Auth(PurchaseHistory, true)}
        />
        <Route path={`/edit/:id`} element={Auth(Edit, true)} />

        <Route path={`/test`} element={Auth(Test, false)} />
      </Routes>
    </>
  );
}

export default React.memo(App);
