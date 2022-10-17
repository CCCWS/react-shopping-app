/* eslint-disable */
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PageTop from "./Components/PageTop";
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
        <Route path={`/`} element={<Main />} />
        <Route path={`/upload`} element={<Upload />} />
        <Route path={`/product/:id`} element={<ProductDetail />} />
        <Route path={`/cart`} element={<Cart />} />
        <Route path={`/checkOut`} element={<CheckOut />} />
        <Route path={`/paymentResult`} element={<PaymentResult />} />
        <Route path={`/productManagement`} element={<ProductManagement />} />
        <Route path={`/purchaseHistory`} element={<PurchaseHistory />} />
        <Route path={`/edit/:id`} element={<Edit />} />
        <Route path={`/test`} element={<Test />} />
        <Route path={`/test2`} element={<Test2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
