/* eslint-disable */
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import scrollbar from "smooth-scrollbar";

import PageTop from "./Components/Utility/PageTop";
import Header from "./Components/Header/Header";

import Main from "./Page/Main";
import Upload from "./Page/Upload";
import ProductDetail from "./Page/DetailPage/ProductDetail";
import Cart from "./Page/Cart/Cart";
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

        <Route path={`/test`} element={<Test />} />
        <Route path={`/test2`} element={<Test2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
