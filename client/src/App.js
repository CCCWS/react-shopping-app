/* eslint-disable */
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

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

import Test from "./Page/Test";
import Test2 from "./Page/test/Test2";
import Test3 from "./Page/test/Test3";
import Test4 from "./Page/test/Test4";
import Test7 from "./Page/test/Test7";

import Auth from "./hoc/auth";
import GlobalStyle from "./Components/Style/GlobalStyle";

import "./Color.css";

function App() {
  // const darkMode = useSelector((state) => state.darkMode.darkMode);

  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <>
      <Router>
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

          <Route path={`/test`} element={<Test />} />
          <Route path={`/test2`} element={<Test2 />} />
          <Route path={`/test3`} element={<Test3 />} />
          <Route path={`/test4`} element={<Test4 />} />
          <Route path={`/test7`} element={<Test7 />} />
        </Routes>
      </Router>
    </>
  );
}

export default React.memo(App);
