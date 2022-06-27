import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../src/hoc/auth";
import Header from "./Components/Header/Header";
import Main from "./Page/Main";
import Upload from "./Page/Upload";
import ProductDetail from "./Page/ProductDetail";
import Cart from "./Page/Cart";
import CheckOut from "./Page/CheckOut";
import PaymentResult from "./Page/PaymentResult";
import PurchaseHistory from "./Page/PurchaseHistory";

import Test from "./Page/Test";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={`/`} element={Auth(Main, null)} />
        <Route path={`/upload`} element={Auth(Upload, true)} />
        <Route path={`/product/:id`} element={Auth(ProductDetail, null)} />
        <Route path={`/cart`} element={Auth(Cart, true)} />
        <Route path={`/checkOut`} element={Auth(CheckOut, true)} />
        <Route path={`/paymentResult`} element={Auth(PaymentResult, true)} />
        <Route
          path={`/purchaseHistory`}
          element={Auth(PurchaseHistory, true)}
        />
        <Route path={`/test`} element={Auth(Test, null)} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
