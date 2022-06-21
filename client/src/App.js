import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../src/hoc/auth";
import Header from "./Components/Header/Header";
import Main from "./Page/Main";
import Upload from "./Page/Upload";
import ProductDetail from "./Page/ProductDetail";

import Test from "./Page/Test";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={`/`} element={Auth(Main, null)} />
        <Route path={`/upload`} element={Auth(Upload, null)} />
        <Route path={`/product/:id`} element={Auth(ProductDetail, null)} />
        <Route path={`/test`} element={Auth(Test, null)} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
