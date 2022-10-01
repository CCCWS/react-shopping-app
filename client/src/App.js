/* eslint-disable */
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PageTop from "./Components/PageTop";
import Header from "./Components/Header/Header";
import Main from "./Page/Main";
import Upload from "./Page/Upload";
import ProductDetail from "./Page/DetailPage/ProductDetail";
import Cart from "./Page/Cart";
import CheckOut from "./Page/CheckOut/CheckOut";
import PaymentResult from "./Page/PaymentResult";
import PurchaseHistory from "./Page/PurchaseHistory/PurchaseHistory";
import ProductManagement from "./Page/ProductManagement";
import Edit from "./Page/Edit";

import Test from "./Page/Test";
import Test2 from "./Page/Test2";

import Auth from "./hoc/auth";
import "./App.css";

function App() {
  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <PageTop />
      <Routes>
        <Route path={`/`} element={Auth(Main, null)} />
        <Route path={`/upload`} element={Auth(Upload, true)} />
        <Route path={`/product/:id`} element={Auth(ProductDetail, null)} />
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
        <Route path={`/test`} element={Auth(Test, null)} />
        <Route path={`/test2`} element={Auth(Test2, null)} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
