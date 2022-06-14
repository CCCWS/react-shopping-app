import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../src/hoc/auth";
import Main from "./Page/Main";
import Header from "./Components/Header/Header";

import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={`/`} element={Auth(Main, null)} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
